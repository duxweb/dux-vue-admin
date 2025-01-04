import type { BaseEdgeModel, BaseNodeModel } from '@logicflow/core'
import type { PropType } from 'vue'
import LogicFlow from '@logicflow/core'
import clsx from 'clsx'
import { NButton, NDropdown } from 'naive-ui'
import { defineComponent, nextTick, onMounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import Accept from './edge/accept'
import Reject from './edge/reject'
import EndNode from './node/end'
import Node from './node/node'
import StartNode from './node/start'

export const DuxFlow = defineComponent({
  name: 'DuxFlow',
  props: {
    panels: Array as PropType<{
      label: string
      type: string
      icon: string
      callback: () => void
    }[]>,
    data: {
      type: Object as PropType<{
        nodes: any[]
        edges: any[]
      }>,
      default: () => ({
        nodes: [],
        edges: [],
      }),
    },
    onSubmit: {
      type: Function as PropType<(data: any) => void>,
      default: () => {},
    },
    onEdit: {
      type: Function as PropType<(node: any, lf: LogicFlow) => void>,
      default: () => {},
    },
  },
  setup(props) {
    const { t } = useI18n()

    const container = ref<HTMLDivElement>()
    const lf = ref<LogicFlow>()

    const dropdownNodeShow = ref(false)
    const dropdownNodeX = ref(0)
    const dropdownNodeY = ref(0)
    const dropdownNode = ref<BaseNodeModel>()

    watch(() => props.data, (value) => {
      lf.value?.renderRawData(value)
    }, { immediate: true })

    const nodeMenu = ref([
      {
        label: t('components.flow.edit'),
        key: 'edit',
        icon: () => <div class="i-tabler:pencil" />,
        callback: () => {
          if (!dropdownNode?.value || !lf?.value) {
            return
          }
          props.onEdit(dropdownNode.value, lf.value)
        },
      },
      {
        label: t('components.flow.delete'),
        key: 'delete',
        icon: () => <div class="i-tabler:trash" />,
        callback: () => {
          if (!dropdownNode?.value || !lf?.value) {
            return
          }
          lf.value?.deleteNode(dropdownNode.value.id)
        },
      },
    ])

    const dropdownEdgeShow = ref(false)
    const dropdownEdgeX = ref(0)
    const dropdownEdgeY = ref(0)
    const dropdownEdge = ref<BaseEdgeModel>()

    const edgeMenu = ref([
      {
        label: t('components.flow.accept'),
        key: 'accept',
        icon: () => <div class="i-tabler:arrow-right" />,
        callback: () => {
          if (!dropdownEdge?.value || !lf?.value) {
            return
          }
          lf.value?.changeEdgeType(dropdownEdge.value.id, 'accept')
        },
      },
      {
        label: t('components.flow.reject'),
        key: 'reject',
        icon: () => <div class="i-tabler:arrow-left" />,
        callback: () => {
          if (!dropdownEdge?.value || !lf?.value) {
            return
          }
          lf.value?.changeEdgeType(dropdownEdge.value.id, 'reject')
        },
      },
      {
        label: t('components.flow.delete'),
        key: 'delete',
        icon: () => <div class="i-tabler:trash" />,
        callback: () => {
          if (!dropdownEdge?.value || !lf?.value) {
            return
          }
          lf.value?.deleteEdge(dropdownEdge.value.id)
        },
      },
    ])

    onMounted(() => {
      lf.value = new LogicFlow({
        container: container.value!,
        stopScrollGraph: true,
        stopZoomGraph: true,
        textEdit: false,
        edgeType: 'accept',
        edgeTextEdit: false,
        nodeTextEdit: false,
        grid: {
          type: 'dot',
          size: 20,
        },
        plugins: [],
      })

      lf.value?.on('node:contextmenu', ({ data, e }) => {
        dropdownNodeShow.value = false
        nextTick().then(() => {
          dropdownNodeShow.value = true
          dropdownNodeX.value = e.clientX
          dropdownNodeY.value = e.clientY
          dropdownNode.value = data as BaseNodeModel
        })
      })

      lf.value?.on('edge:contextmenu', ({ data, e }) => {
        dropdownEdgeShow.value = false
        nextTick().then(() => {
          dropdownEdgeShow.value = true
          dropdownEdgeX.value = e.clientX
          dropdownEdgeY.value = e.clientY
          dropdownEdge.value = data as BaseEdgeModel
        })
      })

      lf.value?.register(StartNode)
      lf.value?.register(Node)
      lf.value?.register(EndNode)

      lf.value?.register(Accept)
      lf.value?.register(Reject)

      lf.value?.on('node:dbclick', ({ data }) => {
        if (!lf.value) {
          return
        }
        dropdownNode.value = data as BaseNodeModel
        props.onEdit(dropdownNode.value, lf.value)
      })

      lf.value?.render({})
    })

    return () => (
      <div class="size-full relative">
        <div id="container" ref={container} class="w-full h-full" />
        <div class="py-2 bg-gray-1 absolute top-2 left-2 shadow flex flex-col rounded">
          {props.panels?.map((item, index) => (
            <div
              key={index}
              class="flex flex-col items-center justify-center select-none gap-1 hover:bg-primary/5 px-4 py-2"
              onMousedown={() => {
                lf.value?.dnd.startDrag({
                  type: item.type,
                  text: item.label,
                })
              }}
            >
              <div class="text-sm text-gray-500">
                <div class={clsx([
                  'size-6',
                  item.icon,
                ])}
                />
              </div>
              <div class="text-sm font-medium">{item.label}</div>

            </div>
          ))}
        </div>

        <div class="right-2 top-2 absolute flex gap-2 flex-wrap">
          <NButton
            type="default"
            secondary
            onClick={() => {
              lf.value?.zoom(true)
            }}
            renderIcon={() => <div class="i-tabler:zoom-in" />}
          >
            {t('components.flow.zoomIn')}
          </NButton>
          <NButton
            type="default"
            secondary
            onClick={() => {
              lf.value?.zoom(false)
            }}
            renderIcon={() => <div class="i-tabler:zoom-out" />}
          >
            {t('components.flow.zoomOut')}
          </NButton>
          <NButton
            type="primary"
            renderIcon={() => <div class="i-tabler:device-floppy" />}
            onClick={() => {
              props.onSubmit(lf.value?.getGraphRawData())
            }}
          >
            {t('components.flow.save')}
          </NButton>
        </div>

        <NDropdown
          placement="bottom-start"
          trigger="manual"
          x={dropdownNodeX.value}
          y={dropdownNodeY.value}
          options={nodeMenu.value}
          show={dropdownNodeShow.value}
          onClickoutside={() => {
            dropdownNodeShow.value = false
          }}
          onSelect={(key) => {
            dropdownNodeShow.value = false
            nodeMenu.value.find(item => item.key === key)?.callback?.()
          }}
        />

        <NDropdown
          placement="bottom-start"
          trigger="manual"
          x={dropdownEdgeX.value}
          y={dropdownEdgeY.value}
          options={edgeMenu.value}
          show={dropdownEdgeShow.value}
          onClickoutside={() => {
            dropdownEdgeShow.value = false
          }}
          onSelect={(key) => {
            dropdownEdgeShow.value = false
            edgeMenu.value.find(item => item.key === key)?.callback?.()
          }}
        />
      </div>
    )
  },
})
