import { useI18n } from 'vue-i18n'
import { useModal } from '../components'

export function usePdf() {
  const modal = useModal()
  const { t } = useI18n()

  const open = (url: string) => {
    modal.show({
      title: t('hook.pdf.title'),
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
