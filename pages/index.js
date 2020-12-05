import { useEffect, useRef } from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Icon, Input, Label, Pagination  } from 'semantic-ui-react';
import { ActiveNote } from '~/components/ActiveNote'
import clsx from 'clsx';
import { useGlobalAppContext, getInitialState } from '~/context/GlobalAppContext'

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
  const {
    totalPages,
    totalNotes,
    currentPage,
  } = state.pagination;
  const renderCountRef = useRef(0)
  useEffect(() => {
    renderCountRef.current += 1
  })
  const notes = renderCountRef.current > 1 ? state.notes : initNotes

  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className='standard-container search-wrapper'>
        <div>
          <Input
            loading={isLoading}
            disabled={isLoading}
            iconPosition='left'
            // fluid
            // icon
            placeholder='Search by title...'
            // icon={<Icon name='search' inverted circular link />}
            onChange={(e) => {
              // setPage(1)
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
            iconPosition='left'
            // fluid
            // icon
            placeholder='Search by description...'
            // icon={<Icon name='search' inverted circular link />}
            onChange={(e) => {
              // setPage(1)
              handleSearchByDescriptionSetText(e.target.value)
            }}
            value={state.searchByDescription}
            action={{ icon: 'close', onClick: handleSearchByDescriptionClear }}
          />
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Label>
            <Icon name='file' /> {totalNotes}
          </Label>
        </div>
        {state.notes.length > 0 && totalPages > 0 && !!currentPage && !!state.pagination && (
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
        )}
      </div>
      <div className='main standard-container'>
        <div>
          <ActiveNote note={state.activeNote} />
        </div>
        <div>
          
          <div className="grid wrapper">
            {notes.map(note => {
              const isActive = !!state.activeNote?._id && state.activeNote._id === note._id

              return (
                <div key={note._id} className={clsx({ 'active-card-wrapper': isActive })}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        {/* <Link href={`/${note._id}`} hrefAs='/[id]'><a>{note.title}</a></Link> */}
                        <div onClick={() => handleSetAsActiveNote(note)} className='note-title-wrapper'>
                          <b>
                            {note.title}
                          </b>
                        </div>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Link href={`/notes/${note._id}`} hrefAs='/[id]'>
                        <Button primary>View</Button>
                      </Link>
                      <Link href={`/notes/${note._id}/edit`} hrefAs='/[id]'>
                        <Button primary>Edit</Button>
                      </Link>
                    </Card.Content>
                  </Card>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {state.notes.length > 0 && totalPages > 0 && !!currentPage && !!state.pagination && (
        <div className='standard-container search-wrapper'>
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
      )}
    </div>
  )
}

Index.getInitialProps = async () => {
  const res = await fetch(`${NEXT_APP_API_ENDPOINT}/api/notes`);
  const { data, pagination } = await res.json();

  return { notes: data, pagination }
}

export default Index;
