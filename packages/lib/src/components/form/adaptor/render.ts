import type { JSONSchema } from '../../render/jsonRender'
import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export function render({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      ...attr,
    } as JSONSchema,
  })
}
