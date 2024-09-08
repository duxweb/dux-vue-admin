import type { DataTableFilterState, DataTableProps, DataTableSortState, PaginationProps } from 'naive-ui'
import { NButton, NCheckbox, NDropdown, NPopover, NTooltip, useMessage } from 'naive-ui'
import { computed, onMounted, reactive, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useForm } from 'alova/client'
import { useModal } from '../modal'
import { useDrawer } from '../drawer'
import { useDialog } from '../dialog'
import { useClient } from '../../hooks/client'
import router from '../../router'
import { columnMap, columnMedia, columnStatus, columnTags, columnText, columnType } from './column'
import { tableAction } from './table/action'
import type { HandleAction, TableColumn, UseTableProps, UseTableResult } from './types'

/**
 * 表格 hook
 * @param tableRef 表格对象
 * @param name 资源名称
 * @param url 请求path
 * @param actions 表格操作
 * @param columns 表格列
 * @param columnActions 表格列操作
 * @returns
 */
export function useTable({ tableRef, name, url, actions, columns, columnActions, key = 'id' }: UseTableProps): UseTableResult {
  const client = useClient()
  const message = useMessage()
  const modal = useModal()
  const dialog = useDialog()
  const drawer = useDrawer()

  // 增加默认显示，用于过滤列
  const formatColumns = columns?.map((item: any) => {
    item.show = true
    return item
  })

  const tableColumns = ref<TableColumn[]>(formatColumns)

  // 处理自定义列配置
  const resultColumns = computed(() => {
    const restColumns = tableColumns.value?.filter((item) => {
      return item.show
    })?.map((item) => {
      const { renderType, renderProps, ...itemProps } = item

      // 增加通用 key 配置
      const params: Record<string, any> = { key: item?.key, ...renderProps }

      // 处理渲染类型
      if (item.renderType === 'text') {
        return {
          ...itemProps,
          render: columnText(params),
        }
      }
      if (item.renderType === 'media') {
        return {
          ...itemProps,
          render: columnMedia(params),
        }
      }
      if (item.renderType === 'status') {
        return {
          ...itemProps,
          render: columnStatus(params),
        }
      }
      if (item.renderType === 'tags') {
        return {
          ...itemProps,
          render: columnTags(params),
        }
      }
      if (item.renderType === 'type') {
        return {
          ...itemProps,
          render: columnType(params),
        }
      }
      if (item.renderType === 'map') {
        return {
          ...itemProps,
          render: columnMap(params),
        }
      }
      return item
    })

    // 行操作渲染
    if (columnActions && columnActions?.length > 0) {
      const columnWidth = columnActions.reduce((accumulator, currentValue) => {
        return accumulator + currentValue.label?.length * 22
      }, 0)

      restColumns.push({
        title: '操作',
        fixed: 'right',
        align: 'center',
        width: columnWidth,
        render: (rowData, rowIndex) => {
          return <div class="flex gap-2 justify-center">{tableAction({ key, rowData, rowIndex, text: true, actions: columnActions, modal, dialog, drawer })}</div>
        },

      } as any)
    }

    return restColumns
  })

  // 表格数据
  const tableData = ref([])

  const pagination = reactive<PaginationProps>({
    page: 1,
    pageSize: 10,
  })
  const sorter = reactive<Record<string, any>>({})
  const filters = reactive<Record<string, any>>({})

  const {
    loading,
    form,
    send,
    onSuccess,
    onError,
  } = useForm(
    (formData: Record<string, any>) => {
      return client.get({
        url,
        params: { ...pagination, ...sorter, ...filters, ...formData },
        config: {
          name: name || url,
        },
      })
    },
    {
      initialForm: {},
    },
  )

  onSuccess((res) => {
    tableData.value = res.data?.data || []
  })

  onError((res) => {
    message.error(res?.error?.message || '筛选提交异常')
  })

  // 筛选提交
  const onFilter = () => {
    send()
  }

  // 表格列设置
  const toolsColumns = (
    <div>
      <NPopover
        placement="bottom-end"
        trigger="click"
      >
        {{
          default: () => (
            <div class="w-200px">
              <VueDraggable
                modelValue={tableColumns.value}
                {...{
                  'onUpdate:modelValue': v => tableColumns.value = v,
                }}
                class="flex flex-col"
                handle=".handle"
              >
                {tableColumns?.value?.map((item: Record<string, unknown>, key: number) => (
                  <div key={key} class="flex py-1 gap-2 items-center">
                    <div class="flex-none">
                      <NCheckbox
                        checked={!!item.show}
                        {...{
                          'onUpdate:checked': (v) => {
                            item.show = v
                            tableColumns.value = [...tableColumns?.value]
                          },
                        }}
                      >
                      </NCheckbox>
                    </div>
                    <div class="flex-1">{item.title}</div>
                    <div class="flex-none">
                      <div class="i-tabler:grid-dots size-4 handle cursor-pointer"></div>
                    </div>
                  </div>
                ))}
              </VueDraggable>
            </div>
          ),
          trigger: () => (
            <NTooltip>
              {{
                default: () => '列设置',
                trigger: () => <NButton secondary renderIcon={() => <div class="i-tabler:columns" />} />,
              }}
            </NTooltip>
          ),
        }}
      </NPopover>
    </div>
  )

  // 表格工具
  const toolsBtn = (
    <div>
      <NDropdown
        options={[
          {
            label: '刷新数据',
            key: 'refresh',
          },
          {
            label: '导出 CSV',
            key: 'export',
          },
        ]}
        onSelect={(key) => {
          if (key === 'refresh') {
            send()
          }
          if (key === 'export') {
            tableRef?.value?.downloadCsv({ fileName: 'data-table' })
          }
        }}
      >
        <NButton secondary renderIcon={() => <div class="i-tabler:dots-vertical" />} />
      </NDropdown>

    </div>
  )

  onMounted(() => {
    send()
  })

  // 分页处理
  const onUpdatePageSize = (v) => {
    pagination.pageSize = v
    send()
  }

  const onUpdatePage = (v) => {
    pagination.page = v
    send()
  }

  // 排序处理
  const onUpdateSorter = (v: DataTableSortState | DataTableSortState[] | null) => {
    const list = Array.isArray(v) ? v : [v]
    list?.forEach((item) => {
      if (!item?.columnKey) {
        return
      }
      if (item.order) {
        sorter[`${item.columnKey}_sort`] = item.order === 'ascend' ? 'asc' : 'desc'
      }
      else {
        delete sorter[`${item.columnKey}_sort`]
      }
    })
    send()
  }

  // 筛选处理
  const onUpdateFilters = (v: DataTableFilterState) => {
    Object.entries(v).forEach(([key, value]) => {
      filters[key] = value
    })
    send()
  }

  // 表格扩展参数
  const tableParams: DataTableProps = {
    pagination: pagination as any,
    onUpdatePageSize,
    onUpdatePage,
    onUpdateSorter,
    onUpdateFilters,
  }
  const tableActions = tableAction({ actions, modal, drawer })

  // 移动端操作
  const dropdownActions = (
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
        handleAction({
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

  return {
    tableActions,
    dropdownActions,
    tableColumns: resultColumns,
    toolsColumns,
    toolsBtn,
    onFilter,
    filterModel: form,
    loading,
    data: tableData,
    pagination,
    tableParams,
  }
}

/**
 * 操作处理
 * @param item 操作配置
 */
export function handleAction({ id, item, modal, dialog, drawer }: HandleAction) {
  if (item.type === 'modal') {
    modal.show({
      title: item?.title || item?.label,
      component: item.component,
      componentProps: {
        ...item.componentProps,
        id,
      },
    })
  }
  if (item.type === 'drawer') {
    drawer.show({
      title: item?.title || item?.label,
      component: item.component,
      componentProps: {
        ...item.componentProps,
        id,
      },
    })
  }

  if (item.type === 'confirm') {
    dialog.confirm({
      title: item?.title,
      content: item?.content,
    })
  }
  if (item.type === 'link') {
    router.push(item.path)
  }
}
