import type { Column } from 'exceljs'
import type { ButtonProps, DataTableColumn, DataTableColumns, DataTableProps, PaginationProps } from 'naive-ui'
import type { AsyncComponentLoader, Ref, VNodeChild } from 'vue'
import type { UseDialogResult } from '../../dialog'
import type { UseDrawerResult } from '../../drawer'
import type { UseModalResult } from '../../modal'
import type { ColumnMapProps, ColumnMediaProps, ColumnStatusProps, ColumnTagsProps, ColumnTextProps } from '../column'

export interface TableAction {
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

export interface UseTableProps {
  actions?: TableAction[]
  columns: TableColumn[]
  columnActions?: TableAction[]
  filter?: Record<string, any>
  excelColumns?: Column[]
  url?: string
  key?: string | number
  name?: any
  export?: boolean
  import?: boolean
}

export type TableColumnRender = (rowData: object, rowIndex: number) => VNodeChild

export interface UseTableResult {
  data: Ref<any[]>
  pagination: Ref<PaginationProps>
  tableColumns: Ref<DataTableColumns>
  toolsColumns: VNodeChild
  toolsBtn: VNodeChild
  loading: Ref<boolean>
  tableParams: Ref<DataTableProps>
  onSend: () => void
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
  renderType: 'text' | 'type' | 'tags' | 'status' | 'media' | 'map'
  renderProps?: TableActionAdaptor<this['renderType']>
  render?: TableColumnRender
  show?: boolean
  key?: any
}

export type TableColumn = DataTableColumn & TableColumnExtend

export interface HandleAction {
  id?: string | number
  item: TableAction
  modal?: UseModalResult
  dialog?: UseDialogResult
  drawer?: UseDrawerResult
}
