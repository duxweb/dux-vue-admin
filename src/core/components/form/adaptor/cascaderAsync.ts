import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function cascaderAsync({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'dux-cascader-async',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
