import { defineComponent } from 'vue'
import { DuxException } from '../components'
import { DuxRender } from './render'

export const DuxLoader = defineComponent({
  name: 'DuxLoader',
  setup(_props) {
    return () => (
      <DuxException>
        <DuxRender />
      </DuxException>
    )
  },
})
