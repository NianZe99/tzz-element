import { defineConfig } from 'vitest/config';
export default defineConfig({
  resolve: {
    alias: {
      // ✅ 强制把包名解析到源码入口（不是 es/ lib/）
      '@mariotzz/tzz-element': new URL(
        '../components/src/index.ts',
        import.meta.url,
      ).pathname,
    },
  },
  test: {
    globals: true, // ✅ 让 test/expect/describe 变全局
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
