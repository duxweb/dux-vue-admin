import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

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
