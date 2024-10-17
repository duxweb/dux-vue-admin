import type { TableAction, TableColumn } from './types'
import { NDataTable } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { convertTableColumns } from './useTable'

export const DuxBaseTable = defineComponent({
  name: 'DuxBaseTable',
  props: {
    tableKey: {
      type: [String, Number],
      default: 'id',
    },
    columns: Array<TableColumn>,
    columnActions: Array<TableAction>,
  },
  extends: NDataTable,
  setup(props) {
    const tableColumns = computed(() => {
      return convertTableColumns(props.tableKey, props.columns, props.columnActions)
    })

    return () => (
      <NDataTable
        {...props}
        columns={tableColumns.value}
      />
    )
  },
})
