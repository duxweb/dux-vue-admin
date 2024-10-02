import { useVModel } from '@vueuse/core'
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { VAceEditor } from 'vue3-ace-editor'
import { useThemeStore } from '../../stores'
import 'ace-builds/src-noconflict/mode-vue'
import 'ace-builds/src-noconflict/mode-javascript'
import 'ace-builds/src-noconflict/mode-html'
import 'ace-builds/src-noconflict/mode-json'
import 'ace-builds/src-noconflict/mode-json5'
import 'ace-builds/src-noconflict/theme-tomorrow_night'
import 'ace-builds/src-noconflict/theme-tomorrow'
import 'ace-builds/src-noconflict/ext-searchbox'
import 'ace-builds/src-noconflict/ext-language_tools'
import 'ace-builds/src-noconflict/mode-snippets'

export const DuxCodeEditor = defineComponent({
  name: 'DuxCodeEditor',
  props: {
    defaultValue: {
      type: String,
      default: '',
    },
    value: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'json',
    },
  },
  setup(props, { emit }) {
    const data = useVModel(props, 'value', emit, {
      defaultValue: props.defaultValue || '',
    })
    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)
    return () => (
      <div class="border border-gray-3">
        <VAceEditor theme={darkMode.value ? 'tomorrow_night' : 'tomorrow'} v-model:value={data.value} value={data.value} lang={props.lang || 'json'} class="h-100" />
      </div>
    )
  },
})
