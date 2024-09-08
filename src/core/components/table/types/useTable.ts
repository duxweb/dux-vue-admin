import type { ButtonProps, DataTableColumn, DataTableColumns, DataTableInst, DataTableProps, FormInst, PaginationProps } from 'naive-ui'
import type { Ref, VNodeChild } from 'vue'
import type { ColumnMapProps, ColumnMediaProps, ColumnStatusProps, ColumnTagsProps, ColumnTextProps } from '../column'
import type { UseModalResult } from '../../modal'
import type { UseDialogResult } from '../../dialog'
import type { UseDrawerResult } from '../../drawer'

export interface TableAction {
  label: string
  type: 'modal' | 'drawer' | 'link' | 'confirm'
  title?: string
  content?: string
  color?: ButtonProps['type']
  icon?: string
  path?: string
  component?: () => any
  componentProps?: Record<string, any>
  show?: (rowData?: object, rowIndex?: number) => boolean
}

export interface UseTableProps {
  tableRef?: Ref<DataTableInst | undefined>
  actions: TableAction[]
  columns: TableColumn[]
  columnActions: TableAction[]
  formRef?: Ref<FormInst>
  url?: string
  key?: string | number
  name?: any
}

export type TableColumnRender = (rowData: object, rowIndex: number) => VNodeChild

export interface UseTableResult {
  data: Ref<any[]>
  pagination?: PaginationProps
  tableActions: VNodeChild
  dropdownActions: VNodeChild
  tableColumns: Ref<DataTableColumns>
  toolsColumns: VNodeChild
  toolsBtn: VNodeChild
  filterModel: any
  loading: Ref<boolean>
  tableParams: DataTableProps
  onFilter: () => void
}

export interface TableTabProps {
  label: string
  value: string
}

export interface TableActionAttrMap {
  text: ColumnTextProps
  type: ColumnStatusProps
  tags: ColumnTagsProps
  status: ColumnStatusProps
  media: ColumnMediaProps
  map: ColumnMapProps
}

export type TableActionAdaptor<T extends keyof TableActionAttrMap> = TableActionAttrMap[T] | Record<string, any>

interface TableColumnExtend {
  renderType?: 'text' | 'type' | 'tags' | 'status' | 'media' | 'map'
  renderProps?: TableActionAdaptor<this['renderType']>
  show?: boolean
  key?: any
}

export type TableColumn = DataTableColumn & TableColumnExtend

export interface HandleAction {
  id?: string | number
  item: TableAction
  modal: UseModalResult
  dialog: UseDialogResult
  drawer: UseDrawerResult
}
