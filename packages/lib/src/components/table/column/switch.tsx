import type { TableColumnRender } from '../..'
import { get } from 'lodash-es'
import { NSwitch } from 'naive-ui'

export interface ColumnSwitchProps {
  key?: string
  url?: string | ((rowData: object) => string)
}

export function columnSwitch(props: ColumnSwitchProps, client, message, key?: string | number, tableUrl?: string): TableColumnRender {
  return (rowData) => {
    const rowKey = props.key || 'status'

    let url = `${tableUrl}/${get(rowData, key || 'id')}`
    if (props.url) {
      url = typeof props.url === 'function' ? props.url(rowData) : props.url
    }

    return (
      <NSwitch
        value={!!rowData[rowKey]}
        onUpdateValue={(v) => {
          rowData[rowKey] = v
          client.patch({
            url,
            data: {
              [rowKey]: v,
            },
          }).then(() => {
            rowData[rowKey] = v
          }).catch((e) => {
            rowData[rowKey] = !v
            message.error(e.message)
          })
        }}
      />
    )
  }
}
