import { createContext, useReducer, useState, useEffect, useRef, useContext } from 'react'
import buildUrl from 'build-url'
import { useDebounce } from '~/hooks/useDebounce'

const NEXT_APP_API_ENDPOINT = process.env.NEXT_APP_API_ENDPOINT

export const getInitialState = (base) => ({
  notes: [],
  pagination: {
    curentPage: 0,
    totalPages: 0,
    totalNotes: 0,
  },
  searchByTitle: '',
  searchByDescription: '',
  activeNote: null,
  localPage: 1,

  ...base,
})

export const GlobalAppContext = createContext({
  state: getInitialState({}),
  setPage: () => {
    throw new Error('setPage method should be implemented');
  },
  handleSearchByTitleClear: () => {
    throw new Error('handleSearchByTitleClear method should be implemented');
  },
  handleSearchByDescriptionClear: () => {
    throw new Error('handleSearchByDescriptionClear method should be implemented');
  },
  handleSetAsActiveNote: () => {
    throw new Error('handleSetAsActiveNote method should be implemented');
  },
  handlePageChange: () => {
    throw new Error('handlePageChange method should be implemented');
  },
  isNotesLoading: false,
  initPagination: () => {
    throw new Error('initPagination method should be implemented');
  },
  initState: () => {
    throw new Error('initState method should be implemented');
  },
  page: 1,
  handleSearchByDescriptionSetText: () => {
    throw new Error('handleSearchByDescriptionSetText method should be implemented');
  },
  handleSearchByTitleSetText: () => {
    throw new Error('handleSearchByTitleSetText method should be implemented');
  },
})

function reducer(state, action) {
  switch (action.type) {
    case 'SEARCH_BY_TITLE@SET':
      return { ...state, searchByTitle: action.payload, localPage: 1 }
    case 'SEARCH_BY_DESCRIPTION@SET':
      return { ...state, searchByDescription: action.payload, localPage: 1 }
    case 'ACTIVE_NOTE@SET':
      return { ...state, activeNote: action.payload }
    case 'ACTIVE_NOTE@RESET':
      return { ...state, activeNote: null }
    case 'NOTES_RESPONSE@SET':
      return {
        ...state,
        ...action.payload,
      }
    case 'INIT_STATE':
      return action.payload;
    case 'SET_LOCAL_PAGE':
      return {
        ...state,
        localPage: action.payload,
      }
    default:
      return state
  }
}

export const GlobalAppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState({}))
  const debouncedSearchByTitle = useDebounce(state.searchByTitle, 1000)
  const debouncedSearchByDescription = useDebounce(state.searchByDescription, 1000)
  
  const handlePageChange = (_ev, data) => {
    dispatch({ type: 'SET_LOCAL_PAGE', payload: data.activePage })
  }
  const debouncedPage = useDebounce(state.page, 1000)
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
      if (!!debouncedPage && debouncedPage !== 1) {
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
  const initState = (state) => {
    dispatch({ type: 'INIT_STATE', payload: state })
  }
  const handleSearchByDescriptionSetText = (text) => {
    dispatch({ type: 'SEARCH_BY_DESCRIPTION@SET', payload: text })
  }
  const handleSearchByTitleSetText = (text) => {
    dispatch({ type: 'SEARCH_BY_TITLE@SET', payload: text })
  }
  
  return (
    <GlobalAppContext.Provider
      value={{
        state,
        handleSearchByTitleClear,
        handleSearchByDescriptionClear,
        handleSetAsActiveNote,
        handlePageChange,
        isNotesLoading: isLoading,
        initState,
        page: state.localPage,
        handleSearchByDescriptionSetText,
        handleSearchByTitleSetText,
      }}
    >
      {children}
    </GlobalAppContext.Provider>
  )
}

export const useGlobalAppContext = () => {
  const globalAppContext = useContext(GlobalAppContext);

  return globalAppContext;
}
