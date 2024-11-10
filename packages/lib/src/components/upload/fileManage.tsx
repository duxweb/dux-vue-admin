import type { PropType } from 'vue'
import { cloneDeep } from 'lodash-es'
import { NButton, NDropdown, NInfiniteScroll, NSpin, NTab, NTabs, NTooltip, useMessage } from 'naive-ui'
import { computed, defineComponent, nextTick, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxDrawEmpty } from '../'
import { useClient, useDownload, useResource } from '../../hooks'
import { useDialog } from '../dialog'
import { useList } from '../list'
import { DuxModalPage } from '../modal'
import { DuxFileManageItem } from './manage/item'
import { useUpload } from './useUpload'

const DuxFileManage = defineComponent({
  name: 'DuxFileManage',
  props: {
    url: String,
    uploadUrl: String,
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
    const { uploadUrl, uploadManageUrl } = useResource()
    const form = ref<Record<string, any>>({
      type: props.type || 'all',
    })
    const uploadRate = ref(0)
    const currentData = ref<Record<string, any>>()

    const { data, meta, loading, onNextPage, onReload } = useList({
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
          folder: form.value.folder,
        },
      }).then(() => {
        onReload()
        selectValues.value = []
      }).catch(() => {
        message.error(t('components.uploadManage.createError'))
      })
    }

    const renameFile = (type: 'folder' | 'file', name?: string, id?: string | number) => {
      if (!name) {
        message.error(t('components.uploadManage.namePlaceholder'))
        return
      }
      client.put({
        url: props.url || uploadManageUrl,
        data: {
          name,
          id,
          type,
        },
      }).then(() => {
        onReload()
        selectValues.value = []
      }).catch(() => {
        message.error(t('components.uploadManage.editError'))
      })
    }

    const deleteFile = (type: 'folder' | 'file', id?: any) => {
      client.post({
        url: `${props.url || uploadManageUrl}/batch`,
        data: {
          method: 'delete',
          data: Array.isArray(id) ? id : [id],
          type,
        },
      }).then(() => {
        onReload()
        selectValues.value = []
      }).catch(() => {
        message.error(t('components.uploadManage.delError'))
      })
    }

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
                        const files = e.target?.files

                        for (const file of files) {
                          const data = {
                            manage: 1,
                            folder: form.value.folder,
                          }

                          upload.send({
                            url: props.uploadUrl || uploadUrl,
                            file,
                            data,
                            params: {
                              manage: 1,
                              folder: form.value.folder,
                            },
                            onSuccess() {
                              message.success(t('components.uploadManage.success'))
                              selectValues.value = []
                              onReload()
                            },
                            onError() {
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

                        fileInput.remove()
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
                        <div class="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 text-sm items-start justify-start">
                          {form.value?.folder && form.value?.folder !== meta.value?.folder && (
                            <DuxFileManageItem
                              key={`parent-${meta.value?.folder}`}
                              type="folder"
                              name="上一级"
                              onSelect={() => {
                                selectValues.value = []
                                form.value.folder = meta?.value?.folder
                                onReload()
                              }}
                            />
                          )}
                          {data.value?.map(item => (
                            <NTooltip placement="bottom" key={`${item.url ? 'file' : 'folder'}-${item.id}`} trigger={item.url ? 'hover' : 'manual'}>
                              {{
                                default: () => item.size,
                                trigger: () => (
                                  <DuxFileManageItem

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
                            {form.value?.folder && form.value?.folder !== meta.value?.folder && (
                              <div class="text-xs text-gray-6">
                                <NButton
                                  type="default"
                                  ghost
                                  onClick={() => {
                                    selectValues.value = []
                                    form.value.folder = meta?.value?.folder
                                    onReload()
                                  }}
                                >
                                  {t('components.uploadManage.back')}
                                </NButton>
                              </div>
                            )}
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
                  const itemData = cloneDeep(currentData.value)
                  switch (v) {
                    case 'download':
                      download.url(itemData?.url)
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
                          name: itemData?.name,
                        },
                      }).then((res: any) => {
                        renameFile(itemData?.type, res?.name, itemData?.id)
                      })
                      break
                    case 'delete':
                      dialog.confirm({
                        title: t('components.uploadManage.delTitle'),
                        content: t('components.uploadManage.delDesc'),
                      }).then(() => {
                        deleteFile(itemData?.type, itemData?.id)
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
                        deleteFile('file', selectValues.value?.map(v => v.id))
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
