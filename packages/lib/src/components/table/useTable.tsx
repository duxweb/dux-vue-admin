import type { DataTableColumns, DataTableFilterState, DataTableRowKey, DataTableSortState } from 'naive-ui'
import type { Ref } from 'vue'
import type { BatchAction, TableAction, TableColumn, UseTableProps, UseTableResult } from './types'
import { useWindowSize } from '@vueuse/core'
import { actionDelegationMiddleware, usePagination } from 'alova/client'
import { NButton, NCheckbox, NDropdown, NPopover, NTooltip, useMessage } from 'naive-ui'
import { computed, reactive, ref, toRef, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useI18n } from 'vue-i18n'
import { treeToArr, useExportExcel, useImportExcel } from '../../hooks'
import { useClient } from '../../hooks/useClient'
import { useDialog } from '../dialog'
import { listRenderAction } from '../filter'
import { columnMap, columnMedia, columnStatus, columnTags, columnText, columnType } from './column'
import { columnImage } from './column/image'
import { columnSwitch } from './column/switch'

export function useTable({ filter, url, batch, columns: tableColumn, columnActions, excelColumns, export: exportStatus, import: importStatus, expanded: expandedStatus, cacheTime, key = 'id' }: UseTableProps): UseTableResult {
  const client = useClient()
  const message = useMessage()
  const excelExport = useExportExcel()
  const excelImport = useImportExcel()
  const { t } = useI18n()
  const selected = ref<never[]>([])
  const expanded = ref<never[]>([])
  const { width } = useWindowSize()

  const columns = toRef(tableColumn)

  // 表格数据
  const sorter = reactive<Record<string, any>>({})
  const filters = reactive<Record<string, any>>({})
  const meta = ref<Record<string, any>>({})

  const {
    page,
    pageSize,
    pageCount,
    data: tableData,
    loading,
    send,
    onError,
    onSuccess,
    refresh,
  } = usePagination(
    (page, pageSize) => {
      return client.get({
        url,
        params: {
          page,
          pageSize,
          ...sorter,
          ...filters,
          ...filter,
        },
        config: {
          name: url,
          cacheFor: cacheTime || 60 * 10 * 1000,
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
      middleware: actionDelegationMiddleware(url || ''),
    },
  )

  onSuccess((res) => {
    selected.value = []
    meta.value = res.data?.meta || {}
  })

  onError((res) => {
    message.error(res?.error?.message || t('components.list.getError'))
  })

  // 筛选提交
  const onSend = () => {
    send(1, pageSize.value)
  }

  // 自动展开
  watch(tableData, (val) => {
    if (expandedStatus) {
      expanded.value = treeToArr(val, key, 'children')
    }
  })

  const onUpdateExpandedRowKeys = (val) => {
    expanded.value = val
  }

  // 增加默认显示，用于过滤列
  const formatColumns = computed(() => {
    return columns?.value?.map((item: any) => {
      item.show = true
      return item
    })
  })

  const columnRender = useTableColumns({
    key,
    actions: columnActions,
    batch,
    selected,
    url,
    onSend,
  })

  const tableColumns = ref<TableColumn[]>([])

  watch(formatColumns, (val) => {
    tableColumns.value = val || []
  }, { immediate: true })

  // 处理自定义列配置
  const resultColumns = computed(() => {
    const cols = columnRender(tableColumns.value)
    return cols
  })

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
                default: () => t('components.list.columnSetting'),
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
      label: t('components.list.refresh'),
      key: 'refresh',
    },
  ]

  if (exportStatus) {
    toolsOptions.push({
      label: t('components.list.excelExport'),
      key: 'export',
    })
  }

  if (importStatus) {
    toolsOptions.push({
      label: t('components.list.excelImport'),
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
            refresh()
          }
          if (key === 'export') {
            excelExport.send({
              url,
              params: { ...filters.value, ...filter?.value, ...sorter.value },
              columns: excelColumns || tableColumns.value.map((item: Record<string, any>) => {
                return {
                  header: item.title,
                  key: item.key,

                }
              }),
            })
          }
          if (key === 'import') {
            excelImport.send({
              url: '/import',
              params: {
                ...filter?.value,
                ...filters.value,
              },
              columns: excelColumns,
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
    onSend()
  }

  // 筛选处理
  const onUpdateFilters = (v: DataTableFilterState) => {
    Object.entries(v).forEach(([key, value]) => {
      filters[key] = value
    })
    onSend()
  }

  // 多选
  const onUpdateCheckedRowKeys = (keys: DataTableRowKey[]) => {
    selected.value = keys as never[]
  }

  // 表格参数
  const tableParams = computed(() => {
    return {
      remote: true,
      checkedRowKeys: selected.value,
      onUpdateCheckedRowKeys,
      onUpdateSorter,
      onUpdateFilters,
      expandedRowKeys: expanded.value,
      onUpdateExpandedRowKeys,
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
      pageSlot: 5,
      simple: width.value < 768,
      onUpdatePageSize,
      onUpdatePage,
      showSizePicker: true,
      showQuickJumper: true,
    }
  })

  return {
    meta,
    tableColumns: resultColumns as Ref<DataTableColumns>,
    toolsColumns,
    toolsBtn,
    send: onSend,
    loading,
    data: tableData,
    tableParams,
    pagination,
    selected,
    expanded,
  }
}

interface UseTableColumnsProps {
  key: string | number
  url?: string
  batch?: BatchAction[]
  actions?: TableAction[]
  selected?: Ref<never[]>
  onSend?: () => void

}

export function useTableColumns(props: UseTableColumnsProps) {
  const dialog = useDialog()
  const { t } = useI18n()
  const client = useClient()
  const message = useMessage()

  const render = (columns?: TableColumn[]) => {
    const restColumns = columns?.filter((item) => {
      return item.show === undefined || item.show === true
    })?.map((item) => {
      const { renderType, renderProps, ...itemProps } = item

      // 增加通用 key 配置
      const params: Record<string, any> = { key: item?.key, ...renderProps }

      // 处理渲染类型
      if (!item.renderType || item.renderType === 'text') {
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
      if (item.renderType === 'image') {
        return {
          ...itemProps,
          render: columnImage(params),
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
      if (item.renderType === 'switch') {
        return {
          ...itemProps,
          render: columnSwitch(params, client, message, props.key, props.url),
        }
      }
      if (item.renderType === 'render' || (item.render && typeof item.render === 'function')) {
        return {
          ...itemProps,
          title: itemProps.titleLang ? t(itemProps.titleLang) : itemProps.title,
          render: item.render,
        }
      }
      return item
    }) || []

    // 多选操作
    if (props.batch) {
      restColumns.unshift({
        width: 80,
        multiple: true,
        type: 'selection',
        options: props.selected && props.selected.value?.length > 0
          ? props.batch?.map((item) => {
            return {
              label: item.labelLang ? t(item.labelLang) : item.label,
              icon: item?.icon ? () => <div class={`n-icon ${item.icon}`}></div> : undefined,
              onSelect: () => {
                if (item?.callback) {
                  item.callback()
                  return
                }

                dialog.confirm({
                  title: t('dialog.confirm.title'),
                  content: t('dialog.confirm.content'),
                }).then(() => {
                  client.post({
                    url: item?.url || `${props.url}/batch`,
                    data: {
                      data: props.selected?.value,
                      type: item?.name,
                    },
                  }).then((res) => {
                    message.success(res?.message || t('message.requestSuccess'))
                    client.invalidate(props.url)
                  }).catch(() => {
                    message.error(t('message.requestError'))
                  })
                })
              },
            }
          })
          : undefined,
      } as any,
      )
    }

    // 行操作渲染
    if (restColumns && props.actions && props.actions?.length > 0) {
      const columnWidth = props.actions.reduce((accumulator, currentValue) => {
        const label = currentValue.labelLang ? t(currentValue.labelLang) : currentValue.label
        return accumulator + (label?.length || 0) * 24
      }, 0)

      restColumns.push({
        title: t('components.list.options'),
        fixed: 'right',
        align: 'center',
        width: columnWidth + 10,
        render: (rowData, rowIndex) => {
          return <div class="flex gap-2 justify-center">{listRenderAction({ key: props.key, rowData, rowIndex, text: true, actions: props.actions, url: props.url })}</div>
        },
      } as TableColumn)
    }
    return restColumns
  }

  return render
}
