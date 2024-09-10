import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

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
