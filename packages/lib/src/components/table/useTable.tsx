import type { DataTableColumns, DataTableFilterState, DataTableRowKey, DataTableSortState } from 'naive-ui'
import type { Ref } from 'vue'
import type { BatchAction, TableAction, TableColumn, UseTableProps, UseTableResult } from './types'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { useIntervalFn, useWindowSize } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { NButton, NCheckbox, NDropdown, NPopover, NTooltip, useMessage } from 'naive-ui'
import { computed, h, ref, toRef, watch } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import { useI18n } from 'vue-i18n'
import { treeToArr, useClient, useExportCsv, useExportExcel, useImportCsv, useImportExcel } from '../../hooks'
import { useDialog } from '../dialog'
import { listRenderAction } from '../filter'
import { columnMap, columnMedia, columnStatus, columnTags, columnText, columnType } from './column'
import { columnCopy } from './column/copy'
import { columnImage } from './column/image'
import { columnImages } from './column/images'
import { columnInput } from './column/input'
import { columnSwitch } from './column/switch'

export function useTable({ filter: filterForm, url, batch, columns: tableColumn, columnActions, exportColumns, importColumns, export: exportStatus, import: importStatus, exportCsv: exportCsvStatus, importCsv: importCsvStatus, expanded: expandedStatus, cacheTime, key = 'id', refreshTime = 10, actionWidth, pagination = true }: UseTableProps): UseTableResult {
  const client = useClient()
  const message = useMessage()
  const excelExport = useExportExcel()
  const excelImport = useImportExcel()
  const csvExport = useExportCsv()
  const csvImport = useImportCsv()
  const { t } = useI18n()
  const selected = ref<never[]>([])
  const expanded = ref<never[]>([])
  const { width } = useWindowSize()

  const columns = toRef(tableColumn)
  const formFilter = toRef(filterForm)

  // 表格数据
  const filter = ref<Record<string, any>>(cloneDeep(formFilter.value || {}))
  const sorter = ref<Record<string, any>>({})
  const tableFilter = ref<Record<string, any>>({})
  const meta = ref<Record<string, any>>({})

  const page = ref(1)
  const pageSize = ref(20)
  const pageCount = ref(0)
  const total = ref(0)

  const loading = ref(false)

  const queryParams = computed(() => {
    return {
      ...(pagination
        ? {
            page: page.value,
            pageSize: pageSize.value,
          }
        : {}),
      ...sorter.value,
      ...tableFilter.value,
      ...filter.value,
    }
  })

  const getList = () => {
    return client.get({
      url,
      params: queryParams.value,
    })
  }

  const data = ref<Record<string, any>[]>([])

  const req = useQuery({
    queryKey: [url, queryParams],
    queryFn: () => getList(),
    gcTime: cacheTime,
    placeholderData: keepPreviousData,
  })

  watch(req.isFetching, (val) => {
    if (req.isFetched.value) {
      loading.value = false
    }
    else {
      loading.value = val
    }
  }, { immediate: true })

  watch(req.data, (res) => {
    if (expandedStatus) {
      expanded.value = treeToArr(res?.data || [], key, 'children')
    }

    data.value = [...cloneDeep(res?.data || [])]

    meta.value = res?.meta || {}
    total.value = res?.meta?.total || 0
    pageCount.value = Math.ceil(total.value / pageSize.value)
  }, {
    immediate: true,
  })

  watch(req.error, (error) => {
    message.error(error?.message || t('components.list.getError'))
  })

  // 筛选
  const onSend = () => {
    page.value = 1
    filter.value = { ...cloneDeep(formFilter.value || {}) }
  }

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
    width: actionWidth,
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

  const autoRefresh = ref(false)

  // 自动刷新
  const { pause, resume } = useIntervalFn(() => {
    req.refetch()
  }, (refreshTime || 30) * 1000, { immediate: false })

  watch(autoRefresh, (val) => {
    if (val) {
      resume()
    }
    else {
      pause()
    }
  }, { immediate: true })

  const toolsOptions = [
    {
      label: t('components.list.refresh'),
      key: 'refresh',
    },
    {
      label: () => h('div', { class: 'flex items-center' }, [
        !autoRefresh.value ? t('components.list.autoRefresh') : t('components.list.autoRefreshOff'),
      ]),
      key: 'autoRefresh',
    },
  ]

  if (exportStatus) {
    toolsOptions.push({
      label: t('components.list.excelExport'),
      key: 'export',
    })
  }

  if (exportCsvStatus) {
    toolsOptions.push({
      label: t('components.list.csvExport'),
      key: 'csvExport',
    })
  }

  if (importStatus) {
    toolsOptions.push({
      label: t('components.list.excelImport'),
      key: 'import',
    })
  }

  if (importCsvStatus) {
    toolsOptions.push({
      label: t('components.list.csvImport'),
      key: 'importCsv',
    })
  }

  // 表格工具
  const toolsBtn = (
    <div>
      <NDropdown
        options={toolsOptions}
        onSelect={(key) => {
          if (key === 'refresh') {
            req.refetch()
          }
          if (key === 'autoRefresh') {
            autoRefresh.value = !autoRefresh.value
          }
          if (key === 'export') {
            excelExport.send({
              url,
              params: {
                ...tableFilter.value,
                ...filter.value,
                ...sorter.value,
              },
              columns: exportColumns || tableColumns.value.map((item: Record<string, any>) => {
                return {
                  header: item.title,
                  key: item.key,

                }
              }),
            })
          }
          if (key === 'csvExport') {
            csvExport.send({
              url,
              params: {
                ...tableFilter.value,
                ...filter.value,
                ...sorter.value,
              },
              columns: exportColumns || tableColumns.value.map((item: Record<string, any>) => {
                return item.key
              }),
            })
          }
          if (key === 'import') {
            excelImport.send({
              url: `${url}/import`,
              params: {
                ...filter.value,
                ...tableFilter.value,
              },
              columns: importColumns,
              callback: () => {
                req.refetch()
              },
            })
          }
          if (key === 'importCsv') {
            csvImport.send({
              url: `${url}/import`,
              params: {
                ...filter.value,
                ...tableFilter.value,
              },
              columns: importColumns as string[],
              callback: () => {
                req.refetch()
              },
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

    const newSorter = { ...sorter.value }
    list?.forEach((item) => {
      if (!item?.columnKey) {
        return
      }
      if (item.order) {
        newSorter[`${item.columnKey}_sort`] = item.order === 'ascend' ? 'asc' : 'desc'
      }
      else {
        delete newSorter[`${item.columnKey}_sort`]
      }
    })

    sorter.value = newSorter
  }

  // 筛选处理
  const onUpdateFilters = (v: DataTableFilterState) => {
    const newTablefilter = { ...tableFilter.value }

    Object.entries(v).forEach(([key, value]) => {
      newTablefilter[key] = value
    })

    tableFilter.value = newTablefilter
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

  const tablePagination = computed(() => {
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
    data,
    tableParams,
    pagination: tablePagination,
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
  width?: number
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
      if (item.renderType === 'images') {
        return {
          ...itemProps,
          render: columnImages(params),
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
      if (item.renderType === 'copy') {
        return {
          ...itemProps,
          render: columnCopy(params),
        }
      }
      if (item.renderType === 'input') {
        return {
          ...itemProps,
          render: columnInput(params, client, message, props.key, props.url),
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
              key: item.name,
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
        width: props.width || (columnWidth + 10),
        render: (rowData, rowIndex) => {
          return <div class="flex gap-2 justify-center">{listRenderAction({ key: props.key, rowData, rowIndex, text: true, actions: props.actions, url: props.url })}</div>
        },
      } as TableColumn)
    }
    return restColumns
  }

  return render
}
