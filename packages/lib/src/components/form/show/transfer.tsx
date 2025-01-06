import { NSpace, NTag, NTransfer } from 'naive-ui'
import { computed, defineComponent } from 'vue'

export const ShowTransfer = defineComponent({
  name: 'ShowTransfer',
  extends: NTransfer,
  setup(props) {
    const selectedLabels = computed(() => {
      if (!props.value?.length)
        return ['-']
      return props.value.map((key) => {
        const option = props.options?.find(item => item.value === key)
        return option?.label || key
      })
    })

    return () => (
      <div class="flex items-center">
        <NSpace>
          {selectedLabels.value.map((label, index) => (
            <NTag key={index} type="info">{label}</NTag>
          ))}
        </NSpace>
      </div>
    )
  },
})
