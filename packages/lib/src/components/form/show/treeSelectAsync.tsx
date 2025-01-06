import type { ValueAtom } from 'naive-ui/es/cascader/src/interface'
import { useCascader } from 'src/components/cascader'
import { computed, defineComponent } from 'vue'
import { DuxTreeSelectAsync } from '../../../components/treeSelect'

export const ShowTreeSelectAsync = defineComponent({
  name: 'ShowTreeSelectAsync',
  extends: DuxTreeSelectAsync,
  setup(props) {
    const params = computed(() => props.params || {})
    const url = computed(() => props.url || '')

    const { options } = useCascader({
      url,
      params,
    })

    const values = computed<ValueAtom[]>(() => {
      if (!props.value) {
        return [] as ValueAtom[]
      }
      if (props.multiple) {
        return props.value as ValueAtom[]
      }
      return [props.value] as ValueAtom[]
    })

    const findLabel = (value: ValueAtom) => {
      const processOptions = (items: any[], value: ValueAtom): string | undefined => {
        for (const item of items) {
          if (item.value === value) {
            return item.label
          }
          if (item.children?.length) {
            const found = processOptions(item.children, value)
            if (found) {
              return found
            }
          }
        }
      }
      return processOptions(options.value?.data || [], value) || '-'
    }

    return () => (
      <div class="flex items-center">
        {values.value.map(item => findLabel(item)).join(' / ')}
      </div>
    )
  },
})
