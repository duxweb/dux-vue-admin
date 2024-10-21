import { useManageStore } from '../stores'

export function usePermission() {
  const manage = useManageStore()

  const can = (name: string) => {
    if (manage.getUser()?.permission?.[name] === undefined) {
      return true
    }
    return !!manage.getUser()?.permission?.[name]
  }

  const getData = () => {
    return manage.getUser()?.permission
  }

  return {
    can,
    getData,
  }
}
