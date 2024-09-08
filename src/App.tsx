import type { PropType } from 'vue'
import { defineComponent, provide } from 'vue'
import { NConfigProvider, NDialogProvider, NMessageProvider, NModalProvider, dateZhCN, zhCN } from 'naive-ui'
import { OverlaysProvider } from '@overlastic/vue'
import { storeToRefs } from 'pinia'
import type { Config } from './core/config/type'
import { DuxMain, useThemeStore } from './core'

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
