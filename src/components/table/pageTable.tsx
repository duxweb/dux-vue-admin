import { useWindowSize } from '@vueuse/core'
import { NCard, NDataTable } from 'naive-ui'
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import type { DataTableInst } from 'naive-ui'
import { DuxFilter } from '../filter'
import { DuxPageFull } from '../layout'
import { useTable } from './useTable'
import type { JsonFormItemSchema } from '../form'
import type { TableAction, TableColumn } from './types'
import type { TableTab } from './types/table'

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
  },
  setup(props) {
    const { width } = useWindowSize()
    const route = useRoute()
    const tableRef = ref<DataTableInst>()

    const { data, tableColumns, toolsColumns, toolsBtn, onFilter, filterModel, loading, tableParams } = useTable({
      key: props.tableKey,
      url: props.url,
      name: route.name,
      actions: props.actions || [],
      columns: props.columns || [],
      columnActions: props.columnActions || [],
      tableRef,
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

    return () => (
      <DuxPageFull>
        <NCard class="h-full">
          <div class="flex flex-col h-full gap-4">

            <DuxFilter
              filter={props.filter}
              tabs={props.tabs}
              actions={props.actions}
              title={props.title}
              titleLang={props.titleLang}
              v-model:value={filterModel.value}
              onSubmit={() => {
                onFilter()
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
              <NDataTable loading={loading.value} class="h-full" minHeight={200} flexHeight ref={tableRef} data={data.value} columns={tableColumns.value} {...tableParams} />
            </div>
          </div>
        </NCard>
      </DuxPageFull>
    )
  },
})
