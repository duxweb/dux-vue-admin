import type { JsonFormItemSchema } from '../jsonForm'
import { item } from './item'

export function color({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-color-picker',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
