import { NButton } from 'naive-ui'
import { defineComponent } from 'vue'
import { emitter } from '../../../event'

export const Search = defineComponent({
  name: 'Search',
  setup() {
    const toggle = () => {
      emitter.emit('command')
    }
    return () => (
      <NButton quaternary circle>
        <div
          class="h-5 w-5 i-tabler-search"
          onClick={toggle}
        />
      </NButton>
    )
  },
})
