import type { PropType } from 'vue'
import { defineComponent, provide, toRef } from 'vue'

export const DuxForm = defineComponent({
  name: 'DuxForm',
  props: {
    labelWidth: {
      type: [Number, String],
      default: 100,
    },
    layout: {
      type: String as PropType<'left' | 'top' | 'config'>,
      default: 'left',
    },
    labelAlign: {
      type: String as PropType<'left' | 'center' | 'right'>,
      default: 'left',
    },
  },
  setup(props, { slots }) {
    provide('formLayout', toRef(props, 'layout'))
    provide('formLabelWidth', toRef(props, 'labelWidth'))
    provide('formLabelAlign', toRef(props, 'labelAlign'))
    return () => (
      <div class="flex flex-col gap-4">
        {slots.default?.()}
      </div>
    )
  },
})
