import { useState, useEffect, useReducer, useRef } from 'react'
import Link from 'next/link';
import fetch from 'isomorphic-unfetch';
import { Button, Card, Icon, Input, Label, Pagination  } from 'semantic-ui-react';
import { useDebounce } from '~/hooks/useDebounce'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

function reducer(state, action) {
  switch (action.type) {
    case 'SEARCH_TEXT@SET':
      return { ...state, searchText: action.payload }
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
  const [state, dispatch] = useReducer(reducer, { notes, pagination: initPag, searchText: '' })
  const {
    totalPages,
    currentPage,
    totalNotes,
  } = state.pagination;
  const handlePageChange = (_ev, data) => {
    setPage(data.activePage)
  }
  const renderCountRef = useRef(0)
  const debouncedPage = useDebounce(page, 1000)
  const debouncedSearchText = useDebounce(state.searchText, 1000)

  useEffect(() => {
    renderCountRef.current += 1;
    if (renderCountRef.current === 1) return;

    // console.log(renderCountRef.current)
    const fetchData = async () => {
      const res = await fetch(
        `/api/notes?q_title=${state.searchText}&page=${page}`,
      );
      const { data, pagination } = await res.json();
 
      dispatch({ type: 'NOTES_RESPONSE@SET', payload: { notes: data, pagination } });
    };
 
    fetchData();
  }, [debouncedPage, debouncedSearchText])

  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className='wrapper search-wrapper '>
        {!!state.pagination && (
          <Pagination
            boundaryRange={0}
            defaultActivePage={currentPage}
            ellipsisItem={null}
            firstItem={null}
            lastItem={null}
            siblingRange={1}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <Input
          icon={<Icon name='search' inverted circular link />}
          placeholder='Search...'
          onChange={(e) => {
            dispatch({ type: 'SEARCH_TEXT@SET', payload: e.target.value })
          }}
        />
        <Label>
          <Icon name='mail' /> {totalNotes}
        </Label>
      </div>
      <div className="grid wrapper">
        {state.notes.map(note => {
          return (
            <div key={note._id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`} hrefAs='/[id]'>
                      <a>{note.title}</a>
                    </Link>
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
  )
}

Index.getInitialProps = async () => {
  const res = await fetch(`${NEXT_APP_API_ENDPOINT}/api/notes`);
  const { data, pagination } = await res.json();

  return { notes: data, pagination }
}

export default Index;