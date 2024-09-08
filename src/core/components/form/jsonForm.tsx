import type { PropType, Ref } from 'vue'
import { defineComponent } from 'vue'
import JsonRender from '../render/jsonRender'
import type { JsonFormItemSchema } from './handler'
import { formToJson } from './handler'

export const DuxJsonForm = defineComponent({
  name: 'DuxJsonForm',
  props: {
    data: Object as PropType<Record<string, any>>,
    model: Object as PropType<Ref<Record<string, any>>>,
    schema: Array as PropType<JsonFormItemSchema[]>,
  },
  setup({ schema, model, data }) {
    const nodeJson = formToJson(schema || [])
    data = data || {}
    return () => (
      <>
        <JsonRender
          debug={false}
          nodes={nodeJson}
          data={{
            ...(data as object),
            model,
          }}
        />
      </>
    )
  },
})
