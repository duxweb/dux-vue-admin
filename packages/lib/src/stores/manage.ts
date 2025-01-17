import type { Ref } from 'vue'
import { defineStore } from 'pinia'
import { inject, ref } from 'vue'

export interface UserState {
  raw?: Record<string, any>
  token?: string
  id?: number
  info?: Record<string, any>
  permission?: Record<string, boolean>
}

export const useManageStore = defineStore('manage', () => {
  const data = ref<Record<string, UserState | undefined>>({})
  const manage = inject<Ref<string>>('dux.manage')

  const isLogin = (): boolean => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    return !!data.value[manage?.value]
  }

  const getUser = (): UserState => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    return data.value[manage?.value] || {}
  }

  const login = (info: Record<string, any>) => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    data.value = {
      ...data.value,
      [manage.value]: {
        raw: info,
        token: info.token,
        id: info.info?.id,
        info: info.info,
        permission: info.permission,
      },
    }
  }

  const update = (info: Record<string, any>) => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    data.value = {
      ...data.value,
      [manage.value]: {
        raw: info,
        token: info.token,
        id: info.info?.id,
        info: info.info,
        permission: info.permission,
      },
    }
  }

  const logout = () => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    const newData = { ...data.value }
    delete newData[manage.value]
    data.value = newData
  }

  return {
    data,
    getUser,
    login,
    isLogin,
    logout,
    update,
  }
}, {
  persist: {
    pick: ['data'],
  },
})
