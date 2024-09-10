import type { CheckboxProps, RadioGroupProps } from 'naive-ui'
import { item } from './item'
import type { JsonFormItemSchema } from '../handler'

export interface RadioGroupAdaptor extends RadioGroupProps {
  options?: CheckboxProps[]
}

export function radioGroup({ label, name, itemAttr, attr }: JsonFormItemSchema) {
  const { options, ...groupAttr } = attr as RadioGroupAdaptor
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-radio-group',
      attr: {
        'v-model:value': `model.${name}`,
        ...groupAttr,
      },
      child: {
        tag: 'div',
        class: 'flex flex-warp gap-2',
        child: options?.map((item) => {
          return {
            tag: 'n-radio',
            attr: item,
          }
        }),
      },
    },
  })
}
