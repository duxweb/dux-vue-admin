import type { TableColumnRender } from '..'
import * as clipboard from 'clipboard-polyfill'
import { get } from 'lodash-es'
import { NButton, useMessage } from 'naive-ui'
import { i18n } from '../../../i18n'

export interface ColumnCopyProps {
  key?: string
  field?: string
  size?: 'tiny' | 'small' | 'medium' | 'large'
}

export function columnCopy({ key, field, size }: ColumnCopyProps): TableColumnRender {
  const message = useMessage()

  const copy = (value: string) => {
    clipboard.writeText(value).then(
      () => { message.success((i18n.global.t as any)('components.copy.success')) },
      () => { message.error((i18n.global.t as any)('components.copy.error')) },
    )
  }

  return (rowData) => {
    const value = get(rowData, key || '')
    const fieldValue = get(rowData, field || '')

    return (
      <div>
        {value && value !== '-'
          ? <NButton
              size={size}
              text
              class="!underline !decoration-dashed"
              iconPlacement="right"
              renderIcon={() => <div class="i-tabler:copy size-4" />}
              onClick={(event) => {
                event?.stopPropagation?.()
                copy(field ? fieldValue : value)
              }}
            >
              {value}
            </NButton>
          : '-'}
      </div>
    )
  }
}
