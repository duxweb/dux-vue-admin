import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function checkbox({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-checkbox',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
