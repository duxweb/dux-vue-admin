import type { HSLA } from '@ctrl/tinycolor'
import { TinyColor } from '@ctrl/tinycolor'
import { type BasicColorSchema, useColorMode, useCycleList } from '@vueuse/core'
import { registerTheme } from 'echarts'
import { darkTheme } from 'naive-ui'
import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { useResource } from '../hooks/useResource'
import { getTheme } from '../theme/echart'
import { getGenerateColors, getThemeOverrides } from '../theme/helper'

export type ThemeLayout = 'app' | 'collapse' | 'separate' | 'menu'

export const useThemeStore = defineStore('theme', () => {
  const defaultMode = ref<BasicColorSchema>('auto')
  const modeList = ref<BasicColorSchema[]>(['dark', 'light', 'auto'])
  const echartColors = ref<Array<string>>([])
  const color = ref<string>('#2ba471')

  const colorList = [
    '#2ba471',
    '#0052d9',
    '#d4380d',
    '#13c2c2',
    '#722ed1',
    '#fa8c16',
    '#eb2f96',
  ]

  function toggleColor(v: string) {
    color.value = v
  }

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

  const themeConfig = computed(() => {
    return {
      primary: color.value,
      info: '#2080f0',
      success: '#18a058',
      warning: '#f0a020',
      error: '#d03050',
      gray: '#bfbfbf',
    }
  })

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

  function generateRainbowFromColor(hsl: HSLA, numColors) {
    const baseHue = (Number(hsl.h) % 360 + 360) % 360
    const colors: string[] = []
    const hueStep = 360 / numColors
    for (let i = 0; i < numColors; i++) {
      const hue = Math.round((baseHue + i * hueStep) % 360)
      colors.push(`hsl(${hue}, ${Math.round(Number(hsl.s) * 100)}%, ${45}%)`)
    }
    return colors
  }

  watch([color, darkMode], () => {
    const hue = new TinyColor(color.value).toHsl()
    const rainbowColors = generateRainbowFromColor(hue, 10)
    echartColors.value = rainbowColors
    registerTheme('default', getTheme(rainbowColors, darkMode.value))
  }, { immediate: true })

  const resource = useResource()

  const layout = ref<ThemeLayout>(resource.manageConfig?.value?.layout as ThemeLayout || resource.manageConfig?.value?.defaultLayout as ThemeLayout || 'app')

  const toggleLayout = (value: ThemeLayout) => {
    layout.value = value
  }

  return {
    color,
    colorList,
    toggleColor,
    echartColors,
    darkMode,
    themeConfig,
    theme,
    themeOverrides,
    themeColors,
    modeState: state,
    toggleDarkMode,
    layout,
    toggleLayout,
  }
}, {
  persist: {
    pick: ['color', 'layout'],
  },
})
