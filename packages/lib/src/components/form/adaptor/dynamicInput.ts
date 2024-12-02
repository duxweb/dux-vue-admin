import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function dynamicInput({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-dynamic-input',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
