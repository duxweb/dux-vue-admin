import type { FormInst } from 'naive-ui'
import { useQuery } from '@tanstack/vue-query'
import { cloneDeep } from 'lodash-es'
import { useMessage } from 'naive-ui'
import { computed, type ComputedRef, isRef, type Ref, ref, toRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useClient } from '../../hooks/useClient'
import { useValidation } from './useValidation'

export interface UseFormProps {
  url?: string | ComputedRef<string | undefined>
  id?: unknown | Ref<unknown>
  initData?: Record<string, any>
  formRef?: Ref<FormInst>
  invalidate?: string | string[]
  success?: (data: Record<string, any>) => void
  model?: Ref<Record<string, any>> | Record<string, any>
  edit?: boolean
  refetch?: boolean
}

export function useForm({ formRef, url, id, initData, invalidate, model, edit, success, refetch }: UseFormProps) {
  const client = useClient()
  const message = useMessage()
  const validation = useValidation()
  const { t } = useI18n()

  const formLoading = ref(false)
  const formModel = toRef<Record<string, any>>(model || {})
  const initModel = ref(initData)
  const idRef = toRef(id)

  const isEdit = computed(() => {
    return idRef.value || edit
  })

  const getUrl = () => {
    if (!url) {
      return ''
    }
    return isRef(url) ? url.value : url
  }

  const getDataUrl = computed(() => {
    if (idRef.value) {
      return `${getUrl()}/${idRef.value}`
    }
    return getUrl()
  })

  const enabled = ref(false)

  const { data, error, isFetching, refetch: refetchData } = useQuery({
    queryKey: [getDataUrl.value, {
      id: idRef,
    }],
    queryFn: () => {
      return client.get({
        url: getDataUrl.value,
      })
    },
    enabled,
  })

  watch(initModel, (v) => {
    if (isEdit.value || v === undefined) {
      return
    }
    formModel.value = { ...v }
  }, {
    immediate: true,
  })

  watch(data, (v) => {
    if (!isEdit.value || v === undefined) {
      return
    }

    const newData = cloneDeep(v?.data || {})
    formModel.value = { ...newData }
    initModel.value = { ...newData }
  }, {
    immediate: true,
  })

  watch(error, (v) => {
    message.error(v?.message || t('message.requestError'))
  })

  watch(isFetching, (v) => {
    formLoading.value = v
  })

  const getData = () => {
    refetchData()
  }

  const onReset = () => {
    validation.reset()
    formModel.value = { ...cloneDeep(initModel.value || {}) }
  }

  const onClear = () => {
    formModel.value = cloneDeep(initData || {})
  }

  const request = () => {
    if (idRef.value) {
      return client.put({
        url: `${getUrl()}/${idRef.value}`,
        data: formModel.value,
      })
    }
    else {
      return client.post({
        url: getUrl(),
        data: formModel.value,
      })
    }
  }

  const send = () => {
    formLoading.value = true
    validation.reset()

    request().then((res) => {
      message.success(res.data?.message || t('message.requestSuccess'))
      success?.(res)

      const routeUrl = getUrl()

      const history: (string | undefined)[] = []

      if (isEdit.value && refetch) {
        client.invalidate(getDataUrl.value)
        history.push(getDataUrl.value)
      }

      if (!history.includes(routeUrl)) {
        client.invalidate(routeUrl)
        history.push(routeUrl)
      }

      const invalidates = Array.isArray(invalidate) ? invalidate : [invalidate]
      invalidates.forEach((v) => {
        if (!history.includes(v)) {
          client.invalidate(v)
        }
      })

      if (!isEdit.value) {
        onReset()
      }
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

  const onSubmit = () => {
    // 如果 formRef 不存在，则直接发送请求
    if (!formRef) {
      send()
      return
    }

    // 如果 formRef 存在，则先验证表单
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

  watch(isEdit, (v) => {
    if (v) {
      enabled.value = true
    }
  }, { immediate: true })

  return {
    model: formModel,
    loading: formLoading,
    onSubmit,
    onReset,
    onClear,
    getData,
  }
}
