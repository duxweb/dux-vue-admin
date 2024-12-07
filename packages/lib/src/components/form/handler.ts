import type { AutoCompleteProps, CascaderProps, CheckboxProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, FormItemProps, InputNumberProps, InputProps, MentionProps, RadioProps, RateProps, SelectProps, SliderProps, SpaceProps, SwitchProps, TimeProps, TransferProps, TreeSelectProps } from 'naive-ui'

import type { DuxAiEditor, DuxCascaderAsync, DuxFileUpload, DuxImageUpload, DuxMentionAsync, DuxRegion, DuxSelectAsync, DuxTransferAsync, DuxTreeSelectAsync } from '../'
import type { JSONSchema } from '../render/jsonRender'
import type { CheckboxGroupAdaptor, GridProps } from './adaptor'
import type { RadioGroupAdaptor } from './adaptor/radioGroup'
import { autoComplete, cascader, cascaderAsync, checkbox, checkboxGroup, color, date, dynamicInput, dynamicTags, editor, grid, input, mention, mentionAsync, number, radio, radioGroup, rate, region, select, selectAsync, slider, space, switchAdaptor, time, transfer, transferAsync, treeSelect, treeSelectAsync, uploadFile, uploadImage } from './adaptor'

export interface JsonFormToAttrMap {
  'editor': typeof DuxAiEditor
  'auto-complete': AutoCompleteProps
  'cascader': CascaderProps
  'cascader-async': InstanceType<typeof DuxCascaderAsync>['$props']
  'checkbox': CheckboxProps
  'checkbox-group': CheckboxGroupAdaptor
  'color': ColorPickerProps
  'date': DatePickerProps
  'dynamic-input': DynamicInputProps
  'dynamic-tags': DynamicTagsProps
  'grid': GridProps
  'input': InputProps
  'mention': MentionProps
  'mention-async': typeof DuxMentionAsync
  'number': InputNumberProps
  'radio': RadioProps
  'radio-group': RadioGroupAdaptor
  'rate': RateProps
  'select': SelectProps
  'select-async': InstanceType<typeof DuxSelectAsync>['$props']
  'slider': SliderProps
  'space': SpaceProps
  'switch': SwitchProps
  'time': TimeProps
  'transfer': TransferProps
  'tree-select': TreeSelectProps
  'file-upload': InstanceType<typeof DuxFileUpload>['$props']
  'image-upload': InstanceType<typeof DuxImageUpload>['$props']
  'region': InstanceType<typeof DuxRegion>['$props']
  'tree-select-async': InstanceType<typeof DuxTreeSelectAsync>['$props']
  'transfer-async': InstanceType<typeof DuxTransferAsync>['$props']
}

export type JsonFormItemAdaptor<T extends keyof JsonFormToAttrMap> = JsonFormToAttrMap[T] | Record<string, any>

export type JsonFormType = 'editor' | 'auto-complete' | 'cascader' | 'checkbox' | 'checkbox-group' | 'color' | 'date' | 'dynamic-input' |
  'dynamic-tags' | 'grid' | 'input' | 'mention' | 'number' | 'radio' | 'radio-group' | 'rate' | 'select' | 'slider' | 'space' | 'switch' | 'time' | 'transfer' | 'tree-select' |
  'file-upload' | 'image-upload' | 'cascader-async' | 'select-async' | 'region' | 'tree-select-async' | 'transfer-async' | 'mention-async'

export type FormLayoutType = 'page' | 'form'

export interface JsonFormItemProps extends FormItemProps {
  layout?: FormLayoutType
  desc?: string
  class?: string
}

export interface JsonFormItemSchema {
  type: JsonFormType
  label?: string
  name?: string
  modelName?: string
  attr?: JsonFormItemAdaptor<this['type']>
  itemAttr?: JsonFormItemProps
  child?: JsonFormItemSchema | JsonFormItemSchema[]
}

export function formToJson(schema: JsonFormItemSchema[], layout: FormLayoutType = 'form', modelName: string = 'model'): JSONSchema[] {
  return schema?.map((item: JsonFormItemSchema) => {
    item.itemAttr = item.itemAttr || {}
    item.itemAttr.layout = layout
    item.modelName = modelName
    let itemJson: JSONSchema = {}
    if (item.type === 'editor') {
      itemJson = editor(item)
    }
    if (item.type === 'auto-complete') {
      itemJson = autoComplete(item)
    }
    if (item.type === 'cascader') {
      itemJson = cascader(item)
    }
    if (item.type === 'checkbox') {
      itemJson = checkbox(item)
    }
    if (item.type === 'checkbox-group') {
      itemJson = checkboxGroup(item)
    }
    if (item.type === 'color') {
      itemJson = color(item)
    }
    if (item.type === 'date') {
      itemJson = date(item)
    }
    if (item.type === 'dynamic-input') {
      itemJson = dynamicInput(item)
    }
    if (item.type === 'dynamic-tags') {
      itemJson = dynamicTags(item)
    }
    if (item.type === 'grid') {
      itemJson = grid(item)
    }
    if (item.type === 'input') {
      itemJson = input(item)
    }
    if (item.type === 'mention') {
      itemJson = mention(item)
    }
    if (item.type === 'number') {
      itemJson = number(item)
    }
    if (item.type === 'radio') {
      itemJson = radio(item)
    }
    if (item.type === 'radio-group') {
      itemJson = radioGroup(item)
    }
    if (item.type === 'rate') {
      itemJson = rate(item)
    }
    if (item.type === 'select') {
      itemJson = select(item)
    }
    if (item.type === 'slider') {
      itemJson = slider(item)
    }
    if (item.type === 'space') {
      itemJson = space(item) as JSONSchema
    }
    if (item.type === 'switch') {
      itemJson = switchAdaptor(item)
    }
    if (item.type === 'time') {
      itemJson = time(item)
    }
    if (item.type === 'transfer') {
      itemJson = transfer(item)
    }
    if (item.type === 'tree-select') {
      itemJson = treeSelect(item)
    }
    if (item.type === 'tree-select-async') {
      itemJson = treeSelectAsync(item)
    }
    if (item.type === 'image-upload') {
      itemJson = uploadImage(item)
    }
    if (item.type === 'file-upload') {
      itemJson = uploadFile(item)
    }
    if (item.type === 'cascader-async') {
      itemJson = cascaderAsync(item)
    }
    if (item.type === 'select-async') {
      itemJson = selectAsync(item)
    }
    if (item.type === 'transfer-async') {
      itemJson = transferAsync(item)
    }
    if (item.type === 'mention-async') {
      itemJson = mentionAsync(item)
    }
    if (item.type === 'region') {
      itemJson = region(item)
    }
    if (item.child && !itemJson.child) {
      const child = Array.isArray(item.child) ? item.child : [item.child]
      itemJson.child = formToJson(child)
    }
    return itemJson
  })?.filter(v => v) || []
}
