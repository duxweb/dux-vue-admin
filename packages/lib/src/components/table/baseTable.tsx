import type { TableAction, TableColumn } from './types'
import { NDataTable } from 'naive-ui'
import { computed, defineComponent } from 'vue'
import { useTableColumns } from './useTable'

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
    const columnRender = useTableColumns({
      key: props.tableKey,
      actions: props.columnActions,
    })

    const tableColumns = computed(() => {
      return columnRender(props.columns)
    })

    return () => (
      <NDataTable
        {...props}
        columns={tableColumns.value as any}
      />
    )
  },
})
