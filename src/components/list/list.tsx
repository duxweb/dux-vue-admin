import clsx from 'clsx'
import { defineComponent } from 'vue'

export const DuxList = defineComponent({
  name: 'DuxList',
  props: {
    class: String,
  },
  setup(props, { slots }) {
    return () => (
      <div class={clsx([
        'flex flex-col gap-4',
        props.class,
      ])}
      >
        {slots.default?.()}
      </div>

    )
  },
})
