import type { Ref } from 'vue'
import { defineComponent, inject } from 'vue'

export const DuxTabPageItem = defineComponent({
  name: 'DuxTabPageItem',
  props: {
    value: String,
    label: String,
  },
  setup(props, { slots }) {
    const value = inject<Ref<string>>('value')
    return () => (
      <>
        <div
          class="flex-1 h-1 overflow-auto py-4"
          style={{
            display: props.value !== value?.value ? 'none' : 'block',
          }}
        >
          {slots.default?.()}
        </div>
        {slots.footer && (
          <div
            class="flex-none flex justify-end border-t border-gray-2 p-4 gap-2"
            style={{
              display: props.value !== value?.value ? 'none' : 'flex',
            }}
          >
            {slots.footer?.()}
          </div>
        )}
      </>
    )
  },
})
