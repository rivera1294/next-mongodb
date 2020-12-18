/* eslint-disable no-console */
import { createContext, useReducer, useEffect, useMemo, useContext, useRef, useCallback } from 'react'
import io from 'socket.io-client'
import { actionTypes as evt, IDeletedNote, IConnectSelf, IDisconnectUserBroadcast } from '~/socket-logic'
import { useNotifsContext } from '~/hooks'
import { useGlobalAppContext } from './GlobalAppContext'
import { httpClient } from '~/utils/httpClient'

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
  const { addDefaultNotif, addDangerNotif } = useNotifsContext()
  // ---
  const {
    handleUpdateOneNote,
    handleRemoveOneNote,
    handleAddOneNote,
    handleSetNotesResponse,
    handleSetAsActiveNote,
    state: globalState,
  } = useGlobalAppContext()

  // ---
  const handleGetNote = async (id: number) => {
    const res = await httpClient.getNote(id)

    return res
  }
  const handleMeConnected = useCallback(
    (arg: IConnectSelf, socket: any) => {
      console.log('--- activeNote')
      console.log(globalState.activeNote)
      if (!!globalState.activeNote?._id) {
        // TODO: Request activeNote._id should be requested
        console.log('TODO: Request activeNote._id')
        console.log(globalState.activeNote._id)

        handleGetNote(globalState.activeNote._id)
          .then((res) => {
            console.log('Received:')
            console.log(res)
            handleSetAsActiveNote(res)
          })
          .catch((err) => {
            if (typeof err === 'string') {
              addDangerNotif({
                title: 'ERR: Update activeNote by new socket connection',
                message: err,
              })
            }
            console.log(err)
          })
      }

      // console.log(arg)
      addDefaultNotif({
        title: 'Me connected',
        message: arg.data.msg,
        type: 'info',
      })
      dispatch({ type: evt.ME_CONNECTED, payload: socket })
    },
    [JSON.stringify(globalState.activeNote)]
  )
  const handleMeConnectedRef = useRef(handleMeConnected)
  useEffect(() => {
    handleMeConnectedRef.current = handleMeConnected
  }, [handleMeConnected])
  const handleCreateNote = (arg: any) => {
    // console.log(arg)
    try {
      const title: string = arg.data.title

      addDefaultNotif({
        title: 'Created',
        message: title,
        type: 'info',
      })
      // TODO: Add if validated by current filter settings
      handleAddOneNote(arg.data)
    } catch (err) {
      // console.log(err)
    }
  }
  const handleUpdateNote = (arg: any) => {
    // console.log(arg)
    try {
      const {
        data: { _id },
      } = arg

      addDefaultNotif({
        title: 'Updated',
        message: `${_id}`,
        type: 'info',
      })
      dispatch({ type: 'REFRESH_UPDATED_NOTE', payload: arg.data })
      // @ts-ignore
      handleUpdateOneNote(arg.data)
    } catch (err) {
      // console.log(err)
    }
  }
  // ---
  const handleUpdateDeletedNoteId = (id: string) => {
    dispatch({ type: 'UPDATE_DELETED_NOTE_ID', payload: id })
  }
  // ---
  const handleDeleteNote = (arg: IDeletedNote) => {
    // console.log(arg)
    try {
      const {
        data: { id },
      } = arg

      addDefaultNotif({
        title: 'Deleted',
        message: id,
        type: 'info',
      })
      handleUpdateDeletedNoteId(id)
      handleRemoveOneNote(id)
    } catch (err) {
      // console.log(err)
    }
  }
  const handleSomebodyConnected = (arg: any) => {
    // console.log(arg)
    try {
      const {
        data: { msg },
      } = arg

      addDefaultNotif({
        title: 'Somebody connected',
        message: msg,
        type: 'info',
      })
    } catch (err) {
      // console.log(err)
    }
  }
  const handleSomebodyDisconnected = (arg: IDisconnectUserBroadcast) => {
    // console.log(arg)
    try {
      const {
        data: { msg },
      } = arg

      addDefaultNotif({
        title: 'Somebody disconnected',
        message: msg,
        type: 'info',
      })
    } catch (err) {
      // console.log(err)
    }
  }
  const handleGetAllNotes = async () => {
    const res = await httpClient.getNotes('/notes') // TODO: query

    return res
  }
  // const renderCounterRef = useRef<number>(0)

  useEffect(() => {
    // renderCounterRef.current += 1
    if (isClient) {
      // @ts-ignore
      const socket = io.connect(NEXT_APP_SOCKET_API_ENDPOINT)

      socket.on(evt.ME_CONNECTED, (arg: any) => {
        handleMeConnectedRef.current(arg, socket)

        // NOTE: is reconnect?
        // if (renderCounterRef.current > 1) {
        handleGetAllNotes()
          .then((res) => {
            handleSetNotesResponse(res)
          })
          .catch((err) => {
            if (typeof err === 'string') {
              addDangerNotif({
                title: 'ERR: Update list by new socket connection',
                message: err,
              })
            }
            console.log(err)
          })
        // }
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
