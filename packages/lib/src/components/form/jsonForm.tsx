import { defineComponent } from 'vue'
import type { PropType } from 'vue'
import JsonRender from '../render/jsonRender'
import { formToJson } from './handler'
import type { JsonFormItemSchema } from './handler'

export const DuxJsonForm = defineComponent({
  name: 'DuxJsonForm',
  props: {
    data: Object as PropType<Record<string, any>>,
    model: Object as PropType<Record<string, any>>,
    schema: Array as PropType<JsonFormItemSchema[]>,
  },
  setup(props) {
    const nodeJson = formToJson(props.schema || [])

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