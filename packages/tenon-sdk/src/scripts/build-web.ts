import path from 'path';
import { build } from 'vite';
import { BuildPhaseName, setPhase } from '@tenon/flow';
import { createClient } from './client';

const client = createClient();

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
  });
  setPhase(createClient(), BuildPhaseName.RESTART_BFF);
})();