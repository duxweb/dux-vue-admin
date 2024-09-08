import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

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
