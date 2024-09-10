<script setup lang="ts">
import { OverlaysProvider } from '@overlastic/vue'
import { dateZhCN, NConfigProvider, NDialogProvider, NMessageProvider, NModalProvider, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { type PropType, provide } from 'vue'
import { router, useThemeStore } from './index'
import DuxMain from './pages/main.vue'
import type { Config } from './index'

const props = defineProps({
  config: {
    // 配置参数
    type: Object as PropType<Config>,
  },
})

// 主题处理
const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)

// 透传全局配置
provide('duxConfig', props.config)

const firstKey = Object.getOwnPropertyNames(props.config?.manage)[0]

router.beforeEach((to, from, next) => {
  if (to.path === '/' || !to.path) {
    console.log('跳转到管理主页')
    next({ path: `/${firstKey}/index` })
  }
  else {
    console.log('继续跳转')
    next()
  }
})
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN" preflight-style-disabled>
    <NDialogProvider>
      <NModalProvider>
        <NMessageProvider>
          <OverlaysProvider>
            <n-loading-bar-provider>
              <DuxMain />
            </n-loading-bar-provider>
          </OverlaysProvider>
        </NMessageProvider>
      </NModalProvider>
    </NDialogProvider>
  </NConfigProvider>
</template>

<style>

</style>
