import type { JsonFormItemSchema } from '../jsonForm'
import { item } from './item'

export function date({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-date-picker',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
