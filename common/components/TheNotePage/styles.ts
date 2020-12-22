import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles(
  (_theme) => ({
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
