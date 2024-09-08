import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function region({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'dux-region',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
