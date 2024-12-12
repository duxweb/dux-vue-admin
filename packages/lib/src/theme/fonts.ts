export async function loadMiSansFont() {
  const fontUrl = 'https://registry.npmmirror.com/misans/latest/files/lib/Normal/MiSans-Medium.min.css'

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 3000)

    const response = await fetch(fontUrl, {
      method: 'HEAD',
      signal: controller.signal,
    })

    clearTimeout(timeoutId)

    if (!response.ok) {
      console.warn('MiSans load failed, use system default font')
      return false
    }

    const linkElement = document.createElement('link')
    linkElement.rel = 'stylesheet'
    linkElement.type = 'text/css'
    linkElement.href = fontUrl

    linkElement.onerror = () => {
      linkElement.remove()
    }

    document.head.appendChild(linkElement)
    return true
  }
  catch (error) {
    console.warn('MiSans load failed:', error)
    return false
  }
}
