import type { FormInst } from 'naive-ui'
import { useIntervalFn } from '@vueuse/core'
import clsx from 'clsx'
import { NButton, NForm, NFormItem, NInput, NInputGroup, NPopover, NTab, NTabs, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { DuxSelectAsync } from '../components'
import { useResource } from '../hooks'
import { useClient } from '../hooks/useClient'
import { useManageStore } from '../stores/manage'
import { useThemeStore } from '../stores/theme'

export default defineComponent({
  name: 'DuxLoginPage',
  setup(_props) {
    // 主题配置
    const themeStore = useThemeStore()
    const { modeState, darkMode } = storeToRefs(themeStore)

    // 验证码
    const captchaShow = ref<boolean>(false)
    const captchaLoading = ref<boolean>(false)
    const captchaTheme = ref<'default' | 'error' | 'success'>('default')
    const captchaData = reactive({
      code: '',
      dots: '',
      image: '',
      thumb: '',
    })

    // 表单
    const formRef = ref<FormInst | null>()
    const message = useMessage()
    const resource = useResource()
    const manage = useManageStore()
    const router = useRouter()
    const client = useClient()
    const { t } = useI18n()

    const loginType = ref<'password' | 'code'>('password')
    const form = reactive({
      username: '',
      password: '',
      dots: '',
      code: '',
      tel_code: '+86',
    })

    const countdown = ref(0)
    const sendingCode = ref(false)

    const { pause, resume } = useIntervalFn(() => {
      countdown.value--
      if (countdown.value <= 0) {
        pause()
      }
    }, 1000, { immediate: false })

    const countdownText = computed(() => {
      return countdown.value > 0 ? `${countdown.value}s` : '获取验证码'
    })

    const canSendCode = computed(() => {
      return countdown.value === 0 && form.username && !sendingCode.value
    })

    const sendVerifyCode = () => {
      if (!canSendCode.value)
        return

      if (!form.username) {
        message.error('请输入账号')
        return
      }

      sendingCode.value = true
      client.get({
        url: '/code',
        params: {
          tel: form.username,
          tel_code: form.tel_code,
        },
      }).then(() => {
        resume()
        message.success('验证码已发送')
        countdown.value = 60
      }).catch((res) => {
        message.error(res?.message || '验证码发送失败')
      }).finally(() => {
        sendingCode.value = false
      })
    }

    const submitLoading = ref(false)
    const submit = () => {
      submitLoading.value = true
      const requestData: any = {
        username: form.username,
        tel_code: form.tel_code,
        login_type: loginType.value,
      }

      if (loginType.value === 'password') {
        requestData.password = form.password
        requestData.dots = captchaData.dots
        requestData.code = String(captchaData.code)
      }
      else {
        requestData.code = form.code
      }

      client.post({
        url: resource.loginUrl,
        data: requestData,
      }).then((res) => {
        manage.login(res.data)
        router.push({ path: resource.getIndexPath() })
      }).catch((res) => {
        if (loginType.value === 'password') {
          getCaptcha()
          captchaTheme.value = 'default'
        }
        message.error(res?.message || t('message.requestError'))
      }).finally(() => {
        submitLoading.value = false
      })
    }

    function getCaptcha() {
      if (!resource.config?.captcha) {
        return
      }
      captchaLoading.value = true
      client.get<Record<string, any>>({
        url: resource.captchaUrl,
      }).then((res) => {
        captchaData.image = res?.data?.image
        captchaData.thumb = res?.data?.thumb
        captchaData.code = res?.data?.code
      }).catch((res) => {
        message.error(res?.message || t('message.requestError'))
      }).finally(() => {
        captchaLoading.value = false
      })
    }

    function sendCaptcha() {
      captchaLoading.value = true
      client.post<Record<string, any>>({
        url: resource.verifyUrl,
        data: {
          code: String(captchaData.code),
          dots: captchaData.dots,
        },
      }).then(() => {
        captchaTheme.value = 'success'
      }).catch((e) => {
        if (e?.error?.code === 400) {
          getCaptcha()
        }
        captchaTheme.value = 'error'
      }).finally(() => {
        captchaLoading.value = false
      })
    }

    const clickEvents = {
      confirm(dots: Record<string, any>, clear: () => void): void {
        const dotArr: number[] = []
        for (let i = 0; i < dots.length; i++) {
          const dot = dots[i]
          dotArr.push(dot.x, dot.y)
        }
        captchaData.dots = dotArr.join(',')
        captchaShow.value = false
        sendCaptcha()
        setTimeout(() => {
          clear()
        }, 100)
      },
      refresh(): void {
        getCaptcha()
        captchaTheme.value = 'default'
      },
      close(): void {
        captchaShow.value = false
      },
    }

    onMounted(() => {
      getCaptcha()
    })

    return () => (
      <div
        un-cloak
        class={clsx([
          'h-screen w-screen flex items-start justify-center text-secondary md:items-center',
          darkMode.value ? 'login-dark-bg' : 'login-bg',
        ])}
      >
        <div class="relative md:m-4 max-w-180  w-full grid-cols-1 md:grid-cols-2 gap-12 overflow-hidden md:rounded-lg p-8 md:shadow md:bg-gray-1 grid">
          <div
            class="flex justify-center tex absolute h-30 w-30 rotate-45 cursor-pointer items-end p-3 text-white bg-primary -right-20 -top-20 hover:bg-brand-hover"
            onClick={themeStore.toggleDarkMode}
          >
            {modeState.value === 'auto' && <div class="i-tabler:brightness-half h-5 w-5" />}
            {modeState.value === 'light' && <div class="h-5 w-5 i-tabler:sun" />}
            {modeState.value === 'dark' && <div class="h-5 w-5 i-tabler:moon" />}
          </div>
          <div class="justify-center hidden md:flex flex-row items-center">
            {resource.config?.loginBanner ? <img class="w-full h-auto" src={resource.config?.loginBanner} /> : <div class="w-full h-auto"><dux-draw-apps /></div>}
          </div>
          <div class="flex flex-col">
            <div class="flex flex-col items-center justify-center mt-4">
              <div>
                {resource.config?.logo ? (darkMode.value && resource.config?.darkLogo ? <img class="w-auto h-16" src={resource.config?.darkLogo} /> : <img class="w-auto h-16" src={resource.config?.logo} />) : <div class="h-10"><dux-logo /></div>}
              </div>
              <div class="mt-4 text-lg">
                {resource.manageConfig?.value?.title || 'Dux Admin Manage'}
              </div>
            </div>
            <div class="my-6">
              {resource.manageConfig?.value?.loginCode
                ? (
                    <>
                      <NTabs value={loginType.value} type="segment" animated default-value="password" onUpdateValue={v => loginType.value = v as 'password' | 'code'}>
                        <NTab tab="密码登录" name="password" />
                        <NTab tab="验证码登录" name="code" />
                      </NTabs>
                      <NForm ref={formRef} model={form} class="flex flex-col gap-4 mt-4">
                        <NFormItem showLabel={false} path="username" showFeedback={false}>
                          <NInputGroup>
                            <DuxSelectAsync url="/areaCode" value={form.tel_code} onUpdateValue={v => form.tel_code = v} labelField="code" valueField="code" size="large" style={{ width: '120px' }} />
                            <NInput value={form.username} onUpdateValue={v => form.username = v} type="text" placeholder={t('pages.login.placeholder.username')} size="large">
                              {{
                                default: () => <div class="text-lg i-tabler:user" />,
                              }}
                            </NInput>
                          </NInputGroup>
                        </NFormItem>
                        {loginType.value === 'password'
                          ? (
                              <>
                                <NFormItem showLabel={false} path="password" showFeedback={false}>
                                  <NInput value={form.password} onUpdateValue={v => form.password = v} type="password" showPasswordOn="mousedown" placeholder={t('pages.login.placeholder.password')} size="large" inputProps={{ autocomplete: 'new-password' }}>
                                    {{
                                      default: () => <div class="text-lg i-tabler:lock" />,
                                    }}
                                  </NInput>
                                </NFormItem>
                                {resource.config?.captcha && (
                                  <div>
                                    <NPopover trigger="click" show={captchaShow.value} contentClass="p-0" raw={true} showArrow={false} onUpdateShow={(v: boolean) => captchaShow.value = v}>
                                      {{
                                        default: () => (
                                          <gocaptcha-click
                                            config={{
                                              title: t('pages.login.placeholder.captcha'),
                                            }}
                                            data={captchaData}
                                            events={clickEvents}
                                          />
                                        ),
                                        trigger: () => (
                                          <NButton size="large" secondary type={captchaTheme.value} block loading={captchaLoading.value} class="relative text-left">
                                            {{
                                              default: () => (
                                                <div>
                                                  {captchaTheme.value === 'default' ? t('pages.login.captcha.default') : ''}
                                                  {captchaTheme.value === 'success' ? t('pages.login.captcha.success') : ''}
                                                  {captchaTheme.value === 'error' ? t('pages.login.captcha.error') : ''}
                                                </div>
                                              ),
                                              icon: () => (
                                                <>
                                                  <span class="absolute i-tabler:shield-lock animate-ping inline-flex opacity-75 size-4" />
                                                  <div class="i-tabler:shield-lock size-4" />
                                                </>
                                              ),
                                            }}
                                          </NButton>
                                        ),
                                      }}
                                    </NPopover>
                                  </div>
                                )}
                              </>
                            )
                          : (
                              <NFormItem showLabel={false} path="verifyCode" showFeedback={false}>

                                <NInput
                                  value={form.code}
                                  onUpdateValue={v => form.code = v}
                                  type="text"
                                  placeholder="请输入验证码"
                                  size="large"
                                >
                                  {{
                                    default: () => <div class="text-lg i-tabler:message" />,
                                    suffix: () => (
                                      <NButton
                                        type="primary"
                                        size="small"
                                        disabled={!canSendCode.value}
                                        loading={sendingCode.value}
                                        onClick={sendVerifyCode}
                                      >
                                        {countdownText.value}
                                      </NButton>
                                    ),
                                  }}
                                </NInput>
                              </NFormItem>
                            )}
                      </NForm>
                    </>
                  )
                : (
                    <NForm ref={formRef} model={form} class="flex flex-col gap-4">
                      <NFormItem showLabel={false} path="username" showFeedback={false}>
                        <NInput value={form.username} onUpdateValue={v => form.username = v} type="text" placeholder={t('pages.login.placeholder.username')} size="large">
                          {{
                            default: () => <div class="text-lg i-tabler:user" />,
                          }}
                        </NInput>
                      </NFormItem>
                      <NFormItem showLabel={false} path="password" showFeedback={false}>
                        <NInput value={form.password} onUpdateValue={v => form.password = v} type="password" showPasswordOn="mousedown" placeholder={t('pages.login.placeholder.password')} size="large" inputProps={{ autocomplete: 'new-password' }}>
                          {{
                            default: () => <div class="text-lg i-tabler:lock" />,
                          }}
                        </NInput>
                      </NFormItem>

                      {resource.config?.captcha && (
                        <div>
                          <NPopover trigger="click" show={captchaShow.value} contentClass="p-0" raw={true} showArrow={false} onUpdateShow={(v: boolean) => captchaShow.value = v}>
                            {{
                              default: () => (
                                <gocaptcha-click
                                  config={{
                                    title: t('pages.login.placeholder.captcha'),
                                  }}
                                  data={captchaData}
                                  events={clickEvents}
                                />
                              ),
                              trigger: () => (
                                <NButton size="large" secondary type={captchaTheme.value} block loading={captchaLoading.value} class="relative text-left">
                                  {{
                                    default: () => (
                                      <div>
                                        {captchaTheme.value === 'default' ? t('pages.login.captcha.default') : ''}
                                        {captchaTheme.value === 'success' ? t('pages.login.captcha.success') : ''}
                                        {captchaTheme.value === 'error' ? t('pages.login.captcha.error') : ''}
                                      </div>
                                    ),
                                    icon: () => (
                                      <>
                                        <span class="absolute i-tabler:shield-lock animate-ping inline-flex opacity-75 size-4" />
                                        <div class="i-tabler:shield-lock size-4" />
                                      </>
                                    ),
                                  }}
                                </NButton>
                              ),
                            }}
                          </NPopover>
                        </div>
                      )}
                    </NForm>
                  )}

              <div class="mb-2 mt-4">
                <NButton type="primary" size="large" block loading={submitLoading.value} onClick={submit}>
                  {t('pages.login.buttons.login')}
                </NButton>
              </div>
            </div>
            <div class="text-center text-sm text-gray-5">
              {resource.config?.copyright || 'All rights reserved © duxweb 2024'}
            </div>
          </div>
        </div>
      </div>
    )
  },
})
