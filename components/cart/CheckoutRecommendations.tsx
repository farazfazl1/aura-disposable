"use client"

import Image from "next/image"
import { Plus, Sparkles } from "lucide-react"
import { useCart } from "@/components/cart/CartProvider"
import { useToast } from "@/hooks/use-toast"
import { BASE_UNIT_PRICE } from "@/lib/pricing"
import {
  getCheckoutRecommendations,
  isStoreFormatAvailable,
  STORE_FORMATS,
  type VapeType,
} from "@/lib/storeCatalog"

const typeStyles: Record<VapeType, string> = {
  sativa: "border-[#d9bd54] bg-[#fff7d6] text-[#77570b]",
  indica: "border-[#c9b4e8] bg-[#f2ebff] text-[#5c349c]",
  hybrid: "border-[#abd6c4] bg-[#e7f7ef] text-[#087356]",
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export default function CheckoutRecommendations() {
  const { items, addItem } = useCart()
  const { toast } = useToast()
  const recommendations = getCheckoutRecommendations(
    items.map((item) => item.slug),
    2,
  )

  if (recommendations.length === 0) return null

  return (
    <section
      aria-labelledby="checkout-recommendations-title"
      className="mb-4 overflow-hidden rounded-2xl border border-[#d7ddd6] bg-[#eef1ea]"
    >
      <div className="flex items-start gap-3 border-b border-[#d7ddd6] px-4 py-3.5">
        <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#17201b] text-white">
          <Sparkles size={15} aria-hidden="true" />
        </span>
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#6f42c1]">
            Paired for your basket
          </p>
          <h3
            id="checkout-recommendations-title"
            className="mt-0.5 text-lg font-black tracking-[-0.025em] text-[#17201b]"
          >
            Add a matching flavor
          </h3>
          <p className="mt-1 text-xs leading-5 text-[#657068]">
            Based on the profiles you already selected.
          </p>
        </div>
      </div>

      <div className="grid gap-px bg-[#d7ddd6]">
        {recommendations.map(({ product, reason }) => {
          const format = STORE_FORMATS.find((option) =>
            isStoreFormatAvailable(product.slug, option),
          )
          if (!format) return null

          return (
            <article
              key={product.slug}
              className="group grid grid-cols-[4.5rem_minmax(0,1fr)_auto] items-center gap-3 bg-[#fffefa] p-3"
            >
              <div className="relative h-[4.5rem] overflow-hidden rounded-xl bg-black">
                <Image
                  src={`/images/listing/${product.slug}.webp`}
                  alt={`${product.name} Aura vape`}
                  fill
                  sizes="72px"
                  className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none motion-reduce:transition-none"
                />
              </div>

              <div className="min-w-0">
                <span
                  className={`inline-flex rounded-full border px-2 py-0.5 text-[9px] font-black uppercase tracking-[0.1em] ${typeStyles[product.type]}`}
                >
                  {product.type}
                </span>
                <h4 className="mt-1 truncate text-sm font-black text-[#17201b]">{product.name}</h4>
                <p className="mt-0.5 truncate text-[11px] text-[#657068]">{reason}</p>
                <p className="mt-1 text-[11px] font-bold text-[#17201b]">
                  {format} · {currency.format(BASE_UNIT_PRICE)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  addItem(
                    {
                      id: `${product.slug}:${format}`,
                      slug: product.slug,
                      name: product.name,
                      image: product.image,
                      format,
                      unitPrice: BASE_UNIT_PRICE,
                    },
                    1,
                  )
                  toast({
                    title: `${product.name} added`,
                    description: `${format} was added to your basket.`,
                  })
                }}
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#c7d0c9] bg-white text-[#17201b] shadow-sm transition duration-200 hover:border-[#17201b] hover:bg-[#17201b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#fffefa]"
                aria-label={`Add one ${product.name} ${format} to basket`}
              >
                <Plus size={17} aria-hidden="true" />
              </button>
            </article>
          )
        })}
      </div>
    </section>
  )
}
