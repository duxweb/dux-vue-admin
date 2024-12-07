import { formToJson, type JsonFormItemSchema } from '../handler'
import { item } from './item'

export function dynamicInput({ label, name, itemAttr, attr, child, modelName }: JsonFormItemSchema) {
  const childJson = formToJson(child as JsonFormItemSchema[] || [], itemAttr?.layout, 'value')

  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-dynamic-input',
      attr: {
        'v-model:value': `${modelName}.${name}`,
        ...attr,
        'v-bind:on-create': '() => ({})',
      },
      child: [
        {
          tag: 'div',
          attr: {
            'class': 'flex gap-2',
            'v-slot:default': '{value}',
          },
          child: childJson,
        },
      ],
    },
  })
}
