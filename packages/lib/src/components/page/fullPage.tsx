import clsx from 'clsx'
import { defineComponent } from 'vue'
import { useTabStore } from '../../stores'

export const DuxFullPage = defineComponent({
  name: 'DuxFullPage',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    const tab = useTabStore()

    return () => (
      <div
        class={clsx([
          'flex-1 min-h-1',
          'p-2',
          tab.tabs.length > 1 ? 'pt-0' : '',
          props.class,
        ])}
      >

        {slots.default?.()}
      </div>
    )
  },
})
