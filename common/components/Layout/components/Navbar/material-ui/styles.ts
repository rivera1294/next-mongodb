import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      '& > div:not(:last-child)': {
        marginRight: theme.spacing(2),
      },
      '& a': {
        color: theme.palette.common.white,
      },
    },
    toolbar: {
      // padding: 0,
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      // marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
      // FIX:
      '& > .MuiInputBase-input::placeholder': {
        color: '#FFF',
        opacity: '0.42',
        transition: 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        padding: '8px 8px 8px calc(1em + 32px) !important',
      },
    },
    inputInput: {
      caretColor: '#FFF !important',
      color: '#FFF !important',
      // padding: theme.spacing(1, 1, 1, 0),
      padding: '8px 8px 8px calc(1em + 32px) !important',
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    clearAll: {
      '& > button': {
        color: '#FFF',
      },
      marginLeft: theme.spacing(1),
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  })
)
