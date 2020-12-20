import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(
  (theme) => ({
    noPaddingMobile: {
      [theme.breakpoints.down('sm')]: {
        padding: '0px',
      },
    },
    btnsBox: {
      [theme.breakpoints.down('sm')]: {
        padding: theme.spacing(1, 2, 1, 2),
      },
    },
    noMarginTopBottomMobile: {
      [theme.breakpoints.down('sm')]: {
        marginTop: '0px',
        marginBottom: '0px',
      },
    },

    header: {
      width: '100%',
      // [theme.breakpoints.down('sm')]: {},
      // [theme.breakpoints.up('md')]: {},
      // boxShadow:
      //   '0px 0px 8px rgba(99, 114, 130, 0.25), 0px 2px 2px rgba(99, 114, 130, 0.2), 0px 1px 3px rgba(99, 114, 130, 0.2)',
    },
  }),
  { name: 'the-note-page' }
)
