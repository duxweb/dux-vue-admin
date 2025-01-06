import { NDatePicker } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowDate = defineComponent({
  name: 'ShowDate',
  extends: NDatePicker,
  setup(props) {
    return () => (
      <div class="flex items-center text-gray-7">
        {props.value || '-'}
      </div>
    )
  },
})
