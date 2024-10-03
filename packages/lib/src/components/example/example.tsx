import { NButton, NCard } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { createHighlighterCore } from 'shiki/core'
import dracula from 'shiki/themes/dracula.mjs'
import oneLight from 'shiki/themes/one-light.mjs'
import getWasm from 'shiki/wasm'
import { defineComponent, ref, watch } from 'vue'
import { useThemeStore } from '../../stores'

export const DuxExample = defineComponent({
  name: 'DuxExample',
  props: {
    title: String,
    code: String,
    lang: String,
  },
  async setup(props, { slots }) {
    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)

    const html = ref('')

    const highlighter = await createHighlighterCore({
      themes: [
        // 传入导入的包，而不是字符串
        oneLight,
        // 如果你需要进行块分割（chunk splitting），请使用动态导入
        dracula,
      ],
      langs: [
        import('shiki/langs/javascript.mjs'),
        import('shiki/langs/html.mjs'),
        import('shiki/langs/vue.mjs'),
        import('shiki/langs/vue-html.mjs'),
        import('shiki/langs/json.mjs'),
        import('shiki/langs/json5.mjs'),
        import('shiki/langs/toml.mjs'),
        import('shiki/langs/yaml.mjs'),
        import('shiki/langs/php.mjs'),
        import('shiki/langs/go.mjs'),
        import('shiki/langs/java.mjs'),
        import('shiki/langs/rust.mjs'),
        import('shiki/langs/sql.mjs'),
      ],
      loadWasm: getWasm,
    })

    watch([darkMode, () => props.code], () => {
      html.value = highlighter.codeToHtml(props.code || '', {
        lang: props.lang || 'vue-html',
        themes: {
          light: 'one-light',
          dark: 'dracula',
        },
        colorReplacements: {
        },
        defaultColor: darkMode.value ? 'dark' : 'light',

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
