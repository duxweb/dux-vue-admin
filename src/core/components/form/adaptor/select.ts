import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function select({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-select',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
