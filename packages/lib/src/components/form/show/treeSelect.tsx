import type { ValueAtom } from 'naive-ui/es/select/src/interface'
import { NTreeSelect } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export const ShowTreeSelect = defineComponent({
  name: 'ShowTreeSelect',
  extends: NTreeSelect,
  setup(props) {
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
      return processOptions(props.options || [], value) || '-'
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
        {values.value.map(item => findLabel(item)).join(' / ')}
      </div>
    )
  },
})
