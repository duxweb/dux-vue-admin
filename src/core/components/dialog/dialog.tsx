import { NButton, NModal } from 'naive-ui'
import { defineComponent, reactive } from 'vue'
import { useExtendOverlay } from '@overlastic/vue'

export const DuxDialog = defineComponent({
  name: 'DuxDialog',
  props: {
    title: String,
    content: String,
    type: String,
  },
  setup({ type = 'confirm', ...props }) {
    const { visible, resolve, reject, vanish } = useExtendOverlay({
      duration: 1000,
    })

    const data = reactive({
      title: props?.title,
      content: props?.content,
      button: 'default',
    })

    if (type === 'confirm') {
      data.title = data.title || '确认提醒'
      data.content = data.content || '请确认执行该操作？'
      data.button = 'warning'
    }

    if (type === 'success') {
      data.title = data.title || '成功提醒'
      data.content = data.content || '您已成功执行该操作'
      data.button = 'success'
    }

    if (type === 'error') {
      data.title = data.title || '错误提醒'
      data.content = data.content || '该操作执行失败'
      data.button = 'error'
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

      >
        <div class="bg-white dark:bg-gray-2 min-w-400px max-w-full rounded shadow-md">

          <div class="p-6 pb-2 flex gap-4">
            <div>
              {type === 'confirm' && (
                <div class="bg-warning bg-opacity-10 text-warning rounded-full p-2">
                  <div class="i-tabler:question-mark size-5"></div>
                </div>
              )}
              {type === 'success' && (
                <div class="bg-success bg-opacity-10 text-success rounded-full p-2">
                  <div class="i-tabler:check size-5"></div>
                </div>
              )}
              {type === 'error' && (
                <div class="bg-error bg-opacity-10 text-error rounded-full p-2">
                  <div class="i-tabler:alert-triangle size-5"></div>
                </div>
              )}
            </div>
            <div class="flex flex-col gap-2">
              <div class="text-base font-bold">{data.title}</div>
              <div class="text-gray-7 text-sm">{data.content}</div>
            </div>
          </div>
          <div class="px-4  pb-4 flex justify-end gap-2">
            {type === 'confirm' && (
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
                resolve()
              }}
            >
              确定
            </NButton>
          </div>

        </div>
      </NModal>
    )
  },
})
