import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { buildPlugin } from 'vite-plugin-build'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
    }),
    dts(),
    vueJsx(),
    unoCSS(),
    buildPlugin({
      fileBuild: {
        emitDeclaration: true,
        // esOutputDir: false
      },
      libBuild: {
        buildOptions: {
          rollupOptions: {
            external: ['vue'],
            output: { globals: { vue: 'Vue' } },
          },
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'Joyboo',
            fileName: format => `Joyboo.${format}.js`,
            formats: ['umd', 'es'],
          },
        },
      },
    }),
  ],
  resolve: {
    alias: {
      'dux-vue-admin': resolve('src'),
    },
  },

})
