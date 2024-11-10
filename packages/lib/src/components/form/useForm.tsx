import type { Method } from 'alova'
import type { FormInst } from 'naive-ui'
import { cloneDeep } from 'lodash-es'
import { useMessage } from 'naive-ui'
import { type Ref, ref, toRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClient } from '../../hooks/useClient'
import { useValidation } from './useValidation'

export interface UseFormProps {
  url?: string
  id?: unknown | Ref<unknown>
  initData?: Record<string, any>
  formRef?: Ref<FormInst>
  invalidate?: string
  success?: (data: Record<string, any>) => void
  model?: Ref<Record<string, any>> | Record<string, any>
  edit?: boolean
}

export function useForm({ formRef, url, id, initData, invalidate, model, edit, success }: UseFormProps) {
  const client = useClient()
  const message = useMessage()
  const validation = useValidation()
  const { t } = useI18n()

  const formLoading = ref(false)
  const formModel = toRef<Record<string, any>>(model || {})
  const initModel = ref(initData)
  const idRef = toRef(id)

  const request = (): Method => {
    if (idRef.value) {
      return client.put({
        url: `${url}/${idRef.value}`,
        data: formModel.value,
      })
    }
    else {
      return client.post({
        url,
        data: formModel.value,
      })
    }
  }

  const send = () => {
    validation.reset()
    request().then((res) => {
      message.success(res.data?.message || t('message.requestSuccess'))
      success?.(res)
      client.invalidate(invalidate || url)
    }).catch((res) => {
      if (res?.data) {
        Object.entries(res?.data).forEach(([key, value]) => {
          validation.set(key, value as string[], value?.[0] as string)
        })
      }
      message.error(res?.message || t('message.requestError'))
    }).finally(() => {
      formLoading.value = false
    })
  }

  const getData = () => {
    formLoading.value = true
    client.get({
      url: idRef.value ? `${url}/${idRef.value}` : url,
      config: {
        cacheFor: 0,
      },
    }).then((res) => {
      initModel.value = res?.data
      formModel.value = res?.data
    }).catch((res) => {
      message.success(res.data?.message || t('message.requestError'))
    }).finally(() => {
      formLoading.value = false
    })
  }

  const onSubmit = () => {
    if (!formRef) {
      send()
      return
    }
    formRef?.value?.validate((errors) => {
      if (errors) {
        errors?.forEach((items) => {
          items.forEach((item) => {
            message.error(item?.message || t('message.validateError'))
          })
        })
        message.error('Invalid')
        return
      }
      send()
    })
  }

  const onReset = () => {
    validation.reset()
    formModel.value = cloneDeep(initModel.value || {})
  }

  const onClear = () => {
    formModel.value = cloneDeep(initData || {})
  }

  watch(idRef, () => {
    if (idRef.value || edit) {
      getData()
    }
    else if (initData) {
      initModel.value = initData
      onReset()
    }
  }, { immediate: true, deep: true })

  return {
    model: formModel,
    loading: formLoading,
    onSubmit,
    onReset,
    onClear,
  }
}
