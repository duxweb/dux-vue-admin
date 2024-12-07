import { defineComponent } from 'vue'
import { DuxCodeEditor } from '../code'

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    return () => (
      <div class="p-4">
        <DuxCodeEditor value={JSON.stringify(props.value, null, 2)} readonly />
      </div>
    )
  },
})
