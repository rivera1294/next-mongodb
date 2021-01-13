import { useEffect, useRef, useMemo } from 'react'
import Link from 'next/link'
import fetch from 'isomorphic-unfetch'
import { Card, Icon, Input, Label, Pagination, Rating } from 'semantic-ui-react'
import { ActiveNote } from '~/common/components/ActiveNote'
import clsx from 'clsx'
import { useGlobalAppContext, getInitialState, useAuthContext } from '~/common/context'
import { useWindowSize } from '~/common/hooks'
import { EmptyTemplate } from '~/common/components/EmptyTemplate'
import { data as defaultPaginationData } from '~/common/constants/default-pagination'
import MuiButton from '@material-ui/core/Button'
import ArrowForwardIcon from '@material-ui/icons/ArrowForward'
import EditIcon from '@material-ui/icons/Edit'
import { useBaseStyles } from '~/common/styled-mui/baseStyles'
import { useRouter } from 'next/router'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

const Index = ({ notes: initNotes, pagination: initPag }) => {
  const {
    state,
    isNotesLoading: isLoading,
    initState,
    handleSearchByTitleClear,
    handleSearchByDescriptionClear,
    handleSetAsActiveNote,
    page,
    handlePageChange,
    handleSearchByDescriptionSetText,
    handleSearchByTitleSetText,
  } = useGlobalAppContext()
  const init = () => {
    initState(getInitialState({ notes: initNotes, pagination: initPag }))
  }
  useEffect(() => {
    init()
  }, [])
  const { totalPages, totalNotes, currentPage } = state.pagination
  const renderCountRef = useRef(0)
  useEffect(() => {
    renderCountRef.current += 1
  })
  const notes = useMemo(() => (renderCountRef.current >= 1 ? state.notes : initNotes), [JSON.stringify(state.notes)])
  const { isLogged } = useAuthContext()
  const activeNote = useMemo(() => state.activeNote, [JSON.stringify(state.activeNote)])
  const { isMobile } = useWindowSize()
  const baseClasses = useBaseStyles()
  const router = useRouter()

  return (
    <div style={{ marginTop: '20px' }}>
      <div className="standard-container search-wrapper">
        {isMobile && (
          <>
            <div>
              <Input
                loading={isLoading}
                disabled={isLoading}
                iconPosition="left"
                placeholder="Search by title..."
                onChange={(e) => {
                  handleSearchByTitleSetText(e.target.value)
                }}
                value={state.searchByTitle}
                action={{ icon: 'close', onClick: handleSearchByTitleClear }}
              />
            </div>
            <div>
              <Input
                loading={isLoading}
                disabled={isLoading}
                iconPosition="left"
                placeholder="Search by description..."
                onChange={(e) => {
                  handleSearchByDescriptionSetText(e.target.value)
                }}
                value={state.searchByDescription}
                action={{ icon: 'close', onClick: handleSearchByDescriptionClear }}
              />
            </div>
          </>
        )}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Label>
            <Icon name="file" /> {totalNotes}
          </Label>
        </div>
        {state.notes.length > 0 && totalPages > 0 && !!currentPage && !!state.pagination && (
          <Pagination
            defaultActivePage={page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
      {/* <div style={{ border: '1px solid red' }}>
        <pre
          style={{ whiteSpace: 'pre-wrap', maxHeight: '100px', minHeight: '100px', overflowY: 'auto', margin: '0px' }}
        >
          {JSON.stringify(activeNote, null, 2)}
        </pre>
      </div> */}
      <div className="main standard-container">
        <div className="active-note-external-sticky-wrapper">
          {!!activeNote ? (
            <ActiveNote note={activeNote} key={activeNote._id} isTagsNessesary shouldTitleBeTruncated />
          ) : (
            <EmptyTemplate />
          )}
        </div>
        <div>
          <div className="grid wrapper">
            {notes.map((note) => {
              const isActive = !!activeNote?._id && activeNote._id === note._id

              return (
                <div key={note._id} className={clsx({ 'active-card-wrapper': isActive })}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        <div onClick={() => handleSetAsActiveNote(note)} className="note-title-wrapper">
                          <b>
                            {note.title}
                            {!!note.id ? (
                              <span>
                                {' '}
                                <Rating disabled size="large" /> <span className="muted">{note.priority}</span>
                              </span>
                            ) : null}
                          </b>
                        </div>
                      </Card.Header>
                    </Card.Content>
                    {isMobile && (
                      <Card.Content extra className={baseClasses.actionsBoxRight}>
                        {isLogged && (
                          <MuiButton
                            // disabled={isNotesLoading}
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={() => {
                              router.push(`/notes/${note._id}/edit`)
                            }}
                            startIcon={<EditIcon />}
                          >
                            Edit
                          </MuiButton>
                        )}
                        <MuiButton
                          // disabled={isNotesLoading}
                          variant="contained"
                          size="small"
                          color="primary"
                          onClick={() => {
                            router.push(`/notes/${note._id}`)
                          }}
                          startIcon={<ArrowForwardIcon />}
                        >
                          View
                        </MuiButton>
                      </Card.Content>
                    )}
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* state.notes.length > 0 && totalPages > 0 && !!currentPage && !!state.pagination && (
        <div className="standard-container search-wrapper">
          <Pagination
            // boundaryRange={0}
            defaultActivePage={page}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      ) */}
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch(`${NEXT_APP_API_ENDPOINT}/api/notes?limit=${defaultPaginationData.limit}`)
  const { data, pagination } = await res.json()

  return { notes: data, pagination }
}

export default Index
