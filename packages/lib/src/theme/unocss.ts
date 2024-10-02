import type { Preset } from '@unocss/core'
import { generateColorCombinations } from './helper'

/** 主题配置 */
export function presetDux(): Preset<object> {
  return {
    name: 'dux',
    theme: {
      colors: {
        ...generateColorCombinations(),
        body: 'rgba(var(--n-body-color))',
      },
      breakpoints: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
    },
  }
}
