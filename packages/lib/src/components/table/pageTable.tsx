import type { Column } from 'exceljs'
import type { DataTableInst, TableProps } from 'naive-ui'
import type { PropType } from 'vue'
import type { JsonFormItemSchema } from '../form'
import type { BatchAction, TableAction, TableColumn } from './types'
import type { TableTab } from './types/table'
import { useVModel, useWindowSize } from '@vueuse/core'
import { NCard, NDataTable } from 'naive-ui'
import { defineComponent, onMounted, onUnmounted, provide, ref, toRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DuxFilter } from '../filter'
import { DuxFullPage } from '../page'
import { useTable } from './useTable'

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
    pagination: {
      type: Boolean,
      default: true,
    },
    refreshTime: Number,
    cacheTime: Number,
    tableProps: Object as PropType<TableProps>,
    actionWidth: Number,
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
      filter: form?.value,
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
    })

    const { data, tableColumns, toolsColumns, toolsBtn, send, loading, tableParams, pagination } = tableHook

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

    return () => (
      <DuxFullPage class="flex flex-col lg:flex-row gap-2">
        {slots?.side && <div class="hidden lg:block lg:w-50 flex-none">{slots?.side?.(form)}</div>}
        <div class="flex-1 lg:w-1 flex flex-col gap-2">
          {slots?.header?.(form)}
          <NCard class="flex-1 h-1">
            <div class="flex flex-col h-full gap-4">
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
                    <>
                      {toolsColumns}
                      {toolsBtn}
                    </>
                  ),
                  filter: slots?.filter,
                }}
              </DuxFilter>
              {slots?.top?.()}
              <div class="flex-1">
                <NDataTable
                  loading={loading.value}
                  class="h-full"
                  minHeight={200}
                  tableLayout="fixed"
                  flexHeight
                  ref={tableRef}
                  data={data.value}
                  rowKey={row => row[props.tableKey]}
                  columns={tableColumns.value}
                  defaultExpandAll={true}
                  {...tableParams.value}
                  pagination={props.pagination ? pagination.value : false}
                  {...props.tableProps}
                />
              </div>
            </div>
          </NCard>
        </div>
      </DuxFullPage>
    )
  },
})
