import type { UploadFileInfo, UploadInst } from 'naive-ui'
import type { PropType } from 'vue'
import type { DuxUploadFile } from './useUpload'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NButton, NImage, NProgress, NUpload } from 'naive-ui'
import { defineComponent, ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useI18n } from 'vue-i18n'
import { useImagePreview, useResource } from '../../hooks'
import { useModal } from '../modal'
import { useNaiveUpload } from './useUpload'

export const DuxImageUpload = defineComponent({
  name: 'DuxImageUpload',
  props: {
    defaultValue: [String, Array<string>],
    value: [String, Array<string>],
    multiple: Boolean,
    max: Number,
    url: String,
    manageUrl: String,
    manage: {
      type: Boolean,
      default: true,
    },
    uploadType: {
      type: String,
    },
    headers: Object as PropType<Record<string, any>>,
    data: Object as PropType<Record<string, any>>,
    onUpdateValue: Function as PropType<(value: string | string[]) => void>,
  },
  setup(props, { emit }) {
    const uploadRef = ref<UploadInst | null>(null)

    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const { uploadUrl } = useResource()
    const { customRequest, onAbort } = useNaiveUpload()
    const { t } = useI18n()

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
      const newValue = props.multiple ? val?.filter(item => !!item.url).map(item => item.url || '') : (val[0]?.url || '')
      model.value = newValue
      props.onUpdateValue?.(newValue)
    }, { immediate: true })

    const image = useImagePreview()
    const modal = useModal()

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
          action={props.url || uploadUrl}
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
                'w-80px h-80px rounded border-1 border-gray-3 relative group draggable flex items-center',
                item.status === 'error' ? 'border-error text-error' : 'border-gray-3',
              ])}
            >
              {item.status === 'finished'
                ? (
                    <NImage
                      class="z-0 rounded"
                      objectFit="scale-down"
                      width={78}
                      height={78}
                      previewDisabled
                      src={item.url as string}
                    >
                      <div class="size-full flex items-center justify-center">
                        <div class="i-tabler:photo size-8"></div>
                      </div>
                    </NImage>

                  )
                : (
                    <div class="size-80px flex items-center justify-center rounded">
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
              class="w-80px h-80px rounded flex flex-col  border-1 border-dashed border-gray-3 cursor-pointer text-sm  hover:border-primary-7"
              style={{
                backgroundColor: 'var(--n-action-color)',
              }}
            >
              {props.manage && (
                <div
                  class="flex-none border-b border-gray-4 border-dashed text-center py-1 bg-gray-2 hover:bg-gray-3 flex items-center justify-center gap-1"
                  onClick={() => {
                    modal.show({
                      title: t('components.upload.manage'),
                      component: () => import('./fileManage'),
                      width: 800,
                      componentProps: {
                        url: props.manageUrl,
                        uploadUrl: props.url,
                        multiple: props.multiple,
                        uploadType: props.uploadType,
                        uploadAccept: 'image/*',
                        type: 'image',
                      },
                    }).then((res) => {
                      if (props.multiple) {
                        files.value = files.value.concat(fileToFileList(res))
                      }
                      else {
                        files.value = fileToFileList(res)
                      }
                    })
                  }}
                >
                  <div class="i-tabler:folder size-4"></div>
                </div>
              )}
              <div
                class="flex-1 flex flex-col justify-center items-center gap-1"
                onClick={() => {
                  uploadRef.value?.openOpenFileDialog()
                }}
              >
                <div class="i-tabler:plus size-4"></div>
              </div>
            </div>
          )}
        </VueDraggable>
      </div>
    )
  },
})
