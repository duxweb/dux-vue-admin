import { NFormItem } from 'naive-ui'
import { defineComponent } from 'vue'
import { WidgetEditorSettingCard } from '../../pageEditor/editor/setting'
import { DuxRadio } from '../../radio'

export const DuxFormEditorSettingPage = defineComponent({
  name: 'DuxFormEditorSettingPage',
  props: {
    value: {
      type: Object,
      default: {},
    },
  },
  setup({ value }) {
    return () => (
      <div class="flex flex-col gap-2">
        <WidgetEditorSettingCard title="表单配置">
          <NFormItem label="标签位置" path="labelPlacement">

            <DuxRadio
              v-model={[value.labelPlacement, 'modelValue']}
              options={[
                { label: '左', value: 'left' },
                { label: '中', value: 'center' },
                { label: '右', value: 'right' },
              ]}
            />
          </NFormItem>
        </WidgetEditorSettingCard>

      </div>
    )
  },
})
