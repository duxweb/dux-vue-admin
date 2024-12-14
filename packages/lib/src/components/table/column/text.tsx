import type { TableColumnRender } from '../../table'
import { get } from 'lodash-es'

export interface ColumnTextProps {
  key?: string
}

export function columnText(props: ColumnTextProps): TableColumnRender {
  return (rowData) => {
    const value = get(rowData, props.key || '')

    if (!props.key || value === undefined || value === null || value === '') {
      return '-'
    }
    return value
  }
}
