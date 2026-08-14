"use client"

import { useState, useEffect } from "react"
import { Menu, SunMoon, X } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useHeaderScroll } from "@/hooks/useHeaderScroll"
import { MoonIcon, SunIcon } from "@/components/Icons"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const visible = useHeaderScroll()

  const isStorePage = pathname.startsWith("/store")

  const getHeaderStyle = () => {
    return "border-b border-[#dfe5df] bg-[#f7f6f2]/90 shadow-[0_8px_24px_rgba(23,32,27,0.06)] backdrop-blur-md"
  }

  const getLinkStyle = (type: "indica" | "sativa" | "hybrid") => {
    if (type === "indica") {
      return "text-[#6f42c1] hover:text-[#522b9f]"
    }
    if (type === "sativa") {
      return "text-[#a16207] hover:text-[#854d0e]"
    }
    return "text-[#087f5b] hover:text-[#065f46]"
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
    } else if (pathname.startsWith("/indica")) {
      return [
        { name: "Sativa", path: "/sativa" },
        { name: "Hybrid", path: "/hybrid" },
        { name: "Store", path: "/store" },
        { name: "Story", path: "/#story" },
        { name: "FAQ", path: "/#faq" },
      ]
    } else if (pathname.startsWith("/sativa")) {
      return [
        { name: "Indica", path: "/indica" },
        { name: "Hybrid", path: "/hybrid" },
        { name: "Store", path: "/store" },
        { name: "Story", path: "/#story" },
        { name: "FAQ", path: "/#faq" },
      ]
    } else if (pathname.startsWith("/hybrid")) {
      return [
        { name: "Indica", path: "/indica" },
        { name: "Sativa", path: "/sativa" },
        { name: "Store", path: "/store" },
        { name: "Story", path: "/#story" },
        { name: "FAQ", path: "/#faq" },
      ]
    } else if (pathname.startsWith("/store")) {
      return [
        { name: "Home", path: "/" },
        { name: "Indica", path: "/indica" },
        { name: "Sativa", path: "/sativa" },
        { name: "Hybrid", path: "/hybrid" },
      ]
    }
    return []
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
          <nav className="hidden md:flex space-x-8">
            <Link href="/indica" className={`flex items-center ${getLinkStyle("indica")}`}>
              <MoonIcon className="mr-2" width={18} height={18} />
              Indica
            </Link>
            <Link href="/sativa" className={`flex items-center ${getLinkStyle("sativa")}`}>
              <SunIcon className="mr-2" width={18} height={18} />
              Sativa
            </Link>
            <Link href="/hybrid" className={`flex items-center ${getLinkStyle("hybrid")}`}>
              <SunMoon className="mr-2" width={18} height={18} />
              Hybrid
            </Link>
            <Link href="/store" className={`flex items-center ${getStoreLinkStyle()}`}>
              Store
            </Link>
            <Link href="/verify" className="text-[#17201b] hover:text-[#6f42c1]">
              Verify
            </Link>
          </nav>
          <button className="text-[#17201b] md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
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
