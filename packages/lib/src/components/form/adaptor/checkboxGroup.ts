import type { CheckboxGroupProps, CheckboxProps } from 'naive-ui'
import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export interface CheckboxGroupAdaptor extends CheckboxGroupProps {
  options?: CheckboxProps[]
}

export function checkboxGroup({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  const { options, ...groupAttr } = attr as CheckboxGroupAdaptor
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-checkbox-group',
      attr: {
        'v-model:value': `model.${name}`,
        ...groupAttr,
      },
      child: {
        tag: 'div',
        class: 'flex flex-warp gap-2',
        child: options?.map((item) => {
          return {
            tag: 'n-checkbox',
            attr: item,
          }
        }),
      },
    },
  })
}
