import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useBaseStyles = makeStyles((theme: Theme) =>
  createStyles({
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
  })
)
