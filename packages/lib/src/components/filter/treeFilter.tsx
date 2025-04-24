import type { DropdownOption, TreeDropInfo, TreeOption } from 'naive-ui'
import type { PropType } from 'vue'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NCard, NDropdown, NInput, NScrollbar, NSpin, NTree } from 'naive-ui'
import { computed, defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClient } from '../../hooks'
import { useCascader } from '../cascader'

export interface TreeMenu {
  label?: string
  value?: string
  icon?: string
  onSelect: (option?: TreeOption) => void
}

export const DuxTreeFilter = defineComponent({
  name: 'DuxTreeFilter',
  props: {
    url: String,
    params: Object as PropType<Record<string, any>>,
    menus: Array as PropType<TreeMenu[]>,
    title: String,
    numField: String,
    iconField: String,
    sortUrl: String,
    value: Array as PropType<(string | number)[]>,
    defaultValue: Array as PropType<(string | number)[]>,
    draggable: {
      type: Boolean,
      default: true,
    },
    invalidate: String,
  },
  extends: NTree,
  setup(props, { emit, slots }) {
    const model = useVModel(props, 'value', emit, {
      passive: false,
      defaultValue: props.defaultValue,
    })

    const params = computed(() => props.params || {})
    const url = computed(() => props.url || '')

    const dropdownOption = ref<TreeOption>()
    const x = ref(0)
    const y = ref(0)

    const data = ref<TreeOption[]>([])
    const client = useClient()

    const { options, loading, expanded } = useCascader({
      url,
      params,
      invalidate: props.invalidate,
    })

    watch(options, (v) => {
      data.value = v?.data || []
    }, { immediate: true, deep: true })

    const dropdownShow = ref(false)
    const dropdownOptions = computed<DropdownOption[]>(() => {
      return props.menus?.map((menu) => {
        return {
          label: menu.label,
          key: menu.value,
          icon: menu?.icon ? () => <div class={menu?.icon}></div> : undefined,
          onSelect: menu.onSelect,
        } as DropdownOption
      }) || []
    })

    const handleSelect = (value) => {
      const menu = props.menus?.find(menu => menu.value === value)
      if (menu) {
        menu.onSelect(dropdownOption.value)
      }
      dropdownShow.value = false
    }

    const keyword = ref<string>()

    const findParentNode = (
      tree: TreeOption[],
      targetId: any,
    ): TreeOption | undefined => {
      for (const node of tree) {
        if (node.children) {
          for (const child of node.children) {
            if (child.id === targetId) {
              return node
            }
          }
          const parentNode = findParentNode(node.children, targetId)
          if (parentNode) {
            return parentNode
          }
        }
      }
    }

    const handleDrop = ({ node, dragNode, dropPosition }: TreeDropInfo) => {
      // 找到源节点和目标节点的父节点
      const oldParent = findParentNode(data.value, dragNode.id)
      const isTopLevelDrag = !oldParent

      // 从原位置移除节点
      if (isTopLevelDrag) {
        const index = data.value.findIndex(item => item.id === dragNode.id)
        if (index >= 0)
          data.value.splice(index, 1)
      }
      else {
        const index = oldParent?.children?.indexOf(dragNode) || 0
        oldParent?.children?.splice(index, 1)
      }

      // 确定目标位置信息
      let parent = findParentNode(data.value, node.id)
      let beforeId: any
      let targetCollection: TreeOption[] = parent?.children || data.value
      let insertPosition = 0 // 默认插入到开头

      // 根据放置位置确定插入位置
      switch (dropPosition) {
        case 'before':
          // 计算放在目标节点之前的位置
          insertPosition = targetCollection.findIndex(item => item.id === node.id)
          // 如果要放到第一个位置，beforeId应该是undefined
          if (insertPosition > 0) {
            beforeId = targetCollection[insertPosition - 1].id
          }
          break

        case 'inside':
          // 放在目标节点内部
          parent = node
          targetCollection = parent.children = parent.children || []
          // 默认添加到末尾
          insertPosition = targetCollection.length
          break

        case 'after':
          // 放在目标节点之后
          insertPosition = targetCollection.findIndex(item => item.id === node.id) + 1
          beforeId = node.id
          break
      }

      // 在目标位置插入节点
      targetCollection.splice(insertPosition, 0, dragNode as any)

      // 更新数据引用，触发视图更新
      data.value = [...data.value]

      // 发送排序请求到服务器
      loading.value = true
      client?.post({
        url: props.sortUrl,
        data: {
          parent_id: parent?.id,
          before_id: beforeId,
          id: dragNode.id,
        },
      }).then(() => {
        client.invalidate(props.url)
      }).finally(() => {
        loading.value = false
      })
    }

    const expandedKeys = ref<(string | number)[]>([])
    const { t } = useI18n()

    watch(expanded, (v) => {
      if (expandedKeys?.value?.length > 0) {
        return
      }
      expandedKeys.value = v
    }, { immediate: true })

    return () => (

      <NCard class="h-full" contentClass="p-0! h-full flex flex-col">
        {props?.title && (
          <div class="px-2 py-3 pb-1 text-base font-bold">
            {props.title}
          </div>
        )}
        <div class="p-2 flex gap-2 items-center">
          <div class="flex-1">
            {slots.header
              ? slots.header()
              : (
                  <NInput v-model:value={keyword.value} placeholder={t('components.tree.placeholder')} />
                )}
          </div>
          {slots.tools?.()}
        </div>
        <NScrollbar class="flex-1 min-h-1" xScrollable>
          <div class="p-2">
            <NSpin show={loading.value} class="h-full">
              <NTree
                {...props}
                data={data.value || []}
                expandedKeys={expandedKeys.value}
                onUpdateExpandedKeys={(v) => {
                  expandedKeys.value = v
                }}
                blockLine
                selectedKeys={model.value}
                onUpdateSelectedKeys={(v) => {
                  model.value = v
                }}
                onDrop={handleDrop}
                pattern={keyword.value}
                renderPrefix={props?.numField || (props?.iconField)
                  ? ({ option }) => {
                      return (
                        <>
                          {props.iconField && option[props.iconField] && (
                            <div class={clsx(
                              option[props.iconField] || '',
                              'size-4',
                            )}
                            />
                          )}
                          {props.numField && <div class="rounded-full bg-primary px-2 text-xs text-white">{option[props.numField as any] || 0}</div>}
                        </>
                      )
                    }
                  : undefined}
                nodeProps={({ option }) => {
                  return {
                    onContextmenu: (e) => {
                      dropdownOption.value = option
                      dropdownShow.value = true
                      x.value = e.clientX
                      y.value = e.clientY
                      e.preventDefault()
                    },
                  }
                }}
              />
            </NSpin>
          </div>
        </NScrollbar>
        <NDropdown
          trigger="manual"
          placement="bottom-start"
          show={dropdownShow.value}
          options={dropdownOptions.value as any}
          x={x.value}
          y={y.value}
          width={100}
          onSelect={handleSelect}
          onClickoutside={() => {
            dropdownShow.value = false
          }}
        />
      </NCard>
    )
  },
})
