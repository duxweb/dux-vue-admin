import type { JsonFormItemSchema } from '../jsonForm'
import { item } from './item'

export function time({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-time-picker',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
