import { useMessage } from 'naive-ui'
import { inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useRouteStore } from '../stores'
import type { Config } from '../config/type'

export function useResource() {
  const config = inject<Config>('duxConfig')
  // const client = useClient()
  const routeStore = useRouteStore()
  const message = useMessage()
  const router = useRouter()

  const { params, name, path } = useRoute()
  const manage = params.manage as string

  const genUrl = (manage?: string, path?: string) => {
    return path ? `/${manage ? `${manage}/` : ''}${path || ''}` : ''
  }

  // 注册异步路由
  const registerAsyncRoutes = () => {
    // client?.get({
    //   url: genUrl(manage, config?.apiConfig?.menu),
    // }).then((res) => {
    //   routeStore.setRoutes(res?.data || [])
    // }).catch((err) => {
    //   message.error(err?.message || '获取路由失败')
    // })
  }

  // 注册本地路由
  const registerRoutes = () => {
    if (!config?.router) {
      return
    }
    routeStore.appendRoutes(config?.router)
    config?.router?.forEach((item) => {
      if (!item.path) {
        return false
      }
      router.addRoute({
        path: item.path,
        name: item.name,
        component: item.component,
        children: [],
        meta: {
          title: item.label,
        },
      })
    })
  }

  return {
    manage: manage || 'admin',
    id: params.id || undefined,
    path,
    name,
    config,
    resUrl: genUrl(manage, path),
    menuUrl: genUrl(manage, config?.apiConfig?.menu || '/menu'),
    uploadUrl: genUrl(manage, config?.apiConfig?.upload || '/upload'),
    uploadManageUrl: genUrl(manage, config?.apiConfig?.uploadManage || 'uploadManage'),
    loginUrl: genUrl(manage, config?.apiConfig?.login || '/login'),
    checkUrl: genUrl(manage, config?.apiConfig?.check || '/check'),
    captchaUrl: genUrl(manage, config?.apiConfig?.captcha || '/captcha'),
    registerUrl: genUrl(manage, config?.apiConfig?.register || '/register'),
    forgotPasswordUrl: genUrl(manage, config?.apiConfig?.forgotPassword || '/forgotPassword'),
    updatePasswordUrl: genUrl(manage, config?.apiConfig?.updatePassword || '/updatePassword'),
    registerAsyncRoutes,
    registerRoutes,
    genUrl,
  }
}
