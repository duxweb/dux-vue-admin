import { NButton, NProgress, NUpload, NUploadDragger } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { UploadFileInfo, UploadInst } from 'naive-ui'
import type { SortableEvent } from 'vue-draggable-plus'
import { useNaiveUpload } from './useUpload'
import type { DuxUploadFile, UploadFileInfoExtend } from './useUpload'

export interface DuxFileUploadProps {
  accept?: string
  value?: DuxUploadFile[] | DuxUploadFile
  headers?: Record<string, any>
  data?: Record<string, any>
  multiple?: boolean
  max?: number
  url?: string
}

export const DuxFileUpload = defineComponent({
  name: 'DuxFileUpload',
  props: {
    accept: String,
    value: [Array, Object],
    multiple: Boolean,
    max: Number,
    url: String,
    headers: Object,
    data: Object,
  },
  setup({ value, max, multiple, url, headers, accept, data }: DuxFileUploadProps, { emit }) {
    const uploadRef = ref<UploadInst | null>(null)

    const { customRequest, onAbort } = useNaiveUpload()

    const fileToFileList = (list: DuxUploadFile[]): UploadFileInfo[] => {
      return list.map((item, index) => {
        return {
          id: String(index),
          url: item.url,
          status: 'finished',
          name: item.name,
          type: item.mime,
          ext: item.ext,
        } as UploadFileInfo
      })
    }

    const fileListToFile = (list: UploadFileInfoExtend[]): DuxUploadFile[] => {
      return list?.filter(item => !!item.url).map((item) => {
        return {
          url: item.url,
          name: item.name,
          mime: item.type,
          size: item.size,
          ext: item.ext,
        } as DuxUploadFile
      })
    }

    const files = ref<UploadFileInfo[]>(fileToFileList(value ? (Array.isArray(value) ? value : [value]) : []))

    const onUpdate = () => {
      emit('update:value', fileListToFile(multiple ? files.value : [files.value?.[0]]))
    }

    return () => (
      <div class="w-full lg:max-w-400px">
        <NUpload
          ref={uploadRef}
          fileList={files.value}
          accept={accept}
          onUpdateFileList={(fileList) => {
            files.value = fileList
            onUpdate()
          }}
          headers={headers}
          data={data}
          action={url}
          directoryDnd={true}
          multiple={multiple}
          max={multiple ? max : 1}
          showFileList={false}
          customRequest={customRequest}

        >
          <NUploadDragger>
            <div
              class="flex items-center justify-center py-2 px-6"
            >
              <div class="flex justify-center items-center flex-col">
                <div class="i-tabler:cloud-upload w-10 h-10 text-gray-9"></div>
                <div
                  class="text-gray-8 mt-4"
                >
                  拖动文件、文件夹或者点击此处上传
                </div>
              </div>
            </div>
          </NUploadDragger>

        </NUpload>
        {files.value?.length > 0 && (

          <VueDraggable
            modelValue={files.value}
            onUpdate={(e: SortableEvent) => {
              [files.value[e.oldIndex as number], files.value[e.newIndex as number]] = [files.value[e.newIndex as number], files.value[e.oldIndex as number]]
              onUpdate()
            }}
            class="mt-4 flex flex-col gap-2"
          >
            {files.value?.map((item, index) => (
              <div
                key={index}
                class="py-3 px-4 rounded flex flex-col gap-2 border-1"
                style={{
                  backgroundColor: 'var(--n-dragger-color)',
                  borderColor: 'var(--n-border-color)',
                }}
              >
                <div class="flex items-center">
                  <div class="flex gap-2 items-center flex-1 w-1">
                    <div
                      class="p-2 bg-gray-1 border border-gray-3 rounded"
                    >

                      <div class="i-tabler:paperclip w-5 h-5"></div>
                    </div>
                    <div class="flex flex-col text-sm">
                      <div>{item.name}</div>
                      <div class="text-gray-7">{item.type}</div>
                    </div>
                  </div>
                  <div class="flex-none flex gap-2">
                    {item.status === 'finished' && (
                      <NButton
                        type="primary"
                        onClick={() => {
                          if (!item?.url) {
                            return
                          }
                          window.open(item.url, '_blank')
                        }}
                        secondary
                        class="px-2"
                        renderIcon={() => <div class="i-tabler:download w-4 h-4"></div>}

                      >
                      </NButton>
                    )}

                    {item.status === 'error' && (
                      <NButton
                        type="tertiary"
                        secondary
                        onClick={() => {
                          item.status = 'pending'
                          uploadRef.value?.submit()
                        }}
                        class="px-2"
                        renderIcon={() => <div class="i-tabler:reload w-4 h-4"></div>}
                      >
                      </NButton>
                    )}
                    <NButton
                      type="tertiary"
                      secondary
                      onClick={() => {
                        onAbort(item.id)
                        files.value.splice(index, 1)
                      }}
                      class="px-2"
                      renderIcon={() => <div class="i-tabler:x w-4 h-4"></div>}
                    >
                    </NButton>
                  </div>

                </div>
                {item.status === 'uploading' && (
                  <NProgress
                    type="line"
                    percentage={item.percentage || 0}
                    height={5}
                    style={{
                      '--n-font-size': '12px',
                    }}
                  />
                )}
              </div>
            ))}
          </VueDraggable>
        )}
      </div>
    )
  },
})
