import { useWindowSize } from '@vueuse/core'
import clsx from 'clsx'
import { type ButtonProps, NButton, NDropdown, useMessage } from 'naive-ui'
import { type AsyncComponentLoader, onMounted, onUnmounted, ref, type VNodeChild, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { router } from '../../core'
import { useClient, useResource } from '../../hooks'
import { useDialog } from '../dialog'
import { useDrawer } from '../drawer'
import { useModal } from '../modal'

export interface FilterRequest {
  method?: 'get' | 'post' | 'put' | 'patch' | 'delete'
  data?: Record<string, any>
}

export interface FilterAction {
  label?: string
  labelLang?: string
  type: 'modal' | 'drawer' | 'link' | 'confirm' | 'request' | 'delete' | 'callback'
  callback?: (id?: string | number, itemData?: object) => void
  title?: string
  titleLang?: string
  content?: string
  color?: ButtonProps['type']
  icon?: string
  url?: string | ((id?: string | number, itemData?: object) => string)
  path?: string | ((id?: string | number, itemData?: object) => string)
  invalidate?: string
  component?: AsyncComponentLoader<any>
  componentProps?: Record<string, any> | ((data: any) => Record<string, any>)
  width?: number
  show?: (rowData?: object, rowIndex?: number) => boolean
  request?: FilterRequest | ((id?: string | number, itemData?: object) => FilterRequest)
}

export interface UseFilterProps {
  actions?: FilterAction[]
}

export function useFilter({ actions }: UseFilterProps) {
  const filterRef = ref<HTMLDivElement>()
  const filterHeight = ref(0)
  const filterMore = ref(false)
  const filterShow = ref(true)
  const { width } = useWindowSize()

  watch(width, (v) => {
    if (v >= 768) {
      filterShow.value = true
    }
    else {
      filterShow.value = false
      filterMore.value = true
    }
  }, { immediate: true })

  const getFilterHeight = () => {
    filterHeight.value = filterRef.value?.scrollHeight || 0
  }

  // 添加事件监听器
  onMounted(async () => {
    window.addEventListener('resize', getFilterHeight)
  })

  // 移除事件监听器
  onUnmounted(() => {
    window.removeEventListener('resize', getFilterHeight)
  })

  watch(filterRef, (v) => {
    if (!v) {
      return
    }
    setTimeout(() => {
      getFilterHeight()
    }, 100)
  })

  const actionButton = listRenderAction({ actions })

  const actionDropdown = listRenderDropdown({ actions })

  return {
    actionButton,
    actionDropdown,
    filterRef,
    filterHeight,
    filterMore,
    filterShow,
    width,
  }
}

export interface TriggerAction {
  id?: string | number
  item: FilterAction
  itemData?: object
  width?: number | string
}

export function useAction({ url }: { url?: string }) {
  const res = useResource()
  const { t } = useI18n()
  const modal = useModal()
  const drawer = useDrawer()
  const dialog = useDialog()
  const client = useClient()
  const message = useMessage()

  const trigger = ({ item, id, itemData }: TriggerAction) => {
    const title = item?.titleLang ? t(item.titleLang) : item.title
    const label = item?.labelLang ? t(item.labelLang) : item.label
    const componentProps = typeof item.componentProps === 'function' ? item.componentProps(itemData) : item.componentProps

    if (item.type === 'modal') {
      modal?.show({
        title: title || label,
        component: item.component,
        componentProps: {
          ...componentProps,
          id,
        },
        width: item.width,
      })
    }
    if (item.type === 'drawer' && item.component) {
      drawer?.show({
        title: title || label,
        component: item.component,
        componentProps: {
          ...componentProps,
          id,
        },
        width: item.width,
      })
    }
    if (item.type === 'confirm') {
      dialog?.confirm({
        title: title || label,
        content: item?.content,
      }).then(() => {
        item.callback?.(id, itemData)
      })
    }

    if (item.type === 'request') {
      dialog?.confirm({
        title: title || label,
        content: item?.content,
      }).then(() => {
        const request = typeof item.request === 'function' ? item.request?.(id, itemData) : item.request
        const methodName = (request?.method || 'post').toLowerCase()

        let req = client.post
        switch (methodName) {
          case 'get':
            req = client.get
            break
          case 'post':
            req = client.post
            break
          case 'put':
            req = client.put
            break
          case 'patch':
            req = client.patch
            break
          case 'delete':
            req = client.delete
            break
        }

        req({
          url: typeof item.url === 'function' ? item.url?.(id, itemData) : (item.url ? `${item.url}/${id}` : `${url}/${id}`),
          data: request?.data,
        }).then(() => {
          client.invalidate(item.invalidate || (typeof item.url === 'string' ? item.url : url))
        }).catch((res) => {
          message.error(res?.message || t('message.requestError'))
        })
      })
    }
    if (item.type === 'delete') {
      dialog?.confirm({
        title: title || label,
        content: item?.content,
      }).then(() => {
        client.delete({
          url: typeof item.url === 'function' ? item.url?.(id, itemData) : (item.url ? `${item.url}/${id}` : `${url}/${id}`),
        }).then(() => {
          client.invalidate(item.invalidate || (typeof item.url === 'string' ? item.url : url))
        }).catch((res) => {
          message.error(res?.message || t('message.requestError'))
        })
      })
    }
    if (item.type === 'link') {
      router.push({
        path: typeof item.path === 'function' ? item.path?.(id, itemData) : res.genPath(id ? `${item.path}/${id}` : item.path),
      })
    }
    if (item.type === 'callback') {
      item.callback?.(id, itemData)
    }
  }

  return {
    trigger,
  }
}

export interface RenderActionProps {
  key?: string | number
  text?: boolean
  actions?: FilterAction[]
  rowData?: object
  rowIndex?: number
  url?: string
}

// 渲染操作按钮
export function listRenderAction({ key, text, rowData, rowIndex, actions, url }: RenderActionProps): VNodeChild {
  const { trigger } = useAction({ url })
  const { t } = useI18n()

  return (
    <>
      {actions?.map((item, index) => {
        if (item?.show && !item.show(rowData, rowIndex)) {
          return null
        }
        return (
          <NButton
            key={index}
            text={text}
            type={item.color}
            onClick={() => {
              trigger({
                item,
                itemData: rowData,
                id: key ? rowData?.[key] : null,
              })
            }}
            renderIcon={
              item?.icon
                ? () => (
                    <div class={clsx([
                      'n-icon',
                      item.icon,
                    ])}
                    >
                    </div>
                  )
                : undefined
            }
          >
            {item.labelLang ? t(item.labelLang) : item.label}
          </NButton>
        )
      })}
    </>
  )
}

export function listRenderDropdown({ actions }: RenderActionProps): VNodeChild {
  const { trigger } = useAction({})
  const { t } = useI18n()

  return (
    actions && actions?.length > 0
      ? (
          <NDropdown
            trigger="click"
            options={actions?.map((item, index) => {
              return {
                label: item.labelLang ? t(item.labelLang) : item.label,
                key: index,
                icon: item?.icon ? () => <div class={`n-icon ${item.icon}`}></div> : undefined,
              }
            })}
            onSelect={(key) => {
              if (!actions?.[key]) {
                return
              }
              trigger({
                item: actions[key],
              })
            }}
          >
            {{
              default: () => <NButton type="default" secondary renderIcon={() => <div class="i-tabler:grid-dots"></div>}></NButton>,
            }}
          </NDropdown>
        )
      : null
  )
}
