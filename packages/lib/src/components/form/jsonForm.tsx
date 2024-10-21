import type { PropType } from 'vue'
import type { FormLayoutType, JsonFormItemSchema } from './handler'
import { defineComponent } from 'vue'
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
    const nodeJson = formToJson(props.schema || [], props.layout)

    return () => (
      <div>
        <JsonRender
          debug={false}
          nodes={nodeJson}
          data={{
            ...props.data,
            model: props.model,
          }}
        />
      </div>
    )
  },
})
