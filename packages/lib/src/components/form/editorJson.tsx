import { NAlert } from 'naive-ui'
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
        <div class="mb-2">
          <NAlert type="info">表单 Json 可直接调用 Json 表单组件使用</NAlert>
        </div>
        <DuxCodeEditor value={JSON.stringify(props.value, null, 2)} readonly />
      </div>
    )
  },
})
