import { useOverlayInject } from '@overlastic/vue'
import Drawer from './drawer.tsx'

export interface UseDrawerResult {
  show: (props: UseDrawerProps) => Promise<any>
}

export interface UseDrawerProps {
  title?: string
  width?: number
  component: () => Promise<any>
  componentProps?: Record<string, any>
}

export function useDrawer(): UseDrawerResult {
  const create = useOverlayInject(Drawer)

  const show = (props: UseDrawerProps) => {
    return create(props)
  }

  return {
    show,
  }
}
