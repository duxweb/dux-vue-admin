import type { Ref } from 'vue'
import type { Config } from '../config/type'
import { computed, inject } from 'vue'
import { useRoute } from 'vue-router'

export function useResource() {
  const config = inject<Config>('dux.config')
  const manage = inject<Ref<string>>('dux.manage')
  const route = useRoute()

  // 使用 computed 函数包装需要响应式的值
  const currentManage = computed(() => manage?.value || 'admin')
  const currentManageConfig = computed(() => config?.manage?.[currentManage.value])

  // 只对需要响应式的路由相关属性使用 computed
  const id = computed(() => route.params.id || undefined)
  const path = computed(() => route.path)
  const name = computed(() => route.name)

  // API URL 通常不需要响应式，直接使用普通值
  const routerUrl = config?.apiConfig?.router || '/router'
  const messageUrl = config?.apiConfig?.message || '/message'
  const aichatUrl = config?.apiConfig?.aiChat || '/aiChat'
  const uploadUrl = config?.apiConfig?.upload || '/upload'
  const uploadManageUrl = config?.apiConfig?.uploadManage || '/uploadManage'
  const loginUrl = config?.apiConfig?.login || '/login'
  const checkUrl = config?.apiConfig?.check || '/check'
  const captchaUrl = config?.apiConfig?.captcha || '/captcha'
  const verifyUrl = config?.apiConfig?.verify || '/verify'

  const genUrl = (pathStr?: string) => {
    let prefix = currentManageConfig.value?.apiPrefix
    if (prefix === undefined) {
      prefix = currentManage.value
    }
    pathStr = pathStr ? pathStr.replace(/^\//, '') : ''
    return pathStr ? `${prefix ? `/${prefix}` : ''}/${pathStr || ''}` : ''
  }

  const getIndexPath = () => {
    return `/${currentManage.value}`
  }

  const genPath = (pathStr?: string) => {
    const prefix = currentManage.value
    pathStr = pathStr ? pathStr.replace(/^\//, '') : ''
    return pathStr ? `${prefix ? `/${prefix}` : ''}/${pathStr || ''}` : ''
  }

  // 返回包含响应式引用的对象
  return {
    manage: currentManage,
    id,
    path,
    name,
    config,
    manageConfig: currentManageConfig,
    routerUrl,
    messageUrl,
    aichatUrl,
    uploadUrl,
    uploadManageUrl,
    loginUrl,
    checkUrl,
    captchaUrl,
    verifyUrl,
    genUrl,
    genPath,
    getIndexPath,
  }
}
