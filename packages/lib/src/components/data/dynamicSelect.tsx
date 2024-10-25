import type { PropType } from 'vue'
import type { JsonFormItemSchema } from '../form'
import type { TableColumn } from '../table'
import type { DuxDynamicDataColumn } from './dynamicData'
import { useVModel } from '@vueuse/core'
import { defineComponent, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClient } from '../../hooks'
import { useModal } from '../modal'
import { DuxDynamicData } from './dynamicData'

type Value = Record<string, any>[]

export const DuxDynamicSelect = defineComponent({
  name: 'DuxDynamicSelect',
  props: {
    rowKey: {
      type: String,
      default: 'id',
    },
    url: String,
    columns: Array as PropType<DuxDynamicDataColumn[]>,
    tableColumns: Array as PropType<TableColumn[]>,
    filter: Array<JsonFormItemSchema>,
    value: {
      type: Array as PropType<Value>,
      default: [],
    },
    defaultValue: {
      type: Array as PropType<Value>,
      default: [],
    },
  },
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
      deep: true,
    })

    const modal = useModal()
    const client = useClient()
    const { t } = useI18n()

    const once = ref(true)

    watch([model, once], () => {
      if (!once.value || !model.value || model.value.length === 0) {
        return
      }
      const ids = model.value?.map(e => e[props.rowKey]) || []
      client.get({
        url: props.url,
        params: {
          ids: ids?.join(',') || '',
        },
      }).then((rows: Record<string, any>[]) => {
        once.value = false
        rows?.forEach((row, index) => {
          if (!model.value.some(e => e[props.rowKey] === row[props.rowKey])) {
            model.value.push(row)
          }
          else {
            model.value[index] = { ...model.value[index], ...row }
          }
        })
      })
    })

    return () => (
      <DuxDynamicData
        v-model:value={model.value}
        columns={props.columns}
        onCreate={() => {
          modal.show({
            component: () => import('./selectModal'),
            componentProps: {
              url: props.url,
              columns: props.tableColumns,
              filter: props.filter,
            },
            width: 1000,
            title: t('buttons.select'),
          }).then((rows: Record<string, any>[]) => {
            once.value = false
            rows?.forEach((row) => {
              if (!model.value.some(e => e[props.rowKey] === row[props.rowKey])) {
                model.value.push(row)
              }
            })
          })
        }}
      />
    )
  },
})
