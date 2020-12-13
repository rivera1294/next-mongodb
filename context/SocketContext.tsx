import { createContext, useReducer, useEffect, useMemo, useContext } from 'react'
import io from 'socket.io-client'
import {
  actionTypes as evt,
  IDeletedNote,
  IConnectSelf,
  IDisconnectUserBroadcast,
} from '~/socket-logic'
import { addInfoNotif } from '~/common/react-notifications-component/addInfoNotif'
import { useGlobalAppContext } from './GlobalAppContext'

const NEXT_APP_SOCKET_API_ENDPOINT = process.env.NEXT_APP_SOCKET_API_ENDPOINT

const initialState = {
  socket: null,
  updatedNote: null,
  deletedNoteId: null,
}

export const SocketContext = createContext({
  state: initialState,
})

function reducer(state: any, action: any) {
  switch (action.type) {
    case evt.ME_CONNECTED:
      return { ...state, socket: action.payload }
    case 'UNMOUNT':
      return { ...state, socket: null }
    case 'REFRESH_UPDATED_NOTE':
      return { ...state, updatedNote: action.payload }
    case 'UPDATE_DELETED_NOTE_ID':
      return { ...state, deletedNoteId: action.payload }
    default:
      return state
  }
}

export const SocketContextProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const isClient = useMemo(() => typeof window !== 'undefined', [typeof window])
  const handleMeConnected = (arg: IConnectSelf, socket: any) => {
    console.log(arg)
    addInfoNotif({
      title: 'Me connected',
      message: arg.data.msg,
      type: 'info',
    })
    dispatch({ type: evt.ME_CONNECTED, payload: socket })
  }
  // ---
  const {
    handleUpdateOneNote,
    handleRemoveOneNote,
    handleAddOneNote,
  } = useGlobalAppContext()
  // ---
  const handleCreateNote = (arg: any) => {
    console.log(arg)
    try {
      const title: string = arg.data.title

      addInfoNotif({
        title: 'Created',
        message: title,
        type: 'info',
      })
      // TODO: Add if validated by current filter settings
      handleAddOneNote(arg.data)
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdateNote = (arg: any) => {
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
      dispatch({ type: 'REFRESH_UPDATED_NOTE', payload: arg.data })
      // @ts-ignore
      handleUpdateOneNote(arg.data)
    } catch (err) {
      console.log(err)
    }
  }
  // ---
  const handleUpdateDeletedNoteId = (id: string) => {
    dispatch({ type: 'UPDATE_DELETED_NOTE_ID', payload: id })
  }
  // ---
  const handleDeleteNote = (arg: IDeletedNote) => {
    console.log(arg)
    try {
      const {
        data: { id },
      } = arg

      addInfoNotif({
        title: 'Deleted',
        message: id,
        type: 'info',
      })
      handleUpdateDeletedNoteId(id)
      handleRemoveOneNote(id)
    } catch (err) {
      console.log(err)
    }
  }
  const handleSomebodyConnected = (arg: any) => {
    console.log(arg)
    try {
      const {
        data: { msg },
      } = arg

      addInfoNotif({
        title: 'Somebody connected',
        message: msg,
        type: 'info',
      })
    } catch (err) {
      console.log(err)
    }
  }
  const handleSomebodyDisconnected = (arg: IDisconnectUserBroadcast) => {
    console.log(arg)
    try {
      const {
        data: { msg },
      } = arg

      addInfoNotif({
        title: 'Somebody disconnected',
        message: msg,
        type: 'info',
      })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (isClient) {
      // @ts-ignore
      const socket = io.connect(NEXT_APP_SOCKET_API_ENDPOINT)

      socket.on(evt.ME_CONNECTED, (arg: any) => {
        handleMeConnected(arg, socket)
      })
      socket.on(evt.NOTE_CREATED, handleCreateNote)
      socket.on(evt.NOTE_UPDATED, handleUpdateNote)
      socket.on(evt.NOTE_DELETED, handleDeleteNote)
      socket.on(evt.USER_SOMEBODY_CONNECTED, handleSomebodyConnected)
      socket.on(evt.USER_SOMEBODY_DISCONNECTED, handleSomebodyDisconnected)

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
        state,
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
