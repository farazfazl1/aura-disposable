"use client"

import { useState, useCallback, memo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type React from "react"

interface Product {
  name: string
  tagline: string
  description: string
  effects: string[]
  flavors: string[]
  terpenes: string[]
  thcContent: string
  color: string
  textColor: string
  hoverColor: string
  sizes: string[]
}

interface ProductShowcaseProps {
  products: Product[]
  theme: "indica" | "sativa"
  initialProduct?: string
}

const ProductShowcase: React.FC<ProductShowcaseProps> = memo(({ products, theme, initialProduct }) => {
  const [currentProduct, setCurrentProduct] = useState(0)
  const [selectedTab, setSelectedTab] = useState<"effects" | "flavors" | "terpenes">("effects")

  useEffect(() => {
    if (initialProduct) {
      const index = products.findIndex((p) => p.name.toLowerCase() === initialProduct.toLowerCase())
      if (index !== -1) {
        setCurrentProduct(index)
      }
    }
  }, [initialProduct, products])

  const nextProduct = useCallback(() => setCurrentProduct((prev) => (prev + 1) % products.length), [products.length])
  const prevProduct = useCallback(
    () => setCurrentProduct((prev) => (prev - 1 + products.length) % products.length),
    [products.length],
  )

  const currentProductData = products[currentProduct]

  const getContrastColor = (hexColor: string) => {
    // Convert hex to RGB
    const r = Number.parseInt(hexColor.slice(1, 3), 16)
    const g = Number.parseInt(hexColor.slice(3, 5), 16)
    const b = Number.parseInt(hexColor.slice(5, 7), 16)

    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    // Return black for light colors, white for dark colors
    return luminance > 0.5 ? "#000000" : "#ffffff"
  }

  const contrastColor = getContrastColor(currentProductData.color)
  const isLightBackground = contrastColor === "#000000"

  return (
    <div
      className="rounded-3xl p-6 sm:p-8 backdrop-filter backdrop-blur-md shadow-2xl transition-colors duration-300"
      style={{
        backgroundColor: currentProductData.color,
        color: contrastColor,
        boxShadow: `0 4px 30px ${isLightBackground ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`,
        border: `1px solid ${isLightBackground ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentProduct}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {/* Product Header */}
          <div className="text-center">
            <h3 className="text-3xl sm:text-5xl font-bold mb-2 sm:mb-4">{currentProductData.name}</h3>
            <p className="text-xl sm:text-2xl italic opacity-90">{currentProductData.tagline}</p>
          </div>

          {/* Product Description */}
          <div
            className="rounded-xl p-4 sm:p-6"
            style={{
              backgroundColor: isLightBackground ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)",
              boxShadow: `0 2px 10px ${isLightBackground ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)"}`,
            }}
          >
            <p className="text-lg sm:text-xl leading-relaxed">{currentProductData.description}</p>
          </div>

          {/* Interactive Tabs */}
          <div className="space-y-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {["effects", "flavors", "terpenes"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab as "effects" | "flavors" | "terpenes")}
                  className={`
                    px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-lg font-medium transition-all duration-300
                    ${selectedTab === tab ? `bg-opacity-20 border shadow-lg` : `bg-opacity-10 hover:bg-opacity-15`}
                  `}
                  style={{
                    backgroundColor: contrastColor,
                    color: currentProductData.color,
                    borderColor: selectedTab === tab ? contrastColor : "transparent",
                    boxShadow:
                      selectedTab === tab
                        ? `0 0 15px ${isLightBackground ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`
                        : "none",
                  }}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <div
              className="min-h-[150px] rounded-xl p-4 sm:p-6"
              style={{
                backgroundColor: isLightBackground ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.1)",
                boxShadow: `0 2px 10px ${isLightBackground ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.05)"}`,
              }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTab}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-wrap gap-2 sm:gap-3"
                >
                  {currentProductData[selectedTab].map((item: string, index: number) => (
                    <motion.span
                      key={index}
                      className="px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-lg transition-all duration-300"
                      style={{
                        backgroundColor: `${contrastColor}20`,
                        color: contrastColor,
                        border: `1px solid ${contrastColor}40`,
                        boxShadow: `0 2px 8px ${isLightBackground ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)"}`,
                      }}
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: `${contrastColor}30`,
                        boxShadow: `0 4px 12px ${isLightBackground ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)"}`,
                      }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {item}
                    </motion.span>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Sizes */}
          <div className="text-center mt-4">
            <span className="text-lg sm:text-xl font-semibold mb-2 block">Available Sizes:</span>
            <div className="flex justify-center items-center gap-4">
              {currentProductData.sizes.map((size, index) => (
                <motion.div
                  key={index}
                  className="px-4 py-2 rounded-full transition-all duration-300"
                  style={{
                    backgroundColor: `${contrastColor}20`,
                    color: contrastColor,
                    border: `2px solid ${contrastColor}40`,
                  }}
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: `${contrastColor}30`,
                    boxShadow: `0 4px 12px ${isLightBackground ? "rgba(0, 0, 0, 0.15)" : "rgba(255, 255, 255, 0.15)"}`,
                  }}
                >
                  <span className="text-lg font-medium">{size}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* THC Content */}
          <div className="text-center">
            <span className="text-xl sm:text-2xl font-semibold">{currentProductData.thcContent}</span>
          </div>

          {/* Sizes */}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6 sm:mt-8">
        <motion.button
          onClick={prevProduct}
          className="p-3 sm:p-4 rounded-full transition-all duration-300"
          style={{
            backgroundColor: `${contrastColor}20`,
            color: contrastColor,
            border: `1px solid ${contrastColor}40`,
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: `${contrastColor}30`,
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronLeft size={24} />
        </motion.button>
        <motion.button
          onClick={nextProduct}
          className="p-3 sm:p-4 rounded-full transition-all duration-300"
          style={{
            backgroundColor: `${contrastColor}20`,
            color: contrastColor,
            border: `1px solid ${contrastColor}40`,
          }}
          whileHover={{
            scale: 1.1,
            backgroundColor: `${contrastColor}30`,
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronRight size={24} />
        </motion.button>
      </div>
    </div>
  )
})

ProductShowcase.displayName = "ProductShowcase"

export default ProductShowcase

