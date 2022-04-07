import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import monacoEditorPlugin from "rollup-plugin-monaco-editor";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), monacoEditorPlugin(
    { languages: ['javascript']}
  )],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~components": path.resolve(__dirname, "./src/components"),
      "~logic": path.resolve(__dirname, "./src/logic"),
    },
  },
  base: '/tenon/'
})
