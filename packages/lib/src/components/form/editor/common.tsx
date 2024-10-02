import { useVModel } from '@vueuse/core'
import { NButton, NDynamicInput, NFormItem, NInput, NSelect } from 'naive-ui'
import { defineComponent } from 'vue'
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
    return () => (
      <WidgetEditorSettingCard title="基本配置">
        <NFormItem label="标签" path="label">
          <NInput
            v-model:value={data.value.label}
          />
        </NFormItem>
        <NFormItem label="字段名">
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

    return () => (
      <WidgetEditorSettingCard title="验证规则">
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
                    placeholder="请选择验证规则"
                    v-model:value={value.type}
                    options={[
                      {
                        label: '必填',
                        value: 'required',
                      },
                      {
                        label: '正则',
                        value: 'regexp',
                      },
                    ]}
                  />
                </div>
                {value.type === 'regexp' && (
                  <div>
                    <NInput
                      placeholder="请输入正则表达式"
                      v-model:value={value.regexp}
                    />
                  </div>
                )}
                <div>
                  <NInput
                    placeholder="验证提醒消息"
                    v-model:value={value.message}
                  />
                </div>
              </div>
            ),
            'create-button-default': () => '添加验证规则',
            'action': ({ index, create, remove }) => {
              return (
                <div class="grid grid-cols-2 gap-2">
                  <NButton block secondary type="primary" onClick={() => create(index)}>添加</NButton>
                  <NButton block secondary onClick={() => remove(index)}>删除</NButton>
                </div>
              )
            },
          }}
        </NDynamicInput>

      </WidgetEditorSettingCard>
    )
  },
})
