import { type BasicColorSchema, useColorMode, useCycleList } from '@vueuse/core'
import { darkTheme } from 'naive-ui'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { themeColor } from '../theme/color'
import { getGenerateColors, getThemeOverrides } from '../theme/helper'

export const useThemeStore = defineStore('theme', () => {
  const defaultMode = ref<BasicColorSchema>('auto')
  const modeList = ref<BasicColorSchema[]>(['dark', 'light', 'auto'])

  const colorMode = useColorMode({
    initialValue: defaultMode.value,
  })

  const { state, next } = useCycleList(modeList, {
    initialValue: colorMode,
  })
  watch(
    state,
    () => {
      if (!modeList.value.includes(state.value)) {
        state.value = defaultMode.value
      }
      colorMode.value = state.value as BasicColorSchema
    },
    { immediate: true },
  )

  const darkMode = computed(() => {
    const { system, store } = colorMode
    if (state.value === 'auto') {
      return system.value === 'dark'
    }
    return store.value === 'dark'
  })

  const themeConfig = ref<Record<string, any>>(themeColor)

  const theme = computed(() => (darkMode.value ? darkTheme : null))

  const themeOverrides = computed(() => {
    return getThemeOverrides(themeConfig.value, darkMode.value)
  })

  const themeColors = computed(() => {
    const entries = Object.entries(themeConfig.value) as [
      string,
      string,
    ][]
    const colors = {} as Record<string, string[]>
    entries.forEach(([key, value]) => {
      colors[key] = getGenerateColors(value, darkMode.value)
    })
    return colors
  })

  function toggleDarkMode() {
    next()
  }

  return {
    darkMode,
    themeConfig,
    theme,
    themeOverrides,
    themeColors,
    modeState: state,
    toggleDarkMode,
  }
})
