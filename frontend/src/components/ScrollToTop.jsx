import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * ScrollToTop
 * Listens to every route change and immediately scrolls the window
 * back to the top — preventing pages from loading mid-scroll.
 */
export default function ScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])

  return null
}
