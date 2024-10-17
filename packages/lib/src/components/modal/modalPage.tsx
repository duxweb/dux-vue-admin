import { defineComponent } from 'vue'

export const DuxModalPage = defineComponent({
  name: 'DuxModalPage',
  props: {
  },
  setup(_props, { slots }) {
    return () => (
      <>
        <div class="flex-1 overflow-auto">
          {slots.default?.()}
        </div>
        <dux-window-footer>
          {slots.action?.()}
        </dux-window-footer>
      </>
    )
  },
})
