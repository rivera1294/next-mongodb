import { createMuiTheme } from '@material-ui/core/styles'
import { red } from '@material-ui/core/colors'

export const defaultTheme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
  common: {
    white: '#FFF',
  },
  palette: {
    primary: {
      main: '#3882C4',
    },
    secondary: {
      main: '#19857b',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
}

const {
  breakpoints: {
    values: { xs, sm, md, lg, xl },
  },
} = defaultTheme

export { xl, lg, md, sm, xs }

// Create a theme instance.
export const theme = createMuiTheme(defaultTheme)
