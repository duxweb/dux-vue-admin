import { useLoadingBar } from 'naive-ui'
import { defineComponent, KeepAlive, Suspense } from 'vue'
import { RouterView, useRoute, useRouter } from 'vue-router'
import { DuxLayout } from '../components'
import { useTabStore } from '../stores'
import { DuxLoading } from './loading'

export const DuxMain = defineComponent({
  name: 'DuxMain',
  setup(_props) {
    const loadingBar = useLoadingBar()

    const router = useRouter()
    const route = useRoute()

    router.beforeEach(() => {
      loadingBar.start()
      return true
    })

    router.afterEach(() => {
      setTimeout(() => {
        loadingBar.finish()
      }, 500)
    })

    const tabStore = useTabStore()

    const cacheMap = new Map()

    function wrap(name, component) {
      let cache
      const cacheName = name
      if (cacheMap.has(cacheName)) {
        cache = cacheMap.get(cacheName)
      }
      else {
        cache = {
          name: cacheName,
          render() {
            return component
          },
        }
        cacheMap.set(cacheName, cache)
      }
      return cache
    }

    tabStore.$subscribe((_mutation, state) => {
      cacheMap.forEach((cache) => {
        if (!state.tabs.some(t => t.name === cache.name)) {
          cacheMap.delete(cache.name)
        }
      })
    })

    return () => (
      <RouterView>
        {{
          default: Component => (
            <Suspense>
              {{
                default: () => route.name !== 'login'
                  ? (
                      <DuxLayout v-cloak un-cloak>
                        <KeepAlive include={tabStore.tabs.map(t => t.name)}>
                          <Component is={wrap(route.name, Component)} key={route.fullPath} />
                        </KeepAlive>
                      </DuxLayout>
                    )
                  : <Component v-else v-cloak un-cloak />,
                fallback: () => <DuxLoading />,
              }}
            </Suspense>
          ),
        }}
      </RouterView>
    )
  },
})
