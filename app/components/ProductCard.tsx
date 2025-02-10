"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"
import { MoonIcon, SunIcon } from "./Icons"

interface ProductCardProps {
  type: "indica" | "sativa"
  title: string
  tagline: string
  description: string
}

const ProductCard = ({ type, title, tagline, description }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)

  const bgClass =
    type === "indica"
      ? "bg-purple-900/90 backdrop-blur-lg"
      : "bg-gradient-to-br from-yellow-400/90 to-yellow-500/90 backdrop-blur-lg"

  const Icon = type === "indica" ? MoonIcon : SunIcon

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
            ${type === "indica" ? "rgba(147, 51, 234, 0.7)" : "rgba(234, 179, 8, 0.7)"} 0%, 
            transparent 70%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center mb-4">
          <Icon className={`w-6 h-6 ${type === "indica" ? "text-purple-300" : "text-yellow-200"}`} />
          <h2 className="text-3xl font-bold text-white ml-3 tracking-wider">{title}</h2>
        </div>

        <p className={`text-xl font-medium mb-4 ${type === "indica" ? "text-purple-200" : "text-yellow-100"}`}>
          {tagline}
        </p>

        <p className="text-white/90 text-lg mb-8 leading-relaxed">{description}</p>

        <Link
          href={`/${type}`}
          className={`
            inline-flex items-center px-6 py-3 rounded-full text-sm font-semibold
            transition-all duration-300 ease-out transform
            ${
              type === "indica"
                ? "bg-purple-700 text-white hover:bg-purple-600"
                : "bg-yellow-300 text-gray-900 hover:bg-yellow-200"
            }
            hover:scale-105 hover:shadow-lg
          `}
        >
          Learn More
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
            ${
              type === "indica"
                ? "rgba(147, 51, 234, 0.3), rgba(147, 51, 234, 0)"
                : "rgba(234, 179, 8, 0.3), rgba(234, 179, 8, 0)"
            }
          )`,
        }}
      />
    </motion.div>
  )
}

export default ProductCard

