import type { UploadFileInfo, UploadInst } from 'naive-ui'
import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NButton, NImage, NProgress, NUpload } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useImagePreview } from '../../hooks'
import { useNaiveUpload } from './useUpload'

export const DuxImageUpload = defineComponent({
  name: 'DuxImageUpload',
  props: {
    defaultValue: [String, Array<string>],
    value: [String, Array<string>],
    multiple: Boolean,
    max: Number,
    url: String,
    headers: Object as PropType<Record<string, any>>,
    data: Object as PropType<Record<string, any>>,
  },
  setup(props, { emit }) {
    const uploadRef = ref<UploadInst | null>(null)

    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const { customRequest, onAbort } = useNaiveUpload()

    const imagesToFileList = (images: string[]): UploadFileInfo[] => {
      return images.map((url, index) => {
        const urlArr = url.split('/')
        const fileName = urlArr[urlArr.length - 1]
        return {
          id: String(index),
          url,
          status: 'finished',
          name: fileName,
        } as UploadFileInfo
      })
    }

    const files = ref<UploadFileInfo[]>([])

    const once = ref(false)

    watch(() => props.value, (val) => {
      if (!val || once.value) {
        return
      }
      files.value = imagesToFileList(val ? Array.isArray(val) ? val : [val] : [])
      once.value = true
    }, { immediate: true })

    watch(files, (val) => {
      model.value = props.multiple ? val?.filter(item => !!item.url).map(item => item.url || '') : (val[0]?.url || '')
    }, { immediate: true })

    const image = useImagePreview()

    return () => (
      <div>
        <NUpload
          ref={uploadRef}
          fileList={files.value}
          accept="image/*"
          onUpdateFileList={(fileList) => {
            files.value = fileList
          }}
          headers={props.headers}
          data={props.data}
          action={props.url}
          multiple={props.multiple}
          max={props.multiple ? props.max : 1}
          customRequest={customRequest}
          showFileList={false}
          abstract
        >
        </NUpload>
        <VueDraggable
          modelValue={files.value}
          v-model={files.value}
          class="flex gap-2"
          draggable=".draggable"
        >

          {files.value?.map((item, index) => (
            <div
              key={index}
              class={clsx([
                'w-100px h-100px rounded border-1 border-gray-3 relative group draggable',
                item.status === 'error' ? 'border-error text-error' : 'border-gray-3',
              ])}
            >
              {item.status === 'finished'
                ? (
                    <NImage
                      class="z-0 rounded"
                      objectFit="cover"
                      width="100"
                      previewDisabled
                      src={item.url as string}
                    >
                      <div class="size-full flex items-center justify-center">
                        <div class="i-tabler:photo size-8"></div>
                      </div>
                    </NImage>
                  )
                : (
                    <div class="size-100px flex items-center justify-center rounded">
                      <div class="i-tabler:photo size-8"></div>
                      {item.status === 'uploading' && (
                        <div class="absolute left-2 right-2 bottom-2">
                          <NProgress
                            type="line"
                            percentage={item.percentage || 0}
                            height={5}
                            showIndicator={false}
                          />
                        </div>
                      )}
                    </div>
                  )}
              <div class="z-1 size-full inset-0 absolute flex items-center justify-center bg-gray-2 bg-opacity-90 transition-all opacity-0 group-hover:opacity-100 rounded">
                {item.status === 'finished' && (
                  <NButton
                    quaternary
                    circle
                    size="small"
                    renderIcon={() => <div class="n-icon i-tabler:eye"></div>}
                    onClick={() => image.show([
                      item.url || '',
                    ], index)}
                  >
                  </NButton>
                )}
                {item.status === 'error' && (
                  <NButton
                    quaternary
                    circle
                    size="small"
                    renderIcon={() => <div class="n-icon i-tabler:reload"></div>}
                    onClick={() => {
                      item.status = 'pending'
                      uploadRef.value?.submit()
                    }}
                  >
                  </NButton>
                )}
                <NButton
                  quaternary
                  circle
                  size="small"
                  renderIcon={() => <div class="n-icon i-tabler:trash"></div>}
                  onClick={() => {
                    onAbort(item.id)
                    files.value.splice(index, 1)
                  }}
                >
                </NButton>
              </div>
            </div>
          ))}

          {(props.multiple || files.value?.length === 0) && (
            <div
              class="w-100px h-100px rounded border-1 border-dashed border-gray-3 flex justify-center items-center hover:border-primary-7 cursor-pointer text-sm"
              style={{
                backgroundColor: 'var(--n-action-color)',
              }}
              onClick={() => {
                uploadRef.value?.openOpenFileDialog()
              }}
            >
              点击上传
            </div>
          )}
        </VueDraggable>
      </div>
    )
  },
})
