import type { PropType } from 'vue'
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

    return () => (
      <div class="flex flex-col gap-4">
        {props.schema?.map((item) => {
          const value = modelData.value?.[item.name || '']
          switch (item.type) {
            case 'cascader':
              return <ShowCascader value={value} {...item.attr as any} />
            case 'cascader-async':
              return <ShowCascaderAsync value={value} {...item.attr as any} />
            case 'input':
              return <ShowInput value={value} {...item.attr as any} />
            case 'switch':
              return <ShowSwitch value={value} {...item.attr as any} />
            case 'number':
              return <ShowNumber value={value} {...item.attr as any} />
            case 'date':
              return <ShowDate value={value} {...item.attr as any} />
            case 'select':
              return <ShowSelect value={value} {...item.attr as any} />
            case 'select-async':
              return <ShowSelectAsync value={value} {...item.attr as any} />
            case 'radio':
              return <ShowRadio value={value} {...item.attr as any} />
            case 'radio-group':
              return <ShowRadio value={value} {...item.attr as any} />
            case 'checkbox':
              return <ShowCheckbox value={value} {...item.attr as any} />
            case 'checkbox-group':
              return <ShowCheckbox value={value} {...item.attr as any} />
            case 'rate':
              return <ShowRate value={value} {...item.attr as any} />
            case 'slider':
              return <ShowSlider value={value} {...item.attr as any} />
            case 'time':
              return <ShowTime value={value} {...item.attr as any} />
            case 'color':
              return <ShowColor value={value} {...item.attr as any} />
            case 'dynamic-tags':
              return <ShowDynamicTags value={value} {...item.attr as any} />
            case 'dynamic-input':
              return <ShowDynamicInput value={value} {...item.attr as any} />
            case 'editor':
              return <ShowEditor value={value} {...item.attr as any} />
            case 'region':
              return <ShowRegion value={value} {...item.attr as any} />
            case 'space':
              return <ShowSpace value={value} {...item.attr as any} />
            case 'transfer':
              return <ShowTransfer value={value} {...item.attr as any} />
            case 'transfer-async':
              return <ShowTransferAsync value={value} {...item.attr as any} />
            case 'tree-select':
              return <ShowTreeSelect value={value} {...item.attr as any} />
            case 'tree-select-async':
              return <ShowTreeSelectAsync value={value} {...item.attr as any} />
            case 'file-upload':
              return <ShowUploadFile value={value} {...item.attr as any} />
            case 'image-upload':
              return <ShowUploadImage value={value} {...item.attr as any} />
            case 'auto-complete':
              return <ShowAutoComplete value={value} {...item.attr as any} />
            case 'mention':
              return <ShowMention value={value} {...item.attr as any} />
            case 'mention-async':
              return <ShowMentionAsync value={value} {...item.attr as any} />
            default:
              return (
                <div class="flex items-center text-gray-7">
                  {value || '-'}
                </div>
              )
          }
        })}
      </div>
    )
  },
})
