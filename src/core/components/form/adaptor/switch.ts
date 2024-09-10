import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

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
