import { defineStore } from 'pinia'
import { inject, ref } from 'vue'
import type { Ref } from 'vue'

interface UserState {
  raw?: Record<string, any>
  token?: string
  id?: number
  info?: Record<string, any>
  permission?: Record<string, string>
}

export const useManageStore = defineStore('manage', () => {
  const data = ref<Record<string, UserState>>({})
  const manage = inject<Ref<string>>('dux.manage')

  const getUser = (): UserState => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    return data.value[manage?.value || '']
  }

  const login = (info: Record<string, any>) => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    data.value[manage.value] = {
      raw: info,
      token: info.token,
      id: info.info?.id,
      info: info.info,
      permission: info.permission,
    }
  }

  const update = (info: Record<string, any>) => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    data.value[manage.value] = {
      raw: info,
      token: info.token,
      id: info.userInfo?.id,
      info: info.userInfo,
      permission: info.permission,
    }
  }

  const logout = () => {
    if (!manage?.value) {
      throw new Error('dux.manage is not defined')
    }
    delete data.value[manage?.value || '']
  }

  return {
    data,
    getUser,
    login,
    logout,
    update,
  }
}, {
  persist: {
    pick: ['data'],
  },
})
