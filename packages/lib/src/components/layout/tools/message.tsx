import type { PropType } from 'vue'
import { useIntervalFn } from '@vueuse/core'
import clsx from 'clsx'
import { NBadge, NButton, NList, NListItem, NPopover, NTab, NTabs } from 'naive-ui'
import { defineComponent, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useClient, useResource } from '../../../hooks'
import { DuxBlockEmpty } from '../../status/blockEmpty'

const MessageItem = defineComponent({
  name: 'Message',
  props: {
    data: {
      type: Array as PropType<Record<string, any>[]>,
      default: [],
    },
  },
  setup(props) {
    const { t } = useI18n()
    const router = useRouter()
    const resource = useResource()

    return () => (
      props.data.length > 0
        ? (
            <NList hoverable clickable>
              {props.data?.map((item, key) => (
                <NListItem
                  key={key}
                  class="!px-2"

                >
                  <div
                    class="flex items-start gap-2"
                    onClick={() => {
                      router.push(`/${resource.manage.value}/message`)
                    }}
                  >
                    <div class={clsx([
                      'flex-1',
                      item?.read ? 'font-normal' : 'font-bold',
                    ])}
                    >
                      {item?.title}
                    </div>
                  </div>

                </NListItem>
              ))}
            </NList>
          )
        : <DuxBlockEmpty text={t('components.message.notFound')} desc={t('components.message.notFoundMore')} />
    )
  },
})

export const Message = defineComponent({
  name: 'Message',
  setup(_props) {
    const resource = useResource()
    const client = useClient()
    const { t } = useI18n()
    const tab = ref('all')

    const data = ref<Record<string, any>[]>([])
    const meta = ref<Record<string, any>>({})

    const onLoad = () => {
      client.get({
        url: resource.messageUrl,
        params: {
          tab: tab.value,
        },
      }).then((res) => {
        data.value = res?.data || []
        meta.value = res?.meta || {}
      })
    }

    watch(tab, () => {
      onLoad()
    })

    const handleClear = () => {
      client.post({
        url: `${resource.messageUrl}/batch`,
        data: {
          method: 'delete',
          data: [],
        },
      }).then(() => {
        onLoad()
      })
    }

    useIntervalFn(() => {
      onLoad()
    }, 1000 * 60)

    onMounted(() => {
      onLoad()
    })

    const handleRead = () => {
      client.post({
        url: `${resource.messageUrl}/batch`,
        data: {
          method: 'read',
          data: [],
        },
      }).then(() => {
        onLoad()
      })
    }

    return () => (
      <NPopover trigger="click" width={300} contentClass="!p-0" class="!p-0">
        {{
          trigger: () => (
            <NBadge dot={!!meta?.value.unread} offset={[-9, 9]}>
              <NButton quaternary circle>
                <div class="h-5 w-5 i-tabler:bell" />
              </NButton>
            </NBadge>
          ),
          default: () => (
            <>
              <NTabs justifyContent="space-evenly" type="line" animated paneClass="!px-4 !py-2" defaultValue="all" value={tab.value} onUpdateValue={val => tab.value = val}>
                <NTab name="all" tab={t('components.message.all')} />
                <NTab name="unread" tab={t('components.message.unread')} />
                <NTab name="read" tab={t('components.message.read')} />
              </NTabs>

              <div class="p-2">
                <MessageItem data={data.value || []} />

                <div class="grid grid-cols-2 gap-2 border-t border-gray-2 pt-2">
                  <NButton
                    block
                    secondary
                    class="flex-1"
                    onClick={() => {
                      handleRead()
                    }}
                  >
                    {t('components.message.readAll')}
                  </NButton>
                  <NButton
                    block
                    secondary
                    class="flex-1"
                    onClick={() => {
                      handleClear()
                    }}
                  >
                    {t('components.message.deleteAll')}
                  </NButton>
                </div>
              </div>
            </>
          ),

        }}

      </NPopover>
    )
  },
})
