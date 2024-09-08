import { defineComponent } from 'vue'
import { DuxException } from './exception'

export const DuxPage = defineComponent({
  name: 'DuxPage',
  setup(_props, { slots }) {
    return () => (
      <DuxException>
        {slots.default?.()}
      </DuxException>
    )
  },
})
