"use client"

import { useState, useEffect } from "react"
import type { CSSProperties } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowUpRight, Instagram, Mail, Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useHeaderScroll } from "@/hooks/useHeaderScroll"
import BasketButton from "@/components/cart/BasketButton"

type NavItem = {
  name: string
  path: string
  accent: string
}

const WHOLESALE_HREF =
  "mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI%27m%20interested%20in%20your%20wholesale%20options.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A%5BYour%20Name%5D"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const visible = useHeaderScroll()

  const getNavItems = (): NavItem[] => {
    if (pathname === "/") {
      return [
        { name: "Products", path: "/#products", accent: "#6f42c1" },
        { name: "Verify", path: "/verify", accent: "#087f5b" },
        { name: "Store", path: "/store", accent: "#a16207" },
        { name: "Story", path: "/#story", accent: "#6f42c1" },
        { name: "FAQ", path: "/#faq", accent: "#a16207" },
      ]
    }
    return [
      { name: "Home", path: "/", accent: "#6f42c1" },
      { name: "Store", path: "/store", accent: "#a16207" },
      { name: "Verify", path: "/verify", accent: "#087f5b" },
      { name: "Story", path: "/#story", accent: "#6f42c1" },
      { name: "FAQ", path: "/#faq", accent: "#a16207" },
    ]
  }

  const navItems = getNavItems()

  const isActive = (item: NavItem) => {
    if (item.path === "/") return pathname === "/"
    if (item.path === "/store") return pathname.startsWith("/store")
    if (item.path === "/verify") return pathname === "/verify"
    return false
  }

  const handleNavigation = (path: string) => {
    setIsOpen(false)
    if (path.startsWith("/#")) {
      if (pathname !== "/") {
        router.push("/")
        setTimeout(() => {
          const element = document.querySelector(path.substring(1))
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      } else {
        const element = document.querySelector(path.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    } else {
      router.push(path)
      window.scrollTo({ top: 0, left: 0, behavior: "instant" })
    }
  }

  // Close the menu whenever the route changes.
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  // Close the menu if the viewport grows past the mobile breakpoint (e.g. rotate).
  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)")
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsOpen(false)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  // Lock body scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!isOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [isOpen])

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 bg-[#f7f6f2]/90 shadow-[0_8px_24px_rgba(23,32,27,0.06)] backdrop-blur-md transition-transform duration-300 ease-in-out ${
        visible || isOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between md:h-20">
          {/* Wordmark */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={(event) => {
                event.preventDefault()
                handleNavigation("/")
              }}
              aria-label="AURA — home"
              className="text-2xl font-bold tracking-tight text-[#17201b]"
            >
              AURA
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            {/* Desktop navigation */}
            <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
              {navItems.map((item) => {
                const active = isActive(item)
                return (
                  <Link
                    key={item.name}
                    href={item.path}
                    onClick={(event) => {
                      event.preventDefault()
                      handleNavigation(item.path)
                    }}
                    style={{ "--accent": item.accent } as CSSProperties}
                    className={`group relative rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-300 ease-out ${
                      active
                        ? "text-[var(--accent)]"
                        : "text-[#17201b] hover:-translate-y-0.5 hover:text-[var(--accent)]"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute inset-0 rounded-full bg-[var(--accent)] transition-all duration-300 ease-out ${
                        active ? "opacity-[0.15]" : "opacity-0 scale-95 group-hover:scale-100 group-hover:opacity-[0.15]"
                      }`}
                    ></span>
                    <span className="relative">{item.name}</span>
                  </Link>
                )
              })}
            </nav>

            <BasketButton />

            {/* Mobile menu toggle */}
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              onClick={() => setIsOpen((value) => !value)}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cfd8d1] bg-[#fffefa] text-[#17201b] transition duration-200 hover:border-[#6f42c1] hover:text-[#6f42c1] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6f42c1] focus-visible:ring-offset-2 md:hidden"
            >
              {isOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 bottom-0 top-16 z-40 md:hidden"
          >
            <motion.div
              aria-hidden="true"
              className="absolute inset-0 bg-[#17201b]/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative max-h-[calc(100vh-4rem)] overflow-y-auto rounded-b-[1.75rem] bg-[#f7f6f2] shadow-[0_30px_80px_rgba(23,32,27,0.28)]"
            >
              <nav aria-label="Mobile" className="px-6 py-3">
                <ul className="divide-y divide-[#dfe5df]">
                  {navItems.map((item, index) => {
                    const active = isActive(item)
                    return (
                      <li key={item.name}>
                        <button
                          type="button"
                          onClick={() => handleNavigation(item.path)}
                          style={{ "--accent": item.accent } as CSSProperties}
                          className="group flex w-full items-center justify-between py-4 text-left"
                        >
                          <span className="flex items-baseline gap-3">
                            <span className="text-[11px] font-semibold tracking-[0.18em] text-[#a8b0ab]">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={`text-2xl font-bold uppercase tracking-tight transition-colors duration-200 ${
                                active ? "text-[var(--accent)]" : "text-[#17201b] group-hover:text-[var(--accent)]"
                              }`}
                            >
                              {item.name}
                            </span>
                          </span>
                          <ArrowUpRight
                            size={20}
                            strokeWidth={2}
                            aria-hidden="true"
                            className="text-[#a8b0ab] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent)]"
                          />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </nav>

              <div className="border-t border-[#dfe5df] px-6 py-6">
                <a
                  href={WHOLESALE_HREF}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#17201b] px-6 py-3.5 text-sm font-semibold text-[#fffefa] transition-colors duration-300 hover:bg-[#33423a]"
                >
                  Get Wholesale Pricing
                  <ArrowUpRight size={16} strokeWidth={2} aria-hidden="true" />
                </a>

                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <a
                      href="https://www.instagram.com/auradisposable"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Aura Vape on Instagram"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cfd8d1] bg-[#fffefa] text-[#17201b] transition-colors duration-200 hover:border-[#6f42c1] hover:text-[#6f42c1]"
                    >
                      <Instagram size={18} aria-hidden="true" />
                    </a>
                    <a
                      href="mailto:auradisposable@gmail.com"
                      aria-label="Email Aura Vape"
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#cfd8d1] bg-[#fffefa] text-[#17201b] transition-colors duration-200 hover:border-[#087f5b] hover:text-[#087f5b]"
                    >
                      <Mail size={18} aria-hidden="true" />
                    </a>
                  </div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#657068]">21+ only</p>
                </div>
                <p className="mt-4 text-xs leading-5 text-[#657068]">For adult use only. Please vape responsibly.</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header
