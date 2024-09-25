import clsx from 'clsx'
import { defineComponent } from 'vue'
import { useTabStore } from '../../stores'

export const DuxPageFull = defineComponent({
  name: 'DuxPageFull',
  setup(_props, { slots }) {
    const tab = useTabStore()

    return () => (
      <div class={clsx([
        'flex-1 h-1',
        'p-2',
        tab.tabs.length > 1 ? 'pt-0' : '',
      ])}
      >

        {slots.default?.()}
      </div>
    )
  },
})
