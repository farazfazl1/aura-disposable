"use client"

import { useEffect, useRef, useState, type KeyboardEvent } from "react"

const AGE_VERIFICATION_KEY = "aura-age-verified"

export default function AgeGate() {
  const [isOpen, setIsOpen] = useState(true)
  const [isDenied, setIsDenied] = useState(false)
  const dialogRef = useRef<HTMLDivElement>(null)
  const primaryActionRef = useRef<HTMLButtonElement>(null)
  const exitActionRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const siteShell = document.getElementById("aura-site-shell")
    let isVerified = false

    try {
      isVerified = window.localStorage.getItem(AGE_VERIFICATION_KEY) === "true"
    } catch {
      // Keep the gate visible when storage is unavailable.
    }

    if (isVerified) {
      setIsOpen(false)
      return
    }

    document.body.style.overflow = "hidden"
    siteShell?.setAttribute("inert", "")
    siteShell?.setAttribute("aria-hidden", "true")
    window.requestAnimationFrame(() => primaryActionRef.current?.focus())

    return () => {
      document.body.style.overflow = ""
      siteShell?.removeAttribute("inert")
      siteShell?.removeAttribute("aria-hidden")
    }
  }, [])

  useEffect(() => {
    if (!isOpen) {
      const siteShell = document.getElementById("aura-site-shell")
      document.body.style.overflow = ""
      siteShell?.removeAttribute("inert")
      siteShell?.removeAttribute("aria-hidden")
    }
  }, [isOpen])

  useEffect(() => {
    if (isDenied) exitActionRef.current?.focus()
  }, [isDenied])

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return

    const focusableElements = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    )

    if (!focusableElements?.length) return

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault()
      lastElement.focus()
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault()
      firstElement.focus()
    }
  }

  const confirmAge = () => {
    try {
      window.localStorage.setItem(AGE_VERIFICATION_KEY, "true")
    } catch {
      // The current visit can still continue when storage is unavailable.
    }
    setIsOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="aura-age-gate" aria-live="polite">
      <div
        ref={dialogRef}
        className="aura-age-gate-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-title"
        aria-describedby="age-gate-description"
        onKeyDown={handleKeyDown}
      >
        <div className="aura-age-gate-mark" aria-hidden="true">
          <span className="aura-age-gate-orbit" />
          <span>21+</span>
        </div>

        <div className="aura-age-gate-content">
          <p className="aura-age-gate-eyebrow">
            <span aria-hidden="true" />
            Adults only
          </p>

          {isDenied ? (
            <>
              <h1 id="age-gate-title" className="aura-age-gate-title">
                This experience is not available to you.
              </h1>
              <p id="age-gate-description" className="aura-age-gate-description">
                You must be 21 or older to access Aura products and content.
              </p>
              <a ref={exitActionRef} className="aura-age-gate-exit" href="https://www.google.com/">
                Exit website
              </a>
            </>
          ) : (
            <>
              <h1 id="age-gate-title" className="aura-age-gate-title">
                Welcome to <span>Aura.</span>
              </h1>
              <p id="age-gate-description" className="aura-age-gate-description">
                This website contains cannabis products. Please confirm that you are of legal age to continue.
              </p>

              <div className="aura-age-gate-actions">
                <button ref={primaryActionRef} className="aura-age-gate-confirm" type="button" onClick={confirmAge}>
                  Yes, I&apos;m 21 or older
                </button>
                <button className="aura-age-gate-decline" type="button" onClick={() => setIsDenied(true)}>
                  No, I&apos;m under 21
                </button>
              </div>
            </>
          )}

          {!isDenied && (
            <p className="aura-age-gate-note">By entering, you agree to our responsible-use policy.</p>
          )}
        </div>
      </div>
    </div>
  )
}
