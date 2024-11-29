import type { DataTableInst } from 'naive-ui'
import type { PropType } from 'vue'
import type { TableAction, TableColumn } from './types'
import { NDataTable } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useTable } from './useTable'

type NDataTableT = typeof NDataTable['prototype']

interface DuxTableProps extends NDataTableT {
  tableKey?: string | number
  url?: string
  columns?: TableColumn[]
  columnActions?: TableAction[]
  actions?: TableAction[]
  form?: Record<string, any>
}

export const DuxTable = defineComponent({
  name: 'DuxTable',
  props: {
    tableKey: {
      type: [String, Number],
      default: 'id',
    },
    url: String,
    columns: Array<TableColumn>,
    columnActions: Array<TableAction>,
    form: Object as PropType<Record<string, any>>,
  },
  extends: NDataTable,
  setup(props: DuxTableProps, { expose }) {
    const route = useRoute()
    const tableRef = ref<DataTableInst>()

    const table = useTable({
      key: props.tableKey,
      url: props.url,
      name: route.name,
      columns: props.columns || [],
      columnActions: props.columnActions || [],
      filter: props.form,
    })

    expose(table)

    return () => (
      <NDataTable
        {...props}
        rowKey={row => row[props.tableKey || 'id']}
        loading={table.loading.value}
        ref={tableRef}
        data={table.data.value}
        columns={table.tableColumns.value}
        pagination={table.pagination.value}
        {...table.tableParams.value}
      />
    )
  },
})
