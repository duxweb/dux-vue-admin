import { defineComponent } from 'vue'

export const DuxModalPage = defineComponent({
  name: 'DuxModalPage',
  props: {
  },
  setup(_props, { slots }) {
    return () => (
      <div class="flex flex-col flex-1 h-1">
        <div class="flex-1 overflow-auto">
          {slots.default?.()}
        </div>
        {slots.action && (
          <dux-window-footer>
            {slots.action?.()}
          </dux-window-footer>
        )}
      </div>
    )
  },
})
