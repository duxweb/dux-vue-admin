import type { FormInst } from 'naive-ui'
import { useForm as useAForm } from 'alova/client'
import { useMessage } from 'naive-ui'
import { onMounted, type Ref, ref, toRef, watch } from 'vue'
import { useClient } from '../../hooks/useClient'

interface UseFormProps {
  url?: string
  id?: string | number
  initData?: Record<string, any>
  formRef?: Ref<FormInst>
  invalidate?: string
  success?: (data: Record<string, any>) => void
  model?: Ref<Record<string, any>>
}

export function useForm({ formRef, url, id, initData, invalidate, model, success }: UseFormProps) {
  const client = useClient()
  const message = useMessage()

  const formLoading = ref(false)

  const {
    loading,
    form,
    send,
    onSuccess,
    onError,
    reset,
    updateForm,
  } = useAForm(
    (formData: Record<string, any>) => {
      if (id) {
        return client.put({
          url: `${url}/${id}`,
          data: formData,
        })
      }
      else {
        return client.post({
          url,
          data: formData,
        })
      }
    },
    {
      initialForm: initData || {},

    },
  )

  const formModel = toRef(model)

  watch(form, (v) => {
    formModel.value = v
  }, { immediate: true, deep: true })

  watch(loading, (v) => {
    formLoading.value = v
  }, { immediate: true })

  const getData = () => {
    formLoading.value = true
    client.get({
      url: `${url}/${id}`,
    }).then((res) => {
      updateForm(res?.data)
    }).catch((res) => {
      message.success(res.data?.message || '数据请求失败')
    }).finally(() => {
      formLoading.value = false
    })
  }

  onSuccess((res) => {
    message.success(res.data?.message || '数据提交成功')

    success?.(res)

    client.invalidate(invalidate)
  })

  onError((res) => {
    message.error(res?.error?.message || '数据提交异常')
  })

  const onSubmit = () => {
    if (!formRef) {
      send(form)
      return
    }
    formRef?.value?.restoreValidation()
    formRef?.value?.validate((errors) => {
      if (errors) {
        errors?.forEach((items) => {
          items.forEach((item) => {
            message.error(item?.message || '数据校验失败')
          })
        })
        message.error('Invalid')
        return
      }
      send()
    })
  }

  const onReset = () => {
    reset()
  }

  onMounted(() => {
    if (id) {
      getData()
    }
  })

  return {
    model: formModel,
    loading: formLoading,
    onSubmit,
    onReset,
  }
}
