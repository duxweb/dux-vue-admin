import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NButton, NForm, NTabPane, NTabs } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ButtonProps } from 'naive-ui'
import type { AsyncComponentLoader, PropType } from 'vue'
import { DuxJsonForm } from '../form'
import { useFilter } from './useFilter'
import type { JsonFormItemSchema } from '../form'
import type { TableTab } from '../table'

export interface ListAction {
  label: string
  type: 'modal' | 'drawer' | 'link' | 'confirm'
  title?: string
  content?: string
  color?: ButtonProps['type']
  icon?: string
  path?: string
  component?: AsyncComponentLoader<any>
  componentProps?: Record<string, any>
  show?: (rowData?: object, rowIndex?: number) => boolean
}

export const DuxFilter = defineComponent({
  name: 'DuxFilter',
  props: {
    filter: Array<JsonFormItemSchema>,
    tabs: Array<TableTab>,
    actions: Array<ListAction>,
    title: {
      type: String,
    },
    titleLang: {
      type: String,
    },
    value: {
      type: Object as PropType<Record<string, any>>,
      default: {},
    },
    onSubmit: Function,
  },
  setup(props, { emit, slots }) {
    const { t } = useI18n()
    const filterModel = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: {},
    })

    const { actionButton, actionDropdown, filterRef, filterHeight, filterMore, filterShow, width } = useFilter({
      actions: props.actions,
    })

    return () => (
      <div class="flex flex-col gap-4">
        <div class="flex items-center border-b border-gray-2 pb-2 gap-4">
          {props?.tabs && props?.tabs?.length > 0
            ? (
                <div class=" flex-1 w-1">
                  <NTabs
                    animated
                    paneClass="!p-0"
                    value={filterModel.value?.tab}
                    defaultValue={props?.tabs?.[0]?.value}
                    onUpdateValue={(v) => {
                      filterModel.value.tab = v
                      props.onSubmit?.()
                    }}
                  >
                    {props?.tabs?.map((item, key) => <NTabPane key={key} tab={item.label} name={item.value}></NTabPane>)}
                  </NTabs>
                </div>
              )
            : (
                <div class="text-base font-bold flex-1">
                  {props?.titleLang ? t(props.titleLang) : props?.title}
                </div>
              ) }

          <div class="md:flex flex-1 gap-2 justify-end hidden">
            {actionButton}
          </div>
          <div class="md:hidden">
            {actionDropdown}
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
                class="!md:hidden"
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
                <NButton
                  class={filterShow.value ? 'flex' : 'hidden'}
                  type="primary"
                  secondary
                  renderIcon={() => <div class="i-tabler:search"></div>}
                  onClick={() => props.onSubmit?.()}
                >
                  查询
                </NButton>

                {slots?.tools?.()}
              </div>
            </div>
          </div>
        </NForm>
      </div>
    )
  },
})
