import { useState, useEffect } from 'react'

export function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/

  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })

  useEffect(() => {
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window?.innerWidth,
        height: window?.innerHeight,
      })
    }

    // Handler to call on window resize
    if (typeof window !== 'undefined') {
      // Add event listener
      window.addEventListener('resize', handleResize)

      // Call handler right away so state gets updated with initial window size
      handleResize()
    }

    // Remove event listener on cleanup
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize)
      }
    }
  }, []) // Empty array ensures that effect is only run on mount

  return windowSize
}
