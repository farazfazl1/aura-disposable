"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart/CartProvider"

type ProductPurchaseControlsProps = {
  slug: string
  name: string
  image: string
  price: string
  formats: string[]
}

function numericPrice(price: string) {
  const value = Number(price.replace(/[^0-9.]/g, ""))
  return Number.isFinite(value) ? value : 0
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

export default function ProductPurchaseControls({
  slug,
  name,
  image,
  price,
  formats,
}: ProductPurchaseControlsProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedFormat, setSelectedFormat] = useState(formats[0] ?? "Standard")
  const unitPrice = numericPrice(price)

  const decrease = () => setQuantity((current) => Math.max(1, current - 1))
  const increase = () => setQuantity((current) => Math.min(99, current + 1))

  const addToBasket = () => {
    addItem(
      {
        id: `${slug}:${selectedFormat.toLowerCase()}`,
        slug,
        name,
        image,
        format: selectedFormat,
        unitPrice,
      },
      quantity,
    )
  }

  return (
    <div className="mt-8 border-t border-white/20 pt-6">
      <fieldset>
        <legend className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">Choose size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {formats.map((format) => {
            const isSelected = selectedFormat === format

            return (
              <button
                key={format}
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelectedFormat(format)}
                className={`min-w-14 rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                  isSelected
                    ? "border-white bg-white text-[#17201b] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    : "border-white/35 bg-white/10 text-white hover:border-white/65 hover:bg-white/15"
                }`}
              >
                {format}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-3 sm:grid-cols-[auto_minmax(0,1fr)]">
        <div className="flex h-12 items-center justify-between rounded-full border border-white/35 bg-white/10 p-1 text-white backdrop-blur-sm sm:w-[148px]">
          <button
            type="button"
            onClick={decrease}
            disabled={quantity <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-full transition duration-150 hover:bg-white/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label={`Decrease ${name} quantity`}
          >
            <Minus size={17} aria-hidden="true" />
          </button>
          <output className="min-w-10 text-center text-base font-black" aria-live="polite" aria-label="Selected quantity">
            {quantity}
          </output>
          <button
            type="button"
            onClick={increase}
            disabled={quantity >= 99}
            className="flex h-10 w-10 items-center justify-center rounded-full transition duration-150 hover:bg-white/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label={`Increase ${name} quantity`}
          >
            <Plus size={17} aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={addToBasket}
          className="group inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#17201b] shadow-[0_12px_32px_rgba(22,25,23,0.14)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f1ea] hover:shadow-[0_16px_36px_rgba(22,25,23,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
        >
          <span className="inline-flex items-center gap-2">
            <ShoppingBag size={18} aria-hidden="true" />
            Add to basket
          </span>
          <span className="rounded-full bg-[#17201b] px-3 py-1.5 text-xs text-white">
            {currency.format(unitPrice * quantity)}
          </span>
        </button>
      </div>
    </div>
  )
}
