import type { PropType } from 'vue'
import { defineComponent } from 'vue'

export const ShowGrid = defineComponent({
  name: 'ShowGrid',
  props: {
    value: Array as PropType<any[]>,
    attrs: Object as PropType<any>,
  },
  setup(props, { slots }) {
    return () => (
      <div class={`grid md:grid-cols-${props.attrs?.cols || 2} grid-cols-1 md:gap-4`}>
        {slots.default?.()}
      </div>
    )
  },
})
