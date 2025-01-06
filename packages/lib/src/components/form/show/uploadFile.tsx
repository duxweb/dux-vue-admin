import type { DuxUploadFile } from '../../../components/upload'
import { computed, defineComponent } from 'vue'
import { DuxFileUpload } from '../../../components/upload'

export const ShowUploadFile = defineComponent({
  name: 'ShowUploadFile',
  extends: DuxFileUpload,
  setup(props) {
    const values = computed<DuxUploadFile[]>(() => {
      if (!props.value) {
        return [] as DuxUploadFile[]
      }
      if (props.multiple) {
        return props.value as DuxUploadFile[]
      }
      return [props.value] as DuxUploadFile[]
    })

    return () => (
      <div class="flex items-center flex-col rounded border border-gray-4 p-2 divide-y divide-gray-4">
        {values.value?.map((item) => {
          return (
            <div class="p-2">
              <a href={item.url} target="_blank">
                {item.name || item.url || '-'}
              </a>
            </div>
          )
        })}
      </div>
    )
  },
})
