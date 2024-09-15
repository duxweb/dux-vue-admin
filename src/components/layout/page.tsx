import { defineComponent } from 'vue'

export const DuxPage = defineComponent({
  name: 'DuxPage',
  setup(_props, { slots }) {
    return () => (
      <div
        v-cloak
        un-cloak
      >
        {slots.default?.()}
      </div>
    )
  },
})
