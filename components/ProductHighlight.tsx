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
          return "border-[#c9b4e8] bg-gradient-to-br from-[#f4ecff] to-[#e6d9f7] text-[#2f1b45]"
        case "sun":
          return "border-[#e5c65f] bg-gradient-to-br from-[#fff8de] to-[#f4d278] text-[#3c2d0c]"
        case "hybrid":
          return "border-[#9bd6bf] bg-gradient-to-br from-[#e1f5ec] via-[#ccede0] to-[#f7e7b2] text-[#17392f]"
        case "white":
          return "border-[#dfe5df] bg-gradient-to-br from-[#f3f5f0] to-white text-[#17201b]"
        default:
          return "border-[#dfe5df] bg-white text-[#17201b]"
      }
    }

    const getTextColor = () => {
      switch (color) {
        case "purple":
          return "text-[#6f42c1]"
        case "sun":
          return "text-[#8a5a08]"
        case "hybrid":
          return "text-[#087f5b]"
        case "white":
          return "text-[#536057]"
        default:
          return "gradient-text"
      }
    }

    const getButtonStyle = () => {
      switch (color) {
        case "purple":
          return "bg-[#6f42c1] text-white hover:bg-[#58309f]"
        case "sun":
          return "bg-[#a16207] text-white hover:bg-[#854d0e]"
        case "hybrid":
          return "bg-[#087f5b] text-white hover:bg-[#065f46]"
        case "white":
          return "bg-[#17201b] text-white hover:bg-[#33423a]"
        default:
          return "bg-[#17201b] text-white hover:bg-[#33423a]"
      }
    }

    const profile = name.toLowerCase()
    const href = `/store?type=${profile}`

    return (
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`p-8 rounded-3xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-2xl border flex flex-col ${getStyles()}`}
      >
        {imageSrc ? (
          <AspectRatio
            ratio={PRODUCT_HIGHLIGHT_IMAGE_RATIO}
            className="relative mb-6 w-full overflow-hidden rounded-2xl bg-[#17201b]/[0.06]"
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
          <Icon
            className={`${
              color === "purple"
                ? "text-[#6f42c1]"
                : color === "sun"
                  ? "text-[#8a5a08]"
                  : color === "hybrid"
                    ? "text-[#087f5b]"
                    : "text-[#17201b]"
            } w-6 h-6`}
          />
          <h3 className="text-3xl font-bold ml-3">{name}</h3>
        </div>
        <p className={`text-xl font-semibold mb-4 ${getTextColor()}`}>{tagline}</p>
        <p className="mb-6 flex-grow text-lg text-[#46554c]">{description}</p>
        <div className="mt-auto">
          <Link
            href={href}
            className={`px-6 py-3 rounded-full transition-colors duration-300 inline-block ${getButtonStyle()}`}
          >
            Browse {name}
          </Link>
        </div>
      </motion.div>
    )
  },
)

ProductCard.displayName = "ProductCard"

const ProductHighlight = () => {
  return (
    <section className="bg-[#f7f6f2] px-4 py-24">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-bold text-center mb-16 tracking-tight leading-tight px-4"
        >
          <span className="text-[#6f42c1]">ELEVATE</span> <span className="text-[#17201b]">YOUR</span>{" "}
          <span className="text-[#a16207]">EXPERIENCE</span>
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
      </div>
    </section>
  )
}

export default memo(ProductHighlight)
