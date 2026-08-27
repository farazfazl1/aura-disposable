"use client"

import { useState } from "react"
import Image from "next/image"
import { useProductColor } from "@/components/ProductColorProvider"

interface ProductGalleryProps {
  images: string[]
  productName: string
  accentColor: string
  softColor: string
}

export default function ProductGallery({
  images,
  productName,
  accentColor,
  softColor,
}: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const productColor = useProductColor()

  if (!images || images.length === 0) return null

  const selectedImage = productColor?.selectedColor?.image ?? images[selectedIndex]
  const selectedColorName = productColor?.selectedColor?.name

  return (
    <div className="aura-product-visual">
      <span
        aria-hidden="true"
        className="aura-product-glow"
        style={{ background: `radial-gradient(circle, ${softColor} 0%, transparent 70%)` }}
      />
      <div className="aura-product-image-frame">
        <Image
          key={selectedImage}
          src={selectedImage}
          alt={`${productName}${selectedColorName ? ` ${selectedColorName}` : ""} Aura vape`}
          fill
          priority
          sizes="(min-width: 1024px) 640px, 90vw"
          className="aura-product-image object-contain"
        />
      </div>

      {images.length > 1 ? (
        <div className="aura-product-thumbnails" aria-label={`${productName} gallery`}>
          {images.map((image, index) => {
            const isSelected = selectedIndex === index

            return (
              <button
                key={image}
                type="button"
                aria-label={`Show ${productName} image ${index + 1}`}
                aria-pressed={isSelected}
                onClick={() => setSelectedIndex(index)}
                className="aura-product-thumbnail"
                style={{
                  borderColor: isSelected ? accentColor : "rgba(255,255,255,0.45)",
                  backgroundColor: isSelected ? softColor : "rgba(255,255,255,0.58)",
                }}
              >
                <span className="relative block h-full w-full overflow-hidden rounded-full bg-white/80">
                  <Image
                    src={image}
                    alt=""
                    fill
                    sizes="54px"
                    className="object-contain p-1.5 mix-blend-multiply"
                  />
                </span>
              </button>
            )
          })}
        </div>
      ) : null}
    </div>
  )
}
