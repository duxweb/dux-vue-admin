import path from 'node:path'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import { buildPlugin } from 'vite-plugin-build'
import externalGlobals from "rollup-plugin-external-globals"
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  define: {
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
  plugins: [
    vue(),
    vueJsx(),
    buildPlugin({
    fileBuild: { emitDeclaration: true, isVue: true, formats: [
      { format: 'cjs', outDir: path.resolve(__dirname, 'dist/cjs') },
      { format: 'es', outDir: path.resolve(__dirname, 'dist/esm') },
    ] },
    libBuild: {
      buildOptions: {
        outDir: path.resolve(__dirname, 'dist/browser'),

        rollupOptions: {
          external: ['vue', 'vue-demi'],
          plugins: [
            externalGlobals({
              vue: "Vue",
              'vue-demi': "VueDemi"
            }),
          ],
        },
        assetsInlineLimit: 4096,
        assetsDir: 'static',
        lib: {
          entry: path.resolve(__dirname, 'src/index.ts'),
          name: 'Dux',
          fileName: format => `index.js`,
          formats: ['umd'],
        },
      },
    },
  })],
})
