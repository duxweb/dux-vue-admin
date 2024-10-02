import { useModal } from '../components'

export function usePdf() {
  const modal = useModal()
  const open = (url: string) => {
    modal.show({
      title: '文档预览',
      component: () => import('../components/pdf/pdfView'),
      componentProps: {
        source: url,
      },
    })
  }
  return {
    open,
  }
}
