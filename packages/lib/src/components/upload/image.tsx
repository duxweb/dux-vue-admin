import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NButton, NImage, NProgress, useMessage } from 'naive-ui'
import { computed, defineComponent, ref, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useI18n } from 'vue-i18n'
import { useImagePreview, useResource } from '../../hooks'
import { useModal } from '../modal'
import { useUpload } from './useUpload'

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
    onUpdateValue: Function as PropType<(value?: string | string[]) => void>,
  },
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      passive: true,
      deep: true,
      defaultValue: [],
    })

    watch(model, (v) => {
      props.onUpdateValue?.(v)
    })

    const { uploadUrl } = useResource()
    const { send } = useUpload()
    const { t } = useI18n()
    const message = useMessage()
    const image = useImagePreview()
    const modal = useModal()

    const files = computed(() => {
      return model.value ? (Array.isArray(model.value) ? model.value : [model.value]) : []
    })

    const percent = ref(0)

    return () => (
      <div>

        <VueDraggable
          modelValue={files.value}
          v-model={files.value}
          class="flex gap-2"
          draggable=".draggable"
        >

          {files.value?.map((url, index) => (
            <div
              key={index}
              class={clsx([
                'w-80px h-80px rounded border-1 border-gray-3 relative group draggable flex items-center',
              ])}
            >
              <NImage
                class="z-0 rounded"
                objectFit="scale-down"
                width={78}
                height={78}
                previewDisabled
                src={url}
              >
              </NImage>
              <div class="z-1 size-full inset-0 absolute flex items-center justify-center bg-gray-2 bg-opacity-90 transition-all opacity-0 group-hover:opacity-100 rounded">

                <NButton
                  quaternary
                  circle
                  size="small"
                  renderIcon={() => <div class="n-icon i-tabler:eye"></div>}
                  onClick={() => image.show(files.value, index)}
                >
                </NButton>

                <NButton
                  quaternary
                  circle
                  size="small"
                  renderIcon={() => <div class="n-icon i-tabler:trash"></div>}
                  onClick={() => {
                    if (props.multiple) {
                      model.value = (model.value as string[]).filter((_, i) => i !== index)
                    }
                    else {
                      model.value = undefined
                    }
                  }}
                >
                </NButton>
              </div>
            </div>
          ))}

          {(files.value.length === 0 || (props.multiple && ((props.max && files.value.length < props.max) || !props.max))) && (
            <div
              class="w-80px h-80px rounded flex flex-col  border-1 border-dashed border-gray-3 text-sm  hover:border-primary-7"
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
                        model.value = [...files.value, ...res.map((item: any) => item.url)]
                      }
                      else {
                        model.value = res[0].url
                      }
                    })
                  }}
                >
                  <div class="i-tabler:folder size-4"></div>
                </div>
              )}

              <div
                class="flex-1 flex flex-col justify-center items-center gap-1 relative"
              >
                {percent.value > 0 && percent.value < 100
                  ? (
                      <div class="size-80px flex items-center justify-center rounded">
                        <div class="i-tabler:photo size-8"></div>
                        <div class="absolute left-2 right-2 bottom-2">
                          <NProgress
                            type="line"
                            percentage={percent.value}
                            height={5}
                            showIndicator={false}
                          />
                        </div>
                      </div>
                    )
                  : (
                      <>
                        <div class="i-tabler:plus size-4"></div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple={props.multiple}
                          class="absolute inset-0 opacity-0  cursor-pointer"
                          onChange={(e: Event) => {
                            const uploadFiles = (e.target as HTMLInputElement).files || []
                            if (props.max && files.value.length + uploadFiles.length > props.max) {
                              message.error(t('components.upload.max', { max: props.max }))
                              return
                            }
                            for (const file of Array.from(uploadFiles)) {
                              send({
                                url: props.url || uploadUrl,
                                file,
                                onProgress: (n: number) => {
                                  percent.value = n
                                },
                                onSuccess: (res: any) => {
                                  if (props.multiple) {
                                    model.value = [...files.value, res.url]
                                  }
                                  else {
                                    model.value = res.url
                                  }
                                },
                              })
                            }
                          }}
                        />
                      </>
                    )}
              </div>
            </div>
          )}
        </VueDraggable>
      </div>
    )
  },
})
