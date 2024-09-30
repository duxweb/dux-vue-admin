import { NButton, NCard } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { codeToHtml } from 'shiki'
import { defineComponent, ref, watch } from 'vue'
import { useThemeStore } from '../../stores'

export const DuxExample = defineComponent({
  name: 'DuxExample',
  props: {
    title: String,
    code: String,
    lang: String,
  },
  setup(props, { slots }) {
    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)

    const html = ref('')

    watch([darkMode, () => props.code], () => {
      codeToHtml(props.code || '', {
        lang: props.lang || 'vue-html',
        themes: {
          light: 'one-light',
          dark: 'dracula',
        },
        colorReplacements: {
        },
        defaultColor: darkMode.value ? 'dark' : 'light',

      }).then((v) => {
        html.value = v
      })
    }, { immediate: true, deep: true })

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
          footer: () => open.value ? <div v-html={html.value}></div> : undefined,
        }}
      </NCard>
    )
  },
})
