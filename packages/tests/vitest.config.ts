import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true, // ✅ 让 test/expect 变全局
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
