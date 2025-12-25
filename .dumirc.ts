import { defineConfig } from 'dumi';
import path from 'path';

export default defineConfig({
  resolve: {
    docDirs: ['docs'],
    // 你的组件资产 md 在 packages/components/src/*
    atomDirs: [{ type: 'component', dir: 'packages/components/src' }],
    // 入口文件（用于 API 解析等）
    entryFile: 'packages/components/index.ts',
  },

  // 关键：monorepo 下根包名不是最终发布包名，autoAlias 很容易别名错对象
  autoAlias: false,

  // 关键：把你发布包名 alias 到源码入口，保证 dumi dev 时不走 dist
  alias: {
    '@mario/tzz-element': path.resolve(
      __dirname,
      'packages/components/src/index.ts',
    ),
  },
});
