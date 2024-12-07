import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function dynamicTags({ label, modelName, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-dynamic-tags',
      attr: {
        'v-model:value': `${modelName}.${name}`,
        ...attr,
      },
    },
  })
}
