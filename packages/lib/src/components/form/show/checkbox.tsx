import type { CheckboxProps } from 'naive-ui'
import type { PropType } from 'vue'
import { NCheckboxGroup, NSpace, NTag } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export const ShowCheckbox = defineComponent({
  name: 'ShowCheckbox',
  extends: NCheckboxGroup,
  props: {
    options: {
      type: Array as PropType<CheckboxProps[]>,
      default: () => [],
    },
  },
  setup(props) {
    const labels = computed(() => {
      if (!props.value?.length)
        return ['-']
      return props.value.map((val) => {
        const option = props.options?.find(item => item.value === val)
        return option?.label || val
      })
    })

    return () => (
      <div class="flex items-center">
        <NSpace>
          {labels.value.map((label, index) => (
            <NTag key={index} type="info">{label}</NTag>
          ))}
        </NSpace>
      </div>
    )
  },
})
