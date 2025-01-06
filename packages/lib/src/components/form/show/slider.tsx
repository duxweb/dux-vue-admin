import { NSlider } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowSlider = defineComponent({
  name: 'ShowSlider',
  extends: NSlider,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NSlider disabled value={props.value} />
      </div>
    )
  },
})
