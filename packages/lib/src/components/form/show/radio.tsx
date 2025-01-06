import type { RadioProps } from 'naive-ui'
import type { PropType } from 'vue'
import { NRadioGroup, NTag } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export const ShowRadio = defineComponent({
  name: 'ShowRadio',
  extends: NRadioGroup,
  props: {
    options: {
      type: Array as PropType<RadioProps[]>,
      default: () => [],
    },
  },
  setup(props) {
    const label = computed(() => {
      const option = props.options?.find?.(item => item.value === props.value)
      return option?.label || '-'
    })

    return () => (
      <div class="flex items-center">
        <NTag type="info">{label.value}</NTag>
      </div>
    )
  },
})
