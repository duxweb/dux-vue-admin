import { NCard, NPagination, NScrollbar, NSkeleton } from 'naive-ui'
import { defineComponent } from 'vue'
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
    render: Function,
  },
  setup(props, { slots }) {
    const list = useList({
      url: '/mall',
    })

    return () => (
      <DuxPageFull>
        <div class="h-full flex flex-col gap-2">
          <NCard class="flex-none">
            <DuxFilter title={props.title} filter={props.filter} tabs={props.tabs} actions={props.actions} />
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
            : (list.loading
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
