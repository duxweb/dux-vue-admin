import { NButton, NDropdown } from 'naive-ui'
import { defineComponent, ref } from 'vue'
import { getLanguage, languageMaps, setLanguage } from '../../../i18n'

export const Lang = defineComponent({
  name: 'Lang',
  setup() {
    const lang = ref(getLanguage())

    const langList = Object.keys(languageMaps).map((key) => {
      return {
        label: languageMaps[key],
        key,
      }
    })

    function handleLangSelect(key: string) {
      lang.value = key
      setLanguage(key)
    }

    return () => (
      <NDropdown
        trigger="click"
        options={langList}
        value={lang.value}
        onSelect={handleLangSelect}
      >
        <NButton quaternary circle>
          <div class="h-5 w-5 i-tabler:language" />
        </NButton>
      </NDropdown>
    )
  },
})
