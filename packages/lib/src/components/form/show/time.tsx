import { NTime, NTimePicker } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowTime = defineComponent({
  name: 'ShowTime',
  extends: NTimePicker,
  setup(props) {
    return () => (
      <div class="flex items-center ">
        {props.value
          ? (
              <NTime time={props.value} format={props.format || 'HH:mm:ss'} />
            )
          : (
              '-'
            )}
      </div>
    )
  },
})
