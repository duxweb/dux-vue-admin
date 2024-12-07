import type { Ref } from 'vue'
import { inject, provide, ref } from 'vue'

export interface FormValidation {
  field: string
  errors: string[]
  message?: string
}

export interface ValidationContext {
  validation: Ref<Record<string, FormValidation>>
  add: (field: string) => void
  set: (field: string, errors: string[], message: string) => void
  clear: () => void
  get: (field: string) => FormValidation | undefined
  reset: () => void
}

export function useValidation() {
  const validation = ref<Record<string, FormValidation>>({})

  const add = (field: string) => {
    if (validation.value[field]) {
      return
    }
    validation.value[field] = { field, errors: [], message: '' }
  }

  const set = (field: string, errors?: string[], message?: string) => {
    const item = validation.value[field]
    if (item) {
      item.errors = errors || []
      item.message = message
    }
  }

  const clear = () => {
    validation.value = {}
  }

  const reset = () => {
    validation.value = Object.keys(validation.value).reduce((acc, key) => {
      acc[key] = { ...validation.value[key], errors: [], message: '' }
      return acc
    }, {})
  }

  const get = (field: string) => {
    return validation.value[field]
  }

  const context = {
    validation,
    add,
    set,
    clear,
    get,
    reset,
  }

  provide('validation', context)

  return context
}

export function useValidationContext() {
  return inject<ValidationContext | undefined>('validation', undefined)
}
