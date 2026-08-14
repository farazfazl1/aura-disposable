"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { SunMoon } from "lucide-react"
import { MoonIcon, SunIcon } from "./Icons"

interface ProductCardProps {
  type: "indica" | "sativa" | "hybrid"
  title: string
  tagline: string
  description: string
}

const ProductCard = ({ type, title, tagline, description }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const bgClass =
    type === "indica"
      ? "border border-[#c9b4e8] bg-gradient-to-br from-[#f4ecff] to-[#e6d9f7]"
      : type === "sativa"
        ? "border border-[#e6c970] bg-gradient-to-br from-[#fff8de] to-[#f4d278]"
        : "border border-[#9bd6bf] bg-gradient-to-br from-[#e1f5ec] via-[#ccede0] to-[#f7e7b2]"

  const Icon = type === "indica" ? MoonIcon : type === "sativa" ? SunIcon : SunMoon
  const glowColor =
    type === "indica" ? "rgba(111, 66, 193, 0.22)" : type === "sativa" ? "rgba(161, 98, 7, 0.2)" : "rgba(8, 127, 91, 0.2)"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden rounded-3xl ${bgClass} p-8 group transition-all duration-500 ease-out`}
    >
      {/* Background Animation */}
      <div
        className={`absolute inset-0 opacity-20 transition-opacity duration-500 ${isHovered ? "opacity-30" : ""}`}
        style={{
          backgroundImage: `radial-gradient(circle at 50% 50%, 
            ${glowColor} 0%, 
            transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <Icon
            className={`w-6 h-6 ${
            type === "indica" ? "text-[#6f42c1]" : type === "sativa" ? "text-[#8a5a08]" : "text-[#087f5b]"
          }`}
        />
          <h2 className="ml-3 text-3xl font-bold tracking-wider text-[#17201b]">{title}</h2>
        </div>

        <p
          className={`text-xl font-medium mb-4 ${
            type === "indica" ? "text-[#6f42c1]" : type === "sativa" ? "text-[#8a5a08]" : "text-[#087f5b]"
          }`}
        >
          {tagline}
        </p>

        <p className="mb-8 text-lg leading-relaxed text-[#46554c]">{description}</p>

        <Link
          href={`/store?type=${type}`}
          className={`
            inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold
            transition-all duration-300 ease-out transform
            ${
              type === "indica"
                ? "bg-[#6f42c1] text-white hover:bg-[#58309f]"
                : type === "sativa"
                  ? "bg-[#a16207] text-white hover:bg-[#854d0e]"
                  : "bg-[#087f5b] text-white hover:bg-[#065f46]"
            }
            hover:scale-105 hover:shadow-lg
          `}
        >
          Browse {title}
          <svg
            className={`ml-2 w-5 h-5 transition-transform duration-300 ${isHovered ? "translate-x-1" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>

      {/* Animated Border */}
      <div
        className={`
          absolute inset-0 rounded-3xl transition-opacity duration-500
          ${isHovered ? "opacity-100" : "opacity-0"}
        `}
        style={{
          background: `linear-gradient(45deg, 
            ${type === "indica" ? "rgba(147, 51, 234, 0.3), rgba(147, 51, 234, 0)" : ""}
            ${type === "sativa" ? "rgba(234, 179, 8, 0.3), rgba(234, 179, 8, 0)" : ""}
            ${type === "hybrid" ? "rgba(16, 185, 129, 0.35), rgba(234, 179, 8, 0.15)" : ""}
          )`,
        }}
      />
    </motion.div>
  )
}

export default ProductCard
