import clsx from 'clsx'
import type { VNodeChild } from 'vue'
import type { TableColumnRender } from '..'

export interface ColumnMapTypeValue {
  icon?: string
  label?: string
  value?: any
  render?: (value: any) => VNodeChild
}

export interface ColumnMapProps {
  maps?: ColumnMapTypeValue[]
}

export function columnMap({ maps }: ColumnMapProps): TableColumnRender {
  return (rowData) => {
    return (
      <div class="flex flex-col gap-1">
        {maps?.map(item => (
          <div class="flex">
            <div class="flex text-gray-6 items-center gap-1">
              {item.icon && (
                <div class={clsx([
                  'n-icon',
                  item.icon,
                ])}
                >
                </div>
              )}
              {item.label}
              ：
            </div>
            <div>{item?.render ? item.render(rowData[item.value]) : rowData[item.value]}</div>
          </div>
        ))}
      </div>
    )
  }
}
