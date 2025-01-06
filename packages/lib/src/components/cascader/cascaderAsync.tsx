import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { NCascader } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useCascader } from './useCascader'

export const DuxCascaderAsync = defineComponent({
  name: 'DuxCascaderAsync',
  props: {
    url: String,
    params: Object as PropType<Record<string, any>>,
  },
  extends: NCascader,
  setup(props, { emit }) {
    const params = computed(() => props.params || {})
    const url = computed(() => props.url || '')

    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const { options } = useCascader({
      url,
      params,
    })

    const optionsData = computed(() => {
      const processOptions = (items: any[]) => {
        return items.map((item) => {
          const newItem = { ...item }
          if (Array.isArray(newItem.children)) {
            if (newItem.children.length === 0) {
              delete newItem.children
            }
            else {
              newItem.children = processOptions(newItem.children)
            }
          }
          return newItem
        })
      }

      return processOptions(options.value?.data || [])
    })

    return () => (
      <NCascader
        {...props}
        clearable
        options={optionsData.value}
        v-model:value={model.value}
      >
      </NCascader>
    )
  },
})
