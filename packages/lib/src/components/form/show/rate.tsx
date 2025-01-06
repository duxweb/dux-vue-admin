import { NRate } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowRate = defineComponent({
  name: 'ShowRate',
  extends: NRate,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NRate readonly value={props.value} />
      </div>
    )
  },
})
