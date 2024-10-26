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
      output: {
        manualChunks: {
          'vendor-vue': ['vue', 'vue-router'],
          'vendor-naive': ['naive-ui'],
          'vendor-vueuse': ['@vueuse/core'],
          'vendor-echarts': ['echarts', 'vue-echarts'],
          'vendor-ai': ['aieditor'],
          'vendor-code': ['vue3-ace-editor', 'ace-builds'],
          'vendor-alova': ['alova'],
          'vendor-excel': ['exceljs'],
          'vendor-pinia': ['pinia', 'pinia-plugin-persistedstate'],
          'vendor-loader': ['vue3-sfc-loader'],
          'vendor-pdf': ['vue-pdf-embed'],
          'vendor-lodash': ['lodash-es', 'lodash'],
          'vendor-icon': ['@iconify-json/tabler'],
        },
      },
    },
    outDir: resolve(__dirname, 'dist'),
  },
})
