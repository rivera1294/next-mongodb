import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(
  (_theme) => ({
    img: {
      width: '100%',
      // border: '1px solid red',
      position: 'relative',
      zIndex: 1,
      overflow: 'hidden', // if you want to crop the image
      height: '274px',
      '& .bg': {
        backgroundImage: 'url(/static/img/important-notice.png)',
        backgroundPosition: 'center 15%',
        backgroundSize: 'cover',
        opacity: 0.05,
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '25px',
      fontWeight: 'bold',
      color: '#FFF', // '#A9A9A9',
      textShadow: '1px 1px 2px rgba(0,0,0,0.6)',
      // border: '2px dashed #A9A9A9 !important',
    },
  }),
  { name: 'important-notice' }
)
