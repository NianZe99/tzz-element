import path from 'node:path';
import { defineConfig } from 'vitest/config';
export default defineConfig({
  resolve: {
    alias: {
      // 让tests直接引用src下的代码，并且是从源码的入口进入，而不是dist编译后的代码
      '@mariozz/tzz-element': path.resolve(
        __dirname,
        '../components/src/index.ts',
      ),
    },
  },
  test: {
    globals: true, // ✅ 让 test/expect 变全局
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
