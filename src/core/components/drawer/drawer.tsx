import { NDrawer } from 'naive-ui'
import { defineAsyncComponent, defineComponent } from 'vue'
import { useExtendOverlay } from '@overlastic/vue'
import { DuxWindowHeader } from '../window'

export default defineComponent({
  name: 'DuxDrawer',
  props: {
    title: String,
    width: Number,
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
