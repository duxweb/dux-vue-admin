import * as path from 'node:path'
import { resolve } from 'node:path'
import vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import viteDts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    VueJsx(),
    viteDts({
      insertTypesEntry: true,
      staticImport: true,
    }),
  ],
  resolve: {
    alias: {
      'dux-vue-admin': resolve('src'),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, './src/index.ts'),
      name: 'dux',
      fileName: format => `index.${format}.js`,
    },
    outDir: path.resolve(__dirname, './dist'),
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
