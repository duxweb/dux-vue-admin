import { OverlaysProvider } from '@overlastic/vue'
import { dateZhCN, NConfigProvider, NDialogProvider, NMessageProvider, NModalProvider, zhCN } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { defineComponent, provide } from 'vue'
import type { PropType } from 'vue'
import { DuxMain, useThemeStore } from './index'
import type { Config } from './config'

export const DuxApp = defineComponent({
  name: 'DuxApp',
  props: {
    config: {
      type: Object as PropType<Config>,
      default: [],
    },
  },
  setup(props) {
    const themeStore = useThemeStore()
    const { theme, themeOverrides }
    = storeToRefs(themeStore)

    provide('duxConfig', props.config)

    return () => (
      <NConfigProvider theme={theme.value} themeOverrides={themeOverrides.value} locale={zhCN} dateLocale={dateZhCN}>
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
    )
  },
})
