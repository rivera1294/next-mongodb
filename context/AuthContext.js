import { createContext, useReducer, useEffect, useRef, useContext } from 'react'
import fetch from 'isomorphic-unfetch'
import { useCookies } from 'react-cookie'

const NEXT_APP_EXPRESS_API_ENDPOINT = process.env.NEXT_APP_EXPRESS_API_ENDPOINT
const NEXT_APP_COOKIE_MAXAGE_IN_DAYS = process.env.NEXT_APP_COOKIE_MAXAGE_IN_DAYS
  ? parseInt(process.env.NEXT_APP_COOKIE_MAXAGE_IN_DAYS)
  : 1

export const getInitialState = (base) => ({
  isLoading: false,
  isLogged: false,

  ...base,
})

export const AuthContext = createContext({
  isLoading: false,
  isLogged: false,
  state: getInitialState({}),
  handleLogout: () => {
    throw new Error('handleLogout method should be implemented')
  },
  handleLogin: () => {
    throw new Error('handleLogin method should be implemented')
  },
})

function reducer(state, action) {
  switch (action.type) {
    case 'SET_IS_LOADING':
      return { ...state, isLoading: action.payload }
    case 'SET_IS_LOGGED':
      return { ...state, isLogged: action.payload }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, getInitialState({}))

  const setIsLoading = (val) => {
    dispatch({ type: 'SET_IS_LOADING', payload: val })
  }
  const renderCountRef = useRef(0)
  const [cookies, setCookie, removeCookie] = useCookies(['token'])

  useEffect(() => {
    renderCountRef.current += 1
    if (renderCountRef.current > 1) return

    const fetchData = async () => {
      setIsLoading(true)
      const headers = {}

      // console.log(cookies)
      if (!!cookies['token']) {
        headers.token = cookies['token']
      }

      const res = await fetch(`${NEXT_APP_EXPRESS_API_ENDPOINT}/users/me`, {
        method: 'GET',
        headers,
      })
        .then((res) => {
          if (!res.ok) {
            if (res.status === 401) {
              removeCookie('token')
              dispatch({ type: 'SET_IS_LOGGED', payload: false })
            }
            throw new Error(res.status)
          }
          return res.json()
        })
        .then(() => {
          dispatch({ type: 'SET_IS_LOGGED', payload: true })
        })
        .catch((err) => {
          return err.message || 'No msg'
        })

      // console.log(res)
      setIsLoading(false)
    }

    fetchData()
  }, [])
  const handleLogout = () => {
    removeCookie('token')
    dispatch({ type: 'SET_IS_LOGGED', payload: false })
  }
  const handleLogin = (token) => {
    setCookie('token', token, {
      path: '/',
      maxAge: NEXT_APP_COOKIE_MAXAGE_IN_DAYS * 24 * 60 * 60,
    })
    dispatch({ type: 'SET_IS_LOGGED', payload: true })
  }

  return (
    <AuthContext.Provider
      value={{
        state,
        isLoading: state.isLoading,
        isLogged: state.isLogged,
        handleLogout,
        handleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => {
  const globalAppContext = useContext(AuthContext)

  return globalAppContext
}
