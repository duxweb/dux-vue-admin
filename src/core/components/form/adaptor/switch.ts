import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function switchAdaptor({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-switch',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
