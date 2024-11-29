import type { UserConfig } from '@unocss/core'
import type { Theme } from '@unocss/preset-uno'
// uno.config.ts
import presetIcons from '@unocss/preset-icons/browser'
import presetUno from '@unocss/preset-uno'
import { presetTypography } from 'unocss'
import { presetDux } from '..'

export const config: UserConfig<Theme> = {
  // ...UnoCSS options
  presets: [
    presetUno(),
    presetDux(),
    presetTypography(),
    presetIcons({
      collections: {
        tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default),
      },
    }),
  ],
}
