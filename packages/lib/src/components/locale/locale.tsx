import { computed, defineComponent } from 'vue'

export const DuxLocale = defineComponent({
  name: 'DuxLocale',
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
    langs: {
      type: Array,
      default: () => [],
    },
    field: {
      type: String,
      required: true,
    },
  },
  setup(props, { emit, slots }) {
    const translations = computed({
      get() {
        const value = { ...props.value }
        props.langs.forEach((lang: any) => {
          if (!value[lang.name]) {
            value[lang.name] = {}
          }
          if (!value[lang.name][props.field]) {
            value[lang.name][props.field] = ''
          }
        })
        return value
      },
      set(newValue) {
        emit('update:value', newValue)
      },
    })

    const updateTranslation = (lang, value) => {
      const newTranslations = { ...translations.value }
      if (!newTranslations[lang]) {
        newTranslations[lang] = {}
      }
      newTranslations[lang][props.field] = value
      translations.value = newTranslations
    }

    return () => (
      <n-table>
        <thead>
          <tr>
            <th>默认</th>
            {props.langs.map((lang: any) => (
              <th key={lang.name}>{lang.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{slots.default?.()}</td>
            {props.langs.map((lang: any) => (
              <td key={lang.name}>
                <n-input
                  value={translations.value[lang.name]?.[props.field]}
                  onUpdate:value={val => updateTranslation(lang.name, val)}
                />
              </td>
            ))}
          </tr>
        </tbody>
      </n-table>
    )
  },
})
