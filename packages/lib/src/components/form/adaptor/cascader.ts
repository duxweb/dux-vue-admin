import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function cascader({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-cascader',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
