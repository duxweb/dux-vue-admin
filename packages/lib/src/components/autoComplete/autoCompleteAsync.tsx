import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { NAutoComplete } from 'naive-ui'
import { defineComponent, watch } from 'vue'
import { useSelect } from '../select'

export const DuxAutoCompleteAsync = defineComponent({
  name: 'DuxAutoCompleteAsync',
  props: {
    url: String,
    params: Object as PropType<Record<string, any>>,
    pagination: {
      type: Boolean,
      default: true,
    },
    valueField: {
      type: String,
      default: 'id',
    },
    labelField: {
      type: String,
      default: 'name',
    },
    multiple: Boolean,
  },
  extends: NAutoComplete,
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue || undefined,
    })

    const { onSearch, loading, Pagination, options } = useSelect({
      url: props.url,
      params: props.params,
      value: model.value,
      pagination: props.pagination,
      valueField: props.valueField || 'id',
    })

    watch(model, () => {
      onSearch(model.value)
    }, { immediate: true })

    return () => (
      <NAutoComplete
        {...props}
        loading={loading.value}
        clearable
        options={options.value?.map(item => ({
          label: item[props.labelField],
          value: item[props.valueField],
        }))}
        showEmpty={true}
        v-model:value={model.value}

      >
        {{
          action: Pagination,
        }}
      </NAutoComplete>
    )
  },
})
