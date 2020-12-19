/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
// import useScrollTrigger from '@material-ui/core/useScrollTrigger'
// import Box from '@material-ui/core/Box'
import Container from '@material-ui/core/Container'
// import Slide from '@material-ui/core/Slide'
import { useStyles } from './styles'
import InputBase from '@material-ui/core/InputBase'
import Badge from '@material-ui/core/Badge'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
// import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AccountCircle from '@material-ui/icons/AccountCircle'
import MailIcon from '@material-ui/icons/Mail'
import NotificationsIcon from '@material-ui/icons/Notifications'
// @ts-ignore
import MoreIcon from '@material-ui/icons/MoreVert'
import IconButton from '@material-ui/core/IconButton'
import Link from 'next/link'
import { useGlobalAppContext, useWindowSize } from '~/hooks'

interface IProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window
  children: React.ReactElement
}

/*
function HideOnScroll(props: IProps) {
  const { children, window } = props
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined })

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  )
}
*/

export const Navbar = (_props: IProps) => {
  const classes = useStyles()

  // --- MENU
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }
  // @ts-ignore
  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  // @ts-ignore
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  )
  const mobileMenuId = 'primary-search-account-menu-mobile'
  // @ts-ignore
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  )
  // ---
  // --- SEARCH
  const {
    state,
    handleSearchByTitleSetText,
    isNotesLoading: isLoading,
    handleSearchByDescriptionSetText,
  } = useGlobalAppContext()
  // ---
  const { isDesktop } = useWindowSize()

  return (
    // <HideOnScroll {...props}>
    <div className={classes.grow}>
      <AppBar position="static">
        <Container className={classes.container}>
          <Toolbar className={classes.toolbar}>
            {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
              <MenuIcon />
            </IconButton> */}
            <Typography variant="h6" noWrap>
              {/* @ts-ignore */}
              <Link href="/" hrefAs="/">
                <a className="navbar-brand">Code Samples 2.0</a>
              </Link>
            </Typography>
            {isDesktop && (
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search by title…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{
                    'aria-label': 'search',
                  }}
                  value={state.searchByTitle}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // @ts-ignore
                    handleSearchByTitleSetText(e.target.value)
                  }}
                  disabled={isLoading}
                />
                <InputBase
                  placeholder="Search by description…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ 'aria-label': 'search' }}
                  value={state.searchByDescription}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    // @ts-ignore
                    handleSearchByDescriptionSetText(e.target.value)
                  }}
                  disabled={isLoading}
                />
              </div>
            )}
            {/* <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <IconButton aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </div>
            <div className={classes.sectionMobile}>
              <IconButton
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </div> */}
          </Toolbar>
          {/* {renderMobileMenu}
          {renderMenu} */}
        </Container>
      </AppBar>
    </div>
  )
}
