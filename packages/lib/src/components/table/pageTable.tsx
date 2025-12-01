import type { Column } from 'exceljs'
import type { DataTableInst, DataTableProps } from 'naive-ui'
import type { HTMLAttributes, PropType } from 'vue'
import type { JsonFormItemSchema } from '../form'
import type { BatchAction, TableAction, TableColumn } from './types'
import type { TableTab } from './types/table'
import { useVModel, useWindowSize } from '@vueuse/core'
import { NButton, NCard, NDataTable, NPagination } from 'naive-ui'
import { computed, defineComponent, h, onMounted, onUnmounted, provide, ref, toRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DuxFilter } from '../filter'
import { DuxFullPage } from '../page'
import { useTable } from './useTable'

type RowWithOrigin = Record<string, any> & { __origin?: Record<string, any> }

export const DuxPageTable = defineComponent({
  name: 'DuxPageTable',
  props: {
    tableKey: {
      type: [String, Number],
      default: 'id',
    },
    url: String,
    title: {
      type: String,
    },
    titleLang: {
      type: String,
    },
    tabs: Array<TableTab>,
    columns: Array<TableColumn>,
    columnActions: Array<TableAction>,
    filter: Array<JsonFormItemSchema>,
    actions: Array<TableAction>,
    exportColumns: Array<Column>,
    importColumns: Array<Column>,
    export: {
      type: Boolean,
      default: false,
    },
    import: {
      type: Boolean,
      default: false,
    },
    expanded: {
      type: Boolean,
      default: true,
    },
    exportCsv: {
      type: Boolean,
      default: false,
    },
    importCsv: {
      type: Boolean,
      default: false,
    },
    form: Object as PropType<Record<string, any>>,
    batch: Array<BatchAction>,
    batchPosition: {
      type: String as PropType<'top' | 'bottom'>,
      default: 'bottom',
    },
    pagination: {
      type: Boolean,
      default: true,
    },
    showTopPagination: {
      type: Boolean,
      default: false,
    },
    rowClickExpand: {
      type: Boolean,
      default: false,
    },
    refreshTime: Number,
    cacheTime: Number,
    tableProps: Object as PropType<Partial<DataTableProps>>,
    actionWidth: Number,
    selectionWidth: Number,
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
    },
  },
  setup(props, { slots, emit, expose }) {
    const { width } = useWindowSize()
    const route = useRoute()
    const tableRef = ref<DataTableInst>()

    const form = useVModel(props, 'form', emit, {
      passive: true,
      defaultValue: {},
      deep: true,
    })

    const columns = toRef(props, 'columns')

    const tableHook = useTable({
      key: props.tableKey,
      url: props.url,
      name: route.name,
      columns: columns || [],
      columnActions: props.columnActions || [],
      filter: form,
      exportColumns: props.exportColumns,
      importColumns: props.importColumns,
      export: props.export,
      import: props.import,
      exportCsv: props.exportCsv,
      importCsv: props.importCsv,
      batch: props.batch,
      expanded: props.expanded,
      refreshTime: props.refreshTime,
      cacheTime: props.cacheTime,
      actionWidth: props.actionWidth,
      selectionWidth: props.selectionWidth,
      pagination: !!props.pagination,
    })

    const { data, meta, tableColumns, toolsColumns, toolsBtn, batchBtn, send, loading, tableParams, pagination, expanded } = tableHook

    const treeExpandedKeys = ref<(string | number)[]>([])
    const rowLevelMap = ref(new Map<string | number, number>())

    const getOriginRow = (rowData: Record<string, any>) => {
      if (!rowData) {
        return undefined
      }
      return (rowData as RowWithOrigin).__origin || rowData
    }

    const getRowKey = (rowData: Record<string, any>) => {
      const origin = getOriginRow(rowData)
      if (!origin) {
        return undefined
      }
      const key = props.tableKey
      if (key === undefined || key === null) {
        return undefined
      }
      return origin[String(key)]
    }

    const hasTreeData = computed(() => {
      const check = (rows?: Record<string, any>[]): boolean => {
        if (!Array.isArray(rows)) {
          return false
        }
        return rows.some(row => ((Array.isArray(row.children) && row.children.length > 0) || check(row.children)))
      }
      return check(data.value)
    })

    const displayData = computed(() => {
      if (!hasTreeData.value) {
        rowLevelMap.value = new Map()
        return data.value || []
      }
      const result: RowWithOrigin[] = []
      const newLevelMap = new Map<string | number, number>()
      const expandedSet = new Set(treeExpandedKeys.value)

      const traverse = (rows?: Record<string, any>[], level = 0) => {
        if (!Array.isArray(rows)) {
          return
        }
        rows.forEach((row) => {
          const key = getRowKey(row)
          const flatRow: RowWithOrigin = { ...row, __origin: row }
          delete flatRow.children
          result.push(flatRow)
          if (key !== undefined && key !== null) {
            newLevelMap.set(key, level)
          }
          if (key !== undefined && key !== null && expandedSet.has(key) && Array.isArray(row.children) && row.children.length) {
            traverse(row.children, level + 1)
          }
        })
      }

      traverse(data.value, 0)
      rowLevelMap.value = newLevelMap
      return result
    })

    const filterShow = ref(true)
    const filterMore = ref(false)
    const filterRef = ref<HTMLDivElement>()
    const filterHeight = ref(0)

    watch(width, (v) => {
      if (v >= 768) {
        filterShow.value = true
      }
      else {
        filterShow.value = false
        filterMore.value = true
      }
    }, { immediate: true })

    watch([data, () => props.tableKey], ([rows]) => {
      const validKeys = new Set<string | number>()
      const collect = (list?: Record<string, any>[]) => {
        if (!Array.isArray(list)) {
          return
        }
        list.forEach((row) => {
          const key = getRowKey(row)
          if (key !== undefined && key !== null) {
            validKeys.add(key)
          }
          collect(row.children)
        })
      }
      collect(rows)
      treeExpandedKeys.value = treeExpandedKeys.value.filter(key => validKeys.has(key))
    }, { immediate: true })

    watch(hasTreeData, (val) => {
      if (!val) {
        treeExpandedKeys.value = []
      }
    })

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

    // 自动高度处理
    watch(filterRef, (v) => {
      if (!v) {
        return
      }
      setTimeout(() => {
        getFilterHeight()
      }, 100)
    })

    provide('table', tableHook)
    expose({
      table: tableHook,
    })

    const expandColumn = computed(() => {
      const columns = tableColumns.value as TableColumn[] | undefined
      return columns?.find(column => column?.type === 'expand')
    })

    const canRowExpand = (rowData: Record<string, any>) => {
      if (!props.rowClickExpand) {
        return false
      }
      const origin = getOriginRow(rowData)
      if (!origin) {
        return false
      }
      const column = expandColumn.value
      if (!column) {
        return false
      }
      if (typeof column.expandable === 'function') {
        return column.expandable(origin)
      }
      return true
    }

    const toggleRowExpand = (rowData: Record<string, any>) => {
      const key = getRowKey(rowData)
      if (key === undefined || key === null) {
        return
      }
      const currentKeys = new Set((expanded.value || []) as (string | number)[])
      if (currentKeys.has(key)) {
        currentKeys.delete(key)
      }
      else {
        currentKeys.add(key)
      }
      expanded.value = Array.from(currentKeys) as never[]
    }

    const toggleChildren = (rowData: Record<string, any>) => {
      const key = getRowKey(rowData)
      if (key === undefined || key === null) {
        return
      }
      const currentKeys = new Set(treeExpandedKeys.value as (string | number)[])
      if (currentKeys.has(key)) {
        currentKeys.delete(key)
      }
      else {
        currentKeys.add(key)
      }
      treeExpandedKeys.value = Array.from(currentKeys)
    }

    const resolveEventElement = (target: EventTarget | null): HTMLElement | null => {
      if (target && typeof (target as HTMLElement).closest === 'function') {
        return target as HTMLElement
      }
      return (target as Node | null)?.parentElement || null
    }

    const shouldIgnoreExpandClick = (target: EventTarget | null) => {
      const element = resolveEventElement(target)
      if (!element || typeof element.closest !== 'function') {
        return false
      }
      if (element.closest('button, a, input, textarea, select, label, [role="button"], [data-row-expand-ignore]')) {
        return true
      }
      if (element.closest('.n-data-table-td--selection')) {
        return true
      }
      if (element.closest('[class*="data-table-expand-trigger"]')) {
        return true
      }
      return false
    }

    const getRowClickProps = (rowData: Record<string, any>): HTMLAttributes | undefined => {
      if (!canRowExpand(rowData)) {
        return undefined
      }
      return {
        class: 'cursor-pointer',
        onClick: (event: MouseEvent) => {
          if (shouldIgnoreExpandClick(event?.target || null)) {
            return
          }
          toggleRowExpand(rowData)
        },
      }
    }

    const mergeRowProps = (rowData: Record<string, any>, rowIndex: number): HTMLAttributes => {
      const rowPropsFn = props.tableProps?.rowProps
      const originRow = getOriginRow(rowData) || rowData
      const userRowProps = typeof rowPropsFn === 'function'
        ? rowPropsFn(originRow, rowIndex)
        : undefined
      const clickProps = getRowClickProps(rowData)
      if (!userRowProps && !clickProps) {
        return {}
      }
      if (userRowProps && !clickProps) {
        return userRowProps
      }
      if (!userRowProps && clickProps) {
        return clickProps
      }

      const mergedClassList: any[] = []
      if (userRowProps?.class) {
        mergedClassList.push(userRowProps.class)
      }
      if (clickProps?.class) {
        mergedClassList.push(clickProps.class)
      }

      return {
        ...userRowProps,
        ...clickProps,
        class: mergedClassList.length > 1 ? mergedClassList : mergedClassList[0],
        onClick: (event: MouseEvent) => {
          userRowProps?.onClick?.(event)
          if (event.defaultPrevented) {
            return
          }
          clickProps?.onClick?.(event)
        },
      } as HTMLAttributes
    }

    const expandedChildrenKeys = computed(() => new Set(treeExpandedKeys.value))

    const treeColumns = computed(() => {
      if (!hasTreeData.value) {
        return tableColumns.value
      }
      const columns = (tableColumns.value || []) as TableColumn[]
      const targetIndex = columns.findIndex(column => column.type === undefined)
      if (targetIndex === -1) {
        return columns
      }
      const buttonPlaceholder = (rowIndex: number) => (
        <span class="inline-flex items-center justify-center w-4 h-4" data-row-expand-placeholder data-index={rowIndex}></span>
      )
      return columns.map((column, index) => {
        if (index !== targetIndex) {
          return column
        }
        const targetColumn = column as TableColumn
        const baseRender = typeof targetColumn.render === 'function'
          ? targetColumn.render
          : (rowData: Record<string, any>) => {
              const origin = getOriginRow(rowData) || rowData
              const key = targetColumn.key
              return key ? origin[key as keyof typeof origin] : null
            }
        const titleRenderer = () => (
          <div class="flex items-center gap-2">
            <span class="inline-block w-4"></span>
            <div class="flex-1 min-w-0">
              {targetColumn.title}
            </div>
          </div>
        )
        return {
          ...targetColumn,
          title: titleRenderer,
          render: (rowData, rowIndex) => {
            const origin = getOriginRow(rowData) || rowData
            const key = getRowKey(origin)
            const hasChildren = Array.isArray(origin?.children) && origin.children.length > 0
            const expandedChild = key !== undefined && key !== null ? expandedChildrenKeys.value.has(key) : false
            return (
              <div class="flex items-center gap-2">
                {hasChildren
                  ? (
                      <NButton
                        size="tiny"
                        type="primary"
                        secondary
                        data-row-expand-ignore
                        class="size-4! p-0!"
                        onClick={(event) => {
                          event.stopPropagation()
                          toggleChildren(origin)
                        }}
                      >
                        {{
                          icon: () => <div class={[!expandedChild ? 'i-tabler:plus' : 'i-tabler:minus', 'h-3 w-3']}></div>,
                        }}
                      </NButton>
                    )
                  : buttonPlaceholder(rowIndex)}
                <div class="flex-1 min-w-0">
                  {baseRender ? baseRender(origin, rowIndex) : null}
                </div>
              </div>
            )
          },
        }
      })
    })

    const renderPagination = () => {
      if (!props.pagination) {
        return null
      }
      return (
        <NPagination
          {...pagination.value}
          show-quick-jumper
          show-size-picker
          size={props.size}
        >
          {{
            prefix: () => (
              <div>
                {`共 ${meta.value.total || 0} 条`}
              </div>
            ),
          }}
        </NPagination>
      )
    }

    return () => {
      const tableProps = props.rowClickExpand
        ? {
            ...props.tableProps,
            renderExpandIcon: () => h('div', {}),
          }
        : props.tableProps
      const rowPropsHandler = props.rowClickExpand
        ? (rowData: Record<string, any>, rowIndex: number) => mergeRowProps(rowData, rowIndex)
        : undefined

      return (
        <DuxFullPage class="flex flex-col lg:flex-row gap-2">
          {slots?.side && <div class="hidden lg:block lg:w-50 flex-none">{slots?.side?.(form)}</div>}
          <div class="flex-1 lg:w-1 flex flex-col gap-2">
            {slots?.header?.(form)}
            <NCard class="flex-1 min-h-1">
              <div class="flex flex-col h-full gap-2">
                {slots?.filter?.() || (
                  <DuxFilter
                    filter={props.filter}
                    tabs={props.tabs}
                    actions={props.actions}
                    title={props.title}
                    titleLang={props.titleLang}
                    v-model:value={form.value}
                    onSubmit={() => {
                      send()
                    }}
                  >
                    {{
                      tools: () => (
                        <div class="flex items-center gap-2">
                          {props.batchPosition === 'top' && !props.showTopPagination && batchBtn.value}
                          {toolsColumns}
                          {toolsBtn}
                        </div>
                      ),
                      filter: slots?.filter,
                    }}
                  </DuxFilter>
                )}
                {slots?.top?.()}
                {props.showTopPagination && props.pagination && (
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      {props.batchPosition === 'top' && batchBtn.value}
                    </div>
                    <div>
                      {renderPagination()}
                    </div>
                  </div>
                )}
                <div class="flex-1">
                  <NDataTable
                    loading={loading.value}
                    class="h-full"
                    minHeight={200}
                    tableLayout="fixed"
                    flexHeight
                    ref={tableRef}
                    data={displayData.value}
                    rowKey={row => row[props.tableKey]}
                    columns={treeColumns.value}
                    defaultExpandAll={props.expanded}
                    size={props.size}
                    style={props.size === 'small' ? { '--n-th-padding': '5px 2px', '--n-td-padding': '5px 2px', '--n-font-size': '12px' } : ''}
                    {...tableParams.value}
                    {...tableProps}
                    {...(rowPropsHandler ? { rowProps: rowPropsHandler } : {})}
                  />
                </div>
                <div class="flex justify-between">
                  <div class="flex items-center gap-2">
                    {props.batchPosition === 'bottom' && batchBtn.value}
                    {slots?.bottom?.(data.value, meta.value)}
                  </div>
                  <div>
                    {renderPagination()}
                  </div>
                </div>
              </div>
            </NCard>
          </div>
        </DuxFullPage>
      )
    }
  },
})
