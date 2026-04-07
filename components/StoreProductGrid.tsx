"use client"

import Link from "next/link"
import { SunMoon } from "lucide-react"
import { MoonIcon, SunIcon } from "@/components/Icons"
import type { StoreProduct } from "@/lib/storeCatalog"

function typeStyles(product: StoreProduct) {
  const isIndica = product.type === "indica"
  const isHybrid = product.type === "hybrid"
  const cardBorder = isIndica
    ? "border-purple-800/60 bg-purple-900/20"
    : isHybrid
      ? "border-emerald-500/40 bg-emerald-500/10"
      : "border-yellow-400/40 bg-yellow-500/10"
  const typeIconClass = isIndica
    ? "text-purple-300"
    : isHybrid
      ? "text-emerald-300"
      : "text-yellow-300"
  const ctaClass = isIndica
    ? "bg-purple-700 text-white hover:bg-purple-600"
    : isHybrid
      ? "bg-emerald-500 text-black hover:bg-emerald-400"
      : "bg-yellow-400 text-black hover:bg-yellow-300"
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
            className={`rounded-3xl border ${cardBorder} p-6 flex flex-col gap-4 text-white`}
          >
            <div className="rounded-2xl bg-white/5 p-4 flex items-center justify-center">
              <Link href={`/store/${product.slug}`} className="w-full">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-48 w-full object-contain"
                />
              </Link>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TypeIcon className={typeIconClass} width={20} height={20} />
                <span className="text-sm uppercase tracking-[0.2em] text-gray-400">
                  {product.type}
                </span>
              </div>
              <span className="text-lg font-semibold">{product.price}</span>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-sm text-gray-400">
                {product.flavor} · {product.size}
              </p>
            </div>
            <p className="text-gray-300 line-clamp-3">{product.description}</p>
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
