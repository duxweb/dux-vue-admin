import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function transferAsync({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'dux-transfer-async',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}