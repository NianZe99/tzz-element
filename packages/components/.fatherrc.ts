import { defineConfig } from 'father';

export default defineConfig({
  // 同时产出esm和cjs ，原来的只适配esm ，现在分明了，cjs用户也能够使用 ，同时还要对package.json做相应的修改
  esm: { input: 'src', output: 'es' },
  cjs: { input: 'src', output: 'lib' },
});
