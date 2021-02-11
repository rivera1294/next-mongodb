import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      transform: 'translateZ(0px)',
      flexGrow: 1,
      position: 'fixed',
      bottom: 0,
      right: 0,
    },
    speedDial: {
      position: 'absolute',
      '& .MuiSpeedDialIcon-root': {
        width: '21px',
        height: '21px',
      },
      '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
        bottom: theme.spacing(2),
        right: theme.spacing(2),
      },
      '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
        top: theme.spacing(2),
        left: theme.spacing(2),
      },
    },
    centered: {
      bottom: theme.spacing(2),
      right: 'calc(100vw/2) !important',
      // transform: 'translateX(28px)',
      transform: 'translateX(28px)',
    },
  })
)
