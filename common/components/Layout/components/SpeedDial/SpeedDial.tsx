import { useState, useCallback, useMemo } from 'react'
import { useStyles } from './styles'
import Backdrop from '@material-ui/core/Backdrop'
// @ts-ignore
import MuiSpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { useScrollPosition, useAuthContext } from '~/common/hooks'
import { scrollTop } from '~/utils/scrollTo'
import AddIcon from '@material-ui/icons/Add'
import InfoIcon from '@material-ui/icons/Info'
import HomeIcon from '@material-ui/icons/Home'
import { useRouter } from 'next/router'
import clsx from 'clsx'

export const SpeedDial = () => {
  const classes = useStyles()
  const [isOpened, setIsOpened] = useState(false)
  const handleOpenMe = () => {
    setIsOpened(true)
  }
  const handleCloseMe = () => {
    setIsOpened(false)
  }

  const { isMoreThanTrackedY } = useScrollPosition(200)
  const handleScrollTop = useCallback(() => {
    scrollTop()
  }, [])
  const router = useRouter()
  const { isLogged } = useAuthContext()
  // NOTE: Снизу вверх -> Сверху вниз
  const actions = useMemo(
    () => [
      // { icon: <FileCopyIcon />, name: 'Copy' },
      // { icon: <SaveIcon />, name: 'Save' },
      {
        icon: <HomeIcon />,
        name: 'Home',
        onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault()
          router.push('/')
        },
        isVisible: router.pathname !== '/',
      },
      {
        icon: <InfoIcon />,
        name: 'About',
        onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault()
          router.push('/about')
        },
        isVisible: router.pathname !== '/about',
      },
      {
        icon: <AddIcon />,
        name: 'New',
        onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault()
          router.push('/new')
        },
        isVisible: router.pathname !== '/new' && isLogged,
      },
      {
        icon: <KeyboardArrowUpIcon />,
        name: 'Top',
        onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault()
          handleScrollTop()
          handleCloseMe()
        },
        isVisible: isMoreThanTrackedY,
      },
      // { icon: <FavoriteIcon />, name: 'Like' },
    ],
    [router.pathname, isMoreThanTrackedY, isLogged]
  )

  return (
    <div className={classes.root}>
      <Backdrop open={isOpened} />
      <MuiSpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={clsx(classes.speedDial, { [classes.centered]: isLogged })}
        hidden={false}
        icon={<SpeedDialIcon />}
        onClose={handleCloseMe}
        onOpen={handleOpenMe}
        open={isOpened}
      >
        {actions.map(({ name, onClick, icon, isVisible }) =>
          isVisible ? (
            <SpeedDialAction key={name} icon={icon} tooltipTitle={name} tooltipOpen onClick={onClick} />
          ) : null
        )}
      </MuiSpeedDial>
    </div>
  )
}
