import { defineComponent } from 'vue'

export const DuxModalPage = defineComponent({
  name: 'DuxModalPage',
  props: {
  },
  setup(_props, { slots }) {
    return () => (
      <div>
        {slots.default?.()}
        <dux-window-footer>
          {slots.action?.()}
        </dux-window-footer>
      </div>
    )
  },
})
