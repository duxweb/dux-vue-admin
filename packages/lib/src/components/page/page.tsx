import clsx from 'clsx'
import { NScrollbar } from 'naive-ui'
import { defineComponent } from 'vue'
import { useTabStore } from '../../stores'

export const DuxPage = defineComponent({
  name: 'DuxPage',
  setup(_props, { slots }) {
    const tab = useTabStore()

    return () => (
      <div class="flex-1 min-h-1">
        <NScrollbar contentClass={clsx([
          'p-2',
          tab.tabs.length > 1 ? 'pt-0' : '',
        ])}
        >
          {slots.default?.()}
        </NScrollbar>
      </div>
    )
  },
})
