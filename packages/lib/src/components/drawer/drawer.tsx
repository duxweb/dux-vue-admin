import { useExtendOverlay } from '@overlastic/vue'
import { NDrawer } from 'naive-ui'
import { defineAsyncComponent, defineComponent } from 'vue'
import type { AsyncComponentLoader, PropType } from 'vue'
import { DuxWindowHeader } from '../window'

export default defineComponent({
  name: 'DuxDrawer',
  props: {
    title: String,
    width: Number,
    component: {
      type: Function as PropType<AsyncComponentLoader<any>>,
      required: true,
    },
    componentProps: Object,
  },
  setup(props) {
    const { visible, resolve, reject, vanish } = useExtendOverlay({
      duration: 1000,
    })

    const params = props?.componentProps || {}
    params.onConfirm = resolve
    params.onClose = reject

    const Page = defineAsyncComponent(props.component)

    return () => (
      <NDrawer
        closeOnEsc={false}
        maskClosable={false}
        minWidth={400}
        defaultWidth={props?.width || 400}
        resizable={true}
        show={visible.value}
        onUpdateShow={() => resolve()}
        onAfterLeave={() => {
          vanish()
        }}
        class=""
      >
        <div class="h-full flex flex-col">
          <DuxWindowHeader title={props.title} onClose={reject} />
          <Page {...params} onSuccess={resolve} onClose={reject} />
        </div>
      </NDrawer>
    )
  },
})