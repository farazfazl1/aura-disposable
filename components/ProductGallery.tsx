"use client"

import { useState } from "react"

interface ProductGalleryProps {
  images: string[]
  productName: string
  accentBorder: string
  accentBg: string
}

export default function ProductGallery({
  images,
  productName,
  accentBorder,
  accentBg,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  if (!images || images.length === 0) return null

  return (
    <div className="flex flex-col gap-4">
      {/* Main Image */}
      <div className={`rounded-3xl border ${accentBorder} ${accentBg} overflow-hidden flex justify-center items-center h-80 lg:h-[420px]`}>
        <img
          src={images[selectedIndex]}
          alt={`${productName} - Image ${selectedIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedIndex(index)}
              className={`flex-shrink-0 w-24 h-24 rounded-2xl border-2 transition-all duration-300 p-2 ${
                accentBg
              } ${
                selectedIndex === index
                  ? accentBorder
                  : "border-transparent opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="w-full h-full object-contain rounded-xl"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
