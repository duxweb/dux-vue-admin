<script setup lang="ts">
import { OverlaysProvider } from '@overlastic/vue'
import { dateEnUS, dateZhCN, enUS, NConfigProvider, NDialogProvider, NMessageProvider, NModalProvider, NNotificationProvider, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import Start from './pages/start.vue'
import { useThemeStore } from './stores'

const themeStore = useThemeStore()
const { theme, themeOverrides } = storeToRefs(themeStore)
const { locale } = useI18n()

const naiveLocale = computed(() => locale.value === 'en-US' ? enUS : zhCN)
const naiveDateLocale = computed(() => locale.value === 'en-US' ? dateEnUS : dateZhCN)

const meta = document.createElement('meta')
meta.name = 'naive-ui-style'
document.head.appendChild(meta)
</script>

<template>
  <NConfigProvider
    :theme="theme" :theme-overrides="themeOverrides" :locale="naiveLocale" :date-locale="naiveDateLocale"
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
