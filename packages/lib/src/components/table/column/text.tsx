import type { TableColumnRender } from '../../table'

export interface ColumnTextProps {
  key?: string
}

export function columnText(props: ColumnTextProps): TableColumnRender {
  return (rowData) => {
    if (!props.key || rowData?.[props.key] === undefined || rowData?.[props.key] === null || rowData?.[props.key] === '') {
      return '-'
    }
    return rowData?.[props.key]
  }
}
