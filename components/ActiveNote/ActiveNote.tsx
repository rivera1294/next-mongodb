import { useEffect } from 'react'
import { openLinkInNewTab } from '~/utils/openLinkInNewTab'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
// import { materialDark as prismTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { synthwave84 as prismTheme } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import { Rating } from 'semantic-ui-react'
import { useFreshNote } from '~/hooks'
import { Scrollbars } from 'react-custom-scrollbars'
import { useWindowSize } from '~/hooks'

const renderers = {
  code: ({ language, value }: any) => {
    return <SyntaxHighlighter showLineNumbers={true} style={prismTheme} language={language} children={value} />
  },
}

interface IProps {
  note: any
  descriptionRenderer?: React.FC<any>
}

export const ActiveNote = ({ note: initialNote, descriptionRenderer }: IProps) => {
  const note = useFreshNote(initialNote)
  const { description, priority, title, _id } = note

  // Links should be opened in new tab:
  useEffect(() => {
    const descriptionMarkdown = document.querySelector('.description-markdown')

    if (typeof window !== 'undefined') {
      if (!!descriptionMarkdown) descriptionMarkdown?.addEventListener('click', openLinkInNewTab)
    }
    return () => {
      if (typeof window !== 'undefined') {
        if (!!descriptionMarkdown) descriptionMarkdown?.removeEventListener('click', openLinkInNewTab)
      }
    }
  }, [])
  // const handleSetRate = (e, { rating, maxRating }) => {}
  const { height } = useWindowSize()

  return (
    <div className="todo-item">
      <div style={{ marginBottom: '5px', userSelect: 'none' }}>
        <h3>{title}</h3>
      </div>
      {!!_id && (
        <div style={{ userSelect: 'none' }}>
          <div style={{ marginBottom: '10px', userSelect: 'none' }}>
            <Rating key={priority} maxRating={5} rating={priority} disabled />
          </div>
          <div style={{ borderBottom: '2px solid lightgray' }} />
        </div>
      )}
      {!!description &&
        (!!descriptionRenderer ? (
          <>{descriptionRenderer({ description })}</>
        ) : (
          <Scrollbars
            autoHeight
            autoHeightMin={100}
            autoHeightMax={!!height ? (height || 0) - 180 : 500}
            // This will activate auto hide
            // autoHide
            // Hide delay in ms
            // autoHideTimeout={1000}
            // Duration for hide animation in ms.
            // autoHideDuration={500}
          >
            <div className="description-markdown">
              {/* @ts-ignore */}
              <ReactMarkdown plugins={[gfm, { singleTilde: false }]} renderers={renderers} children={description} />
            </div>
          </Scrollbars>
        ))}
      {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(note, null, 2)}</pre> */}
    </div>
  )
}
