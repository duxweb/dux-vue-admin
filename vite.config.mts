import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import unoCSS from 'unocss/vite'

// vite默认会打包出umd和es模块化两种导出方式的文件，以下配置会打包出两份结果：
export default defineConfig({
  plugins: [
    vue({
      script: {
        propsDestructure: true,
      },
    }),
    dts({
      outDir: 'dist/es',
    }),
    dts({
      outDir: 'dist/lib',
    }),
    vueJsx(),
    unoCSS(),
  ],
  build: {
    target: 'modules',
    // 打包文件目录
    outDir: 'es',
    // 压缩
    minify: false,
    // css分离
    // cssCodeSplit: true,
    rollupOptions: {
      // 忽略打包vue文件
      external: ['vue'],
      input: ['index.ts'],
      output: [
        {
          format: 'es',
          // 不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'es',
          preserveModulesRoot: '',
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          // 让打包目录和我们目录对应
          preserveModules: true,
          // 配置打包根目录
          dir: 'lib',
          preserveModulesRoot: '',
        },
      ],
    },
    lib: {
      entry: './index.ts',
      formats: ['es', 'cjs'],
    },
  },
})
