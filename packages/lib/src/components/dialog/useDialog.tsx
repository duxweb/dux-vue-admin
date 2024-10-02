import { useOverlayInject } from '@overlastic/vue'
import { DuxDialog } from './dialog'

export interface UseDialogResult {
  confirm: (props: UseDialogProps) => Promise<any>
  success: (props: UseDialogProps) => Promise<any>
  error: (props: UseDialogProps) => Promise<any>
}
export interface UseDialogProps {
  title?: string
  content?: string
  type?: 'confirm' | 'error' | 'success'
}

export function useDialog() {
  const create = useOverlayInject(DuxDialog)

  const confirm = (props: UseDialogProps) => {
    return create(props)
  }
  const success = (props: UseDialogProps) => {
    return create({ ...props, type: 'success' })
  }
  const error = (props: UseDialogProps) => {
    return create({ ...props, type: 'error' })
  }

  return {
    confirm,
    success,
    error,
  }
}
