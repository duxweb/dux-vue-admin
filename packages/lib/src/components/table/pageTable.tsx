import type { Column } from 'exceljs'
import type { DataTableInst } from 'naive-ui'
import type { PropType } from 'vue'
import type { JsonFormItemSchema } from '../form'
import type { TableAction, TableColumn } from './types'
import type { TableTab } from './types/table'
import { useWindowSize } from '@vueuse/core'
import { NCard, NDataTable } from 'naive-ui'
import { defineComponent, onMounted, onUnmounted, provide, ref, toRef, watch } from 'vue'
import { useRoute } from 'vue-router'
import { DuxFilter } from '../filter'
import { DuxFullPage } from '../page'
import { useTable } from './useTable'

export const DuxPageTable = defineComponent({
  name: 'DuxPageTable',
  props: {
    tableKey: [String, Number],
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
    excelColumns: Array<Column>,
    export: {
      type: Boolean,
      default: true,
    },
    import: {
      type: Boolean,
      default: true,
    },
    form: Object as PropType<Record<string, any>>,
  },
  setup(props, { slots }) {
    const { width } = useWindowSize()
    const route = useRoute()
    const tableRef = ref<DataTableInst>()
    const form = toRef<Record<string, any>>(props.form || {})

    const tableHook = useTable({
      key: props.tableKey,
      url: props.url,
      name: route.name,
      actions: props.actions || [],
      columns: props.columns || [],
      columnActions: props.columnActions || [],
      filter: form?.value,
      excelColumns: props.excelColumns,
      export: props.export,
      import: props.import,
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

    watch(filterRef, (v) => {
      if (!v) {
        return
      }
      setTimeout(() => {
        getFilterHeight()
      }, 100)
    })

    provide('table', tableHook)

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
                }}
              </DuxFilter>
              <div class="flex-1">
                <NDataTable
                  loading={loading.value}
                  class="h-full"
                  minHeight={200}
                  flexHeight
                  ref={tableRef}
                  data={data.value}
                  columns={tableColumns.value}
                  {...tableParams.value}
                  pagination={pagination.value}
                />
              </div>
            </div>
          </NCard>
        </div>
      </DuxFullPage>
    )
  },
})
