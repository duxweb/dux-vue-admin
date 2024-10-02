import { defineComponent } from 'vue'
import { DuxPage404 } from '../components'

export default defineComponent({
  name: 'DuxNotFound',
  setup(_props) {
    return () => (
      <DuxPage404 />
    )
  },
})
