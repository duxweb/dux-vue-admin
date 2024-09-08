import type { UploadFileInfo, UploadInst } from 'naive-ui'
import { NButton, NImage, NProgress, NUpload } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import clsx from 'clsx'
import type { SortableEvent } from 'vue-draggable-plus'
import { VueDraggable } from 'vue-draggable-plus'
import { useImagePreview } from '../../hooks'
import { useNaiveUpload } from './useUpload'

export interface DuxImageUploadProps {
  value?: string | string[]
  multiple?: boolean
  headers?: Record<string, any>
  data?: Record<string, any>
  max?: number
  url?: string
}

export const DuxImageUpload = defineComponent({
  name: 'DuxImageUpload',
  props: {
    value: [Array<string>, String],
    multiple: Boolean,
    max: Number,
    url: String,
    headers: Object,
    data: Object,
  },
  setup({ value, max, multiple, url, headers, data }: DuxImageUploadProps, { emit }) {
    const uploadRef = ref<UploadInst | null>(null)

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

    const files = ref<UploadFileInfo[]>(imagesToFileList(value ? (Array.isArray(value) ? value : [value]) : []))

    const onUpdate = () => {
      emit('update:value', multiple ? files.value?.filter(item => !!item.url).map(item => item.url) : files.value[0].url)
    }

    const image = useImagePreview()

    return () => (
      <div>
        <NUpload
          ref={uploadRef}
          fileList={files.value}
          accept="image/*"
          onUpdateFileList={(fileList) => {
            files.value = fileList
            onUpdate()
          }}
          headers={headers}
          data={data}
          action={url}
          multiple={multiple}
          max={multiple ? max : 1}
          customRequest={customRequest}
          showFileList={false}
          abstract
        >
        </NUpload>
        <VueDraggable
          modelValue={files.value}
          onUpdate={(e: SortableEvent) => {
            [files.value[e.oldIndex], files.value[e.newIndex]] = [files.value[e.newIndex], files.value[e.oldIndex]]
            onUpdate()
          }}
          class="flex gap-2"
          draggable=".draggable"
        >

          {files.value?.map((item, index) => (
            <div
              key={index}
              class={clsx([
                'w-100px h-100px rounded border-1 border-[var(--n-border-color)] relative group draggable',
                item.status === 'error' ? 'border-error text-error' : 'border-[var(--n-border-color)]',
              ])}
            >
              {item.status === 'finished'
                ? (
                    <NImage
                      class="z-0 rounded"
                      objectFit="cover"
                      width="100"
                      previewDisabled
                      src={item.url}
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
                            percentage={item.percentage}
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
                      item.url,
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
                      uploadRef.value.submit()
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

          {(multiple || files.value?.length === 0) && (
            <div
              class="w-100px h-100px rounded border-1 border-dashed border-[var(--n-border-color)] flex justify-center items-center hover:border-primary-7 cursor-pointer"
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
