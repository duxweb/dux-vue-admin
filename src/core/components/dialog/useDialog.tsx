import { useOverlayInject } from '@overlastic/vue'
import {DuxDialog} from './dialog.tsx'

export interface UseDialogResult {
  confirm: (props: UseDialogProps) => Promise<any>
}

export interface UseDialogProps {
  title?: string
  content?: string
  type?: 'confirm' | 'error' | 'success'
}

export function useDialog(): UseDialogResult {
  const create = useOverlayInject(DuxDialog)

  const confirm = (props: UseDialogProps) => {
    return create(props)
  }

  return {
    confirm,
  }
}
