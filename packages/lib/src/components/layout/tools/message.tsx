import { useIntervalFn } from '@vueuse/core'
import clsx from 'clsx'
import { NBadge, NButton, NList, NListItem, NPopover, NTabPane, NTabs } from 'naive-ui'
import { defineComponent, onMounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useClient, useResource } from '../../../hooks'
import { DuxBlockEmpty } from '../../status/blockEmpty'

const MessageItem = defineComponent({
  name: 'Message',
  props: {
    data: {
      type: Array<MessagesItem>,
      default: [],
    },
  },
  setup(props) {
    return () => (
      props.data.length > 0
        ? (
            <NList hoverable clickable>
              {props.data?.map((item, key) => (
                <NListItem key={key} class="!px-2">
                  <div class="flex items-start gap-2">
                    <div class="flex-none pt-0.5">
                      <div class={clsx([
                        'i-tabler:info-circle-filled w-4 h-4 text-primary',
                        item?.type === 'info' && 'text-primary',
                        item?.type === 'success' && 'text-success',
                        item?.type === 'warning' && 'text-warning',
                        item?.type === 'error' && 'text-error',
                      ])}
                      >
                      </div>
                    </div>
                    <div class="flex-1">{item?.content}</div>
                  </div>

                </NListItem>
              ))}
            </NList>
          )
        : <DuxBlockEmpty />
    )
  },
})

interface MessagesItem {
  id: string
  content: string
  type: 'info' | 'success' | 'warning' | 'error'
}

interface Messages {
  all: MessagesItem[]
  read: MessagesItem[]
  unread: MessagesItem[]
}

export const Message = defineComponent({
  name: 'Message',
  setup(_props) {
    const resource = useResource()
    const client = useClient()
    const router = useRouter()

    const data = reactive<Messages>({
      all: [],
      read: [],
      unread: [],
    })

    const onLoad = () => {
      client.get({
        url: resource.noticeUrl,
      }).then((res) => {
        data.all = res?.data?.all || []
        data.read = res?.data?.read || []
        data.unread = res?.data?.unread || []
      })
    }

    const onClear = () => {
      client.delete({
        url: resource.noticeUrl,
      }).then(() => {
        data.all = []
        data.read = []
        data.unread = []
      })
    }

    useIntervalFn(() => {
      onLoad()
    }, 1000 * 60)

    onMounted(() => {
      onLoad()
    })

    const handleRead = () => {
      client.patch({
        url: resource.noticeUrl,
      }).then(() => {
        onLoad()
      })
    }

    return () => (
      <NPopover trigger="click" width={300} contentClass="!p-0" class="!p-0">
        {{
          trigger: () => (
            <NBadge dot={data.unread.length > 0} offset={[-9, 9]}>
              <NButton quaternary circle>
                <div class="h-5 w-5 i-tabler:bell" />
              </NButton>
            </NBadge>
          ),
          default: () => (
            <NTabs justifyContent="space-evenly" type="line" animated paneClass="!px-4 !py-2" defaultValue="all">
              <NTabPane name="all" tab="全部">
                <div>
                  <MessageItem data={data.all} />

                  <div class="mt-2 flex gap-2 border-t border-gray-2 pt-2">
                    <NButton
                      block
                      tertiary
                      class="flex-1"
                      onClick={() => {
                        handleRead()
                      }}
                    >
                      一键已读
                    </NButton>
                    <NButton
                      block
                      tertiary
                      class="flex-1"
                      onClick={() => {
                        router.push(`/${resource.manage}/message`)
                      }}
                    >
                      全部消息
                    </NButton>
                  </div>
                </div>
              </NTabPane>
              <NTabPane name="unread" tab="未读">
                <div>
                  <MessageItem data={data.unread} />

                  <div class="mt-2 grid grid-cols-2 gap-2 border-t border-gray-2 pt-2">
                    <NButton
                      block
                      tertiary
                      class="flex-1"
                      onClick={() => {
                        handleRead()
                      }}
                    >
                      一键已读
                    </NButton>
                    <NButton
                      block
                      tertiary
                      class="flex-1"
                      onClick={() => {
                        router.push(`/${resource.manage}/message`)
                      }}
                    >
                      全部消息
                    </NButton>
                  </div>
                </div>
              </NTabPane>
              <NTabPane name="read" tab="已读">
                <div>
                  <MessageItem data={data.read} />
                  <div class="mt-2 border-t border-gray-2 pt-2">
                    <NButton
                      block
                      tertiary
                      onClick={() => {
                        router.push(`/${resource.manage}/message`)
                      }}
                    >
                      全部消息
                    </NButton>
                  </div>
                </div>
              </NTabPane>
            </NTabs>
          ),
          footer: () => (
            data.all?.length > 0
              ? (
                  <NButton
                    quaternary
                    type="primary"
                    block
                    onClick={() => {
                      onClear()
                    }}
                  >
                    清空通知
                  </NButton>
                )
              : null
          ),
        }}

      </NPopover>
    )
  },
})
