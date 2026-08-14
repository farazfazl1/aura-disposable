"use client"

import { ArrowUpRight } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import StoreCatalog from "@/components/StoreCatalog"

export default function StorePage() {
  return (
    <div className="aura-page min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        <StoreCatalog />

        <section className="border-t border-[#dfe5df] bg-[#fffefa] px-4 py-20 md:py-24">
          <div className="mx-auto grid max-w-7xl gap-8 rounded-[2rem] border border-[#dfe5df] bg-gradient-to-br from-[#f4ecff] via-[#fffefa] to-[#e7f5ee] p-7 shadow-[0_20px_60px_rgba(23,32,27,0.06)] md:grid-cols-[1.4fr_0.6fr] md:items-center md:p-12">
            <div>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-[#087f5b]">For retailers</p>
              <h2 className="max-w-2xl font-serif text-4xl font-semibold leading-none tracking-[-0.04em] text-[#17201b] md:text-6xl">
                Bring the full Aura edit to your shelf.
              </h2>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#657068] md:text-lg">
                Ask about availability, formats, and a wholesale collection built around your customers.
              </p>
            </div>
            <a
              href="mailto:auradisposable@gmail.com?subject=Store%20Wholesale%20Inquiry&body=Hello%20Aura%20Team%2C%0A%0AI%27m%20interested%20in%20wholesale%20opportunities%20and%20store%20support.%20Please%20share%20details%20on%20product%20lines%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#17201b] px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#33423a] hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2"
            >
              Contact wholesale
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
