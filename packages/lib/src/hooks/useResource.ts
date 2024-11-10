import type { Ref } from 'vue'
import type { Config } from '../config/type'
import { inject } from 'vue'
import { useRoute } from 'vue-router'

export function useResource() {
  const config = inject<Config>('dux.config')
  const manage = inject<Ref<string>>('dux.manage')

  const { params, name, path } = useRoute()

  const genUrl = (path?: string) => {
    let prefix = config?.manage?.[manage?.value || ''].apiPrefix
    if (prefix === undefined) {
      prefix = manage?.value
    }
    path = path ? path.replace(/^\//, '') : ''
    return path ? `${prefix ? `/${prefix}` : ''}/${path || ''}` : ''
  }

  const getIndexPath = () => {
    return `/${manage?.value}`
  }

  const genPath = (path?: string) => {
    const prefix = manage?.value || 'admin'
    path = path ? path.replace(/^\//, '') : ''
    return path ? `${prefix ? `/${prefix}` : ''}/${path || ''}` : ''
  }

  return {
    manage: manage?.value || 'admin',
    id: params.id || undefined,
    path,
    name,
    config,
    manageConfig: config?.manage?.[manage?.value || 'admin'],
    routerUrl: config?.apiConfig?.router || '/router',
    messageUrl: config?.apiConfig?.message || '/message',
    aichatUrl: config?.apiConfig?.aiChat || '/aiChat',
    uploadUrl: config?.apiConfig?.upload || '/upload',
    uploadManageUrl: config?.apiConfig?.uploadManage || '/uploadManage',
    loginUrl: config?.apiConfig?.login || '/login',
    checkUrl: config?.apiConfig?.check || '/check',
    captchaUrl: config?.apiConfig?.captcha || '/captcha',
    verifyUrl: config?.apiConfig?.verify || '/verify',
    genUrl,
    genPath,
    getIndexPath,
  }
}
