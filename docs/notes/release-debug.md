---
nav:
  title: Debug
  order: 2
group:
  title: Debug详细
  order: -1
---

# CI/CD 发布踩坑记录（dumi + pnpm workspace + changesets）

## 背景

- monorepo：pnpm workspace
- 组件构建：father（ESM + CJS）
- 文档：dumi
- 发包：changesets + GitHub Actions
- 包名：@mariotzz/tzz-element

## 问题与解决

### 1. Actions 无法创建 Version PR

**现象**：`GitHub Actions is not permitted to create or approve pull requests`
**原因**：仓库未开启允许 Actions 创建 PR
**解决**：Settings → Actions → General → 开启 Read and write permissions + Allow create/approve PR

### 2. scope 不属于自己导致 publish 失败

**现象**：发布 `@mario/tzz-element` 返回 404/403
**原因**：`@mario` scope 不属于当前 npm 账号
**解决**：改包名为 `@mariotzz/tzz-element`

### 3. npm 2FA 导致 publish 403

**现象**：`Two-factor authentication ... is required to publish packages`
**原因**：账号开启了发布需要 2FA
**解决**：创建 granular token 并开启 bypass 2FA，写入 GitHub Secrets `NPM_TOKEN`

### 4. CI 里 npm whoami 401（setup-node 改写 userconfig）

**现象**：`npm whoami` 401
**原因**：setup-node 设置了 `NPM_CONFIG_USERCONFIG=/home/runner/work/_temp/.npmrc`，npm 实际读的是这个文件，不是 `~/.npmrc`,导致 actions 中构建一直失败，因为指向了一个临时的`_temp/.npmrc`
**解决**：在 workflow 中把 token 写到 `npm config get userconfig` 指向的 npmrc

### 5. 引入方案 A 后 CI 再次 whoami 401（NPM_TOKEN 注入作用域问题）

**现象**：在引入方案 （项目根目录新增 `.npmrc`，并用 `${NPM_TOKEN}` 引用 token）后，Release workflow 中 `Verify npm auth` 再次报错：`npm whoami` 401 Unauthorized。

**原因**：`.npmrc` 使用了 `${NPM_TOKEN}`，但 `NPM_TOKEN` 只在某些 step 的 `env:` 中注入，后续 step（例如 `Verify npm auth` / `changesets/action` / `pnpm changeset publish` 内部调用 npm）并不一定继承该环境变量，导致 `${NPM_TOKEN}` 展开为空，从而鉴权失败（E401）。此外 `setup-node` 仍可能指定 `NPM_CONFIG_USERCONFIG` 指向临时 userconfig，需要确保 token 在“所有步骤”都可见。

**解决**：将 `NPM_TOKEN` 提升为 **job 级 env**，确保所有 steps 都能读取到 token；并继续将 token 写入 `npm config get userconfig` 对应的 userconfig（与 setup-node 行为对齐），最终 `npm whoami` 与 `changeset publish` 均恢复正常。

## 最终可用的 Release Workflow
