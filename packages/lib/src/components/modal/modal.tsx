import { useExtendOverlay } from '@overlastic/vue'
import { NModal } from 'naive-ui'
import { defineAsyncComponent, defineComponent } from 'vue'
import { DuxWindowHeader } from '../window'

export const DuxModal = defineComponent({
  name: 'DuxModal',
  props: {
    title: String,
    component: Function,
    componentProps: Object,
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
      >
        <div class="bg-white dark:bg-gray-2 w-500px rounded shadow">
          <DuxWindowHeader title={props.title} onClose={reject} />
          <Page {...params} />
        </div>
      </NModal>
    )
  },
})
