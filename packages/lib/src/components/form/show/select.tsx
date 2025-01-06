import type { ValueAtom } from 'naive-ui/es/select/src/interface'
import { NSelect, NSpace, NTag } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  color?: string
}

export const ShowSelect = defineComponent({
  name: 'ShowSelect',
  extends: NSelect,
  setup(props) {
    const getOptionLabel = (value: string | number) => {
      const option = props.options.find(opt => opt.value === value)
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

    return () => {
      return (
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
    }
  },
})
