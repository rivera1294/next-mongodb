import { store, ReactNotificationOptions as IReactNotificationOptions } from 'react-notifications-component'
import { baseNotif } from './baseNotif'

// const types = ['success', 'danger', 'warning', 'default', 'info', 'awesome'];

export const addDangerNotif = (props: Partial<IReactNotificationOptions>): void => {
  // @ts-ignore
  store.addNotification({
    ...baseNotif,
    type: 'danger',

    ...props,
  })
}
