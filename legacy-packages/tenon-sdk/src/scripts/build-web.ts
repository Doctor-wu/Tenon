import path from 'path';
import { build } from 'vite';
import { BuildPhaseName, setPhase } from '@tenon/legacy-flow';
import { createClient } from './client';
import {execSync} from 'child_process';
import { Socket } from 'net';

(async () => {
  await build({
    root: path.resolve(__dirname, '../web'),
    base: '/',
    build: {
      sourcemap: true,
      lib: {
        entry: path.resolve(__dirname, '../web/index.ts'),
        name: 'TenonWebSDK',
        fileName: (format) => `tenon-web-sdk.${format}.js`,
      },
      // minify: 'terser',
      rollupOptions: {
        // ...
      }
    }
  });
  execSync('tsc');
  console.log('tsc completed');

  let socket: Socket;
  setPhase(socket = createClient(), BuildPhaseName.RESTART_BFF);
  socket.end();
})();
