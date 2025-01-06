import type { ValueAtom } from 'naive-ui/es/select/src/interface'
import { NCascader } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export const ShowCascader = defineComponent({
  name: 'ShowCascader',
  extends: NCascader,
  setup(props) {
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
      <div class="flex flex-col gap-2">
        <div class="text-gray-600">
          {values.value.map(item => props.options?.find(option => option.value === item)?.label).join(' / ')}
        </div>
      </div>
    )
  },
})
