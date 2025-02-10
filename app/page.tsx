"use client"

import { useState, Suspense } from "react"
import { ThemeProvider } from "next-themes"
import dynamic from "next/dynamic"
import Header from "./components/Header"
import Hero from "./components/Hero"
import LoadingScreen from "./components/LoadingScreen"

const ProductHighlight = dynamic(() => import("./components/ProductHighlight"), { ssr: false })
const BrandStory = dynamic(() => import("./components/BrandStory"), { ssr: false })
const FAQ = dynamic(() => import("./components/FAQ"), { ssr: false })
const Footer = dynamic(() => import("./components/Footer"), { ssr: false })

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <ThemeProvider attribute="class">
      {isLoading && <LoadingScreen />}
      <main className="min-h-screen bg-black text-white">
        <Header />
        <Hero onVideoLoaded={() => setIsLoading(false)} className="pb-0" />
        <section className="relative py-16 text-white">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center px-4">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Premium Wholesale Vapes</h2>
            <p className="text-xl mb-8">
              Aura Vape offers top-quality disposable vapes for wholesale. Elevate your inventory with our premium
              Indica and Sativa options.
            </p>
            <button
              onClick={() =>
                (window.location.href =
                  "mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
              }
              className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
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
          <Footer />
        </Suspense>
      </main>
    </ThemeProvider>
  )
}

