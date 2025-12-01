import type { TableColumnRender } from '..'
import * as clipboard from 'clipboard-polyfill'
import { get } from 'lodash-es'
import { NButton, useMessage } from 'naive-ui'

export interface ColumnCopyProps {
  key?: string
  field?: string
  size?: 'tiny' | 'small' | 'medium' | 'large'
}

export function columnCopy({ key, field, size }: ColumnCopyProps): TableColumnRender {
  const message = useMessage()

  const copy = (value: string) => {
    clipboard.writeText(value).then(
      () => { message.success('复制成功') },
      () => { message.error('复制失败') },
    )
  }

  return (rowData) => {
    const value = get(rowData, key || '')
    const fieldValue = get(rowData, field || '')

    return (
      <div>
        {value && value !== '-'
          ? <NButton size={size} text class="!underline !decoration-dashed" iconPlacement="right" renderIcon={() => <div class="i-tabler:copy size-4" />} onClick={() => copy(field ? fieldValue : value)}>{value}</NButton>
          : '-'}
      </div>
    )
  }
}
