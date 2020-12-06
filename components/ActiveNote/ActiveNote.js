import { useEffect } from 'react'
import { openLinkInNewTab } from '~/utils/openLinkInNewTab'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={materialDark} language={language} children={value} />
  }
}

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
    <div className='todo-item'>
      <div
        style={{ marginBottom: '20px', userSelect: 'none' }}
      >
        <h3>{note.title}{!!note.priority ? <span className='muted'> <i className="fas fa-star"></i> {note.priority}</span> : null}</h3>
        <div style={{ borderBottom: '2px solid lightgray' }} />
      </div>
      <div className='description-markdown'>
        <ReactMarkdown
          plugins={[gfm, {singleTilde: false}]}
          renderers={renderers}
          children={note.description}
        />
      </div>
      {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(note, null, 2)}</pre> */}
    </div>
  )
}
