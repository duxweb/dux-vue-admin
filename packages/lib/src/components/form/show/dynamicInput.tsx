import { NDynamicInput, NSpace, NTag } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowDynamicInput = defineComponent({
  name: 'ShowDynamicInput',
  extends: NDynamicInput,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NSpace>
          {props.value?.length
            ? (
                props.value.map((item, index) => (
                  <NTag key={index} type="info">{item}</NTag>
                ))
              )
            : (
                <div class="text-gray-7">-</div>
              )}
        </NSpace>
      </div>
    )
  },
})
