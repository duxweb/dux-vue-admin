import type { ValueAtom } from 'naive-ui/es/select/src/interface'
import { NSpace, NTag } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { DuxSelectAsync, useSelect } from '../../../components/select'

export const ShowSelectAsync = defineComponent({
  name: 'ShowSelectAsync',
  extends: DuxSelectAsync,
  setup(props) {
    const params = computed(() => props.params || {})
    const url = computed(() => props.url || '')

    const { options } = useSelect({
      url,
      params,
      value: props.value,
    })

    const getOptionLabel = (value: string | number) => {
      const option = options.value?.find(opt => opt.value === value)
      return option?.label || value
    }

    const values = computed<ValueAtom[]>(() => {
      if (!props.value) {
        return [] as ValueAtom[]
      }
      if (props.multiple) {
        return props.value as ValueAtom[]
      }
      return [props.value] as ValueAtom[]
    })

    return () => (
      <div class="flex items-center">
        <NSpace>
          {values.value?.map(v => (
            <NTag key={v} type="info">
              {getOptionLabel(v)}
            </NTag>
          )) || '-'}
        </NSpace>
      </div>
    )
  },
})
