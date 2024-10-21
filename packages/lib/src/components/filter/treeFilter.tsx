import type { DropdownOption, TreeDropInfo, TreeOption } from 'naive-ui'
import type { PropType } from 'vue'
import type { UseTableResult } from '../table'
import { useVModel } from '@vueuse/core'
import { NCard, NDropdown, NInput, NScrollbar, NSpin, NTree } from 'naive-ui'
import { computed, defineComponent, inject, ref, watch } from 'vue'
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
    sortUrl: String,
    value: Array as PropType<(string | number)[]>,
    defaultValue: Array as PropType<(string | number)[]>,
  },
  extends: NTree,
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const useParams = ref({})
    const useUrl = ref(props.url)

    const dropdownOption = ref<TreeOption>()
    const x = ref(0)
    const y = ref(0)

    const data = ref([])
    const client = useClient()

    watch(() => props.params, (val) => {
      useParams.value = val || {}
    })

    const { options, loading } = useCascader({
      url: useUrl,
      params: useParams,
    })

    watch(options, () => {
      data.value = options.value?.data || []
    })

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
      // 查找拖动节点所在父节点
      const oldParent = findParentNode(data.value, dragNode.id)
      const oldIndex = oldParent?.children?.indexOf(dragNode) || 0

      let parent = findParentNode(data.value, node.id)

      let beforeId
      let beforeIndex

      switch (dropPosition) {
        case 'before':
          beforeId = undefined
          break
        case 'inside':
          parent = node
          beforeIndex = parent?.children?.length || 0
          beforeId = undefined
          break
        case 'after':
          beforeId = node.id
          beforeIndex = parent?.children?.indexOf(node) || 0
          break
      }
      oldParent?.children?.splice(oldIndex, 1)
      parent?.children?.splice(beforeIndex + 1, 0, dragNode)

      data.value = [...data.value]

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

    const table = inject<UseTableResult>('table')
    watch(model, () => {
      table?.send()
    })

    return () => (

      <NCard class="h-full" contentClass="p-0! h-full flex flex-col">
        {props?.title && (
          <div class="px-2 py-3 pb-1 text-base font-bold">
            {props.title}
          </div>
        )}
        <div class="p-2">
          <NInput v-model:value={keyword.value} placeholder="输入关键词搜索" />
        </div>
        <NScrollbar class="flex-1 h-1" xScrollable>
          <div class="p-2">
            <NSpin show={loading.value} class="h-full">
              <NTree
                {...props}
                data={data.value || []}
                defaultExpandAll
                blockLine
                draggable
                selectedKeys={model.value}
                onUpdateSelectedKeys={(v) => {
                  model.value = v
                }}
                onDrop={handleDrop}
                pattern={keyword.value}
                renderPrefix={props?.numField
                  ? ({ option }) => {
                      return (
                        <div class="rounded-full bg-primary px-2 text-xs text-white">{option[props.numField as any] || 0}</div>
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
