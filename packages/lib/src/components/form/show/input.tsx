import { NInput } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowInput = defineComponent({
  name: 'ShowInput',
  extends: NInput,
  setup(props) {
    return () => (
      <div class="flex items-center">
        {props.value || '-'}
      </div>
    )
  },
})
