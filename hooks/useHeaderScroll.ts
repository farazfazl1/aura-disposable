"use client"

import { useEffect, useRef, useState } from "react"

export function useHeaderScroll() {
  const [visible, setVisible] = useState(true)
  const previousScrollPos = useRef(0)
  const animationFrame = useRef<number | null>(null)

  useEffect(() => {
    const updateVisibility = () => {
      const currentScrollPos = window.scrollY
      const shouldBeVisible = currentScrollPos < 10 || currentScrollPos < previousScrollPos.current

      previousScrollPos.current = currentScrollPos
      setVisible((currentVisible) => (currentVisible === shouldBeVisible ? currentVisible : shouldBeVisible))
      animationFrame.current = null
    }

    const handleScroll = () => {
      if (animationFrame.current !== null) return
      animationFrame.current = window.requestAnimationFrame(updateVisibility)
    }

    updateVisibility()
    window.addEventListener("scroll", handleScroll, { passive: true })

    return () => {
      window.removeEventListener("scroll", handleScroll)
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current)
      }
    }
  }, [])

  return visible
}
