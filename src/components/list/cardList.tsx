import { NCard, NPagination, NScrollbar, NSkeleton } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import type { Column } from 'exceljs'
import type { PropType, Ref } from 'vue'
import { DuxFilter, type ListAction } from '../filter'
import { DuxPageFull } from '../layout'
import { DuxPageEmpty } from '../status/pageEmpty'
import { useList } from './useList'
import type { JsonFormItemSchema } from '../form'
import type { TableTab } from '../table'

export const DuxCardList = defineComponent({
  name: 'DuxCardList',
  props: {
    filter: Array<JsonFormItemSchema>,
    tabs: Array<TableTab>,
    actions: Array<ListAction>,
    title: {
      type: String,
      default: '列表',
    },
    titleLang: {
      type: String,
    },
    url: String,
    render: Function,
    excelColumns: Array<Column>,
    export: {
      type: Boolean,
      default: false,
    },
    import: {
      type: Boolean,
      default: false,
    },
    form: Object as PropType<Ref<Record<string, any>>>,
  },
  setup(props, { slots }) {
    const form = props.form || ref<Record<string, any>>({})
    const list = useList({
      form,
      url: props.url,
      excelColumns: props.excelColumns,
      export: props.export,
      import: props.import,
    })

    return () => (
      <DuxPageFull>
        <div class="h-full flex flex-col gap-2">
          {slots?.header?.(form)}
          <NCard class="flex-none">
            <DuxFilter
              title={props.title}
              titleLang={props.titleLang}
              filter={props.filter}
              tabs={props.tabs}
              actions={props.actions}
              v-model:value={form}
              onSubmit={() => {
                list.onFilter()
              }}
            >
              {{
                tools: () => list.toolsBtn,
              }}
            </DuxFilter>
          </NCard>
          {list.data.value?.length > 0
            ? (
                <NScrollbar class="flex-1 h-1">
                  <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-4">

                    {list.data?.value?.map?.((item, index) => {
                      return (
                        <NCard
                          size="small"
                          segmented={{
                            content: true,
                            action: true,
                          }}
                        >
                          {{
                            'header': () => slots?.title?.(item, index),
                            'header-extra': () => slots?.extra?.(item, index),
                            'default': () => slots?.default?.(item, index),
                            'action': () => slots?.action?.(item, index),
                          }}
                        </NCard>
                      )
                    })}

                  </div>
                </NScrollbar>
              )
            : (list.loading.value
                ? (
                    <div class="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 4xl:grid-cols-4 gap-4">
                      <NSkeleton height={100} />
                    </div>
                  )
                : <DuxPageEmpty />)}
          <div class="flex justify-center">
            <NPagination
              showQuickJumper
              showSizePicker
              showQuickJumpDropdown
              pageSize={list.pageSize.value}
              page={list.page.value}
              pageCount={list.pageCount.value}
              onUpdatePage={list.onPage}
              onUpdatePageSize={list.onPageSize}
              pageSizes={[10, 20, 30, 40, 50]}

            />
          </div>
        </div>
      </DuxPageFull>
    )
  },
})