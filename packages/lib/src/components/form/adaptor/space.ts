import type { GridProps } from 'naive-ui'
import type { JsonFormItemSchema } from '../handler'

export function space({ child, attr }: JsonFormItemSchema) {
  attr = attr as GridProps
  return {
    tag: 'n-space',
    attr: {
      ...attr,
    },
    child,
  }
}
