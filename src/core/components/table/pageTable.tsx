import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import type { DataTableInst } from 'naive-ui'
import { NButton, NCard, NDataTable, NForm, NTabPane, NTabs } from 'naive-ui'
import { useI18n } from 'vue-i18n'
import clsx from 'clsx'
import { useWindowSize } from '@vueuse/core'
import { useRoute } from 'vue-router'
import { DuxJsonForm, type JsonFormItemSchema } from '../form'
import { DuxException } from '../layout'
import { useTable } from './useTable'
import type { TableTab } from './types/table'
import type { TableAction, TableColumn } from './types'

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
    const { t } = useI18n()
    const { width } = useWindowSize()
    const route = useRoute()
    const tableRef = ref<DataTableInst>()

    const { data, tableActions, dropdownActions, tableColumns, toolsColumns, toolsBtn, onFilter, filterModel, loading, tableParams } = useTable({
      key: props.tableKey,
      url: props.url,
      name: route.name,
      actions: props.actions,
      columns: props.columns,
      columnActions: props.columnActions,
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
        filterModel.value = true
      }
    }, { immediate: true })

    const getFilterHeight = () => {
      filterHeight.value = filterRef.value.scrollHeight
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
      <DuxException>
        <NCard class="h-full">
          <div class="flex flex-col h-full gap-4">
            <div class="flex items-center border-b border-gray-2 pb-2 gap-4">
              {props?.tabs?.length > 0
                ? (
                    <div class=" flex-1 w-1">
                      <NTabs
                        animated
                        paneClass="!p-0"
                        value={filterModel.value?.tab}
                        defaultValue={props?.tabs?.[0]?.value}
                        onUpdateValue={(v) => {
                          filterModel.value.tab = v
                          onFilter()
                        }}
                      >
                        {props?.tabs?.map((item, key) => <NTabPane key={key} tab={item.label} name={item.value}></NTabPane>)}
                      </NTabs>
                    </div>
                  )
                : (
                    <div class="text-base font-bold hidden lg:block flex-1">
                      {props?.titleLang ? t(props.titleLang) : props?.title}
                    </div>
                  ) }

              <div class="md:flex flex-1 gap-2 justify-end hidden">
                {tableActions}
              </div>
              <div class="md:hidden">
                {dropdownActions}
              </div>
            </div>

            <NForm model={filterModel} labelPlacement={width.value > 768 ? 'left' : 'top'} labelAlign="left" showFeedback={false}>
              <div class="flex flex-col md:flex-row gap-4">
                <div
                  ref={filterRef}
                  class={clsx([
                    'flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-3 lg:flex-1 overflow-hidden',
                    filterMore.value ? 'h-auto' : 'h-35px',
                    filterShow.value ? 'grid' : 'hidden',
                  ])}
                >
                  <DuxJsonForm model={filterModel} schema={props?.filter} />
                </div>
                <div class="flex-none flex gap-2 items-center justify-between md:justify-end">

                  <NButton
                    class="md:hidden"
                    type="default"
                    secondary
                    renderIcon={() => <div class="i-tabler:filter"></div>}
                    onClick={() => {
                      filterShow.value = !filterShow.value
                    }}
                  >
                    筛选
                  </NButton>

                  <div class="flex gap-2">
                    {width.value > 768 && filterHeight.value > 60 && (
                      <NButton
                        text
                        type="primary"
                        onClick={() => {
                          filterMore.value = !filterMore.value
                        }}
                      >
                        更多
                        <div class={clsx(['i-tabler:chevron-down transition-all', filterMore.value ? 'rotate-180' : 'rotate-0'])}></div>
                      </NButton>
                    )}
                    <NButton class={filterShow.value ? 'flex' : 'hidden'} type="primary" secondary renderIcon={() => <div class="i-tabler:search"></div>} onClick={onFilter}>查询</NButton>

                    {toolsColumns}
                    {toolsBtn}
                  </div>
                </div>
              </div>
            </NForm>

            <div class="flex-1">
              <NDataTable loading={loading.value} class="h-full" minHeight={200} flexHeight ref={tableRef} data={data.value} columns={tableColumns.value} {...tableParams} />
            </div>
          </div>
        </NCard>
      </DuxException>
    )
  },
})
