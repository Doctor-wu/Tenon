import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from "path";
import MonacoEditorNlsPlugin, {
  esbuildPluginMonacoEditorNls,
  Languages,
} from 'vite-plugin-monaco-editor-nls';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    MonacoEditorNlsPlugin({locale: Languages.zh_hans}),
  ],
  build: {
    sourcemap: true,
  },
  optimizeDeps: {
        /** vite >= 2.3.0 */
        esbuildOptions: {
            plugins: [
                esbuildPluginMonacoEditorNls({
                    locale: Languages.zh_hans,
                }),
            ],
        },
    },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~components": path.resolve(__dirname, "./src/components"),
      "~logic": path.resolve(__dirname, "./src/logic"),
    },
  },
  base: '/tenon/'
})
