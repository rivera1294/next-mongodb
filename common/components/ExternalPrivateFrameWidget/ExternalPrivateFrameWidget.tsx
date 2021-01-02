import { useState, useCallback } from 'react'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './styles'
import clsx from 'clsx'
import CloseIcon from '@material-ui/icons/Close'
import { useAuthContext } from '~/common/hooks'

interface IProps {
  src: string
}

export const ExternalPrivateFrameWidget = ({ src }: IProps) => {
  const classes = useStyles()
  const [isWidgetOpened, setIsWidgetOpened] = useState<boolean>(false)
  const handleToggleWidget = useCallback(() => {
    setIsWidgetOpened((state) => !state)
  }, [setIsWidgetOpened])
  const widgetTogglerLabel = 'Three.js course 2021'
  const { isLogged } = useAuthContext()

  return (
    <>
      {isLogged && (
        <div
          className={clsx(classes.fixedDesktopWidget, {
            [classes.openedWidget]: isWidgetOpened,
          })}
        >
          <Box boxShadow={3} className={clsx(classes.widgetPaper, classes.buttonsWrapper)}>
            <Button
              onClick={handleToggleWidget}
              size="small"
              variant="contained"
              color="inherit"
              className={classes.widgetTogglerBtn}
              // disabled={isLoading}
            >
              {isWidgetOpened ? <CloseIcon /> : widgetTogglerLabel}
            </Button>
            <iframe title="chat" className={classes.iframe} src={src} />
          </Box>
        </div>
      )}
    </>
  )
}
