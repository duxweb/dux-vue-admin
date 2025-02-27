import { NInputNumber } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowNumber = defineComponent({
  name: 'ShowNumber',
  extends: NInputNumber,
  setup(props) {
    const formatNumber = (num: number) => {
      return num.toFixed(props.precision)
    }

    return () => (
      <div class="flex items-center">
        {props.value ? formatNumber(props.value) : '-'}
      </div>
    )
  },
})
