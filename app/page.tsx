"use client"

import { useState, Suspense } from "react"
import dynamic from "next/dynamic"
import Header from "@/components/Header"
import Hero from "@/components/Hero"
import LoadingScreen from "@/components/LoadingScreen"

const ProductHighlight = dynamic(() => import("@/components/ProductHighlight"), { ssr: false })
const BrandStory = dynamic(() => import("@/components/BrandStory"), { ssr: false })
const FAQ = dynamic(() => import("@/components/FAQ"), { ssr: false })
const Footer = dynamic(() => import("@/components/Footer"), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {isLoading && <LoadingScreen />}
      <main className="aura-page min-h-screen">
        <Header />
        <Hero onVideoLoaded={() => setIsLoading(false)} className="pb-0" />
        <Suspense fallback={<div>Loading...</div>}>
          <div id="products">
            <ProductHighlight />
          </div>
          <div id="story">
            <BrandStory />
          </div>
          <div id="faq">
            <FAQ />
          </div>
          <section
            aria-label="Disclaimer"
            className="relative isolate overflow-hidden border-y border-[#dfe5df] bg-[#eef1ea] px-4 py-16 text-[#17201b] md:py-20"
          >
            <div
              aria-hidden="true"
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[24px] border-[#d9c8f3]/60"
            ></div>
            <div
              aria-hidden="true"
              className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-[#b9ddce]/80"
            ></div>
            <div className="relative mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.72fr_1.55fr] md:items-center md:gap-16">
              <div className="max-w-sm">
                <p className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#6f42c1]">
                  <span aria-hidden="true" className="h-px w-8 bg-[#6f42c1]"></span>
                  Important information
                </p>
                <h2 className="mt-5 font-serif text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-[#17201b] md:text-5xl">
                  Clarity before the experience.
                </h2>
                <div className="mt-7 h-1 w-20 rounded-full bg-gradient-to-r from-[#6f42c1] via-[#a16207] to-[#087f5b]"></div>
              </div>
              <div className="relative overflow-hidden rounded-[2rem] border border-[#dfe5df] bg-[#fffefa]/95 p-6 shadow-[0_20px_60px_rgba(23,32,27,0.08)] md:p-9">
                <div className="mb-6 flex items-center justify-between gap-4 border-b border-[#dfe5df] pb-5">
                  <span className="text-sm font-semibold text-[#17201b]">Please read before use</span>
                  <span className="rounded-full border border-[#c9b4e8] bg-[#f4ecff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#6f42c1]">
                    Aura / Legal
                  </span>
                </div>
                <p className="text-sm leading-7 text-[#657068] md:text-[15px]">
                  <strong className="font-semibold text-[#17201b]">Disclaimer:</strong> The products sold on this
                  website are intended for use only in jurisdictions where cannabis products are legal. By accessing
                  this site, you confirm that you are of legal age in your state or region to purchase cannabis
                  products. These statements have not been evaluated by the FDA, and our products are not intended to
                  diagnose, treat, cure, or prevent any disease. Consult with a healthcare professional before use,
                  especially if you are pregnant, nursing, have a medical condition, or are taking medication. Keep all
                  cannabis products out of reach of children and pets.
                </p>
              </div>
            </div>
          </section>
          <Footer />
        </Suspense>
      </main>
    </>
  )
}
