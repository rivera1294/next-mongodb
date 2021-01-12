import { useState, useCallback, useMemo } from 'react'
import { useStyles } from './styles'
import Backdrop from '@material-ui/core/Backdrop'
// @ts-ignore
import MuiSpeedDial from '@material-ui/lab/SpeedDial'
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon'
import SpeedDialAction from '@material-ui/lab/SpeedDialAction'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'
import { useScrollPosition } from '~/common/hooks/useScrollPosition'
import { scrollTop } from '~/utils/scrollTo'
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/router'

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
  const actions = useMemo(
    () => [
      // { icon: <FileCopyIcon />, name: 'Copy' },
      // { icon: <SaveIcon />, name: 'Save' },
      {
        icon: <AddIcon />,
        name: 'New',
        onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
          e.preventDefault()
          router.push('/new')
        },
        isVisible: router.pathname !== '/new',
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
    [router.pathname, isMoreThanTrackedY]
  )

  return (
    <div className={classes.root}>
      <Backdrop open={isOpened} />
      <MuiSpeedDial
        ariaLabel="SpeedDial tooltip example"
        className={classes.speedDial}
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
