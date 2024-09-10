import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

export function autoComplete({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-auto-complete',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
