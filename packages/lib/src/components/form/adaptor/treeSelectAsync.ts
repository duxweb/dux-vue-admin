import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function treeSelectAsync({ label, name, modelName, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'dux-tree-select-async',
      attr: {
        'v-model:value': `${modelName}.${name}`,
        ...attr,
      },
    },
  })
}
