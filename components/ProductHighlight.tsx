"use client"

import { memo } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { SunMoon } from "lucide-react"
import { MoonIcon, SunIcon } from "@/components/Icons"
import { AspectRatio } from "@/components/ui/aspect-ratio"

/** Width ÷ height for each highlight card image (e.g. export 1600×1200). */
export const PRODUCT_HIGHLIGHT_IMAGE_RATIO = 4 / 3

const ProductCard = memo(
  ({
    name,
    tagline,
    description,
    color,
    icon: Icon,
    imageSrc,
    imageAlt,
  }: {
    name: string
    tagline: string
    description: string
    color: "black" | "white" | "purple" | "sun" | "hybrid"
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
    imageSrc?: string
    imageAlt?: string
  }) => {
    const getStyles = () => {
      switch (color) {
        case "purple":
          return "border-purple-700 bg-gradient-to-br from-purple-900 to-black text-white"
        case "sun":
          return "border-yellow-400 bg-gradient-to-br from-yellow-400 to-yellow-600 text-black"
        case "hybrid":
          return "border-emerald-400 bg-gradient-to-br from-emerald-500 via-teal-500 to-yellow-400 text-black"
        case "white":
          return "border-gray-200 bg-gradient-to-br from-gray-100 to-white text-black"
        default:
          return "border-gray-700 bg-gradient-to-br from-gray-900 to-black text-white"
      }
    }

    const getTextColor = () => {
      switch (color) {
        case "purple":
          return "text-purple-300"
        case "sun":
          return "text-black"
        case "hybrid":
          return "text-black"
        case "white":
          return "text-gray-800"
        default:
          return "gradient-text"
      }
    }

    const getButtonStyle = () => {
      switch (color) {
        case "purple":
          return "bg-purple-600 text-white hover:bg-purple-700"
        case "sun":
          return "bg-yellow-700 text-white hover:bg-yellow-800"
        case "hybrid":
          return "bg-emerald-700 text-white hover:bg-emerald-800"
        case "white":
          return "bg-black text-white hover:bg-gray-800"
        default:
          return "bg-white text-black hover:bg-gray-200"
      }
    }

    const href =
      name.toLowerCase().includes("indica") ? "/indica" : name.toLowerCase().includes("hybrid") ? "/hybrid" : "/sativa"

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`p-8 rounded-3xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl border bg-yellow-400 flex flex-col ${getStyles()}`}
      >
        {imageSrc ? (
          <AspectRatio
            ratio={PRODUCT_HIGHLIGHT_IMAGE_RATIO}
            className="relative mb-6 w-full overflow-hidden rounded-2xl bg-black/20"
          >
            <Image
              src={imageSrc}
              alt={imageAlt ?? name}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-contain"
            />
          </AspectRatio>
        ) : null}
        <div className="flex items-center mb-6">
          <Icon className={`${color === "white" ? "text-black" : "text-white"} w-6 h-6`} />
          <h3 className="text-3xl font-bold ml-3">{name}</h3>
        </div>
        <p className={`text-xl font-semibold mb-4 ${getTextColor()}`}>{tagline}</p>
        <p className={`mb-6 text-lg flex-grow ${color === "white" ? "text-gray-600" : "text-white"}`}>{description}</p>
        <div className="mt-auto">
          <Link
            href={href}
            className={`px-6 py-3 rounded-full transition-colors duration-300 inline-block ${getButtonStyle()}`}
          >
            Learn More
          </Link>
        </div>
      </motion.div>
    )
  },
)

ProductCard.displayName = "ProductCard"

const ProductHighlight = () => {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 tracking-tight leading-tight px-4"
        >
          <span className="text-purple-500">ELEVATE</span> <span className="text-white">YOUR</span>{" "}
          <span className="text-yellow-500">EXPERIENCE</span>
        </motion.h2>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          className="grid md:grid-cols-3 gap-12"
        >
          <ProductCard
            name="INDICA"
            tagline="Deep. Calm. Immersive."
            description="A rich, full-body unwind crafted for quiet evenings, smooth flavor, and slow, intentional moments"
            color="purple"
            icon={MoonIcon}
          />
          <ProductCard
            name="SATIVA"
            tagline="Bright. Uplifting. Focused."
            description="Crisp citrus notes and vibrant clarity designed for creative flow and daytime momentum."
            color="sun"
            icon={SunIcon}
          />
          <ProductCard
            name="HYBRID"
            tagline="Balanced. Refined. Elevated."
            description="A seamless fusion of body relaxation and mental clarity, designed for smooth, all-day performance with rich, layered terpenes."
            color="hybrid"
            icon={SunMoon}
          />
        </motion.div>
        <div className="mt-12 text-center">
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
      </div>
    </section>
  )
}

export default memo(ProductHighlight)
