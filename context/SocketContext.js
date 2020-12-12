import { createContext, useReducer, useEffect, useMemo, useContext } from 'react'
import io from 'socket.io-client'
import { actionTypes as evt } from '~/utils/socket/actionTypes'

// const types = ['success', 'danger', 'warning', 'default', 'info', 'awesome'];
import { addInfoNotif } from '~/common/react-notifications-component/addInfoNotif'

const NEXT_APP_SOCKET_API_ENDPOINT = process.env.NEXT_APP_SOCKET_API_ENDPOINT

export const SocketContext = createContext({
  socket: null,
})

function reducer(state, action) {
  switch (action.type) {
    case evt.USER_CONNECTED:
      return { ...state, socket: action.payload }
    case 'UNMOUNT':
      return { ...state, socket: null }
    default:
      return state
  }
}

const initialState = {
  socket: null,
}

export const SocketContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const isClient = useMemo(() => typeof window !== 'undefined', [typeof window])
  const handleConnectUser = (arg, socket) => {
    console.log(arg)
    dispatch({ type: evt.USER_CONNECTED, payload: socket })
  }
  const handleCreateNote = (arg) => {
    console.log(arg)
    try {
      const {
        data: { title },
      } = arg

      addInfoNotif({
        title: 'Created',
        message: `${title}`,
        type: 'info',
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdateNote = (arg) => {
    console.log(arg)
    try {
      const {
        data: { _id },
      } = arg

      addInfoNotif({
        title: 'Updated',
        message: `${_id}`,
        type: 'info',
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleDeleteNote = (arg) => {
    console.log(arg)
    try {
      const {
        data: { _id },
      } = arg

      addInfoNotif({
        title: 'Deleted',
        message: `${_id}`,
        type: 'info',
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isClient) {
      const socket = io.connect(NEXT_APP_SOCKET_API_ENDPOINT)

      socket.on(evt.USER_CONNECTED, (arg) => {
        handleConnectUser(arg, socket)
      })
      socket.on(evt.NOTE_CREATED, handleCreateNote)
      socket.on(evt.NOTE_UPDATED, handleUpdateNote)
      socket.on(evt.NOTE_DELETED, handleDeleteNote)

      return () => {
        socket.disconnect()
        socket.removeAllListeners()
        dispatch({ type: 'UNMOUNT', payload: socket })
      }
    }
  }, [isClient])

  return (
    <SocketContext.Provider
      value={{
        socket: state.socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  )
}

export const useSocketContext = () => {
  const socketContext = useContext(SocketContext)

  return socketContext
}
