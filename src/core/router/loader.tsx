import { defineComponent } from 'vue'
import { DuxException } from '../components'
import { DuxRender } from './render'

export default defineComponent({
  name: 'DuxLoader',
  setup(_props) {
    console.log('异步容器')
    return () => (
      <DuxException>
        <DuxRender />
      </DuxException>
    )
  },
})
