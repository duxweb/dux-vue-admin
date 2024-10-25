import type { ComposerTranslation } from 'vue-i18n'
import type { PageEditorComponent } from '../../pageEditor/editor/hook'
import { useVModel } from '@vueuse/core'
import { NButton, NCascader, NFormItem, NSwitch } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useModal } from '../../modal'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxFormEditorItem, DuxFormEditorRule } from './base'

const FormCascader = defineComponent({
  name: 'FormCascader',
  props: {
    options: Object,
  },
  setup(props) {
    return () => (
      <NFormItem label={props.options?.label}>
        <NCascader {...props.options?.attr} />
      </NFormItem>
    )
  },
})

const FormCascaderSetting = defineComponent({
  name: 'FormCascaderSetting',
  props: {
    value: {
      type: Object,
      default: {},
    },
  },
  setup(props, { emit }) {
    const data = useVModel(props, 'value', emit)
    const modal = useModal()
    const { t } = useI18n()

    return () => (
      <div class="">

        <DuxFormEditorItem v-model:value={props.value} />

        <WidgetEditorSettingCard title={t('components.formEditor.config')}>

          <NFormItem label={t('components.formEditor.cascader.multiple')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.multiple} />
            </div>
          </NFormItem>
          <NFormItem label={t('components.formEditor.cascader.cascade')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.cascade} />
            </div>
          </NFormItem>

          <NFormItem label={t('components.formEditor.cascader.showPath')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.showPath} />
            </div>
          </NFormItem>

          <NFormItem label={t('components.formEditor.cascader.disabled')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.disabled} />
            </div>
          </NFormItem>

          <NFormItem label={t('components.formEditor.cascader.clearable')} labelPlacement="left" showFeedback={false}>
            <div class="flex flex-1 justify-end">
              <NSwitch v-model:value={data.value.attr.clearable} />
            </div>
          </NFormItem>

        </WidgetEditorSettingCard>

        <WidgetEditorSettingCard title={t('components.formEditor.options')}>
          <NButton
            block
            dashed
            renderIcon={() => <div class="i-tabler:edit"></div>}
            onClick={() => {
              modal.show({
                title: t('components.formEditor.common.data'),
                component: () => import('./json'),
                componentProps: {
                  desc: t('components.formEditor.cascader.optionsDescription'),
                  value: JSON.stringify(data.value.attr.options, null, 2),
                  onChange: (value) => {
                    try {
                      data.value.attr.options = JSON.parse(value)
                    }
                    catch {}
                  },
                },
              })
            }}
          >
            {t('components.formEditor.common.data')}
          </NButton>

        </WidgetEditorSettingCard>

        <DuxFormEditorRule v-model:value={data.value.rule} />
      </div>
    )
  },
})

export function duxFormEditorCascader(t: ComposerTranslation): PageEditorComponent {
  return {
    name: 'cascader',
    icon: 'i-tabler:list-tree',
    label: t('components.formEditor.cascader.name'),
    group: 'select',
    component: props => <FormCascader {...props} />,
    setting: props => <FormCascaderSetting {...props} />,
    settingDefault: {
      label: t('components.formEditor.cascader.name'),
      name: 'cascader',
      attr: {
        options: [],
        clearable: true,
      },
      rule: [],
    },
  }
}
