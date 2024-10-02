import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

export function radio({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-radio',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
