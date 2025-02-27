import type { PropType } from 'vue'
import type { GridProps } from './adaptor/grid'
import type { FormLayoutType, JsonFormItemSchema } from './handler'
import { useVModel } from '@vueuse/core'
import { defineComponent } from 'vue'
import {
  ShowAutoComplete,
  ShowCascader,
  ShowCascaderAsync,
  ShowCheckbox,
  ShowColor,
  ShowDate,
  ShowDynamicInput,
  ShowDynamicTags,
  ShowEditor,
  ShowGrid,
  ShowInput,
  ShowMention,
  ShowMentionAsync,
  ShowNumber,
  ShowRadio,
  ShowRate,
  ShowRegion,
  ShowSelect,
  ShowSelectAsync,
  ShowSlider,
  ShowSpace,
  ShowSwitch,
  ShowTime,
  ShowTransfer,
  ShowTransferAsync,
  ShowTreeSelect,
  ShowTreeSelectAsync,
  ShowUploadFile,
  ShowUploadImage,
} from './show'

export const DuxJsonShowForm = defineComponent({
  name: 'DuxJsonShowForm',
  props: {
    data: Object as PropType<Record<string, any>>,
    model: Object as PropType<Record<string, any>>,
    schema: Array as PropType<JsonFormItemSchema[]>,
    layout: {
      type: String as PropType<FormLayoutType>,
      default: 'form',
    },
  },
  setup(props, { emit }) {
    const modelData = useVModel(props, 'model', emit, {
      passive: true,
      defaultValue: {},
    })

    // 递归渲染表单项
    const renderFormItem = (item: JsonFormItemSchema) => {
      const value = modelData.value?.[item.name || '']

      let show: any
      switch (item.type) {
        case 'cascader':
          show = <ShowCascader value={value} {...item.attr as any} />
          break
        case 'cascader-async':
          show = <ShowCascaderAsync value={value} {...item.attr as any} />
          break
        case 'input':
          show = <ShowInput value={value} {...item.attr as any} />
          break
        case 'switch':
          show = <ShowSwitch value={value} {...item.attr as any} />
          break
        case 'number':
          show = <ShowNumber value={value} {...item.attr as any} />
          break
        case 'date':
          show = <ShowDate value={value} {...item.attr as any} />
          break
        case 'select':
          show = <ShowSelect value={value} {...item.attr as any} />
          break
        case 'select-async':
          show = <ShowSelectAsync value={value} {...item.attr as any} />
          break
        case 'radio':
          show = <ShowRadio value={value} {...item.attr as any} />
          break
        case 'radio-group':
          show = <ShowRadio value={value} {...item.attr as any} />
          break
        case 'checkbox':
          show = <ShowCheckbox value={value} {...item.attr as any} />
          break
        case 'checkbox-group':
          show = <ShowCheckbox value={value} {...item.attr as any} />
          break
        case 'rate':
          show = <ShowRate value={value} {...item.attr as any} />
          break
        case 'slider':
          show = <ShowSlider value={value} {...item.attr as any} />
          break
        case 'time':
          show = <ShowTime value={value} {...item.attr as any} />
          break
        case 'color':
          show = <ShowColor value={value} {...item.attr as any} />
          break
        case 'dynamic-tags':
          show = <ShowDynamicTags value={value} {...item.attr as any} />
          break
        case 'dynamic-input':
          show = <ShowDynamicInput value={value} {...item.attr as any} />
          break
        case 'editor':
          show = <ShowEditor value={value} {...item.attr as any} />
          break
        case 'region':
          show = <ShowRegion value={value} {...item.attr as any} />
          break
        case 'space':
          show = <ShowSpace value={value} {...item.attr as any} />
          break
        case 'transfer':
          show = <ShowTransfer value={value} {...item.attr as any} />
          break
        case 'transfer-async':
          show = <ShowTransferAsync value={value} {...item.attr as any} />
          break
        case 'tree-select':
          show = <ShowTreeSelect value={value} {...item.attr as any} />
          break
        case 'tree-select-async':
          show = <ShowTreeSelectAsync value={value} {...item.attr as any} />
          break
        case 'file-upload':
          show = <ShowUploadFile value={value} {...item.attr as any} />
          break
        case 'image-upload':
          show = <ShowUploadImage value={value} {...item.attr as any} />
          break
        case 'auto-complete':
          show = <ShowAutoComplete value={value} {...item.attr as any} />
          break
        case 'mention':
          show = <ShowMention value={value} {...item.attr as any} />
          break
        case 'mention-async':
          show = <ShowMentionAsync value={value} {...item.attr as any} />
          break
        case 'grid':
        {
          const childItems = Array.isArray(item.child) ? item.child : [item.child]
          return (
            <ShowGrid {...item.attr as GridProps}>
              {childItems.map(childItem => renderFormItem(childItem as JsonFormItemSchema))}
            </ShowGrid>
          )
          break
        }
      }

      return (
        <div class="flex gap-2 p-3 items-center" key={item.modelName}>
          <div class="w-20  text-gray-7">{item.label}</div>
          <div class="flex-1">{show}</div>
        </div>
      )
    }

    return () => (
      <div class="flex flex-col text-sm border border-gray-2 dark:border-gray-3 rounded divide-y divide-gray-2 dark:divide-gray-3">
        {props.schema?.map(item => renderFormItem(item))}
      </div>
    )
  },
})
