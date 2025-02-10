"use client"

import { useEffect, useRef, Suspense } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "../components/Header"
import UsageInstructions from "../components/UsageInstructions"
import Footer from "../components/Footer"
import { MoonIcon } from "../components/Icons"
import ProductShowcase from "../components/ProductShowcase"
import { useSearchParams } from "next/navigation"

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    name: "OG",
    tagline: "A Legendary Staple in the Cannabis World",
    description:
      "Immerse yourself in the rich heritage of OG, where tradition meets innovation. This legendary strain delivers a symphony of bold flavors and profound effects that have earned it its iconic status.",
    effects: ["Deep Relaxation", "Stress Relief", "Pain Management", "Sleep Aid"],
    flavors: ["Earthy Pine", "Citrus Zest", "Spicy Gas", "Woody"],
    terpenes: ["Myrcene", "Caryophyllene", "Limonene"],
    thcContent: "Premium Grade | 80-90% THC",
    color: "#000000", // Black
    textColor: "text-white", // Light text for dark background
    hoverColor: "#1a1a1a", // Slightly lighter for hover effect
    sizes: ["1ml", "2ml"],
  },
  {
    name: "OG Mint",
    tagline: "A Crisp Take on Classic OG",
    description:
      "Experience the perfect fusion of classic OG potency with invigorating mint freshness. OG Mint offers a unique twist on the traditional, delivering a cool, refreshing sensation with every draw.",
    effects: ["Balanced Relief", "Mental Clarity", "Physical Comfort", "Mood Elevation"],
    flavors: ["Cool Mint", "Sweet Herbs", "Pine Forest", "Earth"],
    terpenes: ["Limonene", "Myrcene", "Caryophyllene"],
    thcContent: "Premium Grade | 80-90% THC",
    color: "#6c776e", // Muted Green
    textColor: "text-white", // Light text for dark background
    hoverColor: "#7c877e", // Slightly lighter for hover effect
    sizes: ["2ml"],
  },
]

function IndicaPageContent() {
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

      gsap.from(contentRef.current?.children, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      })
    })

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (product) {
      // Add a small delay to ensure the DOM is ready
      setTimeout(() => {
        const productSection = document.getElementById("products")
        if (productSection) {
          productSection.scrollIntoView({ behavior: "smooth", block: "start" })
        }
      }, 100)
    }
  }, [product])

  return (
    <div className="bg-gradient-to-b from-indica to-black text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
      >
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-b from-indica via-indica/80 to-black"
          style={{ opacity, scale }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 text-indica-100 text-shadow"
          >
            INDICA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-white mb-12 text-shadow"
          >
            The Essence of Bold Intensity
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-indica-100 mb-12"
          >
            Indica is one of the main subspecies of the cannabis plant, known for its relaxing, sedative, and
            body-focused effects. It is commonly used for relaxation, sleep aid, and pain relief.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-32 h-32 mx-auto"
          >
            <MoonIcon className="text-indica-200 opacity-80" width={128} height={128} />
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 py-24">
        {/* Wholesale Section */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-indica-200">
            Premium Wholesale Indica Vapes
          </h2>
          <p className="text-xl text-center mb-12 text-white">
            Elevate your inventory with our premium Indica vapes. We offer wholesale options for businesses looking to
            provide top-quality products to their customers.
          </p>
          <div className="text-center">
            <button
              onClick={() =>
                (window.location.href =
                  "mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape%20Indica&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in your wholesale options for Indica products. Please provide me with more information about your products and pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
              }
              className="bg-indica-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indica-700 transition-colors duration-300"
            >
              Contact Us for Wholesale Inquiries
            </button>
          </div>
        </section>
        {/* Product Showcase Section */}
        <section className="mb-24" id="products">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center text-indica-200">Our Indica Products</h2>
          <ProductShowcase products={products} theme="indica" initialProduct={product || undefined} />
          <div className="mt-12 text-center">
            <button
              onClick={() =>
                (window.location.href =
                  "mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape%20Indica&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options%20for%20Indica%20products.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
              }
              className="bg-indica-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-indica-700 transition-colors duration-300"
            >
              Get Wholesale Pricing
            </button>
          </div>
        </section>

        {/* Usage Instructions Section */}
        <UsageInstructions theme="dark" productName="Indica" />

        {/* Safety Warning Section */}
        <section>
          <h2 className="text-4xl font-bold mb-8 text-center text-indica-200">Important Safety Information</h2>
          <div className="border border-indica-700 p-8 rounded-lg bg-indica bg-opacity-20 hover-lift">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-indica-200 mr-4 flex-shrink-0"
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
              <p className="text-lg leading-relaxed text-white">
                This product contains cannabis and is intended for use only by individuals 21 years of age or older.
                Please use responsibly. The intoxicating effects of cannabis may be delayed by up to two hours.
                Consuming this product while pregnant or breastfeeding may be harmful. For full safety guidelines,
                please refer to the detailed warnings printed on the device.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default function IndicaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IndicaPageContent />
    </Suspense>
  )
}

