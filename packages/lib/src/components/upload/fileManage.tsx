import type { PropType } from 'vue'
import type { DuxUploadType } from './useUpload'
import { NButton, NDropdown, NInfiniteScroll, NSpin, NTab, NTabs, NTooltip, useMessage } from 'naive-ui'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxDrawEmpty } from '../'
import { useClient, useDownload, useResource } from '../../hooks'
import { useDialog } from '../dialog'
import { useList } from '../list'
import { DuxModalPage } from '../modal'
import { DuxFileManageItem } from './manage/item'
import { useS3Upload, useUpload } from './useUpload'

const DuxFileManage = defineComponent({
  name: 'DuxFileManage',
  props: {
    url: String,
    uploadUrl: String,
    uploadType: {
      type: String as PropType<DuxUploadType>,
      default: 'local',
    },
    uploadAccept: String,
    type: String,
    onConfirm: Function as PropType<(value: any) => void>,
    onClose: Function as PropType<() => void>,
    multiple: Boolean,
  },
  setup(props) {
    const showDropdown = ref(false)
    const xRef = ref(0)
    const yRef = ref(0)
    const { t } = useI18n()

    const selectValues = ref<Record<string, any>[]>([])

    const dialog = useDialog()
    const client = useClient()
    const message = useMessage()
    const download = useDownload()
    const upload = useUpload()
    const s3upload = useS3Upload()
    const { uploadUrl, uploadManageUrl } = useResource()
    const form = ref<Record<string, any>>({
      type: props.type || 'all',
    })
    const uploadRate = ref(0)
    const currentData = ref<Record<string, any>>()

    const { data, loading, onNextPage, onReload } = useList({
      url: props.url || uploadManageUrl,
      form,
      append: true,
    })

    const createFolder = (name?: string) => {
      if (!name) {
        message.error(t('components.uploadManage.namePlaceholder'))
        return
      }
      client.post({
        url: props.url || uploadManageUrl,
        data: {
          name,
        },
      }).then(() => {
        onReload()
        selectValues.value = []
      }).catch(() => {
        message.error(t('components.uploadManage.createError'))
      })
    }

    const renameFile = (name?: string, id?: string | number) => {
      if (!name) {
        message.error(t('components.uploadManage.namePlaceholder'))
        return
      }
      client.put({
        url: props.url || uploadManageUrl,
        data: {
          name,
          id,
        },
      }).then(() => {
        onReload()
        selectValues.value = []
      }).catch(() => {
        message.error(t('components.uploadManage.editError'))
      })
    }

    const deleteFile = (id?: any) => {
      client.post({
        url: `${props.url || uploadManageUrl}/batch`,
        data: {
          method: 'delete',
          data: Array.isArray(id) ? id : [id],
        },
      }).then(() => {
        onReload()
        selectValues.value = []
      }).catch(() => {
        message.error(t('components.uploadManage.delError'))
      })
    }

    // const explame = ref([
    //   {
    //     id: 1,
    //     type: 'folder',
    //     name: '新建文件夹',
    //     time: '2021-12-12 12:12:12',
    //     size: '10M',
    //   },
    //   {
    //     id: 2,
    //     type: 'file',
    //     name: '1.jpg',
    //     mime: 'image/jpg',
    //     url: 'https://naive-ui.oss-cn-beijing.aliyuncs.com/carousel-img/carousel2.jpeg',
    //     size: '100kb',
    //     time: '2021-12-12 12:12:12',
    //   },

    // ])

    const typeDisable = computed<boolean>(() => {
      return !!(props.type && props.type !== 'all')
    })

    return () => (
      <DuxModalPage>
        {{
          default: () => (
            <div class="h-500px max-h-500px flex flex-col gap-2 p-2">

              <div class="flex-none flex justify-between items-center">
                <div class="flex-none">
                  <NTabs
                    type="segment"
                    animated
                    size="small"
                    tabClass="!px-4"
                    defaultValue="all"
                    value={form.value.type}
                    onUpdateValue={(v) => {
                      if (typeDisable.value) {
                        return
                      }

                      form.value.type = v
                      selectValues.value = []
                      onReload()
                    }}
                  >
                    <NTab tab={t('components.uploadManage.all')} name="all" disabled={typeDisable.value} />
                    <NTab tab={t('components.uploadManage.image')} name="image" disabled={typeDisable.value} />
                    <NTab tab={t('components.uploadManage.media')} name="media" disabled={typeDisable.value} />
                    <NTab tab={t('components.uploadManage.docs')} name="docs" disabled={typeDisable.value} />
                  </NTabs>
                </div>
                <div class="flex gap-2">
                  <NButton
                    type="default"
                    ghost
                    onClick={() => {
                      dialog.prompt({
                        title: t('components.uploadManage.namePlaceholder'),
                        formSchema: [
                          {
                            type: 'input',
                            name: 'name',
                          },
                        ],
                      }).then((res: any) => {
                        createFolder(res?.name)
                      })
                    }}
                    renderIcon={() => <div class="i-tabler:plus"></div>}
                  >
                    {t('buttons.create')}
                  </NButton>
                  <NButton
                    type="primary"
                    ghost
                    onClick={() => {
                      const fileInput = document.createElement('input')
                      fileInput.type = 'file'
                      fileInput.accept = '*/*'
                      fileInput.style.display = 'none'
                      fileInput.multiple = props.multiple

                      fileInput.onchange = (e: any) => {
                        const file = e.target?.files?.[0]
                        if (!file) {
                          return
                        }
                        const formData = new FormData()
                        formData.append('file', file)
                        formData.append('manage', '1')
                        formData.append('folder', form.value.folder)

                        if (props.uploadType === 'local') {
                          upload.send({
                            url: props.uploadUrl || uploadUrl,
                            formData,
                            onSuccess() {
                              message.success(t('components.uploadManage.success'))
                              selectValues.value = []
                              onReload()
                              fileInput.remove()
                            },
                            onError() {
                              fileInput.remove()
                            },
                            onProgress(percent) {
                              if (percent >= 100) {
                                uploadRate.value = 0
                              }
                              else {
                                uploadRate.value = percent
                              }
                            },
                          })
                        }
                        else {
                          s3upload.send({
                            url: props.uploadUrl || uploadUrl,
                            params: {
                              manage: 1,
                              folder: form.value.folder,
                            },
                            onSuccess() {
                              message.success(t('components.uploadManage.success'))
                              selectValues.value = []
                              onReload()
                              fileInput.remove()
                            },
                            onError() {
                              fileInput.remove()
                            },
                            onProgress(percent) {
                              if (percent >= 100) {
                                uploadRate.value = 0
                              }
                              else {
                                uploadRate.value = percent
                              }
                            },
                          })
                        }
                      }

                      fileInput.click()
                    }}
                    loading={uploadRate.value > 0}
                    renderIcon={() => <div class="i-tabler:upload"></div>}
                  >
                    <div class="flex gap-2">
                      {t('components.uploadManage.upload')}
                      {uploadRate.value > 0 && `(${uploadRate.value}%)`}
                    </div>
                  </NButton>
                </div>
              </div>

              <div class="flex-1 h-1">
                <NInfiniteScroll distance={10} onLoad={onNextPage}>
                  {loading.value && <NSpin class="h-full absolute w-full bg-gray-1/50" />}
                  {data.value?.length > 0
                    ? (
                        <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-6 text-sm items-start justify-start">
                          {data.value?.map((item, key) => (
                            <NTooltip placement="bottom" trigger={item.url ? 'hover' : 'manual'}>
                              {{
                                default: () => item.size,
                                trigger: () => (
                                  <DuxFileManageItem
                                    key={key}
                                    onContextmenu={(e) => {
                                      currentData.value = item
                                      showDropdown.value = false
                                      nextTick().then(() => {
                                        showDropdown.value = true
                                        xRef.value = e.clientX
                                        yRef.value = e.clientY
                                      })
                                      e.preventDefault()
                                    }}
                                    value={!!selectValues.value?.find?.(v => v.id === item.id)}
                                    type={item.url ? 'file' : 'folder'}
                                    mime={item.mime}
                                    name={item.name}
                                    url={item.url}
                                    time={item.time}
                                    onSelect={(v) => {
                                      if (!item.url) {
                                        selectValues.value = []
                                        form.value.folder = item.id
                                        onReload()
                                        return
                                      }

                                      if (v) {
                                        if (props.multiple) {
                                          selectValues.value?.push(item)
                                        }
                                        else {
                                          selectValues.value = [item]
                                        }
                                      }
                                      else {
                                        if (props.multiple) {
                                          selectValues.value?.splice(selectValues.value?.indexOf(item), 1)
                                        }
                                        else {
                                          selectValues.value = []
                                        }
                                      }
                                    }}
                                  />
                                ),
                              }}
                            </NTooltip>
                          )) }
                        </div>
                      )
                    : (
                        <div class="w-full h-100 flex flex-justify-center justify-center items-center text-sm text-gray-6">
                          <div class="flex flex-col  items-center gap-2">
                            <div class="w-26">
                              <DuxDrawEmpty />
                            </div>
                            <div>{t('components.uploadManage.empty')}</div>
                          </div>
                        </div>
                      )}
                </NInfiniteScroll>
              </div>

              <NDropdown
                x={xRef.value}
                y={yRef.value}
                placement="bottom-start"
                trigger="manual"
                show={showDropdown.value}
                onClickoutside={() => {
                  showDropdown.value = false
                }}
                onUpdateShow={(value) => {
                  if (!value) {
                    currentData.value = undefined
                  }
                }}
                onSelect={(v) => {
                  switch (v) {
                    case 'download':
                      download.url(currentData.value?.url)
                      break
                    case 'rename':
                      dialog.prompt({
                        title: t('components.uploadManage.namePlaceholder'),
                        formSchema: [
                          {
                            type: 'input',
                            name: 'name',
                          },
                        ],
                        defaultValue: {
                          name: currentData.value?.name,
                        },
                      }).then((res: any) => {
                        renameFile(res?.name, currentData.value?.id)
                      })
                      break
                    case 'delete':
                      dialog.confirm({
                        title: t('components.uploadManage.delTitle'),
                        content: t('components.uploadManage.delDesc'),
                      }).then(() => {
                        deleteFile(currentData.value?.id)
                      })
                      break
                  }
                }}
                options={[
                  currentData.value?.url && {
                    label: t('buttons.download'),
                    key: 'download',
                    icon: () => <div class="i-tabler:download"></div>,
                  },
                  {
                    label: t('buttons.rename'),
                    key: 'rename',
                    icon: () => <div class="i-tabler:cursor-text"></div>,
                  },
                  {
                    label: t('buttons.delete'),
                    key: 'delete',
                    icon: () => <div class="i-tabler:trash"></div>,
                  },
                ].filter(v => v)}
              />
            </div>
          ),
          action: () => (
            <div class="flex-1 flex justify-between">
              <div>
                {selectValues.value?.length > 0 && (
                  <NButton
                    type="error"
                    secondary
                    onClick={() => {
                      dialog.confirm({
                        title: t('components.uploadManage.delTitle'),
                        content: t('components.uploadManage.delDesc'),
                      }).then(() => {
                        deleteFile(selectValues.value?.map(v => v.id))
                      })
                    }}
                  >
                    {t('buttons.delete')}
                  </NButton>
                )}
              </div>
              <div>
                <NButton
                  type="primary"
                  disabled={!selectValues.value?.length}
                  onClick={() => {
                    props.onConfirm?.(selectValues.value)
                  }}
                >
                  {t('buttons.select')}
                  (
                  {selectValues.value?.length || 0}
                  )
                </NButton>
              </div>
            </div>
          ),
        }}
      </DuxModalPage>
    )
  },
})

export default DuxFileManage
