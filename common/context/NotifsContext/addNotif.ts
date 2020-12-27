import { store, ReactNotificationOptions as IReactNotificationOptions } from 'react-notifications-component'

const baseNotif: Partial<IReactNotificationOptions> = {
  // slidingExit: { delay: 300 },
  // animationOut: htmlClasses,
  container: 'bottom-left',
  animationIn: ['animate__animated', 'animate__fadeIn'],
  animationOut: ['animate__animated', 'animate__fadeOut'],
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
}

type TTypes = 'success' | 'danger' | 'warning' | 'default' | 'info'

const addNotif = (props: Partial<IReactNotificationOptions>, type: TTypes): void => {
  // @ts-ignore
  store.addNotification({
    ...baseNotif,
    type,

    ...props,
  })
}

export const addDangerNotif = (props: Partial<IReactNotificationOptions>): void => {
  addNotif(props, 'danger')
}

export const addWarningNotif = (props: Partial<IReactNotificationOptions>): void => {
  addNotif(props, 'warning')
}

export const addInfoNotif = (props: Partial<IReactNotificationOptions>): void => {
  addNotif(props, 'info')
}

export const addSuccessNotif = (props: Partial<IReactNotificationOptions>): void => {
  addNotif(props, 'success')
}

export const addDefaultNotif = (props: Partial<IReactNotificationOptions>): void => {
  addNotif(props, 'default')
}
