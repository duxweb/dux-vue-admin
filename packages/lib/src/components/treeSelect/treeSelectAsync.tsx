import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { NTreeSelect } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { useCascader } from '../cascader'

export const DuxTreeSelectAsync = defineComponent({
  name: 'DuxTreeSelectAsync',
  props: {
    url: String,
    params: Object as PropType<Record<string, any>>,
  },
  extends: NTreeSelect,
  setup(props, { emit }) {
    const useParams = ref({})
    const useUrl = ref(props.url)

    watch(() => props.url, (val) => {
      useUrl.value = val || ''
    })

    watch(() => props.params, (val) => {
      useParams.value = val || {}
    })

    const model = useVModel(props, 'value', emit, {
      passive: true,
      deep: true,
      defaultValue: props.defaultValue || [],
    })

    const { options, loading } = useCascader({
      url: useUrl,
      params: useParams,
    })

    return () => (
      <NTreeSelect
        {...props}

        loading={loading.value}
        options={options.value?.data || []}
        v-model:value={model.value}
      >
      </NTreeSelect>
    )
  },
})
