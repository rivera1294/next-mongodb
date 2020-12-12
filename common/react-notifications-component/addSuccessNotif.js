import { store } from 'react-notifications-component'
import { baseNotif } from './baseNotif'

export const addSuccessNotif = ({ title, message }) => {
  store.addNotification({
    ...baseNotif,
    type: 'success',

    title,
    message,
  })
}
