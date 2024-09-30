import { usePagination } from 'alova/client'
import { NButton, NCheckbox, NDropdown, NPopover, NTooltip, useMessage } from 'naive-ui'
import { computed, reactive, ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import type { DataTableColumn, DataTableFilterState, DataTableSortState } from 'naive-ui'
import { useClient } from '../../hooks/useClient'
import { useExportExcel, useImportExcel } from '../excel'
import { listRenderAction } from '../filter'
import { columnMap, columnMedia, columnStatus, columnTags, columnText, columnType } from './column'
import type { TableAction, TableColumn, UseTableProps, UseTableResult } from './types'

export function useTable({ form, url, columns, columnActions, excelColumns, export: exportStatus, import: importStatus, key = 'id' }: UseTableProps): UseTableResult {
  const client = useClient()
  const message = useMessage()
  const excelExport = useExportExcel()
  const excelImport = useImportExcel()

  // 增加默认显示，用于过滤列
  const formatColumns = columns?.map((item: any) => {
    item.show = true
    return item
  })

  const tableColumns = ref<TableColumn[]>(formatColumns)

  // 处理自定义列配置
  const resultColumns = computed(() => {
    return convertTableColumns(key, tableColumns.value, columnActions)
  })

  // 表格数据
  const sorter = reactive<Record<string, any>>({})
  const filters = reactive<Record<string, any>>({})

  const {
    page,
    pageSize,
    pageCount,
    data: tableData,
    loading,
    send,
    // onSuccess,
    onError,
  } = usePagination(
    (page, pageSize) => {
      return client.get({
        url,
        params: {
          page,
          pageSize,
          ...sorter,
          ...filters,
          ...form?.value,
        },
      })
    },
    {
      initialData: {
        total: 0,
        data: [],
      },
      initialPage: 1,
      initialPageSize: 20,
      total: res => res.meta?.total || 0,
    },
  )

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

  const toolsOptions = [
    {
      label: '刷新数据',
      key: 'refresh',
    },
  ]

  if (exportStatus) {
    toolsOptions.push({
      label: '导出 Excel',
      key: 'export',
    })
  }

  if (importStatus) {
    toolsOptions.push({
      label: '导入 Excel',
      key: 'import',
    })
  }

  // 表格工具
  const toolsBtn = (
    <div>
      <NDropdown
        options={toolsOptions}
        onSelect={(key) => {
          if (key === 'refresh') {
            send()
          }
          if (key === 'export') {
            excelExport.onSend({
              url,
              params: { ...filters.value, ...sorter.value },
              columns: excelColumns || tableColumns.value.map((item: Record<string, any>) => {
                return {
                  header: item.title,
                  key: item.key,

                }
              }),
            })
          }
          if (key === 'import') {
            const input = document.createElement('input')
            input.type = 'file'
            input.style.display = 'none'
            input.click()

            input.addEventListener('change', (event: any) => {
              const fileSelect = event?.target?.files?.[0] as Blob
              excelImport.onSend({
                blob: fileSelect,
                url: '/import',
                params: form?.value,
                columns: excelColumns || tableColumns.value.map((item: Record<string, any>) => {
                  return {
                    header: item.title,
                    key: item.key,
                  }
                }),
              })
            })
          }
        }}
      >
        <NButton secondary renderIcon={() => <div class="i-tabler:dots-vertical" />} />
      </NDropdown>

    </div>
  )

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
  const tableParams = computed(() => {
    return {
      remote: true,
      onUpdateSorter,
      onUpdateFilters,
    }
  })

  // 分页处理
  const onUpdatePageSize = (v) => {
    pageSize.value = v
    page.value = 1
  }

  const onUpdatePage = (v) => {
    page.value = v
  }

  const pagination = computed(() => {
    return {
      page: page.value,
      pageSize: pageSize.value,
      pageCount: pageCount.value,
      pageSizes: [10, 20, 30, 40, 50],
      onUpdatePageSize,
      onUpdatePage,
      showSizePicker: true,
      showQuickJumper: true,
    }
  })

  return {
    tableColumns: resultColumns,
    toolsColumns,
    toolsBtn,
    onFilter,
    loading,
    data: tableData,
    tableParams,
    pagination,
  }
}

export function convertTableColumns(key: string | number, columns?: TableColumn[], actions?: TableAction[]): DataTableColumn[] {
  const restColumns = columns?.filter((item) => {
    return item.show === undefined || item.show === true
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
    if (item.render && typeof item.render === 'function') {
      return {
        ...itemProps,
        render: item.render,
      }
    }
    return item
  }) || []

  // 行操作渲染
  if (actions && actions?.length > 0) {
    const columnWidth = actions.reduce((accumulator, currentValue) => {
      return accumulator + currentValue.label?.length * 22
    }, 0)

    restColumns.push({
      title: '操作',
      fixed: 'right',
      align: 'center',
      width: columnWidth,
      render: (rowData, rowIndex) => {
        return <div class="flex gap-2 justify-center">{listRenderAction({ key, rowData, rowIndex, text: true, actions })}</div>
      },

    } as any)
  }

  return restColumns
}
