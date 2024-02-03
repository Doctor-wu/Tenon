import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { ViteEjsPlugin } from "vite-plugin-ejs";
import { VitePWA } from "vite-plugin-pwa";
import path from "path";
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { TDesignResolver } from 'unplugin-vue-components/resolvers';
import config from "./config";
import UnoCSS from 'unocss/vite';
console.log(config);

export default defineConfig({
  plugins: [
    vue(),
    ViteEjsPlugin({
      env: config.mode,
      config: Object.assign({}, config, {
        isDev: config.isDev,
        isProd: config.isProd,
        isLocal: config.isLocal,
      }),
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
    (config.isProd || config.isLocal) ? VitePWA() : null,
    UnoCSS(),
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
  esbuild: {
    tsconfigRaw: {
      compilerOptions: {
        experimentalDecorators: true,
      },
    },
  },
});
