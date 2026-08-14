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
        <section className="relative border-y border-[#dfe5df] bg-[#eef1ea] py-16 text-[#17201b]">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#eef1ea]"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Wholesale Vapes</h2>
            <p className="text-xl mb-8 text-[#536057]">
              Aura Vape offers top-quality disposable vapes for wholesale. Elevate your inventory with our premium
              Indica, Sativa, and Hybrid options.
            </p>
            <button
              onClick={() =>
                (window.location.href =
                  "mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
              }
              className="bg-[#17201b] text-[#fffefa] px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:bg-[#33423a] transition-colors duration-300"
            >
              Get Wholesale Pricing
            </button>
          </div>
        </section>
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
                  website contain THC and are intended for use only in jurisdictions where such products are legal. By
                  accessing this site, you confirm that you are of legal age in your state or region to purchase
                  cannabis products. These statements have not been evaluated by the FDA, and our products are not
                  intended to diagnose, treat, cure, or prevent any disease. Consult with a healthcare professional
                  before use, especially if you are pregnant, nursing, have a medical condition, or are taking
                  medication. Keep all cannabis products out of reach of children and pets.
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
