import type { JsonFormItemSchema } from '../jsonForm'
import { item } from './item'

export function slider({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-slider',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
