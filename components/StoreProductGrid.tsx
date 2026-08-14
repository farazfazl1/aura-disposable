"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, SunMoon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { MoonIcon, SunIcon } from "@/components/Icons"
import type { StoreProduct, VapeType } from "@/lib/storeCatalog"

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

function getTypeIcon(type: VapeType) {
  if (type === "indica") return MoonIcon
  if (type === "hybrid") return SunMoon
  return SunIcon
}

export default function StoreProductGrid({ products }: { products: StoreProduct[] }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="grid gap-x-5 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => {
        const TypeIcon = getTypeIcon(product.type)
        const accent = PRODUCT_ACCENTS[product.slug] ?? { background: "#d5aa55", foreground: "#14120d" }

        return (
          <motion.article
            key={product.slug}
            layout
            initial={reducedMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, delay: reducedMotion ? 0 : index * 0.045 }}
            className="group flex min-h-full flex-col overflow-hidden rounded-[1.6rem] border border-[#dfe5df] bg-[#fffefa] text-[#17201b] shadow-[0_16px_44px_rgba(23,32,27,0.07)] transition duration-300 hover:-translate-y-1 hover:border-[#c7d0c9] hover:shadow-[0_24px_64px_rgba(23,32,27,0.13)]"
          >
            <Link href={`/store/${product.slug}`} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#d5aa55] focus-visible:ring-inset" aria-label={`View ${product.name} details`}>
              <div className="relative aspect-square overflow-hidden bg-black">
                <Image
                  src={`/images/listing/${product.slug}.webp`}
                  alt={`${product.name} Aura vape with ${product.flavor} flavor notes`}
                  fill
                  priority={index < 4}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.035]"
                />
                <span className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/35 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-focus-within:opacity-100">
                  <ArrowUpRight size={18} aria-hidden="true" />
                </span>
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
            </Link>

            <div
              className="flex min-h-[5.3rem] items-center justify-between gap-4 px-5 py-4"
              style={{ backgroundColor: accent.background, color: accent.foreground }}
            >
              <h2
                className="text-[1.4rem] font-black uppercase leading-[0.9] tracking-[-0.055em]"
                style={{ fontFamily: '"Archivo Black", "Arial Black", sans-serif' }}
              >
                {product.name}
              </h2>
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border"
                style={{ borderColor: `${accent.foreground}66` }}
                title={product.type}
              >
                <TypeIcon width={18} height={18} aria-hidden="true" />
                <span className="sr-only">{product.type}</span>
              </span>
            </div>

            <div className="flex flex-1 flex-col px-5 pb-5 pt-4">
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#9b6e21]">Flavor profile</p>
              <p className="mt-2 line-clamp-2 min-h-11 text-sm leading-6 text-[#657068]">{product.flavor}</p>

              <div className="mt-auto flex items-end justify-between gap-4 border-t border-[#dfe5df] pt-4">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#89938c]">{product.size}</p>
                  <p className="mt-1 text-xl font-bold text-[#17201b]">{product.price}</p>
                </div>
                <Link
                  href={`/store/${product.slug}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[#cfd8d1] px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#17201b] transition-colors hover:border-[#b88932] hover:bg-[#b88932] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88932] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffefa]"
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
