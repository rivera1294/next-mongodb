import { useEffect } from 'react'
import { openLinkInNewTab } from '~/utils/openLinkInNewTab'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Rating } from 'semantic-ui-react'
import { useFreshNote } from '~/common/hooks'
import { Scrollbars } from 'react-custom-scrollbars'
// import { useWindowSize } from '~/hooks'
import { CodeRendererSynthwave84, ImageRenderer } from '~/common/react-markdown-renderers'

const renderers = {
  code: CodeRendererSynthwave84,
  image: ImageRenderer,
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
  // const { height } = useWindowSize()

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
            autoHeightMin={500}
            // autoHeightMax={!!height ? (height || 0) - 180 : 200}
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
