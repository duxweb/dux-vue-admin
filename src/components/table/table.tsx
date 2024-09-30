import { NDataTable } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { DataTableInst } from 'naive-ui'
import { useTable } from './useTable'
import type { TableAction, TableColumn } from './types'

export const DuxTable = defineComponent({
  name: 'DuxTable',
  props: {
    tableKey: [String, Number],
    url: String,
    columns: Array<TableColumn>,
    columnActions: Array<TableAction>,
    actions: Array<TableAction>,
  },
  extends: NDataTable,
  setup(props) {
    const route = useRoute()
    const tableRef = ref<DataTableInst>()

    const { data, tableColumns, loading, tableParams, pagination } = useTable({
      key: props.tableKey,
      url: props.url,
      name: route.name,
      actions: props.actions || [],
      columns: props.columns || [],
      columnActions: props.columnActions || [],
    })

    return () => (
      <NDataTable
        {...props}
        loading={loading.value}
        ref={tableRef}
        data={data.value}
        columns={tableColumns.value}
        pagination={pagination.value}
        {...tableParams.value}
      />
    )
  },
})
