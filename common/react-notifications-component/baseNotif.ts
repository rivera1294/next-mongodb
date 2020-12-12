import { ReactNotificationOptions as IReactNotificationOptions } from 'react-notifications-component'

export const baseNotif: Partial<IReactNotificationOptions> = {
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
