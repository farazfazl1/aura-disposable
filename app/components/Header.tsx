"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useHeaderScroll } from "../hooks/useHeaderScroll"
import { MoonIcon, SunIcon } from "./Icons"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const visible = useHeaderScroll()

  const isIndicaPage = pathname.startsWith("/indica")
  const isSativaPage = pathname.startsWith("/sativa")

  const getHeaderStyle = () => {
    if (isIndicaPage) {
      return "bg-purple-900"
    }
    if (isSativaPage) {
      return "bg-gradient-to-r from-yellow-400 to-yellow-500"
    }
    return "bg-black"
  }

  const getLinkStyle = (type: "indica" | "sativa") => {
    if (type === "indica") {
      return isSativaPage ? "text-purple-600" : "text-white"
    }
    return isIndicaPage ? "text-yellow-400" : "text-white"
  }

  const getLogoStyle = () => {
    return "text-white" // AURA is always white
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
        { name: "Story", path: "/#story" },
        { name: "FAQ", path: "/#faq" },
      ]
    } else if (pathname.startsWith("/indica")) {
      return [
        { name: "Sativa", path: "/sativa" },
        { name: "Story", path: "/#story" },
        { name: "FAQ", path: "/#faq" },
      ]
    } else if (pathname.startsWith("/sativa")) {
      return [
        { name: "Indica", path: "/indica" },
        { name: "Story", path: "/#story" },
        { name: "FAQ", path: "/#faq" },
      ]
    }
    return []
  }

  const navItems = getNavItems()

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false)
    }

    router.events?.on("routeChangeComplete", handleRouteChange)

    return () => {
      router.events?.off("routeChangeComplete", handleRouteChange)
    }
  }, [router])

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
          </nav>
          <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div
            className={`px-2 pt-2 pb-3 space-y-1 sm:px-3 ${getHeaderStyle().includes("bg-black") ? "bg-black" : "bg-white"}`}
          >
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => handleNavigation(item.path)}
                className={`block w-full text-left px-3 py-2 text-base font-medium hover:bg-opacity-75 transition duration-150 ease-in-out cursor-pointer ${
                  getHeaderStyle().includes("bg-black")
                    ? "text-white hover:bg-gray-900"
                    : "text-black hover:bg-gray-200"
                }`}
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

