import { useVModel } from '@vueuse/core'
import { NButton, NDynamicInput, NFormItem, NInput, NSelect } from 'naive-ui'
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'

export const DuxFormEditorItem = defineComponent({
  name: 'DuxFormEditorItem',
  props: {
    value: {
      type: Object,
      default: [],
    },
  },
  setup(props, { emit }) {
    const data = useVModel(props, 'value', emit)
    const { t } = useI18n()

    return () => (
      <WidgetEditorSettingCard title={t('components.formEditor.config')}>
        <NFormItem label={t('components.formEditor.base.label')} path="label">
          <NInput
            v-model:value={data.value.label}
          />
        </NFormItem>
        <NFormItem label={t('components.formEditor.base.field')}>
          <NInput
            v-model:value={data.value.name}
          />
        </NFormItem>
      </WidgetEditorSettingCard>
    )
  },
})

export const DuxFormEditorRule = defineComponent({
  name: 'FormEditorInput',
  props: {
    value: {
      type: Array,
      default: [],
    },
  },
  setup(props, { emit }) {
    const data = useVModel(props, 'value', emit)
    const { t } = useI18n()

    return () => (
      <WidgetEditorSettingCard title={t('components.formEditor.base.rule')}>
        <NDynamicInput
          class="flex flex-col gap-4"
          itemClass="flex-col gap-2"
          v-model:value={data.value}
          onCreate={() => {
            return {
              type: 'required',
              message: '',
              data: undefined,
            }
          }}
        >
          {{
            'default': ({ value }) => (
              <div class="flex flex-col gap-2">
                <div>
                  <NSelect
                    placeholder={t('components.formEditor.base.rulePlaceholder')}
                    v-model:value={value.type}
                    options={[
                      {
                        label: t('components.formEditor.base.required'),
                        value: 'required',
                      },
                      {
                        label: t('components.formEditor.base.regexp'),
                        value: 'regexp',
                      },
                    ]}
                  />
                </div>
                {value.type === 'regexp' && (
                  <div>
                    <NInput
                      placeholder={t('components.formEditor.base.regexpPlaceholder')}
                      v-model:value={value.regexp}
                    />
                  </div>
                )}
                <div>
                  <NInput
                    placeholder={t('components.formEditor.base.messagePlaceholder')}
                    v-model:value={value.message}
                  />
                </div>
              </div>
            ),
            'create-button-default': () => t('components.formEditor.base.addRule'),
            'action': ({ index, create, remove }) => {
              return (
                <div class="grid grid-cols-2 gap-2">
                  <NButton block secondary type="primary" onClick={() => create(index)}>{t('components.buttons.add')}</NButton>
                  <NButton block secondary onClick={() => remove(index)}>{t('components.buttons.delete')}</NButton>
                </div>
              )
            },
          }}
        </NDynamicInput>

      </WidgetEditorSettingCard>
    )
  },
})
