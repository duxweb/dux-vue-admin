import type { JsonFormItemSchema } from '../jsonForm'
import { item } from './item'

export function number({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-input-number',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
