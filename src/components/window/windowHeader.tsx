import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'

export const DuxWindowHeader = defineComponent({
  name: 'DuxWindowHeader',
  props: {
    title: String,
    onClose: Function,
  },
  setup(props) {
    return () => (
      <div class="flex justify-between items-center px-4 py-3 border-b border-gray-2 dark:border-gray-3">
        <div class="text-base">{props?.title}</div>
        <div>
          <NButton quaternary size="small" color="default" class="!px-1 h-6" onClick={() => props?.onClose?.()}>
            <div class="i-tabler:x w-5 h-5"></div>
          </NButton>
        </div>
      </div>
    )
  },
})
