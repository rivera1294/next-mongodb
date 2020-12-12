import { store } from 'react-notifications-component'
import { baseNotif } from './baseNotif'

export const addInfoNotif = ({ title, message }) => {
  store.addNotification({
    ...baseNotif,
    type: 'info',

    title,
    message,
  })
}
