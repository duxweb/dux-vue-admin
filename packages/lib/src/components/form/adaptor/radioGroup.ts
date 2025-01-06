import type { RadioGroupProps, RadioProps } from 'naive-ui'
import type { JsonFormItemSchema } from '../handler'
import { item } from './item'

export interface RadioGroupAdaptor extends RadioGroupProps {
  options?: RadioProps[]
}

export function radioGroup({ label, name, modelName, itemAttr, attr }: JsonFormItemSchema) {
  const { options, ...groupAttr } = attr as RadioGroupAdaptor
  return item({
    label,
    name,
    attr: itemAttr,
    child: {
      tag: 'n-radio-group',
      attr: {
        'v-model:value': `${modelName}.${name}`,
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
