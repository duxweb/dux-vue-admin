import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function editor({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'dux-ai-editor',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
