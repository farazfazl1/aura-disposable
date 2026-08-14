"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, SunMoon } from "lucide-react"
import { motion, useReducedMotion } from "framer-motion"
import { MoonIcon, SunIcon } from "@/components/Icons"
import type { StoreProduct, VapeType } from "@/lib/storeCatalog"

const PRODUCT_TYPE_STYLES: Record<
  VapeType,
  {
    stage: string
    chip: string
    text: string
    border: string
    button: string
  }
> = {
  indica: {
    stage: "bg-[#f4ecff]",
    chip: "border-[#c9b4e8] bg-[#fffefa] text-[#6f42c1]",
    text: "text-[#6f42c1]",
    border: "border-[#c9b4e8]",
    button: "bg-[#6f42c1] hover:bg-[#58309f]",
  },
  sativa: {
    stage: "bg-[#fff7dc]",
    chip: "border-[#e6c970] bg-[#fffefa] text-[#a16207]",
    text: "text-[#a16207]",
    border: "border-[#e6c970]",
    button: "bg-[#a16207] hover:bg-[#854d0e]",
  },
  hybrid: {
    stage: "bg-[#e7f5ee]",
    chip: "border-[#a6d7c3] bg-[#fffefa] text-[#087f5b]",
    text: "text-[#087f5b]",
    border: "border-[#a6d7c3]",
    button: "bg-[#087f5b] hover:bg-[#065f46]",
  },
}

function getTypeIcon(type: VapeType) {
  if (type === "indica") return MoonIcon
  if (type === "hybrid") return SunMoon
  return SunIcon
}

export default function StoreProductGrid({ products }: { products: StoreProduct[] }) {
  const reducedMotion = useReducedMotion()

  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {products.map((product, index) => {
        const styles = PRODUCT_TYPE_STYLES[product.type]
        const TypeIcon = getTypeIcon(product.type)

        return (
          <motion.article
            key={product.slug}
            layout
            initial={reducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, delay: reducedMotion ? 0 : index * 0.04 }}
            className="group flex min-h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#dfe5df] bg-[#fffefa] text-[#17201b] shadow-[0_14px_40px_rgba(23,32,27,0.05)] transition duration-300 hover:-translate-y-1 hover:border-[#c7d0c9] hover:shadow-[0_20px_50px_rgba(23,32,27,0.1)]"
          >
            <Link href={`/store/${product.slug}`} className="block" aria-label={`View ${product.name} details`}>
              <div className={`relative aspect-[4/3] overflow-hidden border-b border-[#dfe5df] ${styles.stage}`}>
                <span
                  className={`absolute left-4 top-4 z-10 rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${styles.chip}`}
                >
                  {product.type}
                </span>
                <Image
                  src={product.image}
                  alt={`${product.name} Aura vape`}
                  fill
                  priority={index === 0}
                  sizes="(min-width: 1280px) 25vw, (min-width: 640px) 50vw, 100vw"
                  className="object-contain p-5 transition-transform duration-500 ease-out group-hover:scale-105 sm:p-6"
                />
                <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#dfe5df] bg-[#fffefa]/90 text-[#17201b] opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </div>
            </Link>

            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-3">
                <div className={`flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] ${styles.text}`}>
                  <TypeIcon width={16} height={16} aria-hidden="true" />
                  {product.type}
                </div>
                <span className="text-lg font-semibold text-[#17201b]">{product.price}</span>
              </div>

              <h3 className="mt-4 font-serif text-3xl font-semibold leading-none tracking-[-0.03em]">{product.name}</h3>
              <p className={`mt-2 text-xs font-semibold uppercase tracking-[0.12em] ${styles.text}`}>{product.grade}</p>

              <div className="mt-5 grid grid-cols-1 gap-3 border-y border-[#dfe5df] py-4 text-sm sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#89938c]">Taste</p>
                  <p className="line-clamp-2 leading-5 text-[#536057]">{product.flavor}</p>
                </div>
                <div>
                  <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#89938c]">Effects</p>
                  <p className="line-clamp-2 leading-5 text-[#536057]">{product.effects}</p>
                </div>
              </div>

              <p className="mt-4 line-clamp-3 text-sm leading-6 text-[#657068]">{product.description}</p>

              <div className="mt-auto flex items-center justify-between gap-3 pt-6">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-[#89938c]">{product.size}</span>
                <Link
                  href={`/store/${product.slug}`}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2 ${styles.button}`}
                >
                  View details
                  <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </motion.article>
        )
      })}
    </div>
  )
}
