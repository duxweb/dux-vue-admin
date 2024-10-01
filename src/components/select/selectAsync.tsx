import { useVModel } from '@vueuse/core'
import { NAvatar, NSelect, NTag } from 'naive-ui'
import { defineComponent } from 'vue'
import type { PropType, VNodeChild } from 'vue'
import { useSelect } from './useSelect'

export const DuxSelectAsync = defineComponent({
  name: 'DuxSelectAsync',
  props: {
    url: String,
    params: Object as PropType<Record<string, any>>,
    pagination: {
      type: Boolean,
      default: true,
    },
    imageField: {
      type: String,
    },
    descField: {
      type: String,
      default: 'desc',
    },
    multiple: Boolean,
  },
  extends: NSelect,
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const { onSearch, loading, Pagination, options } = useSelect({
      url: props.url,
      params: props.params,
      value: model.value,
      pagination: props.pagination,
      valueField: props.valueField,
    })

    return () => (
      <NSelect
        {...props}
        onSearch={onSearch}
        loading={loading.value}
        filterable={!!props.pagination}
        clearable
        remote
        options={options.value}
        valueField={props.valueField}
        labelField={props.labelField}
        v-model:value={model.value}
        multiple={props.multiple}
        renderLabel={(item) => {
          if (props.imageField || props.descField) {
            return (
              <div class="flex gap-2 items-center py-2">
                {props.imageField && (
                  <NAvatar round src={item[props.imageField]} size={32} />
                )}
                <div class="flex-1 flex flex-col justify-center">
                  <div>{item[props.labelField]}</div>
                  {props.descField && <div class="text-gray-6">{item[props.descField]}</div>}
                </div>
              </div>
            )
          }
          else {
            return item[props.labelField]
          }
        }}
        renderTag={({ option, handleClose }): VNodeChild => {
          return props.multiple
            ? (
                <NTag
                  closable
                  round
                  style={{
                    padding: '0 6px 0 4px',
                  }}
                  onClose={() => {
                    handleClose()
                  }}
                >
                  {renderTag(option, props.labelField, props?.imageField, props.descField)}
                </NTag>
              )
            : renderTag(option, props.labelField, props?.imageField, props.descField)
        }}
      >
        {{
          action: Pagination,
        }}
      </NSelect>
    )
  },
})

function renderTag(option: Record<string, any>, labelField: string, imageField?: string, descField?: string) {
  return (imageField || descField)
    ? (
        <div class="flex gap-2 items-center py-2">
          {imageField && (
            <NAvatar round src={option[imageField] as string || ''} size={22} />
          )}
          <div class="flex-1 flex flex-col justify-center">
            {option[labelField]}
          </div>
        </div>
      )
    : <div>{option[labelField]}</div>
}
