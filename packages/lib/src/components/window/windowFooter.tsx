import { defineComponent } from 'vue'

export const DuxWindowFooter = defineComponent({
  name: 'DuxWindowFooter',
  setup(_props, { slots }) {
    return () => (
      <div class="px-4 py-3 flex justify-end gap-2 border-t border-gray-2 dark:border-gray-3 flex-none">
        {slots?.default?.()}
      </div>
    )
  },
})
