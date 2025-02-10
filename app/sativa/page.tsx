"use client"

import { useEffect, useRef, Suspense } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { motion, useScroll, useTransform } from "framer-motion"
import Header from "../components/Header"
import UsageInstructions from "../components/UsageInstructions"
import Footer from "../components/Footer"
import { SunIcon } from "../components/Icons"
import ProductShowcase from "../components/ProductShowcase"
import { useSearchParams } from "next/navigation"

gsap.registerPlugin(ScrollTrigger)

const products = [
  {
    name: "Blue Dream",
    tagline: "The Perfect Harmony of Flavor & Experience",
    description:
      "Elevate your consciousness with Blue Dream, a masterfully balanced hybrid that brings together the best of both worlds. Experience an uplifting mental clarity paired with gentle, full-body relaxation.",
    effects: ["Creative Boost", "Euphoria", "Focus", "Social Energy"],
    flavors: ["Sweet Berry", "Mountain Pine", "Citrus", "Herbs"],
    terpenes: ["Myrcene", "Pinene", "Caryophyllene", "Limonene"],
    thcContent: "Premium Grade | 80-90% THC",
    color: "#f1f0ee", // Off-White
    textColor: "text-gray-900", // Dark text for light background
    hoverColor: "#ffffff", // Pure white for hover effect
    sizes: ["1ml", "2ml"],
  },
  {
    name: "Mango",
    tagline: "A Tropical Wave of Pure Energy",
    description:
      "Transport yourself to a sun-soaked paradise with our Mango strain. This exotic blend combines tropical sweetness with energizing effects, perfect for turning any moment into an adventure.",
    effects: ["Energy Boost", "Mood Elevation", "Creativity", "Focus"],
    flavors: ["Tropical Mango", "Sweet Citrus", "Exotic Spice"],
    terpenes: ["Limonene", "Myrcene", "Pinene"],
    thcContent: "Premium Grade | 80-90% THC",
    color: "#fbbf24", // Sativa-like sunny yellow color
    textColor: "text-gray-900", // Dark text for light background
    hoverColor: "#fcd34d", // Slightly lighter for hover effect
    sizes: ["2ml"],
  },
  {
    name: "Blueberry",
    tagline: "A Burst of Berry-Infused Energy",
    description:
      "Indulge in the perfect balance of flavor and function with our Blueberry strain. This carefully crafted blend delivers a burst of sweet berry notes while elevating your mind and energizing your spirit.",
    effects: ["Mental Clarity", "Creative Flow", "Uplifting", "Focused Energy"],
    flavors: ["Sweet Blueberry", "Fresh Citrus", "Herbal", "Earth"],
    terpenes: ["Limonene", "Pinene", "Myrcene"],
    thcContent: "Premium Grade | 80-90% THC",
    color: "#354377", // Deep Blue
    textColor: "text-white", // Light text for dark background
    hoverColor: "#455487", // Slightly lighter for hover effect
    sizes: ["2ml"],
  },
]

function SativaPageContent() {
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
    <div className="bg-gradient-to-b from-yellow-400 to-yellow-600 text-white min-h-screen">
      <Header />

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-16 md:pt-20"
      >
        <motion.div
          className="absolute inset-0 z-0 bg-gradient-to-b from-yellow-400 via-yellow-500 to-yellow-600"
          style={{ opacity, scale }}
        />
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 text-white text-shadow"
          >
            SATIVA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-3xl text-white mb-12 text-shadow"
          >
            Elevate Your Experience
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-white mb-12"
          >
            Sativa is known for its uplifting and energizing effects, perfect for daytime use. It's often associated
            with increased creativity, focus, and sociability.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative w-32 h-32 mx-auto"
          >
            <SunIcon className="text-yellow-200 opacity-80" width={128} height={128} />
          </motion.div>
        </div>
      </section>

      {/* Content Sections */}
      <div ref={contentRef} className="max-w-6xl mx-auto px-4 py-24">
        {/* Wholesale Section */}
        <section className="mb-24">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 text-center text-white">Premium Wholesale Sativa Vapes</h2>
          <p className="text-xl text-center mb-12 text-white">
            Enhance your product line with our premium Sativa vapes. We offer wholesale options for businesses seeking
            to provide high-quality, energizing experiences to their customers.
          </p>
          <div className="text-center">
            <button
              onClick={() =>
                (window.location.href =
                  "mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape%20Sativa&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options%20for%20Sativa%20products.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
              }
              className="bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
            >
              Contact Us for Wholesale Inquiries
            </button>
          </div>
        </section>

        {/* Product Showcase Section */}
        <section className="mb-24" id="products">
          <h2 className="text-5xl md:text-6xl font-bold mb-12 text-center text-white">Our Sativa Products</h2>
          <ProductShowcase products={products} theme="sativa" initialProduct={product || undefined} />
          <div className="mt-12 text-center">
            <button
              onClick={() =>
                (window.location.href =
                  "mailto:auradisposable@gmail.com?subject=Wholesale%20Inquiry%20for%20Aura%20Vape%20Sativa&body=Hello%20Aura%20Vape%20Team%2C%0A%0AI'm%20interested%20in%20your%20wholesale%20options%20for%20Sativa%20products.%20Please%20provide%20me%20with%20more%20information%20about%20your%20products%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
              }
              className="bg-yellow-400 text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-yellow-500 transition-colors duration-300"
            >
              Get Wholesale Pricing
            </button>
          </div>
        </section>

        {/* Usage Instructions Section */}
        <UsageInstructions theme="light" productName="Sativa" />

        {/* Safety Warning Section */}
        <section>
          <h2 className="text-4xl font-bold mb-8 text-center text-white">Important Safety Information</h2>
          <div className="border border-yellow-300 p-8 rounded-lg bg-yellow-500 bg-opacity-20 hover-lift">
            <div className="flex items-start">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-yellow-200 mr-4 flex-shrink-0"
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
                Please use responsibly. The energizing effects of Sativa may not be suitable for everyone, especially
                those with anxiety disorders. For full safety guidelines, please refer to the detailed warnings printed
                on the device.
              </p>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  )
}

export default function SativaPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SativaPageContent />
    </Suspense>
  )
}

