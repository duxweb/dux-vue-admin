import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

export function treeSelect({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-tree-select',
      attr: {
        'v-model:value': `model.${name}`,
        ...attr,
      },
    },
  })
}