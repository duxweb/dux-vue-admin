import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { NCascader } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { useCascader } from './useCascader'

export const DuxCascaderAsync = defineComponent({
  name: 'DuxCascaderAsync',
  props: {
    url: String,
    params: Object as PropType<Record<string, any>>,
  },
  extends: NCascader,
  setup(props, { emit }) {
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
