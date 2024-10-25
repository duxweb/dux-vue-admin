import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { DuxPageStatus } from './pageStatus'

export const DuxPageEmpty = defineComponent({
  name: 'DuxPageEmpty',
  props: {
    title: String,
    desc: String,
  },
  setup(props) {
    const { t } = useI18n()
    return () => (
      <DuxPageStatus title={props.title || t('pages.empty.title')} desc={props.desc || t('pages.empty.title')}>
        <dux-draw-empty-form />
      </DuxPageStatus>
    )
  },
})
