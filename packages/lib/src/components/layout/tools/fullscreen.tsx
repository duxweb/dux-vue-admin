import { useFullscreen } from '@vueuse/core'
import clsx from 'clsx'
import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'

export const Fullscreen = defineComponent({
  name: 'Fullscreen',
  setup() {
    const { isFullscreen, toggle } = useFullscreen()
    return () => (
      <NButton quaternary circle>
        <div
          class={clsx([
            'h-5 w-5 ',
            !isFullscreen.value ? 'i-tabler:maximize' : 'i-tabler:minimize',
          ])}
          onClick={toggle}
        />
      </NButton>
    )
  },
})
