import { NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'

export const DuxPageFormItem = defineComponent({
  name: 'DuxPageFormItem',
  props: {
    desc: String,
  },
  extends: NFormItem,
  setup(props, { slots }) {
    return () => (
      <div class="grid grid-cols-1 lg:grid-cols-5 items-start gap-2 pt-4">
        <div class="lg:col-span-1 flex flex-col gap-0">
          <div>{props.label}</div>
          <div class="text-gray-6">
            {props.desc}
          </div>
        </div>
        <div class="lg:col-span-4 xl:col-span-3 lg:pt-2">
          <NFormItem {...props} showLabel={false}>
            {slots.default?.()}
          </NFormItem>
        </div>
      </div>
    )
  },
})
