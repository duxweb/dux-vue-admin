import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

export function rate({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-rate',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
