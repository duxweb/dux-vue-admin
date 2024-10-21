import type { AutoCompleteProps, CascaderProps, CheckboxProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, FormItemProps, InputNumberProps, InputProps, MentionProps, RadioProps, RateProps, SelectProps, SliderProps, SpaceProps, SwitchProps, TimeProps, TransferProps, TreeSelectProps } from 'naive-ui'
import type { DuxCascaderAsync } from '../cascader'
import type { DuxAiEditor } from '../editor/aiEditor'
import type { DuxRegion } from '../region'

import type { JSONSchema } from '../render/jsonRender'

import type { DuxSelectAsync } from '../select'
import type { DuxFileUpload, DuxImageUpload } from '../upload'
import type { CheckboxGroupAdaptor, GridProps } from './adaptor'
import type { RadioGroupAdaptor } from './adaptor/radioGroup'
import { cascader, cascaderAsync, checkbox, checkboxGroup, color, date, dynamicInput, dynamicTags, grid, input, mention, number, radio, radioGroup, rate, region, select, selectAsync, slider, space, switchAdaptor, time, transfer, treeSelect, uploadFile, uploadImage } from './adaptor'
import { autoComplete } from './adaptor/autoComplete'
import { editor } from './adaptor/editor'

export interface JsonFormToAttrMap {
  'editor': typeof DuxAiEditor
  'auto-complete': AutoCompleteProps
  'cascader': CascaderProps
  'cascader-async': typeof DuxCascaderAsync
  'checkbox': CheckboxProps
  'checkbox-group': CheckboxGroupAdaptor
  'color': ColorPickerProps
  'date': DatePickerProps
  'dynamic-input': DynamicInputProps
  'dynamic-tags': DynamicTagsProps
  'grid': GridProps
  'input': InputProps
  'mention': MentionProps
  'number': InputNumberProps
  'radio': RadioProps
  'radio-group': RadioGroupAdaptor
  'rate': RateProps
  'select': SelectProps
  'select-async': typeof DuxSelectAsync
  'slider': SliderProps
  'space': SpaceProps
  'switch': SwitchProps
  'time': TimeProps
  'transfer': TransferProps
  'tree-select': TreeSelectProps
  'file-upload': typeof DuxFileUpload
  'image-upload': typeof DuxImageUpload
  'region': typeof DuxRegion
}

export type JsonFormItemAdaptor<T extends keyof JsonFormToAttrMap> = JsonFormToAttrMap[T] | Record<string, any>

export type JsonFormType = 'editor' | 'auto-complete' | 'cascader' | 'checkbox' | 'checkbox-group' | 'color' | 'date' | 'dynamic-input' |
  'dynamic-tags' | 'grid' | 'input' | 'mention' | 'number' | 'radio' | 'radio-group' | 'rate' | 'select' | 'slider' | 'space' | 'switch' | 'time' | 'transfer' | 'tree-select' |
  'file-upload' | 'image-upload' | 'cascader-async' | 'select-async' | 'region'

export type FormLayoutType = 'page' | 'form'

export interface JsonFormItemProps extends FormItemProps {
  layout?: FormLayoutType
  desc?: string
}

export interface JsonFormItemSchema {
  type: JsonFormType
  label?: string
  name?: string
  attr?: JsonFormItemAdaptor<this['type']>
  itemAttr?: JsonFormItemProps
  child?: JsonFormItemSchema | JsonFormItemSchema[]
}

export function formToJson(schema: JsonFormItemSchema[], layout: FormLayoutType = 'form'): JSONSchema[] {
  return schema?.map((item: JsonFormItemSchema) => {
    item.itemAttr = item.itemAttr || {}
    item.itemAttr.layout = layout
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
    if (item.type === 'region') {
      itemJson = region(item)
    }
    if (item.child) {
      const child = Array.isArray(item.child) ? item.child : [item.child]
      itemJson.child = formToJson(child)
    }
    return itemJson
  })?.filter(v => v) || []
}
