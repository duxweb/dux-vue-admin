import type { JsonFormItemSchema } from '../handler'

export interface GridProps {
  cols?: number
}

export function grid({ attr }: JsonFormItemSchema) {
  attr = attr as GridProps
  return {
    tag: 'div',
    attr: {
      class: `grid md:grid-cols-${attr?.cols || 2} grid-cols-1 md:gap-4`,
      ...attr,
    },
  }
}
