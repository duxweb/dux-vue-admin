import { defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { DuxFullPage, DuxPage404 } from '../components'

export default defineComponent({
  name: 'DuxIframe',
  setup(_props) {
    const route = useRoute()
    return () => (
      <DuxFullPage>
        {route.meta?.src ? <iframe src={route.meta.src as string} class="h-full w-full"></iframe> : <DuxPage404 />}
      </DuxFullPage>
    )
  },
})
