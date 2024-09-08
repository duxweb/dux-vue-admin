// uno.config.ts
import presetUno from '@unocss/preset-uno'
import presetIcons from '@unocss/preset-icons/browser'
import type { UserConfig } from '@unocss/core'
import { defineConfig, transformerDirectives } from 'unocss'
import { presetDux } from '@/core/unocss'

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

export default defineConfig({
  ...config,
  transformers: [
    transformerDirectives(),
  ],
})
