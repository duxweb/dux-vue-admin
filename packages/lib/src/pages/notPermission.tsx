import { defineComponent } from 'vue'
import { DuxFullPage, DuxPage403 } from '../components'

export default defineComponent({
  name: 'DuxNotPermission',
  setup(_props) {
    return () => (
      <DuxFullPage>
        <DuxPage403 />
      </DuxFullPage>
    )
  },
})
