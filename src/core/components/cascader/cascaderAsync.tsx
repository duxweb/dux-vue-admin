import type { CascaderProps } from 'naive-ui'
import { NCascader } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { useCascader } from './useCascader'

export interface DuxCascaderAsyncProps extends CascaderProps {
  url?: string
  params?: Record<string, any>
}

export const DuxCascaderAsync = defineComponent({
  name: 'DuxCascaderAsync',
  props: {
    url: String,
    params: Object,
  },
  extends: NCascader,
  setup({ url, defaultValue, value, params = {}, ...props }: DuxCascaderAsyncProps, { emit }) {
    const useParams = ref({})
    const useUrl = ref<string>(url)

    watch(() => useUrl, (val) => {
      useUrl.value = val.value
    })

    watch(() => useParams, (val) => {
      params.value = val.value
    })

    const select = ref(defaultValue)

    watch(() => value, (newValue) => {
      if (newValue !== undefined) {
        select.value = newValue
      }
    })

    const { options } = useCascader({
      url: useUrl,
      params: useParams,
    })

    return () => (
      <NCascader
        {...props}
        options={options.value?.data || []}
        onUpdateValue={(v) => {
          select.value = v
          emit('update:value', v)
        }}
        value={select.value}
      >
      </NCascader>
    )
  },
})
