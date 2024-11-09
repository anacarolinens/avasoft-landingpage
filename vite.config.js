// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig({
  plugins: [vue()],
  base: '/',
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: "src/assets",
  },
  },
});
