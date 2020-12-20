import { store, ReactNotificationOptions as IReactNotificationOptions } from 'react-notifications-component'
import { baseNotif } from './baseNotif'

// const types = ['success', 'danger', 'warning', 'default', 'info', 'awesome'];

export const addDefaultNotif = (props: Partial<IReactNotificationOptions>): void => {
  // @ts-ignore
  store.addNotification({
    ...baseNotif,
    type: 'default',

    ...props,
  })
}
