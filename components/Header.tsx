"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useHeaderScroll } from "@/hooks/useHeaderScroll"
import BasketButton from "@/components/cart/BasketButton"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const visible = useHeaderScroll()

  const isStorePage = pathname.startsWith("/store")

  const getHeaderStyle = () => {
    return "border-b border-[#dfe5df] bg-[#f7f6f2]/90 shadow-[0_8px_24px_rgba(23,32,27,0.06)] backdrop-blur-md"
  }

  const getStoreLinkStyle = () => {
    return isStorePage ? "text-[#a16207] font-semibold" : "text-[#17201b] hover:text-[#a16207]"
  }

  const getLogoStyle = () => {
    return "text-[#17201b]"
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
      window.scrollTo(0, 0)
    }
  }

  const getNavItems = () => {
    if (pathname === "/") {
      return [
        { name: "Products", path: "/#products" },
        { name: "Verify", path: "/verify" },
        { name: "Store", path: "/store" },
        { name: "Story", path: "/#story" },
        { name: "FAQ", path: "/#faq" },
      ]
    } else if (pathname.startsWith("/store")) {
      return [
        { name: "Home", path: "/" },
        { name: "Store", path: "/store" },
        { name: "Verify", path: "/verify" },
        { name: "Story", path: "/#story" },
        { name: "FAQ", path: "/#faq" },
      ]
    }
    return [
      { name: "Home", path: "/" },
      { name: "Store", path: "/store" },
      { name: "Verify", path: "/verify" },
      { name: "Story", path: "/#story" },
      { name: "FAQ", path: "/#faq" },
    ]
  }

  const navItems = getNavItems()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${getHeaderStyle()}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex-shrink-0">
            <Link
              href="/"
              onClick={() => handleNavigation("/")}
              className={`text-2xl font-bold cursor-pointer ${getLogoStyle()}`}
            >
              AURA
            </Link>
          </div>
          <div className="flex items-center gap-3 md:gap-6">
            <nav className="hidden items-center space-x-8 md:flex">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  className={`text-sm font-semibold transition-colors ${
                    item.name === "Store" ? getStoreLinkStyle() : "text-[#17201b] hover:text-[#6f42c1]"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <BasketButton />
            <button
              type="button"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="flex h-10 w-10 items-center justify-center rounded-full text-[#17201b] transition-colors hover:bg-[#eef1ea] md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div
            className="space-y-1 border-t border-[#dfe5df] bg-[#f7f6f2] px-2 pb-3 pt-2 sm:px-3"
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className="block w-full cursor-pointer px-3 py-2 text-left text-base font-medium text-[#17201b] transition duration-150 ease-in-out hover:bg-[#eef1ea]"
              >
                {item.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
