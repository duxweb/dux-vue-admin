import { toArray } from '@unocss/core'
import type { Preset } from '@unocss/core'
import { themeColor } from './theme/color'
import { genCss, generateColorCombinations } from './theme/helper'

/** 主题配置 */
export function presetDux(): Preset<object> {
  return {
    name: 'dux',
    preflights: [
      {
        getCSS: () => {
          const returnCss: string[] = []
          // 明亮主题
          const lightRoots = toArray([`*,::before,::after`, `::backdrop`])
          returnCss.push(lightRoots.map(root => `${root}{${genCss(themeColor, false)}}`).join(''))
          // 暗黑主题
          const darkRoots = toArray([
            `html.dark,html.dark *,html.dark ::before,html.dark ::after`,
            `html.dark ::backdrop`,
          ])
          returnCss.push(darkRoots.map(root => `${root}{${genCss(themeColor, true)}}`).join(''))

          return returnCss.join('')
        },
      },
    ],
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
