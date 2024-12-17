import { NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'

export const DuxPageFormItem = defineComponent({
  name: 'DuxPageFormItem',
  props: {
    desc: String,
    required: Boolean,
  },
  extends: NFormItem,
  setup(props, { slots }) {
    return () => (
      <div class="grid grid-cols-1 lg:grid-cols-5 items-start gap-2 py-4">
        <div class="lg:col-span-1 flex flex-col gap-0">
          <div class="flex items-center gap-1">
            {props.required && (
              <span class="text-error leading-1 mt-1">
                *
              </span>
            )}
            {props.label}

          </div>
          <div class="text-gray-6">
            {props.desc}
          </div>
        </div>
        <div class="lg:col-span-4 xl:col-span-3 pt-1.5">
          <NFormItem {...props} showLabel={false} showFeedback={false}>
            {slots.default?.()}
          </NFormItem>
        </div>
      </div>
    )
  },
})
