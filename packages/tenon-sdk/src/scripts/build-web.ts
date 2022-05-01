import path from 'path';
import { build } from 'vite';

(async () => {
  await build({
    root: path.resolve(__dirname, '../web'),
    base: '/',
    build: {
      lib: {
        entry: path.resolve(__dirname, '../web/index.ts'),
        name: 'TenonWebSDK',
        fileName: (format) => `tenon-web-sdk.${format}.js`,
      },
      rollupOptions: {
        // ...
      }
    }
  })
})();