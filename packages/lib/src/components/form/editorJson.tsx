import { NAlert } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxCodeEditor } from '../code'

export default defineComponent({
  props: {
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  setup(props) {
    const { t } = useI18n()
    return () => (
      <div class="p-4">
        <div class="mb-2">
          <NAlert type="info">{t('components.formEditor.common.json')}</NAlert>
        </div>
        <DuxCodeEditor value={JSON.stringify(props.value, null, 2)} readonly />
      </div>
    )
  },
})
