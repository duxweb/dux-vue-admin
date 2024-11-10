import { useExtendOverlay } from '@overlastic/vue'
import { NModal, NSpin } from 'naive-ui'
import { defineAsyncComponent, defineComponent, Suspense } from 'vue'
import { DuxWindowHeader } from '../window'

export const DuxModal = defineComponent({
  name: 'DuxModal',
  props: {
    title: String,
    component: Function,
    componentProps: Object,
    width: {
      type: Number,
      default: 500,
    },
  },
  setup(props) {
    const { visible, resolve, reject, vanish } = useExtendOverlay({
      duration: 1000,
    })

    const params = props?.componentProps || {}
    params.onConfirm = resolve
    params.onClose = reject

    const Page = defineAsyncComponent(props.component as () => Promise<any>)

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
          <div
            class="bg-white dark:bg-gray-2 w-full rounded shadow max-h-full flex flex-col"
            style={{
              maxWidth: `${props.width}px`,
            }}
          >
            <div class="flex-none">
              <DuxWindowHeader title={props.title} onClose={reject} />
            </div>
            <Suspense>
              {{
                default: () => <Page {...params} />,
                fallback: () => (
                  <NSpin show>
                    <div class="h-100"></div>
                  </NSpin>
                ),
              }}
            </Suspense>
          </div>
        </div>
      </NModal>
    )
  },
})
