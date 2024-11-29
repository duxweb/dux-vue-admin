import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { defineConfig } from 'vite'
import { buildPlugin } from 'vite-plugin-build'

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [
    vue(),
    vueJsx(),
    buildPlugin({
      fileBuild: {
        emitDeclaration: true,
        isVue: true,
        formats: [
          { format: 'cjs', outDir: path.resolve(__dirname, 'dist/cjs') },
          { format: 'es', outDir: path.resolve(__dirname, 'dist/esm') },
        ],
      },
    }),
  ],
})
