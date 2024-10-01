import { inject } from 'vue'
import { useRoute } from 'vue-router'
import type { Ref } from 'vue'
import type { Config } from '../config/type'

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

  return {
    manage: manage?.value || 'admin',
    id: params.id || undefined,
    path,
    name,
    config,
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
    registerUrl: config?.apiConfig?.register || '/register',
    forgotPasswordUrl: config?.apiConfig?.forgotPassword || '/forgotPassword',
    updatePasswordUrl: config?.apiConfig?.updatePassword || '/updatePassword',
    genUrl,
  }
}
