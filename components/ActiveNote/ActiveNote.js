import { useEffect } from 'react'
import { openLinkInNewTab } from '~/utils/openLinkInNewTab'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Rating } from 'semantic-ui-react'

const renderers = {
  code: ({ language, value }) => {
    return <SyntaxHighlighter style={materialDark} language={language} children={value} />
  }
}

export const ActiveNote = ({ note }) => {
  if (!note) return null;

  const { description, priority, title } = note

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
  // const handleSetRate = (e, { rating, maxRating }) => {}

  return (
    <div className='todo-item'>
      <div
        style={{ marginBottom: '5px', userSelect: 'none' }}
      >
        <h3>{title}</h3>
      </div>
      <div
        style={{ marginBottom: '20px', userSelect: 'none' }}
      >
        <div
          style={{ marginBottom: '10px', userSelect: 'none' }}
        >
          <Rating key={priority} maxRating={5} rating={priority} disabled />
        </div>
        <div style={{ borderBottom: '2px solid lightgray' }} />
      </div>
      <div className='description-markdown'>
        <ReactMarkdown
          plugins={[gfm, {singleTilde: false}]}
          renderers={renderers}
          children={description}
        />
      </div>
      {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(note, null, 2)}</pre> */}
    </div>
  )
}
