import { createContext, useContext, useMemo } from 'react'
import { ReactNotificationProps as IReactNotificationProps } from 'react-notifications-component'
import { addInfoNotif as _addInfoNotif } from './addInfoNotif'
import { addSuccessNotif as _addSuccessNotif } from './addSuccessNotif'
import { useWindowSize } from '~/hooks'
import ReactNotification from 'react-notifications-component'

export const NotifsContext = createContext({
  addInfoNotif: (_note: Partial<IReactNotificationProps>): void => {
    throw new Error('addInfoNotif method should be implemented')
  },
  addSuccessNotif: (_note: Partial<IReactNotificationProps>): void => {
    throw new Error('addSuccessNotif method should be implemented')
  },
})

export const NotifsContextProvider = ({ children }: any) => {
  const { width } = useWindowSize()
  // @ts-ignore
  const isMobile = useMemo(() => (!!width ? width <= 767 : false), [width])
  const addInfoNotif = (note: Partial<IReactNotificationProps>) => {
    _addInfoNotif({ ...note })
  }
  const addSuccessNotif = (note: Partial<IReactNotificationProps>) => {
    _addSuccessNotif(note)
  }

  return (
    <NotifsContext.Provider
      value={{
        addInfoNotif,
        addSuccessNotif,
      }}
    >
      <>
        <ReactNotification isMobile={isMobile} />
        {children}
      </>
    </NotifsContext.Provider>
  )
}

export const useNotifsContext = () => {
  const notifsContext = useContext(NotifsContext)

  return notifsContext
}
