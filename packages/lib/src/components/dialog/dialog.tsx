import type { PropType } from 'vue'
import type { JsonFormItemSchema } from '../form'
import { useExtendOverlay } from '@overlastic/vue'
import { NButton, NForm, NModal } from 'naive-ui'
import { defineComponent, reactive, ref } from 'vue'
import { DuxJsonForm } from '../form'

export const DuxDialog = defineComponent({
  name: 'DuxDialog',
  props: {
    title: String,
    content: String,
    type: String as PropType<'confirm' | 'success' | 'error' | 'prompt' | 'node'>,
    defaultValue: Object,
    formSchema: Array as PropType<JsonFormItemSchema[]>,
    render: Function,
  },
  setup(props) {
    const { visible, resolve, reject, vanish } = useExtendOverlay({
      duration: 1000,
    })

    const form = ref(props.defaultValue || {})

    const data = reactive({
      title: props?.title,
      content: props?.content,
      button: 'default',
    })

    if (props.type === 'confirm') {
      data.title = data.title || '确认提醒'
      data.content = data.content || '请确认执行该操作？'
      data.button = 'primary'
    }

    if (props.type === 'success') {
      data.title = data.title || '成功提醒'
      data.content = data.content || '您已成功执行该操作'
      data.button = 'success'
    }

    if (props.type === 'error') {
      data.title = data.title || '错误提醒'
      data.content = data.content || '该操作执行失败'
      data.button = 'error'
    }

    if (props.type === 'prompt') {
      data.title = data.title || '请输入内容'
      data.button = 'primary'
    }

    return () => (
      <NModal
        displayDirective="show"
        show={visible.value}
        onAfterLeave={() => {
          vanish()
        }}
        role="dialog"
        aria-modal="true"
        size="huge"
        class="p-4 shadow-none! size-screen flex justify-center items-center"
      >
        <div>
          <div class="bg-white dark:bg-gray-2 min-w-400px max-w-full rounded shadow-md">

            {props.type !== 'node'
              ? (
                  <div class="p-6 pb-2 flex gap-4">
                    <div>
                      {(props.type === 'confirm' || props.type === 'prompt') && (
                        <div class="bg-primary bg-opacity-10 text-primary rounded-full p-2">
                          <div class="i-tabler:info-circle size-5"></div>
                        </div>
                      )}
                      {props.type === 'success' && (
                        <div class="bg-success bg-opacity-10 text-success rounded-full p-2">
                          <div class="i-tabler:check size-5"></div>
                        </div>
                      )}
                      {props.type === 'error' && (
                        <div class="bg-error bg-opacity-10 text-error rounded-full p-2">
                          <div class="i-tabler:alert-triangle size-5"></div>
                        </div>
                      )}
                    </div>
                    <div class="flex flex-1 flex-col gap-2">
                      <div class="text-base font-bold">{data.title}</div>
                      {props.type === 'prompt'
                        ? (
                            <NForm labelAlign="left" showLabel={false} showFeedback={false} class="py-2">
                              <DuxJsonForm model={form} schema={props.formSchema} />
                            </NForm>
                          )
                        : (
                            <div class="text-sm text-gray-500">{data.content}</div>
                          )}
                    </div>
                  </div>
                )
              : (
                  <div class="p-4 flex flex-col gap-4">
                    <div class="text-base font-bold">{data.title}</div>
                    {props.render?.()}
                  </div>
                )}
            <div class="px-4  pb-4 flex justify-end gap-2">
              {(props.type === 'confirm' || props.type === 'prompt') && (
                <NButton
                  tertiary
                  type={data.button as any}
                  onClick={() => {
                    reject()
                  }}
                >
                  取消
                </NButton>
              )}
              <NButton
                type={data.button as any}
                onClick={() => {
                  resolve(form.value)
                }}
              >
                确定
              </NButton>
            </div>

          </div>
        </div>
      </NModal>
    )
  },
})
