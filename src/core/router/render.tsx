import { defineAsyncComponent, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { sfcRender } from './router'

export const DuxRender = defineComponent({
  name: 'DuxRender',
  setup(_props) {
    const { path } = useRoute()

    const AsyncComp = defineAsyncComponent({
      loader: sfcRender(path),
    })
    return () => <AsyncComp />
  },
})
