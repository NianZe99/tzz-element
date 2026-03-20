import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  resolve: {
    alias: {
      '@mariotzz/tzz-element': path.resolve(
        __dirname,
        '../components/src/index.ts',
      ),
    },
  },
  test: {
    globals: true, // ✅ 让 test/expect/describe 变全局
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
});
