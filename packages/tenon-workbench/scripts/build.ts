import path from 'path';
import { build } from 'vite';
import fs from 'fs';
import { execSync } from 'child_process';
import vue from '@vitejs/plugin-vue';


(async () => {
  await build({
    root: path.resolve(__dirname, '../'),
    base: '/',
    plugins: [vue()],
    build: {
      sourcemap: true,
      outDir: path.resolve(__dirname, '../lib'),
      lib: {
        entry: path.resolve(__dirname, '../src/index.ts'),
        name: 'TenonWorkbench',
        fileName: (format) => `tenon-workbench.${format}.js`,
      },
      // minify: 'terser',
      rollupOptions: {
        // ...
      }
    }
  });
  execSync('tsc');
  console.log('tsc completed');
})();