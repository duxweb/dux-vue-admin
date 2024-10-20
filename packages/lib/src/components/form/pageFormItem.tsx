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
      <div class="grid grid-cols-3 xl:grid-cols-4 items-start gap-4 pt-3">
        <div class="col-span-3 lg:col-span-1 flex flex-col gap-0">
          <div>{props.label}</div>
          <div class="text-gray-6">
            {props.desc}
          </div>
        </div>
        <div class="col-span-3 lg:col-span-2 lg:pt-2">
          <NFormItem {...props} showLabel={false}>
            {slots.default?.()}
          </NFormItem>
        </div>
      </div>
    )
  },
})
