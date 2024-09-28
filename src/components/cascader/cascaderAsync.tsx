import { useVModel } from '@vueuse/core'
import { NCascader } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import type { CascaderProps } from 'naive-ui'
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
  setup(props: DuxCascaderAsyncProps, { emit }) {
    const useParams = ref({})
    const useUrl = ref(props.url)

    watch(() => useUrl, (val) => {
      useUrl.value = val.value
    })

    watch(() => props.params, (val) => {
      useParams.value = val || {}
    })

    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const { options } = useCascader({
      url: useUrl,
      params: useParams,
    })

    return () => (
      <NCascader
        {...props}
        options={options.value?.data || []}
        v-model:value={model.value}
      >
      </NCascader>
    )
  },
})
