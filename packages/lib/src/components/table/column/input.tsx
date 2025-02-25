import type { TableColumnRender } from '../..'
import { NButton, NInput, NInputGroup } from 'naive-ui'
import { defineComponent, ref } from 'vue'

export interface ColumnInputProps {
  key?: string
  url?: string | ((rowData: object) => string)
}

const TableColumnInput = defineComponent({
  name: 'TableColumnInput',
  props: {
    rowData: {
      type: Object,
      required: true,
    },
    rowKey: {
      type: String,
      default: 'status',
    },
    url: {
      type: String,
      required: true,
    },
    client: {
      type: Object,
      required: true,
    },
    message: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const isEditing = ref(false)
    const inputValue = ref('')

    const saveValue = (v: string) => {
      const oldValue = props.rowData[props.rowKey]
      props.rowData[props.rowKey] = v
      props.client.patch({
        url: props.url,
        data: {
          [props.rowKey]: v,
        },
      }).then(() => {
        props.rowData[props.rowKey] = v
        isEditing.value = false
      }).catch((e) => {
        props.rowData[props.rowKey] = oldValue
        props.message.error(e.message)
      })
    }

    return () => {
      return isEditing.value
        ? (
            <NInputGroup>
              <NInput
                v-model:value={inputValue.value}
                autofocus
              />
              <NButton
                type="primary"
                onClick={() => {
                  if (inputValue.value !== props.rowData[props.rowKey]) {
                    saveValue(inputValue.value)
                  }
                  else {
                    isEditing.value = false
                  }
                }}
                renderIcon={() => <div class="n-icon i-tabler:check"></div>}
              >
              </NButton>
            </NInputGroup>
          )
        : (
            <div class="flex">
              <div
                class="cursor-pointer flex justify-start items-center gap-1 border-b border-dashed hover:border-primary"
                onClick={() => {
                  inputValue.value = props.rowData[props.rowKey]
                  isEditing.value = true
                }}
              >
                <div class="size-4 i-tabler:pencil"></div>
                <div>
                  {props.rowData[props.rowKey] === undefined || props.rowData[props.rowKey] === '' ? '-' : props.rowData[props.rowKey]}
                </div>
              </div>
            </div>
          )
    }
  },
})

export function columnInput(props: ColumnInputProps, client, message, key?: string | number, tableUrl?: string): TableColumnRender {
  return (rowData) => {
    const rowKey = props.key || 'status'
    let url = `${tableUrl}/${rowData[key || 'id']}`
    if (props.url) {
      url = typeof props.url === 'function' ? props.url(rowData) : props.url
    }

    return (
      <TableColumnInput
        rowData={rowData}
        rowKey={rowKey}
        url={url}
        client={client}
        message={message}
      />
    )
  }
}
