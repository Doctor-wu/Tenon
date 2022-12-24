import path from 'path';
import { build } from 'vite';
import { execSync } from 'child_process';
import vue from '@vitejs/plugin-vue';
import createExternal from 'vite-plugin-external';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';


(async () => {
  await build({
    root: path.resolve(__dirname, '../'),
    base: '/',
    plugins: [
      vue(),
      createExternal({
        externals: {
          vue: 'Vue',
        },
      }),
      AutoImport({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
      }),
      Components({
        resolvers: [TDesignResolver({
          library: 'vue-next'
        })],
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
      // minify: 'terser',
      rollupOptions: {
        // ...
      }
    }
  });
  execSync('tsc');
  console.log('tsc completed');
})();
