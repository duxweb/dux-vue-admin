import { useWindowSize } from '@vueuse/core'
import clsx from 'clsx'
import { type ButtonProps, NButton, NDropdown } from 'naive-ui'
import { type AsyncComponentLoader, onMounted, onUnmounted, ref, type VNodeChild, watch } from 'vue'
import { router } from '../../core'
import { useDialog, type UseDialogResult } from '../dialog'
import { useDrawer, type UseDrawerResult } from '../drawer'
import { useModal, type UseModalResult } from '../modal'

export interface FilterAction {
  label: string
  type: 'modal' | 'drawer' | 'link' | 'confirm'
  title?: string
  content?: string
  color?: ButtonProps['type']
  icon?: string
  path?: string
  component?: AsyncComponentLoader<any>
  componentProps?: Record<string, any>
  show?: (rowData?: object, rowIndex?: number) => boolean
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

export interface ListHandleAction {
  id?: string | number
  item: FilterAction
  modal?: UseModalResult
  dialog?: UseDialogResult
  drawer?: UseDrawerResult
}

// 操作执行处理
export function listHandleAction({ id, item, modal, dialog, drawer }: ListHandleAction) {
  if (item.type === 'modal') {
    modal?.show({
      title: item?.title || item?.label,
      component: item.component,
      componentProps: {
        ...item.componentProps,
        id,
      },
    })
  }
  if (item.type === 'drawer' && item.component) {
    drawer?.show({
      title: item?.title || item?.label,
      component: item.component,
      componentProps: {
        ...item.componentProps,
        id,
      },
    })
  }

  if (item.type === 'confirm') {
    dialog?.confirm({
      title: item?.title,
      content: item?.content,
    })
  }
  if (item.type === 'link') {
    router.push(item.path || '')
  }
}

export interface RenderActionProps {
  key?: string | number
  text?: boolean
  actions?: FilterAction[]
  rowData?: object
  rowIndex?: number
}

// 渲染操作按钮
export function listRenderAction({ key, text, rowData, rowIndex, actions }: RenderActionProps): VNodeChild {
  const modal = useModal()
  const dialog = useDialog()
  const drawer = useDrawer()

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
            onClick={() => listHandleAction({ id: key ? rowData?.[key] : null, item, modal, dialog, drawer })}
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
            {item.label}
          </NButton>
        )
      })}
    </>
  )
}

export function listRenderDropdown({ actions }: RenderActionProps): VNodeChild {
  const modal = useModal()
  const dialog = useDialog()
  const drawer = useDrawer()
  return (
    <NDropdown
      trigger="click"
      options={actions?.map((item, index) => {
        return {
          label: item.label,
          key: index,
          icon: item?.icon ? () => <div class={`n-icon ${item.icon}`}></div> : undefined,
        }
      })}
      onSelect={(key) => {
        if (!actions?.[key]) {
          return
        }
        listHandleAction({
          item: actions[key],
          modal,
          dialog,
          drawer,
        })
      }}
    >
      {{
        default: () => <NButton type="default" secondary renderIcon={() => <div class="i-tabler:grid-dots"></div>}></NButton>,
      }}
    </NDropdown>
  )
}
