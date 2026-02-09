import { NSwitch, NTag } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export const ShowSwitch = defineComponent({
  name: 'ShowSwitch',
  extends: NSwitch,
  setup(props) {
    const { t } = useI18n()
    return () => (
      <div class="flex items-center">
        <NTag type={props.value ? 'success' : 'default'}>
          {props.value ? t('common.yes') : t('common.no')}
        </NTag>
      </div>
    )
  },
})
