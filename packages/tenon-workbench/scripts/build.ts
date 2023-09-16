import fs from 'fs/promises';
import syncFs from 'fs';
import path from 'path';
import { build } from 'vite';
import vue from '@vitejs/plugin-vue';
import createExternal from 'vite-plugin-external';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';


(async () => {
  if (syncFs.existsSync(path.resolve(__dirname, '../tsconfig.tsbuildinfo'))) {
    await fs.unlink(path.resolve(__dirname, '../tsconfig.tsbuildinfo'));
  }
  if (syncFs.existsSync(path.resolve(__dirname, '../typings'))) {
    await fs.rmdir(path.resolve(__dirname, '../typings'), {
      recursive: true,
    });
  }
  await build({
    root: path.resolve(__dirname, '../'),
    base: '/',
    plugins: [
      vue(),
      AutoImport({
        resolvers: [TDesignResolver({
          library: 'vue-next',
          esm: true,
        })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next',
          esm: true,
        })],
      }),
      createExternal({
        externals: {
          vue: 'vue',
        },
      }),
    ],
    build: {
      sourcemap: true,
      outDir: path.resolve(__dirname, '../lib'),
      lib: {
        entry: path.resolve(__dirname, '../src/index.ts'),
        name: 'TenonWorkbench',
        fileName: (format) => `tenon-workbench.${format}.js`,
      },
      minify: 'terser',
      rollupOptions: {
        // ...
      }
    }
  });
})();
