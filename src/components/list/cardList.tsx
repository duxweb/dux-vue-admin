import { NCard } from 'naive-ui'
import { defineComponent } from 'vue'
import { DuxFilter, type ListAction } from '../filter'
import { DuxPageFull } from '../layout'
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
  },
  setup(props) {
    return () => (
      <DuxPageFull>
        <NCard>
          <DuxFilter filter={props.filter} tabs={props.tabs} actions={props.actions} title={props.title} />
        </NCard>
      </DuxPageFull>
    )
  },
})
