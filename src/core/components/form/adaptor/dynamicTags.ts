import type { JsonFormItemSchema } from '../jsonForm'
import { item } from './item'

export function dynamicTags({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-dynamic-tags',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
