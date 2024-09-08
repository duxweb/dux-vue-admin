import { NButton } from 'naive-ui'
import clsx from 'clsx'
import type { VNodeChild } from 'vue'
import { handleAction } from '../useTable'
import type { TableAction } from '../types'
import type { UseModalResult } from '../../modal'
import type { UseDialogResult } from '../../dialog'
import type { UseDrawerResult } from '../../drawer'

export interface TableActionProps {
  key?: string | number
  text?: boolean
  actions?: TableAction[]
  rowData?: object
  rowIndex?: number
  modal?: UseModalResult
  dialog?: UseDialogResult
  drawer?: UseDrawerResult
}

export function tableAction({ key, text, rowData, rowIndex, actions, modal, dialog, drawer }: TableActionProps): VNodeChild {
  return (
    <>
      {actions?.map((item, index) => {
        if (item?.show && !item.show(rowData, rowIndex)) {
          return null
        }
        return (
          <NButton
            key={index}
            text={text}
            type={item.color}
            onClick={() => handleAction({ id: key ? rowData?.[key] : null, item, modal, dialog, drawer })}
            renderIcon={
              () => (
                item?.icon
                  ? (
                      <div class={clsx([
                        'n-icon',
                        item.icon,
                      ])}
                      >
                      </div>
                    )
                  : undefined
              )
            }
          >
            {item.label}
          </NButton>
        )
      })}
    </>
  )
}
