import { useEffect } from 'react'
import { openLinkInNewTab } from '~/utils/openLinkInNewTab'

const rawMarkup = (html) => ({ __html: html });

export const ActiveNote = ({ note }) => {
  if (!note) return null;

  // Links should be opened in new tab:
  useEffect(() => {
    const descriptionMarkdown = document.querySelector(
      '.description-markdown'
    )

    if (typeof window !== 'undefined') {
      if (!!descriptionMarkdown)
        descriptionMarkdown?.addEventListener('click', openLinkInNewTab)
    }
    return () => {
      if (typeof window !== 'undefined') {
        if (!!descriptionMarkdown)
          descriptionMarkdown?.removeEventListener('click', openLinkInNewTab)
      }
    }
  }, [])

  return (
    <div style={{ maxHeight: 'calc(100vh - 60px)', overflowY: 'auto', borderRadius: '.28571429rem' }}>
      <div
        style={{ marginBottom: '20px' }}
      >
        <h3>{note.title}</h3>
        <div style={{ borderBottom: '2px solid lightgray' }} />
      </div>
      <div
        className='description-markdown'
        style={{ whiteSpace: 'pre-wrap' }}
        dangerouslySetInnerHTML={rawMarkup(note.description)}
      />
      {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(note, null, 2)}</pre> */}
    </div>
  )
}