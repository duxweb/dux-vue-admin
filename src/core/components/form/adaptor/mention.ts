import type { JsonFormItemSchema } from '../jsonForm'
import { item } from './item'

export function mention({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-mention',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
