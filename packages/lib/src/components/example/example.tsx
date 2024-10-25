import { NButton, NCard } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { DuxCodeEditor } from '../code'

export const DuxExample = defineComponent({
  name: 'DuxExample',
  props: {
    title: String,
    code: String,
    lang: String,
  },
  async setup(props, { slots }) {
    const open = ref(false)
    return () => (
      <NCard
        title={props.title}
        size="small"
        segmented={{
          content: true,
          footer: true,
        }}
        headerExtra={() => (
          <NButton
            quaternary
            size="small"
            renderIcon={() => <div class="i-tabler:code"></div>}
            onClick={() => {
              open.value = !open.value
            }}
          />
        )}
      >
        {{
          default: slots.default,
          footer: () => open.value ? <DuxCodeEditor value={props.code} readonly /> : undefined,
        }}
      </NCard>
    )
  },
})
