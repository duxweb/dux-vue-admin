import type { FormInst } from 'naive-ui'
import { useForm } from 'alova/client'
import clsx from 'clsx'
import { NButton, NForm, NFormItem, NInput, NPopover, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
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

    const {
      loading: submitLoading,
      form,
      send,
      onSuccess,
      onError,
    } = useForm(
      (formData) => {
        const data = formData as Record<string, any>
        data.dots = captchaData.dots
        data.code = String(captchaData.code)
        return client.post({
          url: resource.loginUrl,
          data,
        })
      },
      {
        initialForm: {
          username: '',
          password: '',
        },
      },
    )

    onSuccess((res) => {
      manage.login(res.data?.data)
      setTimeout(() => {
        router.push({
          path: resource.getIndexPath(),
          replace: true,
          force: true,
        })
      }, 100)
    })

    onError((res) => {
      getCaptcha()
      captchaTheme.value = 'default'
      message.error(res?.error?.message || t('message.requestError'))
    })

    function handleSubmit() {
      send()
    }

    function getCaptcha() {
      captchaLoading.value = true
      client.get<Record<string, any>>({
        url: resource.captchaUrl,
        config: {
          cacheFor: 0,
        },
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
      if (resource.config?.captcha) {
        getCaptcha()
      }
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
            class="flex justify-center tex absolute h-30 w-30 rotate-45 cursor-pointer items-end p-3 text-white bg-primary -right-15 -top-15 hover:bg-brand-hover"
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
            <div class="flex flex-col items-center justify-center mt-4 h-20 ">
              <dux-logo />
              <div class="mt-4 text-lg">
                {resource.manageConfig?.title || 'Dux Admin Manage'}
              </div>
            </div>
            <div class="my-6">
              <NForm ref={formRef} model={form}>
                <NFormItem showLabel={false} path="username">
                  <NInput value={form.value.username} onUpdateValue={v => form.value.username = v} type="text" placeholder={t('pages.login.placeholder.username')} size="large">
                    {{
                      default: () => <div class="text-lg i-tabler:user" />,
                    }}
                  </NInput>
                </NFormItem>
                <NFormItem showLabel={false} path="password">
                  <NInput value={form.value.password} onUpdateValue={v => form.value.password = v} type="password" showPasswordOn="mousedown" placeholder={t('pages.login.placeholder.password')} size="large" inputProps={{ autocomplete: 'new-password' }}>
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

                <div class="mb-2 mt-4">
                  <NButton type="primary" size="large" block loading={submitLoading.value} onClick={handleSubmit}>
                    {t('pages.login.buttons.login')}
                  </NButton>
                </div>
              </NForm>
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
