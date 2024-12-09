import type { AiMessage } from 'aieditor'
import type { PropType } from 'vue'
import { AiEditor } from 'aieditor'
import { storeToRefs } from 'pinia'
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useResource } from '../../hooks'
import { useManageStore } from '../../stores'
import { useThemeStore } from '../../stores/theme'
import { useUpload } from '../upload'
import 'aieditor/dist/style.css'

export const DuxAiEditor = defineComponent({
  name: 'DuxAiEditor',
  props: {
    value: String,
    defaultValue: String,
    uploadUrl: String,
    uploadHeaders: Object as PropType<Record<string, any>>,
    aiUrl: String,
  },
  setup(props, { emit }) {
    const divRef = ref()
    let aiEditor: AiEditor | null = null

    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)
    const { uploadUrl, aichatUrl } = useResource()
    const { send } = useUpload()

    const { getUser } = useManageStore()
    const { t } = useI18n()

    onMounted(() => {
      aiEditor = new AiEditor({
        theme: darkMode.value ? 'dark' : 'light',
        element: divRef.value as Element,
        placeholder: t('components.editor.placeholder'),
        content: props?.value || props?.defaultValue,
        onChange: (aiEditor) => {
          const value = aiEditor.getHtml()
          emit('update:value', value)
        },
        image: {
          uploadUrl: props.uploadUrl || uploadUrl,
          uploadHeaders: props.uploadHeaders || {},
          uploader: (file: File, uploadUrl: string, headers: Record<string, any>): Promise<Record<string, any>> => {
            return new Promise((resolve, reject) => {
              send({
                url: uploadUrl,
                file,
                headers,
                onSuccess(res) {
                  resolve({
                    errorCode: 0,
                    data: {
                      src: res?.url,
                      alt: res?.name,
                    },
                  })
                },
                onError(error) {
                  reject(error)
                },
              })
            })
          },
        },
        video: {
          uploadUrl: props.uploadUrl || uploadUrl,
          uploadHeaders: props.uploadHeaders || {},
          uploader: (file, uploadUrl, headers) => {
            return new Promise((resolve, reject) => {
              send({
                url: uploadUrl,
                file,
                headers,
                onSuccess(res) {
                  resolve({
                    errorCode: 0,
                    data: {
                      src: res?.url,
                    },
                  })
                },
                onError(error) {
                  reject(error)
                },
              })
            })
          },
        },
        attachment: {
          uploadUrl: props.uploadUrl || uploadUrl,
          uploadHeaders: props.uploadHeaders || {},
          uploader: (file, uploadUrl, headers) => {
            return new Promise((resolve, reject) => {
              send({
                url: uploadUrl,
                file,
                headers,
                onSuccess(res) {
                  resolve({
                    errorCode: 0,
                    data: {
                      href: res?.url,
                      fileName: res?.name,
                    },
                  })
                },
                onError(error) {
                  reject(error)
                },
              })
            })
          },
        },
        ai: {
          models: {
            custom: {
              url: props.aiUrl || aichatUrl,
              headers: () => {
                const user = getUser()
                return {
                  'Content-Type': 'application/json',
                  'Authorization': user?.token,
                }
              },
              wrapPayload: (message: string) => {
                return JSON.stringify({ prompt: message })
              },
              parseMessage: (message: string): AiMessage => {
                const data = JSON.parse(message)
                return {
                  role: 'assistant',
                  content: data.message,
                  index: data.number,
                  status: data.status,
                }
              },
              protocol: 'sse',
            } as Record<string, any>,
          },

        },
      })
    })

    watch(darkMode, (value) => {
      if (!divRef.value) {
        return
      }
      divRef.value.classList.remove('aie-theme-dark', 'aie-theme-light')
      divRef.value.classList.add(value ? 'aie-theme-dark' : 'aie-theme-light')
    }, { immediate: true })

    onUnmounted(() => {
      aiEditor?.destroy()
    })

    return () => (
      <div ref={divRef} style="height: 600px; width:100%" />
    )
  },
})
