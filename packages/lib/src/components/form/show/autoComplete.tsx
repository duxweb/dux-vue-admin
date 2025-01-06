import { NAutoComplete, NText } from 'naive-ui'
import { defineComponent } from 'vue'

export const ShowAutoComplete = defineComponent({
  name: 'ShowAutoComplete',
  extends: NAutoComplete,
  setup(props) {
    return () => (
      <div class="flex items-center">
        <NText>{props.value || '-'}</NText>
      </div>
    )
  },
})
