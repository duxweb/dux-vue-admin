import type { PropType } from 'vue'
import type { JsonFormItemSchema } from '../form'
import type { TableTab } from '../table'
import type { FilterAction } from './useFilter'
import { useVModel } from '@vueuse/core'
import clsx from 'clsx'
import { NButton, NTabPane, NTabs } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { DuxForm, DuxJsonForm } from '../form'
import { useFilter } from './useFilter'

export const DuxFilter = defineComponent({
  name: 'DuxFilter',
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
    value: {
      type: Object as PropType<Record<string, any>>,
      default: {},
    },
    onSubmit: Function,
    url: String,
  },
  setup(props, { emit, slots }) {
    const { t } = useI18n()
    const route = useRoute()
    const title = ref(route.meta?.title)
    const filterModel = useVModel(props, 'value', emit, {
      passive: true,
      deep: true,
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
                  {props?.tabs?.map((item, key) => <NTabPane key={key} tab={item?.labelLang ? t(item.labelLang) : item.label} name={item.value}></NTabPane>)}
                </NTabs>
              </div>
            )
            : (
              <div class="text-base font-bold flex-1">
                {props?.titleLang ? t(props.titleLang) : props?.title || title.value}
              </div>
            )}

          <div class="md:flex flex-1 gap-2 justify-end hidden">
            {actionButton}
          </div>
          <div class="md:hidden">
            {actionDropdown}
          </div>
        </div>

        <DuxForm layout={width.value > 768 ? 'left' : 'top'}>
          <div class="flex flex-col md:flex-row gap-4">
            <div
              ref={filterRef}
              class={clsx([
                'flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5 4xl:grid-cols-6 gap-3 lg:flex-1 overflow-hidden',
                filterMore.value ? 'h-auto' : 'h-35px',
                filterShow.value ? 'grid' : 'hidden',
              ])}
            >
              {slots?.filter?.()}
              <DuxJsonForm model={filterModel} schema={props?.filter} />
            </div>

            <div class="flex-none flex gap-2 items-center justify-between md:justify-end">
              <div class="!md:hidden flex gap-2">
                <NButton
                  type="default"
                  secondary
                  renderIcon={() => <div class="i-tabler:filter"></div>}
                  onClick={() => {
                    filterShow.value = !filterShow.value
                  }}
                >
                  {t('buttons.filter')}
                </NButton>
              </div>

              <div class="flex gap-2">
                {width.value > 768 && filterHeight.value > 60 && (
                  <NButton
                    text
                    type="primary"
                    onClick={() => {
                      filterMore.value = !filterMore.value
                    }}
                  >
                    {t('buttons.more')}
                    <div class={clsx(['i-tabler:chevron-down transition-all', filterMore.value ? 'rotate-180' : 'rotate-0'])}></div>
                  </NButton>
                )}
                {props?.filter && props?.filter?.length > 0 && (
                  <NButton
                    class={filterShow.value ? 'flex' : 'hidden'}
                    type="primary"
                    secondary
                    renderIcon={() => <div class="i-tabler:search"></div>}
                    onClick={() => props.onSubmit?.()}
                  >
                    {t('buttons.query')}
                  </NButton>
                )}

                {slots?.tools?.()}
              </div>
            </div>
          </div>
        </DuxForm>
      </div>
    )
  },
})
