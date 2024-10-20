import type { MentionOption } from 'naive-ui'
import { useVModel } from '@vueuse/core'
import { NMention } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { useClient } from '../../hooks'

export const DuxMentionAsync = defineComponent({
  name: 'DuxMentionAsync',
  props: {
    url: String,
    labelField: {
      type: String,
      default: 'name',
    },
    valueField: {
      type: String,
      default: 'name',
    },
  },
  extends: NMention,
  setup(props, { emit }) {
    const model = useVModel(props, 'value', emit, {
      passive: true,
      defaultValue: props.defaultValue,
    })

    const options = ref<MentionOption[]>([])
    const loading = ref(false)
    const client = useClient()

    const handleSearch = (pattern: string) => {
      loading.value = true
      client.get({
        url: props.url,
        params: {
          keyword: pattern,
          limit: 10,
        },
        config: {
          debounce: 300,
        },
      }).then((res) => {
        options.value = res?.data?.map(row => ({
          label: row[props.labelField],
          value: row[props.valueField],
        })) || []
      }).finally(() => {
        loading.value = false
      })
    }

    return () => (
      <NMention {...props} v-model:value={model.value} options={options.value} onSearch={handleSearch} loading={loading.value} />
    )
  },
})
