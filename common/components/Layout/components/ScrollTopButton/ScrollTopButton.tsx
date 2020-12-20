import { useMemo } from 'react'
import { useStyles } from './styles'
import clsx from 'clsx'
import React, { useRef, useCallback } from 'react'
import { useScrollPosition } from '~/common/hooks/useScrollPosition'
import { scrollTop } from '~/utils/scrollTo'
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp'

export const ScrollTopButton = () => {
  const classes = useStyles()
  const { isMoreThanTrackedY } = useScrollPosition(200)
  const ref = useRef(null)
  const handleClick = useCallback(() => {
    scrollTop()
  }, [])
  const isClient = useMemo(() => typeof window !== 'undefined', [typeof window])

  return (
    isClient && (
      <div ref={ref} onClick={handleClick} className={clsx(classes.main, { [classes.isRequired]: isMoreThanTrackedY })}>
        <KeyboardArrowUpIcon color="action" />
      </div>
    )
  )
}
