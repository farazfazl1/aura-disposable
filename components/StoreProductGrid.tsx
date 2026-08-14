"use client"

import Link from "next/link"
import { SunMoon } from "lucide-react"
import { MoonIcon, SunIcon } from "@/components/Icons"
import type { StoreProduct } from "@/lib/storeCatalog"

function typeStyles(product: StoreProduct) {
  const isIndica = product.type === "indica"
  const isHybrid = product.type === "hybrid"
  const cardBorder = isIndica
    ? "border-[#c9b4e8] bg-[#f3ecfb]"
    : isHybrid
      ? "border-[#a6d7c3] bg-[#e7f5ee]"
      : "border-[#e6c970] bg-[#fff7dc]"
  const typeIconClass = isIndica
    ? "text-[#6f42c1]"
    : isHybrid
      ? "text-[#087f5b]"
      : "text-[#a16207]"
  const ctaClass = isIndica
    ? "bg-[#6f42c1] text-white hover:bg-[#58309f]"
    : isHybrid
      ? "bg-[#087f5b] text-white hover:bg-[#065f46]"
      : "bg-[#a16207] text-white hover:bg-[#854d0e]"
  const TypeIcon = isIndica ? MoonIcon : isHybrid ? SunMoon : SunIcon
  return { cardBorder, typeIconClass, ctaClass, TypeIcon }
}

interface StoreProductGridProps {
  products: StoreProduct[]
}

export default function StoreProductGrid({ products }: StoreProductGridProps) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => {
        const { cardBorder, typeIconClass, ctaClass, TypeIcon } = typeStyles(product)
        return (
          <div
            key={product.slug}
            className={`flex flex-col gap-4 rounded-3xl border p-6 text-[#17201b] ${cardBorder}`}
          >
            <div className="flex items-center justify-center overflow-hidden rounded-2xl bg-white/70">
              <Link href={`/store/${product.slug}`} className="w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-cover"
                />
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TypeIcon className={typeIconClass} width={20} height={20} />
                <span className="text-sm uppercase tracking-[0.2em] text-[#657068]">
                  {product.type}
                </span>
              </div>
              <span className="text-lg font-semibold">{product.price}</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-[#657068]">
                {product.flavor} · {product.size}
              </p>
            </div>
            <p className="line-clamp-3 text-[#536057]">{product.description}</p>
            <div className="mt-auto flex flex-col gap-3">
              <Link
                href={`/store/${product.slug}`}
                className={`px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${ctaClass} text-center`}
              >
                View Details
              </Link>
            </div>
          </div>
        )
      })}
    </div>
  )
}
