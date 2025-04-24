import { defineComponent } from 'vue'
import { DuxException } from '../components'
import { DuxRender } from './render'

export default defineComponent({
  name: 'DuxLoader',
  setup(_props) {
    return () => (
      <div class="flex-1 min-h-1 flex flex-col">
        <DuxException>
          <DuxRender />
        </DuxException>
      </div>
    )
  },
})
