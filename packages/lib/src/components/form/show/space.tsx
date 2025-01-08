import { NSpace } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowSpace = defineComponent({
  name: 'ShowSpace',
  extends: NSpace,
  setup(_props, { slots }) {
    return () => (
      <div class="flex items-center">
        <NSpace>
          {slots.default?.() || <div class="text-gray-7">-</div>}
        </NSpace>
      </div>
    )
  },
})
