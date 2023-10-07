import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ViteEjsPlugin } from "vite-plugin-ejs";
import path from "path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import config from "./config";
console.log(config);

export default defineConfig({
  plugins: [
    vue(),
    ViteEjsPlugin({
      env: config.mode,
      config,
    }),
    AutoImport({
      resolvers: [TDesignResolver({
        library: 'vue-next',
      })],
    }),
    Components({
      resolvers: [TDesignResolver({
        library: 'vue-next',
      })],
    }),
  ],
  build: {
    sourcemap: true,
    assetsDir: config.assetDir,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tenon-features": path.resolve(__dirname, "./src/features"),
    },
  },
  base: config.basePath,
});
