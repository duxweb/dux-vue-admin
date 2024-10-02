import type { FormItemProps } from 'naive-ui'
import type { JSONSchema } from '../../render/jsonRender'

interface layoutProps {
  label?: string
  name?: string
  attr?: FormItemProps
  child?: JSONSchema | JSONSchema[]
}

export function item({ label, name, attr, child }: layoutProps) {
  return {
    tag: 'n-form-item',
    attr: {
      label,
      path: name,
      ...attr,
    },
    child,
  }
}
