"use client"

import { useEffect, useRef, Suspense } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"
import { SunMoon } from "lucide-react"
import { useSearchParams } from "next/navigation"
import Header from "@/components/Header"
import UsageInstructions from "@/components/UsageInstructions"
import Footer from "@/components/Footer"
import ProductShowcase from "@/components/ProductShowcase"
import StoreProductGrid from "@/components/StoreProductGrid"
import { showcaseProductsForType, storeProductsByType } from "@/lib/storeCatalog"

gsap.registerPlugin(ScrollTrigger)

const products = showcaseProductsForType("hybrid")
const shopProducts = storeProductsByType("hybrid")

function HybridPageContent() {
  const heroRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const searchParams = useSearchParams()
  const product = searchParams.get("product")

  useEffect(() => {
    window.scrollTo(0, 0)

    const ctx = gsap.context(() => {
      gsap.from(heroRef.current, {
        opacity: 0,
        duration: 1.5,
        ease: "power3.out",
      })

      if (contentRef.current) {
        gsap.from(Array.from(contentRef.current.children), {
          y: 50,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
          },
        })
      }
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (product) {
      setTimeout(() => {
        const productSection = document.getElementById("products")
        if (productSection) {
          productSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }, [product])

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#dff3e9] via-[#f3faf5] to-[#f7f6f2] text-[#17201b]">
      <Header />
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
      >
        <motion.div style={{ opacity, scale }} className="absolute inset-0 z-0">
          <div className="absolute -top-28 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#d9c8f3]/60 blur-3xl" />
          <div className="absolute right-10 top-16 h-80 w-80 rounded-full bg-[#bfe7d4]/70 blur-3xl" />
          <div className="absolute bottom-10 left-10 h-80 w-80 rounded-full bg-[#ffe9a9]/60 blur-3xl" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#f7f6f2]/20 via-[#f7f6f2]/70 to-[#f7f6f2]" />
        </motion.div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Hybrid Collection</h1>
          <p className="mb-10 text-xl text-[#536057] md:text-2xl">
            Balanced profiles crafted to deliver calm, clarity, and a refined lift for any moment.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative w-32 h-32 mx-auto"
          >
            <SunMoon className="text-[#087f5b] opacity-80" width={128} height={128} />
          </motion.div>
        </div>
      </section>

      <div ref={contentRef} className="max-w-6xl mx-auto px-4 py-24">
        <section className="mb-24">
          <h2 className="mb-8 text-center text-4xl font-bold text-[#087f5b] md:text-5xl">Premium Wholesale Hybrid Vapes</h2>
          <p className="mb-12 text-center text-xl text-[#536057]">
            Curate a balanced lineup with our Hybrid vapes. Provide customers with a refined blend of calm and clarity.
          </p>
          <div className="text-center">
            <a
              href="mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape%20Hybrid&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options%20for%20Hybrid%20products.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]"
              className="inline-flex items-center justify-center rounded-full bg-[#087f5b] px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-[#065f46]"
            >
              Contact Us for Wholesale Inquiries
            </a>
          </div>
        </section>

        <section
          className="mb-24 rounded-3xl border border-[#b8dfce] bg-white p-6 text-[#17201b] shadow-xl md:p-10"
          id="shop"
        >
          <h2 className="mb-3 text-center text-3xl font-bold text-[#087f5b] md:text-5xl">Shop Hybrid</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-lg text-[#657068]">
            Same Aura store catalog—open full specs or submit a purchase request (Orange County, CA).
          </p>
          <StoreProductGrid products={shopProducts} />
        </section>

        <section className="mb-24" id="products">
          <h2 className="mb-12 text-center text-5xl font-bold text-[#087f5b] md:text-6xl">Our Hybrid Products</h2>
          <ProductShowcase products={products} theme="hybrid" initialProduct={product || undefined} />
          <div className="mt-12 text-center">
            <a
              href="mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape%20Hybrid&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options%20for%20Hybrid%20products.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]"
              className="inline-flex items-center justify-center rounded-full bg-[#087f5b] px-8 py-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-[#065f46]"
            >
              Get Wholesale Pricing
            </a>
          </div>
        </section>

        <UsageInstructions theme="light" productName="Hybrid" />

        <section>
          <h2 className="mb-8 text-center text-4xl font-bold text-[#087f5b]">Important Safety Information</h2>
          <div className="rounded-lg border border-[#a6d7c3] bg-[#e7f5ee] p-8 hover-lift">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mr-4 h-12 w-12 flex-shrink-0 text-[#087f5b]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <p className="text-[#46554c]">
                This product contains THC and is intended for adult use only. Please consume responsibly and follow all
                local regulations.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default function HybridPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HybridPageContent />
    </Suspense>
  )
}
