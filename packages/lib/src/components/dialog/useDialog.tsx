import type { VNode } from 'vue'
import type { JsonFormItemSchema } from '../form'
import { useOverlayInject } from '@overlastic/vue'
import { DuxDialog } from './dialog'

export interface UseDialogResult {
  confirm: (props: UseDialogProps) => Promise<any>
  success: (props: UseDialogProps) => Promise<any>
  error: (props: UseDialogProps) => Promise<any>
  node: (props: UseDialogProps) => Promise<any>
  prompt: (props: UseDialogProps) => Promise<any>
}
export interface UseDialogProps {
  title?: string
  content?: string
  type?: 'confirm' | 'error' | 'success' | 'prompt' | 'node'
  defaultValue?: Record<string, any>
  formSchema?: JsonFormItemSchema[]
  render?: () => VNode
}

export function useDialog(): UseDialogResult {
  const create = useOverlayInject(DuxDialog)

  const confirm = (props: UseDialogProps) => {
    return create({ ...props, type: 'confirm' })
  }
  const success = (props: UseDialogProps) => {
    return create({ ...props, type: 'success' })
  }
  const error = (props: UseDialogProps) => {
    return create({ ...props, type: 'error' })
  }
  const prompt = (props: UseDialogProps) => {
    return create({ ...props, type: 'prompt' })
  }
  const node = (props: UseDialogProps) => {
    return create({ ...props, type: 'node' })
  }

  return {
    confirm,
    success,
    error,
    prompt,
    node,
  }
}
