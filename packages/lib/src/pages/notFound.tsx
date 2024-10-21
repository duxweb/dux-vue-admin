import { defineComponent } from 'vue'
import { DuxFullPage, DuxPage404 } from '../components'

export default defineComponent({
  name: 'DuxNotFound',
  setup(_props) {
    return () => (
      <DuxFullPage><DuxPage404 /></DuxFullPage>
    )
  },
})
