import { Instagram, Mail } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  const year = new Date().getFullYear()

  const shopLinks = [
    { name: "Indica", href: "/store?type=indica", hover: "hover:text-[#c9b4e8]" },
    { name: "Sativa", href: "/store?type=sativa", hover: "hover:text-[#c9b4e8]" },
    { name: "Hybrid", href: "/store?type=hybrid", hover: "hover:text-[#c9b4e8]" },
    { name: "All Products", href: "/store", hover: "hover:text-[#c9b4e8]" },
  ]

  const exploreLinks = [
    { name: "Home", href: "/", hover: "hover:text-[#e2b93b]" },
    { name: "Our Story", href: "/#story", hover: "hover:text-[#e2b93b]" },
    { name: "Verify a Product", href: "/verify", hover: "hover:text-[#e2b93b]" },
    { name: "FAQ", href: "/#faq", hover: "hover:text-[#e2b93b]" },
  ]

  return (
    <footer className="relative isolate overflow-hidden bg-[#17201b] text-[#fffefa]">
      {/* signature brand gradient strip */}
      <div
        aria-hidden="true"
        className="h-[3px] w-full bg-gradient-to-r from-[#c9b4e8] via-[#e2b93b] to-[#7fd6b8]"
      ></div>

      {/* decorative rings, echoing the disclaimer section above */}
      <div
        aria-hidden="true"
        className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[24px] border-[#c9b4e8]/10"
      ></div>
      <div
        aria-hidden="true"
        className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-[#7fd6b8]/15"
      ></div>

      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:gap-x-8 lg:grid-cols-[1.5fr_1fr_1fr_1.3fr] lg:gap-10">
          {/* Brand — full width on mobile/tablet, first column on desktop */}
          <div className="col-span-2 lg:col-span-1">
            <Link
              href="/"
              className="text-3xl font-bold tracking-tight transition-colors duration-200 hover:text-[#c9b4e8]"
            >
              AURA
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-6 text-[#a9b3ab]">
              Premium disposable vapes, crafted around one idea —{" "}
              <span className="font-serif italic text-[#fffefa]">vaping, redefined.</span>
            </p>
            <div className="mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#c9b4e8] via-[#e2b93b] to-[#7fd6b8]"></div>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.instagram.com/auradisposable"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Aura Vape on Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fffefa]/15 text-[#a9b3ab] transition-colors duration-200 hover:border-[#c9b4e8] hover:text-[#c9b4e8]"
              >
                <Instagram size={18} />
              </a>
              <a
                href="mailto:auradisposable@gmail.com"
                aria-label="Email Aura Vape"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#fffefa]/15 text-[#a9b3ab] transition-colors duration-200 hover:border-[#7fd6b8] hover:text-[#7fd6b8]"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <nav aria-label="Shop">
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#fffefa]">
              <span aria-hidden="true" className="h-px w-8 bg-[#c9b4e8]"></span>
              Shop
            </p>
            <ul className="mt-6 space-y-3">
              {shopLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm text-[#a9b3ab] transition-colors duration-200 ${link.hover}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Explore */}
          <nav aria-label="Explore">
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#fffefa]">
              <span aria-hidden="true" className="h-px w-8 bg-[#e2b93b]"></span>
              Explore
            </p>
            <ul className="mt-6 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`text-sm text-[#a9b3ab] transition-colors duration-200 ${link.hover}`}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Support — full width on mobile/tablet, last column on desktop */}
          <div className="col-span-2 lg:col-span-1">
            <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#fffefa]">
              <span aria-hidden="true" className="h-px w-8 bg-[#7fd6b8]"></span>
              Support
            </p>
            <p className="mt-6 text-sm font-semibold text-[#fffefa]">Need help with a product or your order?</p>
            <p className="mt-2 text-sm leading-6 text-[#a9b3ab]">
              Reach us anytime at{" "}
              <a
                href="mailto:auradisposable@gmail.com?subject=Aura%20Store%20Support"
                className="text-[#fffefa] underline decoration-[#7fd6b8]/60 underline-offset-4 transition-colors duration-200 [overflow-wrap:anywhere] hover:text-[#7fd6b8]"
              >
                auradisposable@gmail.com
              </a>
            </p>
            <a
              href="mailto:auradisposable@gmail.com?subject=Aura%20Store%20Support"
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-[#fffefa] px-6 py-3 text-sm font-semibold text-[#17201b] transition-colors duration-300 hover:bg-[#e2b93b] sm:w-auto"
            >
              Email support
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#fffefa]/10 pt-7 md:mt-14 md:flex-row md:pt-8">
          <p className="text-sm text-[#a9b3ab]">&copy; {year} Aura Vape. All rights reserved.</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <p className="text-sm text-[#a9b3ab]">For adult use only. Please vape responsibly.</p>
            <span className="rounded-full border border-[#c9b4e8]/40 bg-[#c9b4e8]/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#c9b4e8]">
              Aura / Legal
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
