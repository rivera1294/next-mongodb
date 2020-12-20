import { useState, useEffect } from 'react'
import { useDebounce } from '~/common/hooks/useDebounce'
// import { EventBus } from '~/utils/event_bus';

export interface IWindowDims {
  pageYOffset: number
}

function getIsMoreThan2Screens(): boolean {
  const { innerHeight, pageYOffset } = window
  return innerHeight * 2 - pageYOffset < 0
}
function getIsMoreThanPixels(px: number): boolean {
  const { pageYOffset } = window
  return px - pageYOffset < 0
}

interface IScrollPosition {
  scrollPosition: IWindowDims
  isMoreThan2Screens: boolean
  isMoreThanTrackedY: boolean
}

export const useScrollPosition = (trackedYPosition?: number): IScrollPosition => {
  const [scrollPosition, setScrollPosition] = useState<IWindowDims>({
    pageYOffset: 0,
  })
  const [isMoreThan2Screens, setIsMoreThan2Screens] = useState<boolean>(false)
  const [isMoreThanTrackedY, setIsMoreThanTrackedY] = useState<boolean>(false)
  const debouncedCurrentHeight = useDebounce(scrollPosition?.pageYOffset, 150)

  useEffect(() => {
    function handleScroll() {
      setScrollPosition({ pageYOffset: !!window ? window.pageYOffset : 0 })
    }

    // return EventBus.on('scroll', handleScroll);
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMoreThan2Screens(getIsMoreThan2Screens())
    setIsMoreThanTrackedY(getIsMoreThanPixels(trackedYPosition || 0))
  }, [debouncedCurrentHeight, setIsMoreThan2Screens, trackedYPosition])

  return { scrollPosition, isMoreThan2Screens, isMoreThanTrackedY }
}
