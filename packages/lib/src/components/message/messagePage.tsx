import type { PropType } from 'vue'
import clsx from 'clsx'
import { NButton, NCard, NInfiniteScroll, NScrollbar, NSpin } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxBlockEmpty } from '../'
import { useClient } from '../../hooks'
import { useList } from '../list/useList'
import { DuxFullPage } from '../page'

interface MessagePageTab {
  value: string
  label: string
  icon: string
}

export const DuxMessagePage = defineComponent({
  name: 'DuxMessagePage',
  props: {
    tabs: Array as PropType<MessagePageTab[]>,
    url: String,
    title: String,
    valueField: {
      type: String,
      default: 'id',
    },
    titleField: {
      type: String,
      default: 'title',
    },
    descField: {
      type: String,
      default: 'desc',
    },
    contentField: {
      type: String,
      default: 'content',
    },
    timeField: {
      type: String,
      default: 'time',
    },
    readField: {
      type: String,
      default: 'read',
    },
    senderField: {
      type: String,
      default: 'sender',
    },
    read: {
      type: Boolean,
      default: true,
    },
    delete: {
      type: Boolean,
      default: true,
    },
  },
  setup(props) {
    const form = ref<Record<string, any>>({
      tab: props.tabs?.[0]?.value,
    })

    const currentMessage = ref<Record<string, any>>()

    const { data, loading, onNextPage, onReload } = useList({
      url: props.url,
      form,
      append: true,
    })

    const handleLoad = () => {
      onNextPage()
    }

    const client = useClient()
    const { t } = useI18n()

    const oneDelete = (id?: any) => {
      client.delete({
        url: `${props.url}/${id}`,
      }).then(() => {
        currentMessage.value = undefined
        onReload()
      })
    }

    const oneRead = (id?: any) => {
      client.patch({
        url: `${props.url}/${id}`,
        data: {
          [props.readField]: true,
        },
      }).then(() => {
        if (!id) {
          onReload()
        }
      })
    }

    const handleBatch = (method: string, data: any[]) => {
      client.post({
        url: `${props.url}/batch`,
        data: { method, data },
      }).then(() => {
        onReload()
      })
    }

    return () => (
      <DuxFullPage>
        <NCard
          class="h-full"
          contentClass="p-0! h-1"
        >
          <div class="h-full flex flex-col lg:flex-row">
            <div class="flex-none bg-gray-2/30 lg:w-30 border-r border-gray-2 py-2 transition-all flex flex-col">
              <div class="px-4 py-2 text-base font-medium lg:block hidden">{props.title || t('components.message.title')}</div>
              <div class="flex-1 lg:h-1">
                <NScrollbar>
                  <div class="flex flex-row lg:flex-col gap-1 px-2 lg:py-2">
                    {props.tabs?.map((item, key) => (
                      <div
                        key={key}
                        class={clsx([
                          'px-4 py-2  cursor-pointer flex gap-2 rounded items-center w-full justify-center lg:justify-start',
                          item?.value === form.value.tab ? 'bg-primary/10 text-primary' : 'border-transparent',
                        ])}
                        onClick={() => {
                          form.value.tab = item?.value
                          onReload()
                        }}
                      >
                        {item?.icon && <div class={item.icon}></div>}
                        {item?.label}
                      </div>
                    ))}
                  </div>
                </NScrollbar>
              </div>
            </div>
            <div class="lg:flex-none flex-1 min-h-1 lg:h-full border-r border-gray-2 lg:w-60 flex flex-col">
              <div class="flex-none p-4 font-bold text-base hidden lg:flex border-b border-gray-2  gap-2 items-center">
                <div>{t('components.message.list')}</div>
              </div>
              <div class="flex-1 min-h-1 relative">
                <NInfiniteScroll distance={10} onLoad={handleLoad}>
                  {loading.value && <NSpin class="h-full absolute w-full bg-gray-1/50" />}

                  {data?.value?.length > 0
                    ? (
                        <div class="flex flex-col divide-y divide-gray-2">
                          {data?.value?.map?.((item, key) => (
                            <div
                              key={key}
                              class={clsx([
                                'flex flex-col py-2 px-4 cursor-pointer',
                                currentMessage.value === item ? 'bg-primary/10' : 'bg-gray-1',
                              ])}
                              onClick={() => {
                                item[props.readField] = true
                                currentMessage.value = item
                                oneRead(item?.[props.valueField])
                              }}
                            >
                              <div class={clsx([
                                'text-sm truncate',
                                currentMessage.value === item ? 'text-primary' : '',
                                item[props.readField] ? '' : 'font-bold',
                              ])}
                              >
                                {item[props.titleField]}
                              </div>
                              <div class="text-gray-6 truncate">{item[props.descField]}</div>
                            </div>
                          ))}
                        </div>
                      )
                    : <div class="h-full absolute w-full flex items-center justify-center"><DuxBlockEmpty simple text={t('components.message.notFound')} desc={t('components.message.notFoundMore')} /></div>}
                </NInfiniteScroll>
              </div>
              {(props.read || props.delete) && (
                <div class="grid grid-cols-2 gap-2 px-4 py-2 border-t border-gray-2">
                  {props.read && (
                    <NButton
                      type="default"
                      tertiary
                      block
                      onClick={() => {
                        handleBatch('read', data.value.map(v => v[props.valueField]))
                      }}
                    >
                      {t('components.message.readAll')}
                    </NButton>
                  )}
                  {props.delete && (
                    <NButton
                      type="default"
                      tertiary
                      block
                      onClick={() => {
                        handleBatch('delete', data.value.map(v => v[props.valueField]))
                      }}
                    >
                      {t('components.message.deleteAll')}
                    </NButton>
                  )}
                </div>
              )}
            </div>
            {currentMessage.value
              ? (
                  <div class="flex-1 w-full h-full lg:w-1 flex flex-col absolute lg:static bg-gray-1 z-1">
                    <div class="border-b border-gray-2 p-4 flex justify-between items-center">
                      <div class="flex-col gap-1">
                        <div class="text-lg font-bold">{currentMessage.value[props.titleField]}</div>
                        <div class="text-gray-6 text-xs flex gap-2">
                          {currentMessage.value[props.senderField] && <div class="text-primary">{currentMessage.value[props.senderField]}</div>}
                          <div>{currentMessage.value[props.timeField]}</div>
                        </div>
                      </div>
                      <div class="hidden lg:block">
                        {props.delete && (
                          <NButton
                            type="error"
                            quaternary
                            renderIcon={() => <div class="i-tabler:trash"></div>}
                            onClick={() => {
                              oneDelete(currentMessage.value?.[props.valueField])
                            }}
                          >
                          </NButton>
                        )}
                        <NButton
                          type="default"
                          quaternary
                          renderIcon={() => <div class="i-tabler:x"></div>}
                          onClick={() => {
                            currentMessage.value = undefined
                          }}
                        >
                        </NButton>
                      </div>
                    </div>
                    <div class="flex-1 min-h-1">
                      <NScrollbar>
                        <div class="p-4 prose prose-truegray">
                          <div innerHTML={currentMessage.value[props.contentField]} />
                        </div>
                      </NScrollbar>
                    </div>
                    <div class="grid lg:hidden border-t border-gray-2 p-2 grid-cols-2">
                      {props.delete && (
                        <NButton
                          type="error"
                          quaternary
                          renderIcon={() => <div class="i-tabler:trash"></div>}
                          onClick={() => {
                            oneDelete(currentMessage.value?.[props.valueField])
                          }}
                        >
                          {t('buttons.delete')}
                        </NButton>
                      )}
                      <NButton
                        type="default"
                        quaternary
                        renderIcon={() => <div class="i-tabler:x"></div>}
                        onClick={() => {
                          currentMessage.value = undefined
                        }}
                      >
                        {t('buttons.close')}
                      </NButton>
                    </div>
                  </div>
                )
              : (
                  <div class="hidden lg:flex flex-1 items-center justify-center">

                    <DuxBlockEmpty text={t('components.message.notFound')} desc={t('components.message.notFoundDesc')} />
                  </div>
                )}
          </div>
        </NCard>
      </DuxFullPage>
    )
  },
})
