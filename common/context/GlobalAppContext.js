import { createContext, useReducer, useState, useEffect, useRef, useContext } from 'react'
import buildUrl from 'build-url'
import { useAuthContext, useDebounce } from '~/common/hooks'
import { useRouter } from 'next/router'
import { data as defaultPaginationData } from '~/common/constants/default-pagination'
import { scrollTop } from '~/utils/scrollTo'
import { getStandardHeadersByCtx } from '~/utils/next/getStandardHeadersByCtx'

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
    throw new Error('setPage method should be implemented')
  },
  handleSearchByTitleClear: () => {
    throw new Error('handleSearchByTitleClear method should be implemented')
  },
  handleSearchByDescriptionClear: () => {
    throw new Error('handleSearchByDescriptionClear method should be implemented')
  },
  handleSetAsActiveNote: (note) => {
    throw new Error('handleSetAsActiveNote method should be implemented')
  },
  handleResetActiveNote: () => {
    throw new Error('handleResetActiveNote method should be implemented')
  },
  handlePageChange: () => {
    throw new Error('handlePageChange method should be implemented')
  },
  isNotesLoading: false,
  initPagination: () => {
    throw new Error('initPagination method should be implemented')
  },
  initState: () => {
    throw new Error('initState method should be implemented')
  },
  handleSearchByDescriptionSetText: () => {
    throw new Error('handleSearchByDescriptionSetText method should be implemented')
  },
  handleSearchByTitleSetText: (text) => {
    throw new Error('handleSearchByTitleSetText method should be implemented')
  },
  handleUpdateOneNote: (note) => {
    throw new Error('handleUpdateOneNote method should be implemented')
  },
  handleRemoveOneNote: (id) => {
    throw new Error('handleRemoveOneNote method should be implemented')
  },
  handleAddOneNote: (note) => {
    throw new Error('handleAddOneNote method should be implemented')
  },
  handleSetNotesResponse: (notesAndPag) => {
    throw new Error('handleSetNotesResponse method should be implemented')
  },
})

function reducer(state, action) {
  let newState = { ...state }

  switch (action.type) {
    case 'SEARCH_BY_TITLE@SET':
      return { ...state, searchByTitle: action.payload, localPage: 1 }
    case 'SEARCH_BY_DESCRIPTION@SET':
      return { ...state, searchByDescription: action.payload, localPage: 1 }
    case 'SEARCH_BY_ANYTHING@RESET':
      return { ...state, searchByDescription: '', searchByTitle: '', localPage: 1 }
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
      return action.payload
    case 'SET_LOCAL_PAGE':
      return {
        ...state,
        localPage: action.payload,
      }
    case 'UPDATE_ONE_NOTE':
      const theNoteIndex = state.notes.findIndex(({ _id }) => _id === action.payload._id)

      if (theNoteIndex !== -1) {
        newState.notes[theNoteIndex] = action.payload
        return newState
      }

      return state
    case 'REMOVE_ONE_NOTE':
      newState.notes = newState.notes.filter(({ _id }) => _id !== action.payload)

      return newState
    case 'ADD_ONE_NOTE':
      newState.notes = [...newState.notes, action.payload]

      return newState
    default:
      return state
  }
}

export const GlobalAppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState({}))
  const debouncedSearchByTitle = useDebounce(state.searchByTitle, 1000)
  const debouncedSearchByDescription = useDebounce(state.searchByDescription, 1000)
  const handleScrollTop = () => {
    setTimeout(() => {
      scrollTop()
    }, 0)
    return Promise.resolve()
  }

  const handlePageChange = (_ev, data) => {
    handleScrollTop().then(() => {
      dispatch({ type: 'SET_LOCAL_PAGE', payload: data.activePage })
    })
  }
  const debouncedPage = useDebounce(state.localPage, 1000)
  const renderCountRef = useRef(0)
  const { isLogged } = useAuthContext()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    renderCountRef.current += 1
    if (renderCountRef.current > 0 && renderCountRef.current <= 1) return

    const fetchData = async () => {
      setIsLoading(true)
      const queryParams = {
        limit: defaultPaginationData.limit,
      }
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
        path: '/notes',
        queryParams,
      })
      const res = await fetch(url, {
        headers: getStandardHeadersByCtx(),
      })
      setIsLoading(false)
      const { data, pagination } = await res.json()

      dispatch({ type: 'NOTES_RESPONSE@SET', payload: { notes: data, pagination } })
    }

    fetchData()
  }, [debouncedPage, debouncedSearchByTitle, debouncedSearchByDescription, isLogged])
  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log('ROUTE')
  // }, [debouncedSearchByTitle, debouncedSearchByDescription])
  const handleSearchByTitleClear = () => {
    dispatch({ type: 'SEARCH_BY_TITLE@SET', payload: '' })
  }
  const handleSearchByDescriptionClear = () => {
    dispatch({ type: 'SEARCH_BY_DESCRIPTION@SET', payload: '' })
  }
  const handleSearchByAnythingClear = () => {
    dispatch({ type: 'SEARCH_BY_ANYTHING@RESET' })
  }
  const router = useRouter()
  useEffect(() => {
    handleSearchByAnythingClear()
  }, [router.pathname])
  const handleSetAsActiveNote = (note) => {
    dispatch({ type: 'ACTIVE_NOTE@SET', payload: note })
  }
  const handleResetActiveNote = (note) => {
    dispatch({ type: 'ACTIVE_NOTE@RESET', payload: note })
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
  const handleUpdateOneNote = (note) => {
    dispatch({ type: 'UPDATE_ONE_NOTE', payload: note })
  }
  const handleRemoveOneNote = (id) => {
    dispatch({ type: 'REMOVE_ONE_NOTE', payload: id })
  }
  const handleAddOneNote = (note) => {
    dispatch({ type: 'ADD_ONE_NOTE', payload: note })
  }
  const handleSetNotesResponse = ({ data, pagination }) => {
    dispatch({ type: 'NOTES_RESPONSE@SET', payload: { notes: data, pagination } })
  }

  return (
    <GlobalAppContext.Provider
      value={{
        state,
        handleSearchByTitleClear,
        handleSearchByDescriptionClear,
        handleSetAsActiveNote,
        handleResetActiveNote,
        handlePageChange,
        isNotesLoading: isLoading,
        initState,
        page: state.localPage,
        handleSearchByDescriptionSetText,
        handleSearchByTitleSetText,
        handleUpdateOneNote,
        handleRemoveOneNote,
        handleAddOneNote,
        handleSetNotesResponse,
      }}
    >
      {children}
    </GlobalAppContext.Provider>
  )
}

export const useGlobalAppContext = () => {
  const globalAppContext = useContext(GlobalAppContext)

  return globalAppContext
}
