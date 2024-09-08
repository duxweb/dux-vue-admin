import type { SelectProps } from 'naive-ui'
import { NAvatar, NSelect, NTag } from 'naive-ui'
import type { VNodeChild } from 'vue'
import { defineComponent, ref, watch } from 'vue'
import { useSelect } from './useSelect'

export interface DuxSelectAsyncProps extends SelectProps {
  url?: string
  params?: Record<string, any>
  pagination?: boolean
  imageField?: string
  descField?: string
}

export const DuxSelectAsync = defineComponent({
  name: 'DuxSelectAsync',
  props: {
    url: String,
    params: Object,
    pagination: Boolean,
    imageField: String,
    descField: String,
    multiple: Boolean,
  },
  extends: NSelect,
  setup({ value, defaultValue, url, params, pagination, imageField = 'image', descField = 'desc', valueField = 'value', labelField = 'label', multiple, ...props }: DuxSelectAsyncProps, { emit }) {
    const select = ref(defaultValue)

    watch(() => value, (newValue) => {
      if (newValue !== undefined) {
        select.value = newValue
      }
    })

    const { onSearch, loading, Pagination, options } = useSelect({
      url,
      params,
      value: select,
      pagination,
      valueField,
    })

    return () => (
      <NSelect
        {...props}
        onSearch={onSearch}
        loading={loading.value}
        filterable={!!pagination}
        clearable
        remote
        options={options.value}
        valueField={valueField}
        labelField={labelField}
        value={select.value}
        multiple={multiple}
        onUpdateValue={(v) => {
          select.value = v
          emit('update:value', v)
        }}
        renderLabel={(item) => {
          if (imageField || descField) {
            return (
              <div class="flex gap-2 items-center py-2">
                {imageField && (
                  <NAvatar round src={item[imageField]} size={32} />
                )}
                <div class="flex-1 flex flex-col justify-center">
                  <div>{item[labelField]}</div>
                  {descField && <div class="text-gray-6">{item[descField]}</div>}
                </div>
              </div>
            )
          }
          else {
            return item[labelField]
          }
        }}
        renderTag={({ option, handleClose }): VNodeChild => {
          return multiple
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
                  {renderTag(labelField, imageField, descField, option)}
                </NTag>
              )
            : renderTag(labelField, imageField, descField, option)
        }}
      >
        {{
          action: Pagination,
        }}
      </NSelect>
    )
  },
})

function renderTag(labelField: string, imageField: string, descField: string, option: Record<string, any>) {
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
