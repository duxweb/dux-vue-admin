import type { JSONSchema } from '../../render/jsonRender'
import type { JsonFormItemProps } from '../handler'

interface layoutProps {
  label?: string
  name?: string
  attr?: JsonFormItemProps
  child?: JSONSchema | JSONSchema[]
}

export function item({ label, name, attr, child }: layoutProps) {
  return {
    tag: attr?.layout === 'page' ? 'dux-page-form-item' : 'n-form-item',
    attr: {
      label,
      path: name,
      ...attr,
    },
    child,
  }
}
