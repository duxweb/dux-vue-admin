import { NButton } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useThemeStore } from '../../../stores/theme'

export const Theme = defineComponent({
  name: 'Theme',
  setup() {
    const themeStore = useThemeStore()
    const { modeState } = storeToRefs(themeStore)

    return () => (
      <NButton quaternary circle onClick={themeStore.toggleDarkMode}>
        {modeState.value === 'auto' && <div class="i-tabler:brightness-half h-5 w-5" />}
        {modeState.value === 'light' && <div class="i-tabler:sun h-5 w-5" />}
        {modeState.value === 'dark' && <div class="h-5 w-5 i-tabler:moon" />}
      </NButton>
    )
  },
})
