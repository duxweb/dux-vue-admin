import { NImage, NSpace } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { DuxImageUpload } from '../../../components/upload'

export const ShowUploadImage = defineComponent({
  name: 'ShowUploadImage',
  extends: DuxImageUpload,
  setup(props) {
    const values = computed<string[]>(() => {
      if (!props.value) {
        return [] as string[]
      }
      if (props.multiple) {
        return props.value as string[]
      }
      return [props.value] as string[]
    })

    return () => (
      <div class="flex items-center">
        <NSpace>
          {values.value.length
            ? (
                values.value.map((url, index) => (
                  <div key={index} class="size-20 rounded overflow-hidden">
                    <NImage src={url} objectFit="cover" class="size-full" />
                  </div>
                ))
              )
            : (
                <div class="text-gray-7">-</div>
              )}
        </NSpace>
      </div>
    )
  },
})
