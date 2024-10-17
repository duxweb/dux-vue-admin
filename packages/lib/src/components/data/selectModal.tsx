import type { DataTableRowKey } from 'naive-ui'
import type { JsonFormItemSchema, TableColumn, UseTableResult } from '..'
import { useWindowSize } from '@vueuse/core'
import { cloneDeep } from 'lodash-es'
import { NButton, NForm } from 'naive-ui'
import { computed, defineComponent, ref } from 'vue'
import { DuxJsonForm, DuxModalPage, DuxTable } from '..'

const Select = defineComponent({
  name: 'Select',
  props: {
    url: String,
    columns: Array<TableColumn>,
    rowKey: {
      type: String,
      default: 'id',
    },
    filter: Array<JsonFormItemSchema>,
    onConfirm: Function,
    onClose: Function,
  },
  setup(props) {
    const columns = computed<TableColumn[]>(() => {
      return [
        {
          type: 'selection',
        },
        ...props.columns || [],
      ] as TableColumn[]
    })

    const checkedRowKeysRef = ref<DataTableRowKey[]>([])
    const checkedRowData = ref<Record<string, any>>([])

    const form = ref<Record<string, any>>({})
    const table = ref<UseTableResult>()

    const { width } = useWindowSize()

    return () => (
      <DuxModalPage>
        {{
          default: () => (
            <div class="p-4 flex flex-col gap-2">
              <NForm model={form} labelPlacement={width.value > 768 ? 'left' : 'top'} labelAlign="left" showFeedback={false} showLabel={false}>
                <div class="flex flex-col md:flex-row gap-4">
                  <DuxJsonForm model={form} schema={props?.filter} />
                  <NButton onClick={() => {
                    table.value?.send()
                  }}
                  >
                    筛选
                  </NButton>
                </div>
              </NForm>
              <DuxTable
                ref={table}
                form={form.value}
                tableKey={props.rowKey}
                maxHeight={400}
                url={props.url}
                columns={columns.value as any}
                checkedRowKeys={checkedRowKeysRef.value}
                onUpdateCheckedRowKeys={(rowKeys, rows) => {
                  checkedRowKeysRef.value = rowKeys
                  checkedRowData.value = cloneDeep(rows)
                }}
              />
            </div>
          ),
          action: () => (
            <>
              <NButton onClick={() => {
                props.onClose?.()
              }}
              >
                取消
              </NButton>
              <NButton
                type="primary"
                onClick={() => {
                  props.onConfirm?.(checkedRowData.value)
                }}
              >
                选择
              </NButton>
            </>
          ),
        }}
      </DuxModalPage>
    )
  },
})

export default Select
