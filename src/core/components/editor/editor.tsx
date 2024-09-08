import { AiEditor } from 'aieditor'
import 'aieditor/dist/style.css'
import { defineComponent, onMounted, onUnmounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useUpload } from '../upload'
import { useThemeStore } from '../../stores/theme'
import { useResource } from '../../hooks'

export interface DuxAiEditorProps {
  value?: string
  defaultValue?: string
  uploadUrl?: string
  uploadHeaders?: Record<string, any>
}

export const DuxAiEditor = defineComponent({
  name: 'DuxAiEditor',
  props: {
    value: String,
    defaultValue: String,
    uploadUrl: String,
    uploadHeaders: Object,
  },
  setup(props: DuxAiEditorProps, { emit }) {
    const divRef = ref()
    let aiEditor: AiEditor | null = null

    const themeStore = useThemeStore()
    const { darkMode } = storeToRefs(themeStore)
    const { uploadUrl } = useResource()
    const { send } = useUpload()

    onMounted(() => {
      aiEditor = new AiEditor({
        theme: darkMode.value ? 'dark' : 'light',
        element: divRef.value as Element,
        placeholder: 'Click to Input Content...',
        content: props?.value || props?.defaultValue,
        onChange: (aiEditor) => {
          const value = aiEditor.getHtml()
          emit('update:value', value)
        },
        image: {
          uploadUrl: props.uploadUrl || uploadUrl,
          uploadHeaders: props.uploadHeaders || {},
          uploader: (file: File, uploadUrl: string, headers: Record<string, any>, formName: string): Promise<Record<string, any>> => {
            const formData = new FormData()
            formData.append(formName, file)

            return new Promise((resolve, reject) => {
              send({
                url: uploadUrl,
                formData,
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
          uploader: (file, uploadUrl, headers, formName) => {
            const formData = new FormData()
            formData.append(formName, file)
            return new Promise((resolve, reject) => {
              send({
                url: uploadUrl,
                formData,
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
          uploader: (file, uploadUrl, headers, formName) => {
            const formData = new FormData()
            formData.append(formName, file)
            return new Promise((resolve, reject) => {
              send({
                url: uploadUrl,
                formData,
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
