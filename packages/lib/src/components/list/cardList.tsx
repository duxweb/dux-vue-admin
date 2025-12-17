import type { Column } from 'exceljs'
import type { PropType, Ref } from 'vue'
import type { JsonFormItemSchema } from '../form'
import type { BatchAction, TableTab } from '../table'
import { useVModel } from '@vueuse/core'
import { NButton, NCard, NDropdown, NPagination, NScrollbar, NSkeleton, useMessage } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClient } from '../../hooks'
import { useDialog } from '../dialog'
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
    batch: Array as PropType<BatchAction[]>,
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
    pageSize: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array as PropType<number[]>,
      default: () => [10, 20, 30, 40, 50],
    },
    selectedKeys: {
      type: Array as PropType<Array<string | number>>,
      default: () => [],
    },
    size: {
      type: String as PropType<'small' | 'medium' | 'large'>,
      default: 'medium',
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
    onScroll: Function as PropType<(...args: any[]) => void>,
  },
  setup(props, { slots, expose, emit }) {
    const { t } = useI18n()
    const dialog = useDialog()
    const client = useClient()
    const message = useMessage()
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
      defaultPageSize: props.pageSize,
    })

    expose({
      list,
    })

    const selectedKeys = computed<(string | number)[]>(() => props.selectedKeys || [])
    const hasSelection = computed(() => (selectedKeys.value?.length || 0) > 0)
    const batchButtonSize = computed(() => props.size === 'small' ? 'tiny' : 'small')

    const getBatchLabel = (item: BatchAction) => {
      if (item.labelLang) {
        return t(item.labelLang)
      }
      if (item.label) {
        return item.label
      }
      if (item.name) {
        return item.name
      }
      return t('buttons.batch')
    }

    const handleBatchAction = (item: BatchAction) => {
      if (!hasSelection.value) {
        return
      }
      if (item?.callback) {
        item.callback(selectedKeys.value as any)
        return
      }
      const requestUrl = item?.url || (props.url ? `${props.url}/batch` : '')
      if (!requestUrl) {
        return
      }
      dialog.confirm({
        title: t('dialog.confirm.title'),
        content: t('dialog.confirm.content'),
      }).then(() => {
        client.post({
          url: requestUrl,
          data: {
            data: selectedKeys.value,
            type: item?.name,
          },
        }).then((res) => {
          message.success(res?.message || t('message.requestSuccess'))
          list.onReload?.()
        }).catch(() => {
          message.error(t('message.requestError'))
        })
      })
    }

    const buildDropdownOptions = (actions: BatchAction[], prefix: string, map: Map<string | number, BatchAction>) => {
      return actions.map((action, index) => {
        const actionKey = action.name !== undefined ? action.name : `${prefix}-${index}`
        map.set(actionKey, action)
        const option: Record<string, any> = {
          key: actionKey,
          label: getBatchLabel(action),
          icon: action.icon ? () => <div class={`n-icon ${action.icon}`}></div> : undefined,
        }
        if (action.children?.length) {
          option.children = buildDropdownOptions(action.children, `${actionKey}`, map)
        }
        return option
      })
    }

    const batchBtn = computed(() => {
      if (!props.batch?.length) {
        return null
      }
      return (
        <div class="flex items-center gap-2 mr-2">
          {props.batch.map((item, index) => {
            const key = item.name ?? `batch-${index}`
            const buttonContent = item.children?.length
              ? (
                  <div class="flex items-center gap-1">
                    <span>{getBatchLabel(item)}</span>
                    <div class="i-tabler:chevron-down text-xs"></div>
                  </div>
                )
              : getBatchLabel(item)
            if (item.children?.length) {
              const keyMap = new Map<string | number, BatchAction>()
              const options = buildDropdownOptions(item.children, `${key}-child`, keyMap)
              return (
                <NDropdown
                  key={key}
                  trigger="click"
                  disabled={!hasSelection.value}
                  options={options}
                  onSelect={(dropdownKey) => {
                    const action = keyMap.get(dropdownKey as string | number)
                    if (action) {
                      handleBatchAction(action)
                    }
                  }}
                >
                  <NButton
                    size={batchButtonSize.value}
                    secondary
                    disabled={!hasSelection.value}
                    renderIcon={item.icon ? () => <div class={`n-icon ${item.icon}`}></div> : undefined}
                  >
                    {buttonContent}
                  </NButton>
                </NDropdown>
              )
            }
            return (
              <NButton
                key={key}
                size={batchButtonSize.value}
                secondary
                disabled={!hasSelection.value}
                renderIcon={item.icon ? () => <div class={`n-icon ${item.icon}`}></div> : undefined}
                onClick={() => {
                  handleBatchAction(item)
                }}
              >
                {buttonContent}
              </NButton>
            )
          })}
        </div>
      )
    })

    const renderPagination = () => {
      if (!props.pagination) {
        return null
      }
      return (
        <NPagination
          showQuickJumper
          showSizePicker
          showQuickJumpDropdown
          size={props.size}
          pageSize={list.pageSize.value}
          page={list.page.value}
          pageCount={list.pageCount.value}
          onUpdatePage={list.onPage}
          onUpdatePageSize={list.onPageSize}
          pageSizes={props.pageSizes}
        >
          {{
            prefix: () => (
              <div>{`共 ${list.total.value || 0} 条`}</div>
            ),
          }}
        </NPagination>
      )
    }

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
                      tools: () => (
                        <div class="flex items-center gap-2">
                          {props.batchPosition === 'top' && !props.showTopPagination && batchBtn.value}
                          {list.toolsBtn}
                        </div>
                      ),
                    }}
                  </DuxFilter>
                </NCard>
              )
            : null}
          {props.showTopPagination && props.pagination && (
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                {props.batchPosition === 'top' && batchBtn.value}
                {slots?.batchTopExtra?.()}
              </div>
              <div>
                {renderPagination()}
              </div>
            </div>
          )}
          {list.data.value?.length > 0
            ? (
                <NScrollbar
                  class="flex-1 min-h-1"
                  onScroll={(...args) => {
                    props.onScroll?.(...args)
                  }}
                >
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
            <div class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                {props.batchPosition === 'bottom' && batchBtn.value}
                {slots?.batchBottomExtra?.()}
                {slots?.bottom?.(list.data.value, list.meta?.value)}
              </div>
              <div>
                {renderPagination()}
              </div>
            </div>
          )}
        </div>
      </DuxFullPage>
    )
  },
})
