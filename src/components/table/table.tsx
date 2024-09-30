import { NDataTable } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useRoute } from 'vue-router'
import type { DataTableInst } from 'naive-ui'
import type { PropType } from 'vue'
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
    form: Object as PropType<Record<string, any>>,
  },
  extends: NDataTable,
  setup(props, { expose }) {
    const route = useRoute()
    const tableRef = ref<DataTableInst>()

    const table = useTable({
      key: props.tableKey,
      url: props.url,
      name: route.name,
      actions: props.actions || [],
      columns: props.columns || [],
      columnActions: props.columnActions || [],
      filter: props.form,
    })

    expose(table)

    return () => (
      <NDataTable
        {...props}
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
