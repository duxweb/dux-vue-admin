import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

export function selectAsync({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'dux-select-async',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}