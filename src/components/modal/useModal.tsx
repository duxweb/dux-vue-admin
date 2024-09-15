import { useOverlayInject } from '@overlastic/vue'
import { DuxModal } from './modal'

export interface UseModalResult {
  show: (props: UseModalProps) => Promise<any>
}

export interface UseModalProps {
  title?: string
  component?: () => any
  componentProps?: Record<string, any>
}

export function useModal(): UseModalResult {
  const create = useOverlayInject(DuxModal)

  const show = (props: UseModalProps) => {
    return create(props)
  }

  return {
    show,
  }
}
