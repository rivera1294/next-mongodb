import { store, ReactNotificationOptions as IReactNotificationOptions } from 'react-notifications-component'
import { baseNotif } from './baseNotif'

export const addSuccessNotif = (props: Partial<IReactNotificationOptions>): void => {
  // @ts-ignore
  store.addNotification({
    ...baseNotif,
    type: 'success',

    ...props,
  })
}
