// useUnscrolledBody.ts

import { useState, useEffect } from 'react'

interface IUseUnscrolledBody {
  isBodyUnscrolled: boolean
  toggleScrollBody: (shouldBeUnscrolled: boolean) => void
}

export const useUnscrolledBody = (initialShouldBodyUnscrolled: boolean): IUseUnscrolledBody => {
  const [isBodyUnscrolled, setIsBodyUnscrolled] = useState(initialShouldBodyUnscrolled)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isBodyUnscrolled) {
        document.body.style.overflow = 'hidden'
      } else {
        document.body.style.overflow = 'auto'
      }
    }
  }, [isBodyUnscrolled])

  return {
    isBodyUnscrolled,
    toggleScrollBody: (isModalOpened: boolean) => {
      setIsBodyUnscrolled(isModalOpened)
    },
  }
}
