import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import { NButton, NProgress, useMessage } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useI18n } from 'vue-i18n'
import { useResource } from '../../hooks'
import { useModal } from '../modal'
import { type DuxUploadFile, useUpload } from './useUpload'

export const DuxFileUpload = defineComponent({
  name: 'DuxFileUpload',
  props: {
    accept: String,
    defaultValue: [String, Array<string>] as PropType<DuxUploadFile[] | DuxUploadFile>,
    value: [Array, Object] as PropType<DuxUploadFile[] | DuxUploadFile>,
    multiple: Boolean,
    max: Number,
    url: String,
    manageUrl: String,
    manage: {
      type: Boolean,
      default: true,
    },
    headers: Object as PropType<Record<string, any>>,
    data: Object as PropType<Record<string, any>>,
    onUpdateValue: Function as PropType<(value: DuxUploadFile[] | DuxUploadFile) => void>,
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const uploadRef = ref<HTMLInputElement | null>(null)

    const model = useVModel(props, 'value', emit, {
      passive: true,
      deep: true,
      defaultValue: props.defaultValue,
    })

    const { uploadUrl } = useResource()
    const { send, abort } = useUpload()
    const { t } = useI18n()
    const message = useMessage()

    // 上传状态管理
    const loading = ref(false)
    const percentage = ref(0)
    const currentFileIndex = ref(0)
    const totalFiles = ref(0)
    const isDragging = ref(false)
    const uploadQueue = ref<File[]>([])
    const uploadRequests = ref<Record<string, any>>({})

    // 已上传文件列表，与model保持同步
    const files = computed({
      get() {
        if (!model.value) {
          return []
        }
        return Array.isArray(model.value) ? model.value : [model.value]
      },
      set(v) {
        if (props.multiple) {
          model.value = v
        }
        else {
          model.value = v[0]
        }
      },
    })

    const modal = useModal()

    // 处理上传队列
    const processUploadQueue = () => {
      if (uploadQueue.value.length === 0) {
        loading.value = false
        percentage.value = 0
        currentFileIndex.value = 0
        totalFiles.value = 0
        return
      }

      loading.value = true
      const file = uploadQueue.value[0]
      currentFileIndex.value = totalFiles.value - uploadQueue.value.length + 1

      const id = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`

      send({
        id,
        url: props.url || uploadUrl,
        file,
        onProgress: (percent: number) => {
          percentage.value = percent
        },
        onSuccess: (res: any) => {
          const fileItem = {
            url: res.url,
            name: res.name,
            size: res.size,
            mime: res.mime,
            ext: res.ext,
          }

          if (props.multiple) {
            model.value = Array.isArray(model.value) ? [...model.value, fileItem] : [fileItem]
          }
          else {
            model.value = fileItem
          }
          uploadQueue.value.shift()
          processUploadQueue()
        },
        onError: (error: Error) => {
          message.error(error.message || t('components.upload.error'))

          // 出错时也移除文件并继续
          uploadQueue.value.shift()
          processUploadQueue()
        },
      })

      uploadRequests.value[id] = id
    }

    const addFilesToQueue = (files: File[]) => {
      // 检查是否超过最大文件数限制
      if (props.max && model.value
        && (Array.isArray(model.value) ? model.value.length : 1) + files.length > props.max) {
        message.error(t('components.upload.max', { max: props.max }))
        return
      }

      const validFiles = files.filter((file) => {
        if (props.accept && !file.type.match(props.accept)) {
          message.error(`${file.name}: ${t('components.upload.type')}`)
          return false
        }
        return true
      })

      if (validFiles.length === 0)
        return

      // 添加到上传队列
      uploadQueue.value.push(...validFiles)
      totalFiles.value = validFiles.length

      // 如果没有正在上传的文件，开始处理队列
      if (!loading.value) {
        processUploadQueue()
      }
    }

    const fileSelect = (e: Event) => {
      const uploadFiles = (e.target as HTMLInputElement).files || []
      addFilesToQueue(Array.from(uploadFiles))
      if (uploadRef.value)
        uploadRef.value.value = ''
    }

    // 处理文件拖放上传
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      isDragging.value = true
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      isDragging.value = false
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      isDragging.value = false

      const droppedFiles = e.dataTransfer?.files || []
      addFilesToQueue(Array.from(droppedFiles))
    }

    // 取消所有上传
    const cancelAllUploads = () => {
      Object.keys(uploadRequests.value).forEach((id) => {
        abort(id)
      })
      uploadRequests.value = {}
      uploadQueue.value = []
      loading.value = false
      percentage.value = 0
    }

    // 从列表中移除文件
    const removeFile = (index: number) => {
      if (Array.isArray(model.value)) {
        // 创建新数组而不是直接修改
        model.value = model.value.filter((_, i) => i !== index)
      }
      else {
        model.value = undefined
      }
    }

    return () => (
      <div class={`w-full ${!props.fullWidth ? 'lg:max-w-400px' : ''}`}>

        <input
          ref={uploadRef}
          type="file"
          accept={props.accept || '*/*'}
          multiple={props.multiple}
          class="hidden"
          onChange={fileSelect}
        />

        <div
          class={`flex items-center justify-center py-6 rounded border-dashed border-1 ${isDragging.value ? 'border-primary bg-primary/5' : 'border-gray-3'}`}
          onDragover={handleDragOver}
          onDragleave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div class="flex justify-center items-center flex-col gap-2">
            {
              !loading.value && (
                <div class="i-tabler:cloud-upload size-14 text-gray-9"></div>
              )
            }
            {
              !loading.value && (
                <div>
                  {t('components.upload.drag')}
                </div>
              )
            }
            {loading.value && (
              <NProgress
                type="circle"
                class="size-14!"
                percentage={percentage.value}
                processing
              >
                <div class="text-center" style={{ fontSize: '10px' }}>
                  {percentage.value}
                  %
                </div>
              </NProgress>
            )}
            {loading.value && (
              <div>
                {t('components.upload.uploading', { current: currentFileIndex.value, total: totalFiles.value })}
              </div>
            )}
            <div
              class="text-gray-8 flex justify-center items-center gap-2"
            >
              <NButton
                class="inline-block"
                type="primary"
                text
                disabled={loading.value}
                onClick={() => {
                  uploadRef.value?.click()
                }}
              >
                {t('components.upload.file')}
              </NButton>
              {props.manage && (
                <NButton
                  class="inline-block"
                  type="primary"
                  text
                  disabled={loading.value}
                  onClick={(e) => {
                    e.stopPropagation()

                    modal.show({
                      title: t('components.upload.manage'),
                      component: () => import('./fileManage'),
                      width: 800,
                      componentProps: {
                        url: props.manageUrl,
                        uploadUrl: props.url,
                        multiple: props.multiple,
                      },
                    }).then((res) => {
                      const selectedFiles: DuxUploadFile[] = []

                      res?.forEach((item: DuxUploadFile) => {
                        selectedFiles.push({
                          url: item.url,
                          name: item.name,
                          size: item.size,
                          mime: item.mime,
                          ext: item.ext,
                        })
                      })

                      if (props.multiple) {
                        model.value = Array.isArray(model.value) ? [...model.value, ...selectedFiles] : selectedFiles
                      }
                      else {
                        model.value = selectedFiles[0]
                      }
                    })
                  }}
                >
                  {t('components.upload.manage')}
                </NButton>
              )}
              {loading.value && (
                <NButton
                  class="inline-block"
                  type="error"
                  text
                  onClick={cancelAllUploads}
                >
                  {t('components.upload.cancel')}
                </NButton>
              )}
            </div>
          </div>
        </div>

        {files.value?.length > 0 && (
          <VueDraggable
            modelValue={files.value}
            v-model={files.value}
            class="mt-4 flex flex-col gap-2"
          >
            {files.value?.map((item, index) => (
              <div
                key={index}
                class="py-3 px-4 rounded flex items-center gap-2 border-1"
                style={{
                  backgroundColor: 'var(--n-dragger-color)',
                  borderColor: 'var(--n-border-color)',
                }}
              >
                <div class="flex gap-2 items-center flex-1 min-w-0">
                  <div
                    class="p-2 bg-gray-1 border border-gray-3 rounded"
                  >
                    <div class="i-tabler:paperclip w-5 h-5"></div>
                  </div>
                  <div class="flex flex-col text-sm">
                    <div>{item.name}</div>
                    <div class="text-gray-7">{item.mime}</div>
                  </div>
                </div>
                <div class="flex-none flex gap-2">
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
                  <NButton
                    type="tertiary"
                    secondary
                    onClick={() => {
                      removeFile(index)
                    }}
                    class="px-2"
                    renderIcon={() => <div class="i-tabler:x w-4 h-4"></div>}
                  >
                  </NButton>
                </div>
              </div>
            ))}
          </VueDraggable>
        )}
      </div>
    )
  },
})
