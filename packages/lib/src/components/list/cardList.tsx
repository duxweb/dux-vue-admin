import type { Column } from 'exceljs'
import type { PropType, Ref } from 'vue'
import type { JsonFormItemSchema } from '../form'
import type { TableTab } from '../table'
import { useVModel } from '@vueuse/core'
import { NCard, NPagination, NScrollbar, NSkeleton } from 'naive-ui'
import { computed, defineComponent } from 'vue'
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
    form: Object as PropType<Record<string, any>>,
    pagination: {
      type: Boolean,
      default: true,
    },
    columns: {
      type: Number,
      default: 4,
    },
    cardMinWidth: {
      type: Number,
      default: 260,
    },
    cardMaxWidth: Number,
  },
  setup(props, { slots, expose, emit }) {
    const form = useVModel(props, 'form', emit, {
      passive: true,
      defaultValue: {},
      deep: true,
    }) as Ref<Record<string, any>>
    const columnCount = computed(() => {
      const count = Number(props.columns) || 1
      return count < 1 ? 1 : count
    })
    const gridVars = computed(() => {
      const minWidth = Math.max(Number(props.cardMinWidth) || 1, 1)
      const vars: Record<string, string> = {
        '--dux-card-min-width': `${minWidth}px`,
      }
      if (props.cardMaxWidth && props.cardMaxWidth > 0) {
        vars['--dux-card-max-width'] = `${props.cardMaxWidth}px`
      }
      else {
        vars['--dux-card-max-width'] = `calc((100% - ${(columnCount.value - 1)} * 1rem) / ${columnCount.value})`
      }
      return vars
    })
    const gridClass = 'grid gap-4 grid-cols-[repeat(auto-fit,_minmax(var(--dux-card-min-width),_var(--dux-card-max-width)))]'
    const list = useList({
      form,
      url: props.url,
      exportColumns: props.exportColumns,
      importColumns: props.importColumns,
      export: props.export,
      import: props.import,
    })

    expose({
      list,
    })

    return () => (
      <DuxFullPage>
        <div class="h-full flex flex-col gap-2">
          {slots?.header?.(form)}
          {props?.filter && props?.filter?.length > 0
            ? (
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
              )
            : null}
          {list.data.value?.length > 0
            ? (
                <NScrollbar class="flex-1 min-h-1">
                  <div class={gridClass} style={gridVars.value}>
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
                    <div class={gridClass} style={gridVars.value}>
                      <NSkeleton height={100} />
                    </div>
                  )
                : <DuxPageEmpty />)}
          {props.pagination && (
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
          )}
        </div>
      </DuxFullPage>
    )
  },
})
