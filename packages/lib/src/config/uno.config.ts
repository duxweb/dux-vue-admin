import type { UserConfig } from '@unocss/core'
// uno.config.ts
import presetIcons from '@unocss/preset-icons/browser'
import presetUno from '@unocss/preset-uno'
import { presetDux } from '..'

export const config: UserConfig = {
  // ...UnoCSS options
  presets: [
    presetUno(),
    presetDux(),
    presetIcons({
      collections: {
        tabler: () => import('@iconify-json/tabler/icons.json').then(i => i.default),
      },
    }),
  ],
}