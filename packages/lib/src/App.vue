<script setup lang="ts">
import { OverlaysProvider } from '@overlastic/vue'
import { dateZhCN, NConfigProvider, NDialogProvider, NMessageProvider, NModalProvider, NNotificationProvider, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import Start from './pages/start.vue'
import { useThemeStore } from './stores'

const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
</script>

<template>
  <NConfigProvider
    :theme="theme" :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN"
    preflight-style-disabled
  >
    <n-loading-bar-provider>
      <NNotificationProvider>
        <NDialogProvider>
          <NModalProvider>
            <NMessageProvider>
              <OverlaysProvider>
                <Start />
              </OverlaysProvider>
            </NMessageProvider>
          </NModalProvider>
        </NDialogProvider>
      </NNotificationProvider>
    </n-loading-bar-provider>
  </NConfigProvider>
</template>
