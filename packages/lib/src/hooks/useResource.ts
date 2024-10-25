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
    return path ? `${prefix ? `/${prefix}` : ''}${path || ''}` : ''
  }

  const getIndexPath = () => {
    const indexPath = config?.manage?.[manage?.value || 'admin'].indexPath
    return indexPath ? `/${manage?.value}/${indexPath}` : `/${manage?.value}/index`
  }

  return {
    manage: manage?.value || 'admin',
    id: params.id || undefined,
    path,
    name,
    config,
    manageConfig: config?.manage?.[manage?.value || 'admin'],
    resUrl: path,
    routerUrl: config?.apiConfig?.router || '/route',
    noticeUrl: config?.apiConfig?.notice || '/notice',
    aichatUrl: config?.apiConfig?.aiChat || '/aiChat',
    uploadUrl: config?.apiConfig?.upload || '/upload',
    uploadManageUrl: config?.apiConfig?.uploadManage || '/uploadManage',
    loginUrl: config?.apiConfig?.login || '/login',
    checkUrl: config?.apiConfig?.check || '/check',
    captchaUrl: config?.apiConfig?.captcha || '/captcha',
    verifyUrl: config?.apiConfig?.verify || '/verify',
    uploadType: config?.apiConfig?.uploadType || 'local',
    genUrl,
    getIndexPath,
  }
}
