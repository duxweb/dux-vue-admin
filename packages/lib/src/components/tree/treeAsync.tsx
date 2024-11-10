import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { NSpin, NTree } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { useCascader } from '../cascader'

export const DuxTreeAsync = defineComponent({
  name: 'DuxTreeAsync',
  props: {
    url: String,
    params: Object as PropType<Record<string, any>>,
    value: Array as PropType<(string | number)[]>,
    defaultValue: Array as PropType<(string | number)[]>,
  },
  extends: NTree,
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

    const { options, loading, expanded } = useCascader({
      url: useUrl,
      params: useParams,
    })

    return () => (
      <NSpin show={loading.value} class="w-full h-60 rounded border border-gray-3 dark:bg-gray-2 p-4 overflow-auto">
        <NTree
          {...props}
          cascade
          checkable
          defaultExpandAll
          selectable={false}
          expandedKeys={expanded.value}
          onUpdateExpandedKeys={v => expanded.value = v}
          data={options.value?.data || []}
          checkedKeys={model.value}
          onUpdateCheckedKeys={(v) => {
            model.value = v
          }}
        >
        </NTree>
      </NSpin>
    )
  },
})
