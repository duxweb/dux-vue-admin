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

    const useParams = ref(props.params || {})
    const useUrl = ref(props.url)

    const dropdownOption = ref<TreeOption>()
    const x = ref(0)
    const y = ref(0)

    const data = ref([])
    const client = useClient()

    watch(() => props.params, (val) => {
      useParams.value = val || {}
    })

    const { options, loading, expanded } = useCascader({
      url: useUrl,
      params: useParams,
      invalidate: props.invalidate,
    })

    watch(options, () => {
      data.value = options.value?.data || []
    }, { immediate: true })

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
      const oldParent = findParentNode(data.value, dragNode.id)
      const oldIndex = oldParent?.children?.indexOf(dragNode) || 0

      let parent = findParentNode(data.value, node.id)

      let beforeId
      let beforeIndex

      switch (dropPosition) {
        case 'before':
          if (parent?.children) {
            beforeIndex = parent.children.findIndex((item: any) => item.id === node.id) - 1
            beforeId = beforeIndex >= 0 ? parent.children[beforeIndex]?.id : undefined
          }
          else {
            beforeIndex = data.value.findIndex((item: TreeOption) => item.id === node.id) - 1
            beforeId = beforeIndex >= 0 && data.value[beforeIndex] ? (data.value[beforeIndex] as any).id : undefined
          }
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
        <NScrollbar class="flex-1 h-1" xScrollable>
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
