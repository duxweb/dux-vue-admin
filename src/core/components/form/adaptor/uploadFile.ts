import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

export function uploadFile({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'dux-file-upload',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
