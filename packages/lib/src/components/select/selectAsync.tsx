import type { PropType, VNodeChild } from 'vue'
import { useVModel } from '@vueuse/core'
import { NAvatar, NImage, NSelect, NTag } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import placeholder from '../../static/images/placeholder.png'
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
    avatarField: {
      type: String,
    },
    imageField: {
      type: String,
    },
    descField: {
      type: String,
    },
    multiple: Boolean,
  },
  extends: NSelect,
  setup(props, { emit }) {
    const params = computed(() => props.params || {})
    const url = computed(() => props.url || '')

    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const { onSearch, loading, Pagination, options } = useSelect({
      url,
      params,
      value: model.value,
      pagination: props.pagination,
      valueField: props.valueField || 'id',
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
        onClear={() => {
          onSearch('')
        }}
        renderLabel={(item: Record<string, any>) => {
          if (props.imageField || props.descField) {
            return (
              <div class="flex gap-2 items-center py-2">
                {props.imageField && (
                  <NImage src={item[props.imageField] || placeholder} fallbackSrc={placeholder} objectFit="cover" width={32} height={32} />
                )}
                {props.avatarField && (
                  <NAvatar
                    style={{
                      background: 'rgba(var(--n-primary-color))',
                    }}
                    round
                    src={item[props.avatarField] || placeholder}
                    size={32}
                  >
                    {item[props.labelField]?.charAt?.(0)}
                  </NAvatar>
                )}
                <div class="flex-1 flex flex-col justify-center leading-4">
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
                  {renderTag(option, props.labelField, props?.imageField, props?.avatarField, props.descField)}
                </NTag>
              )
            : renderTag(option, props.labelField, props?.imageField, props?.avatarField, props.descField)
        }}
      >
        {{
          action: Pagination,
        }}
      </NSelect>
    )
  },
})

function renderTag(option: Record<string, any>, labelField: string, imageField?: string, avatarField?: string, descField?: string) {
  return (imageField || descField || avatarField)
    ? (
        <div class="flex gap-2 items-center py-2">
          {imageField && (
            <NImage src={option[imageField] || placeholder} fallbackSrc={placeholder} objectFit="cover" width={22} height={22} />
          )}
          {avatarField && (
            <NAvatar
              style={{
                background: 'rgba(var(--n-primary-color))',
              }}
              round
              src={option[avatarField] as string || ''}
              size={22}
            >
              {option[labelField]?.charAt?.(0)}
            </NAvatar>
          )}
          <div class="flex-1 flex flex-col justify-center">
            {option[labelField]}
          </div>
        </div>
      )
    : <div>{option[labelField]}</div>
}
