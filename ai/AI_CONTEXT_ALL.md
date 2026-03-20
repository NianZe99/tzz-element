合并版
请以我上传的 AI_CONTEXT.md 作为项目事实与规范来源。现在我的任务是：XXX

# Project Context: tzz-element

## Overview

- Repo: `tzz-element` (pnpm workspace monorepo)
- Goal: personal open-source-quality React component library

## Tech Stack

- React 18+
- TypeScript
- CSS Modules (`*.module.css`)

## Monorepo Layout

- `packages/components`
  - publish package: `@mariotzz/tzz-element`
  - build tool: father
  - outputs: `es/` and `lib/`
  - sources: `packages/components/src/*`
- `packages/tests`
  - vitest + @testing-library/react + user-event
  - fast tests should run against **source code** (alias to `packages/components/src/index.ts`)
- docs site: dumi v2
  - `atomDirs` points to `packages/components/src` (component docs + demos)
  - dev alias: `@mariotzz/tzz-element` -> `packages/components/src/index.ts`

## Release

- changesets + GitHub Actions workflow already works
- npm account has 2FA enabled
  - uses granular token + 2FA bypass
  - workflow writes token into npm config (temporary userconfig) and exports `NPM_TOKEN` at job env
- intended flow:
  - PR contains code + `.changeset/*`
  - CI creates Version PR (or local `changeset version`) and then publish

## Git / Commit Rules

- husky + commitlint enabled
- must follow Conventional Commits: `type(scope): subject`
  - examples: `feat(button): add Button component`, `test(button): add tests`, `chore(release): version packages`

# Workflows

## Component Development Workflow (standard)

1. API Design
   - define props: variant, size, disabled, loading, icon, polymorphism (asChild)
   - include WAI-ARIA considerations
2. Implementation
   - React.forwardRef
   - CSS Modules
   - avoid leaking internal props to DOM
3. Docs (dumi)
   - `packages/components/src/<Component>/index.md`
   - demos under `demos/` referenced by `<code src="./demos/xxx.tsx" />`
4. Tests
   - add/extend tests in `packages/tests`
   - tests must run against source (vitest alias)
5. Release record
   - `pnpm changeset` (usually minor for new component; patch for fix)
6. Commit & PR
   - commit message must satisfy commitlint
   - open PR, CI should pass
7. Version & Publish
   - either:
     - CI creates Version PR and publishes after merge, OR
     - local: `pnpm changeset version` then CI publish

## Local Verification Checklist

- docs: `pnpm dev` (Button page + demos render)
- build: `pnpm build` (father outputs `es/` and `lib/`)
- tests: `pnpm test:fast` (vitest run)
- (optional) pack: `pnpm -C packages/components pack` check tarball contents

## Commit Message Cheatsheet

- feature: `feat(button): add Button component`
- fix: `fix(button): prevent click when disabled in asChild`
- test: `test(button): add vitest coverage`
- chore: `chore(release): version packages`

# Conventions

## Exports

- Prefer **named exports** for components and types.
- Root entry: `packages/components/src/index.ts` re-exports all components.
- Each component folder should have `index.ts` as a barrel.

## File/Folder Naming

- Component folder name: PascalCase (current repo style): `src/Button/`
- File names inside folder: lowercase (cross-platform safe)
  - `button.tsx`, `types.ts`, `utils.ts`, `button.module.css`, `index.ts`, `index.md`
- Avoid `index.ts` + `index.tsx` in same folder to prevent self-import cycles.

## CSS

- CSS Modules only: `*.module.css`
- states must include: hover, focus-visible, active, disabled, loading
- focus style uses `:focus-visible`, not `:focus`

## Accessibility (WAI-ARIA)

- Button default `type="button"` to avoid accidental form submit
- `disabled || loading`
  - native button uses `disabled`
  - asChild uses `aria-disabled="true"` + blocks click/keyboard events + sets `tabIndex=-1`
- icon-only (`size="icon"`) should have readable label:
  - if no text children, require `aria-label` (warn in dev)

## asChild (Polymorphism)

- Uses Slot-like pattern (cloneElement + merge props)
- Must NOT leak internal props (`asChild`, `startIcon`, etc.) to DOM
- When disabled/loading: prevent default and stop propagation; do not call child handlers

## Testing

- Use @testing-library/react + user-event
- Fast tests should import from `@mariotzz/tzz-element` but alias points to source entry
- Add minimal but meaningful tests:
  - render
  - default type behavior
  - submit behavior when type="submit"
  - disabled
  - loading (aria-busy + click blocked)
  - asChild disabled behavior
  - icon-only a11y warning (optional)

# Current Status

Date: (update when necessary)

## Button

- Button component implemented with:
  - variant/size/block/disabled/loading/startIcon/endIcon/spinnerPlacement/asChild
  - React.forwardRef
  - CSS Modules styles
  - WAI-ARIA semantics
- Dumi docs & demos:
  - `packages/components/src/Button/index.md`
  - `packages/components/src/Button/demos/*`
- Tests:
  - `packages/tests/src/button.test.tsx` added
  - vitest config aliases `@mariotzz/tzz-element` -> `packages/components/src/index.ts`

## Known Pitfalls Already Resolved

- Avoid `index.ts` + `index.tsx` same folder (self-import cycle)
- macOS case-insensitive FS conflict (`Button.tsx` vs `button.tsx`) => use lowercase file names
- eslint react/button-has-type => keep `type` as simple inline ternary and place after spread
- Slot handler merge must respect preventDefault to avoid calling child handlers when disabled/loading

## Release

- changesets workflow works (2FA granular token)
- commitlint active: must use `type(scope): subject`

## Next Suggested Components

- Icon (unify icons + a11y labels)
- Link (paired with Button asChild)
- Space/Stack (layout utilities)

# Component Template (copy/paste skeleton)

## Folder Structure

packages/components/src/<Component>/

- index.ts (barrel export)
- <component>.tsx (implementation, lowercase filename)
- types.ts
- utils.ts (optional)
- <component>.module.css
- index.md (dumi docs)
- demos/
  - basic.tsx
  - variant.tsx
  - size.tsx
  - loading.tsx
  - as-child.tsx

## Barrel Export (index.ts)

```ts
export { Component } from './<component>';
export type { ComponentProps } from './types';
```
