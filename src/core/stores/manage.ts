import { defineStore } from 'pinia'

interface UserState {
  raw?: Record<string, any>
  token?: string
  id?: number
  info?: Record<string, any>
  permission?: Record<string, string>
}

export const useManageStore = defineStore('manage', {
  state: () => ({ data: {} as Record<string, UserState> }),
  actions: {
    getUser(app: string): UserState {
      return this.data[app]
    },
    login(app: string, data: Record<string, any>) {
      this.data[app] = {
        raw: data,
        token: data.token,
        id: data.userInfo?.id,
        info: data.userInfo,
        permission: data.permission,
      }
    },
    logout(app: string) {
      delete this.data[app]
    },
  },
  persist: true,
})
