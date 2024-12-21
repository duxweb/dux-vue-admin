import type { Column } from 'exceljs'
import type { PropType, Ref } from 'vue'
import type { JsonFormItemSchema } from '../form'
import type { TableTab } from '../table'
import { NCard, NPagination, NScrollbar, NSkeleton } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { DuxFilter, type FilterAction } from '../filter'
import { DuxFullPage } from '../page'
import { DuxPageEmpty } from '../status/pageEmpty'
import { useList } from './useList'

export const DuxCardList = defineComponent({
  name: 'DuxCardList',
  props: {
    filter: Array<JsonFormItemSchema>,
    tabs: Array<TableTab>,
    actions: Array<FilterAction>,
    title: {
      type: String,
    },
    titleLang: {
      type: String,
    },
    url: String,
    render: Function,
    exportColumns: [Array<Column>, Array<string>],
    importColumns: [Array<Column>, Array<string>],
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
      exportColumns: props.exportColumns,
      importColumns: props.importColumns,
      export: props.export,
      import: props.import,
    })

    return () => (
      <DuxFullPage>
        <div class="h-full flex flex-col gap-2">
          {slots?.header?.(form)}
          <NCard class="flex-none">
            <DuxFilter
              title={props.title}
              titleLang={props.titleLang}
              filter={props.filter}
              tabs={props.tabs}
              actions={props.actions}
              v-model:value={form.value}
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
                  <div class="grid grid-cols-1 lg:grid-cols-2 3xl:grid-cols-3 4xl:grid-cols-4 gap-4">

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
      </DuxFullPage>
    )
  },
})
