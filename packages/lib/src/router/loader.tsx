import { defineComponent } from 'vue'
import { DuxException } from '../components'
import { DuxRender } from './render'

export default defineComponent({
  name: 'DuxLoader',
  setup(_props) {
    return () => (
      <DuxException>
        <DuxRender />
      </DuxException>
    )
  },
})
