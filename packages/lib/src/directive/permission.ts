import type { Directive, DirectiveBinding } from 'vue'
import { usePermission } from '../hooks'

export const permissionDirective: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding): void {
    const { value } = binding
    if (!value) {
      return
    }
    const permission = usePermission()
    if (!permission.can(value)) {
      el.parentElement?.removeChild(el)
    }
  },
}
