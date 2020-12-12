export function openLinkInNewTab(e) {
  try {
    const { tagName } = e?.originalTarget

    if (!tagName) return

    if (tagName === 'A') {
      e.preventDefault()
      const newLink = window.document.createElement('a')

      newLink.setAttribute('href', e.originalTarget.href)
      newLink.setAttribute('target', '_blank')
      newLink.click()
    }
  } catch (err) {
    return
  }
}
