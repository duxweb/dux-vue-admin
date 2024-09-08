import type { Ref } from 'vue'
import { defineComponent } from 'vue'
import JsonRender from '../render/jsonRender'
import { formToJson } from './handler'
import type { JsonFormItemSchema } from './handler'

export const DuxJsonForm = defineComponent({
  name: 'DuxJsonForm',
  props: {
    data: Object,
    model: Object,
    schema: Object,
  },
  setup({ schema, model, data }: { schema: JsonFormItemSchema[], model: Ref<Record<string, any>>, data?: Record<string, any> | undefined }) {
    const nodeJson = formToJson(schema)
    return () => (
      <>
        <JsonRender
          debug={false}
          nodes={nodeJson}
          data={{
            ...data,
            model,
          }}
        />
      </>
    )
  },
})
