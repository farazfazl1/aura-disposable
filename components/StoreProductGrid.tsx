"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, SunMoon, Zap } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { MoonIcon, SunIcon } from "@/components/Icons"
import type { StoreProduct } from "@/lib/storeCatalog"
import { PERMANENT_DISCOUNT_PERCENT } from "@/lib/pricing"

const PRODUCT_ACCENTS: Record<string, { background: string; foreground: string }> = {
  "sweet-island": { background: "#e8c84d", foreground: "#15150d" },
  "blue-dream": { background: "#345fd1", foreground: "#ffffff" },
  og: { background: "#70496f", foreground: "#ffffff" },
  "og-mint": { background: "#347a59", foreground: "#ffffff" },
  "persian-gold": { background: "#e9782d", foreground: "#171108" },
  blueberry: { background: "#31458f", foreground: "#ffffff" },
  jealousy: { background: "#c82f43", foreground: "#ffffff" },
  "laughing-buddha": { background: "#c89a37", foreground: "#151108" },
}

function getProductIcon(product: StoreProduct) {
  if (product.slug === "jealousy") return Zap
  if (product.type === "indica") return MoonIcon
  if (product.type === "hybrid") return SunMoon
  return SunIcon
}

export default function StoreProductGrid({ products }: { products: StoreProduct[] }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-10 xl:grid-cols-4">
      {products.map((product, index) => {
        const TypeIcon = getProductIcon(product)
        const accent = PRODUCT_ACCENTS[product.slug] ?? { background: "#17201b", foreground: "#ffffff" }

        return (
          <motion.article
            key={product.slug}
            layout
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.045 }}
            className="group flex min-h-full min-w-0 flex-col overflow-hidden rounded-[1.2rem] border border-[#dfe5df] bg-[#fffefa] text-[#17201b] shadow-[0_16px_44px_rgba(23,32,27,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#c7d0c9] hover:shadow-[0_24px_64px_rgba(23,32,27,0.13)] sm:rounded-[1.6rem]"
          >
            <Link href={`/store/${product.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-inset" aria-label={`View ${product.name} details`}>
              <div className="relative aspect-square overflow-hidden bg-black">
                <Image
                  src={`/images/listing/${product.slug}.webp`}
                  alt={`${product.name} Aura vape with ${product.flavor} flavor notes`}
                  fill
                  priority={index < 4}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <span className="absolute left-4 top-4 rounded-full bg-[#6f42c1] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white shadow-[0_6px_18px_rgba(0,0,0,0.28)]">
                  {PERMANENT_DISCOUNT_PERCENT}% off total
                </span>
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </Link>

            <div
              className="flex min-h-[4.5rem] items-center justify-between gap-2 px-3 py-3 sm:min-h-[5.3rem] sm:gap-4 sm:px-5 sm:py-4"
              style={{ backgroundColor: accent.background, color: accent.foreground }}
            >
              <h2
                className="min-w-0 text-base font-black uppercase leading-[0.9] tracking-[-0.045em] sm:text-[1.4rem] sm:tracking-[-0.055em]"
                style={{ fontFamily: '"Archivo Black", "Arial Black", sans-serif' }}
              >
                {product.name}
              </h2>
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border sm:h-10 sm:w-10"
                style={{ borderColor: `${accent.foreground}66` }}
                title={product.type}
              >
                <TypeIcon className="h-4 w-4 sm:h-[18px] sm:w-[18px]" width={18} height={18} aria-hidden="true" />
                <span className="sr-only">{product.type}</span>
              </span>
            </div>

            <div className="flex flex-1 flex-col px-3 pb-4 pt-3 sm:px-5 sm:pb-5 sm:pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#17201b]">Flavor profile</p>
              <p className="mt-2 line-clamp-2 min-h-11 text-sm leading-6 text-[#657068]">{product.flavor}</p>

              <div className="mt-auto flex flex-col gap-3 border-t border-[#dfe5df] pt-3 sm:flex-row sm:items-end sm:justify-between sm:gap-4 sm:pt-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#89938c]">{product.size}</p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <p className="text-lg font-bold text-[#17201b] sm:text-xl">{product.price}</p>
                    <span className="text-[10px] font-semibold uppercase tracking-[0.08em] text-[#89938c]">before order discount</span>
                  </div>
                </div>
                <Link
                  href={`/store/${product.slug}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[#cfd8d1] px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.08em] text-[#17201b] transition-colors hover:border-[#17201b] hover:bg-[#17201b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffefa] sm:w-auto sm:px-4 sm:py-2.5 sm:text-xs"
                >
                  View
                  <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
