import { useState, useEffect, useReducer, useRef } from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Icon, Input, Label, Pagination  } from 'semantic-ui-react';
import { useDebounce } from '~/hooks/useDebounce'
import { ActiveNote } from '~/components/ActiveNote'
import buildUrl from 'build-url'
import clsx from 'clsx'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

function reducer(state, action) {
  switch (action.type) {
    case 'SEARCH_BY_TITLE@SET':
      return { ...state, searchByTitle: action.payload }
    case 'SEARCH_BY_DESCRIPTION@SET':
      return { ...state, searchByDescription: action.payload }
    case 'ACTIVE_NOTE@SET':
      return { ...state, activeNote: action.payload }
    case 'ACTIVE_NOTE@RESET':
      return { ...state, activeNote: null }
    case 'NOTES_RESPONSE@SET':
      return {
        ...state,
        notes: action.payload.notes,
        pagination: action.payload.pagination,
      }
    default:
      return state
  }
}

const Index = ({ notes, pagination: initPag }) => {
  const [page, setPage] = useState(initPag.currentPage)
  const debouncedPage = useDebounce(page, 1000)
  const [state, dispatch] = useReducer(reducer, { notes, pagination: initPag, searchByTitle: '', searchByDescription: '', activeNote: null })
  const debouncedSearchByTitle = useDebounce(state.searchByTitle, 1000)
  const debouncedSearchByDescription = useDebounce(state.searchByDescription, 1000)
  const {
    totalPages,
    // currentPage,
    totalNotes,
  } = state.pagination;
  const handlePageChange = (_ev, data) => {
    setPage(data.activePage)
  }
  const renderCountRef = useRef(0)
  
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    renderCountRef.current += 1;
    if (renderCountRef.current === 1) return;

    const fetchData = async () => {
      setIsLoading(true)
      const queryParams = {}
      if (!!debouncedSearchByTitle) {
        queryParams.q_title = debouncedSearchByTitle
      }
      if (!!debouncedSearchByDescription) {
        queryParams.q_description = debouncedSearchByDescription
      }
      if (!!page && page !== 1) {
        queryParams.page = debouncedPage
      }
      const url = buildUrl(NEXT_APP_API_ENDPOINT, {
        path: '/api/notes',
        queryParams,
      });
      const res = await fetch(url);
      setIsLoading(false)
      const { data, pagination } = await res.json();

      dispatch({ type: 'NOTES_RESPONSE@SET', payload: { notes: data, pagination } });
    };
 
    fetchData();
  }, [debouncedPage, debouncedSearchByTitle, debouncedSearchByDescription])
  const handleSearchByTitleClear = () => {
    dispatch({ type: 'SEARCH_BY_TITLE@SET', payload: '' })
  }
  const handleSearchByDescriptionClear = () => {
    dispatch({ type: 'SEARCH_BY_DESCRIPTION@SET', payload: '' })
  }
  const handleSetAsActiveNote = (note) => {
    dispatch({ type: 'ACTIVE_NOTE@SET', payload: note })
  }

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
              setPage(1)
              dispatch({ type: 'SEARCH_BY_TITLE@SET', payload: e.target.value })
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
              setPage(1)
              dispatch({ type: 'SEARCH_BY_DESCRIPTION@SET', payload: e.target.value })
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
        {!!state.pagination && (
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
            {state.notes.map(note => {
              const isActive = !!state.activeNote?._id && state.activeNote._id === note._id

              return (
                <div key={note._id} className={clsx({ 'active-card-wrapper': isActive })}>
                  <Card>
                    <Card.Content>
                      <Card.Header>
                        {/* <Link href={`/${note._id}`} hrefAs='/[id]'>
                          <a>{note.title}</a>
                        </Link> */}
                        <div onClick={() => handleSetAsActiveNote(note)} className='note-title-wrapper'>
                          <b>
                            {note.title}
                          </b>
                        </div>
                      </Card.Header>
                    </Card.Content>
                    <Card.Content extra>
                      <Link href={`/${note._id}`} hrefAs='/[id]'>
                        <Button primary>View</Button>
                      </Link>
                      <Link href={`/${note._id}/edit`} hrefAs='/[id]'>
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
      {!!state.pagination && (
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
