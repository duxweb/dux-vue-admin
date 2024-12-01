import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function input({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-input',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
