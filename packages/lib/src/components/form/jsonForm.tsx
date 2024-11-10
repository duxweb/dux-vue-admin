import type { PropType } from 'vue'
import type { FormLayoutType, JsonFormItemSchema } from './handler'
import { computed, defineComponent } from 'vue'
import JsonRender from '../render/jsonRender'
import { formToJson } from './handler'

export const DuxJsonForm = defineComponent({
  name: 'DuxJsonForm',
  props: {
    data: Object as PropType<Record<string, any>>,
    model: Object as PropType<Record<string, any>>,
    schema: Array as PropType<JsonFormItemSchema[]>,
    layout: {
      type: String as PropType<FormLayoutType>,
      default: 'form',
    },
  },
  setup(props) {
    const nodeJson = computed(() => formToJson(props.schema || [], props.layout))

    return () => (
      <JsonRender
        debug={false}
        nodes={nodeJson.value}
        data={{
          ...props.data,
          model: props.model,
        }}
      />
    )
  },
})
