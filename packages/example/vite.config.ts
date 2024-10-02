import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
      },
    },
    outDir: resolve(__dirname, 'dist'),
  },
})
