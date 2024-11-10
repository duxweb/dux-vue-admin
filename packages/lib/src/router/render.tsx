import { defineAsyncComponent, defineComponent } from 'vue'
import { useRoute } from 'vue-router'
import { useResource } from '../hooks'
import { useRouteStore } from '../stores'
import { sfcRender } from './sfcRender'

export const DuxRender = defineComponent({
  name: 'DuxRender',
  setup(_props) {
    const route = useRoute()
    const routeStore = useRouteStore()
    const info = routeStore.searchRouteName(route.name as string)
    const res = useResource()
    const AsyncComp = defineAsyncComponent({
      loader: sfcRender(info?.loader ? res.genPath(info.loader) : route.path),
    })
    return () => <AsyncComp />
  },
})
