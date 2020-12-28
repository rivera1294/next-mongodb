/* eslint-disable no-console */
import { memo } from 'react'
// import { openLinkInNewTab } from '~/utils/openLinkInNewTab'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Rating } from 'semantic-ui-react'
import { useFreshNote } from '~/common/hooks'
import { Scrollbars } from 'react-custom-scrollbars'
// import { useWindowSize } from '~/hooks'
import { baseRenderers } from '~/common/react-markdown-renderers'

interface IProps {
  note: any
  descriptionRenderer?: React.FC<any>
}

const MyComponent = ({ note: initialNote, descriptionRenderer }: IProps) => {
  const note = useFreshNote(initialNote)
  const { description, priority, title, _id } = note

  // Links should be opened in new tab:
  // useEffect(() => {
  //   const descriptionMarkdown = document.querySelector('.description-markdown')

  //   if (typeof window !== 'undefined') {
  //     if (!!descriptionMarkdown) descriptionMarkdown?.addEventListener('click', openLinkInNewTab)
  //   }
  //   return () => {
  //     if (typeof window !== 'undefined') {
  //       if (!!descriptionMarkdown) descriptionMarkdown?.removeEventListener('click', openLinkInNewTab)
  //     }
  //   }
  // }, [])
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
              <ReactMarkdown plugins={[gfm, { singleTilde: false }]} renderers={baseRenderers} children={description} />
            </div>
          </Scrollbars>
        ))}
      {/* <pre style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(note, null, 2)}</pre> */}
    </div>
  )
}

function areEqual(prevProps: any, nextProps: any) {
  /*
  возвращает true, если nextProps рендерит
  тот же результат что и prevProps,
  иначе возвращает false
  */
  return prevProps.note._id === nextProps.note._id && prevProps.note.updatedAt === nextProps.note.updatedAt
}
export const ActiveNote = memo(MyComponent, areEqual)

// export const ActiveNote = MyComponent
