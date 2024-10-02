import type { TableColumnRender } from '../../table'

export interface ColumnTextProps {
  key?: string
}

export function columnText(props: ColumnTextProps): TableColumnRender {
  return rowData => props.key ? `${rowData?.[props.key]}` : '-'
}
