import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function uploadImage({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'dux-image-upload',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}
