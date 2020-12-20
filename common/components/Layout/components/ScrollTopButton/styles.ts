import { makeStyles } from '@material-ui/core/styles'
// import grey from '@material-ui/core/colors/grey'

export const useStyles = makeStyles((_theme) => ({
  main: {
    position: 'fixed',
    bottom: '16px',
    right: '16px',
    transition: 'transform 0.2s ease-in',
    transform: 'translateX(200px)',

    width: '56px',
    height: '56px',
    borderRadius: '50%',
    display: 'flex',
    backgroundColor: '#FFF',
    boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
    cursor: 'pointer',

    justifyContent: 'center',
    alignItems: 'center',
  },
  isRequired: {
    transform: 'translateX(0px)',
  },
}))
