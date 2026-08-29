"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart/CartProvider"
import { useProductColor } from "@/components/ProductColorProvider"
import {
  calculateOrderPricing,
  MAX_ORDER_QUANTITY,
  MINIMUM_ORDER_TOTAL,
  PERMANENT_DISCOUNT_PERCENT,
  unitPriceForQuantity,
} from "@/lib/pricing"
import { isStoreFormatAvailable } from "@/lib/storeCatalog"

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
  maximumFractionDigits: 2,
})

export default function ProductPurchaseControls({
  slug,
  name,
  image,
  price,
  formats,
}: ProductPurchaseControlsProps) {
  const { addItem } = useCart()
  const productColor = useProductColor()
  const [quantity, setQuantity] = useState(1)
  const firstAvailableFormat = formats.find((format) => isStoreFormatAvailable(slug, format)) ?? ""
  const [selectedFormat, setSelectedFormat] = useState(firstAvailableFormat)
  const activeFormat = isStoreFormatAvailable(slug, selectedFormat) ? selectedFormat : firstAvailableFormat
  const unitPrice = numericPrice(price)
  const orderPricing = calculateOrderPricing(quantity)
  const tierPrice = orderPricing.unitPrice
  const bulkSavings = (unitPrice - orderPricing.unitPrice) * quantity

  const decrease = () => setQuantity((current) => Math.max(1, current - 1))
  const increase = () => setQuantity((current) => Math.min(MAX_ORDER_QUANTITY, current + 1))

  const addToBasket = () => {
    if (!activeFormat) return

    addItem(
      {
        id: [slug, activeFormat.toLowerCase(), productColor?.selectedColor?.id].filter(Boolean).join(":"),
        slug,
        name,
        image: productColor?.selectedColor?.image ?? image,
        format: activeFormat,
        color: productColor?.selectedColor?.name,
        unitPrice,
      },
      quantity,
    )
  }

  return (
    <div className="mt-8 border-t border-white/20 pt-6">
      <div className="mb-5 flex flex-wrap items-center gap-x-4 gap-y-2">
        <span className="rounded-full bg-white px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-[#17201b]">
          {PERMANENT_DISCOUNT_PERCENT}% off order total
        </span>
        <p className="text-sm font-semibold text-white">
          {price} <span className="font-normal uppercase tracking-[0.08em] text-white/65">DISCOUNT APPLIED AT CHECKOUT</span>
        </p>
      </div>
      <fieldset>
        <legend className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">Choose size</legend>
        <div className="mt-3 flex flex-wrap gap-2">
          {formats.map((format) => {
            const isAvailable = isStoreFormatAvailable(slug, format)
            const isSelected = isAvailable && activeFormat === format

            return (
              <button
                key={format}
                type="button"
                aria-pressed={isSelected}
                aria-label={isAvailable ? `${format} size` : `${format} size unavailable`}
                disabled={!isAvailable}
                onClick={() => setSelectedFormat(format)}
                className={`min-w-[5.75rem] rounded-full border px-4 py-2.5 text-xs font-bold uppercase tracking-[0.08em] transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                  !isAvailable
                    ? "cursor-not-allowed border-white/15 bg-white/[0.04] text-white/35 line-through"
                    : isSelected
                    ? "border-white bg-white text-[#17201b] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                    : "border-white/35 bg-white/10 text-white hover:border-white/65 hover:bg-white/15"
                }`}
              >
                {format}
              </button>
            )
          })}
        </div>
        <p className="mt-2 text-[11px] font-medium text-white/55">
          Unavailable sizes remain visible for reference.
        </p>
      </fieldset>

      {productColor && productColor.colors.length > 1 ? (
        <fieldset className="mt-5">
          <legend className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/65">Choose color</legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {productColor.colors.map((color) => {
              const isSelected = productColor.selectedColor?.id === color.id

              return (
                <button
                  key={color.id}
                  type="button"
                  aria-pressed={isSelected}
                  aria-label={`${color.name} color`}
                  onClick={() => productColor.selectColor(color.id)}
                  className={`inline-flex min-h-11 items-center gap-2.5 rounded-full border px-3.5 py-2 text-xs font-bold transition duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent ${
                    isSelected
                      ? "border-white bg-white text-[#17201b] shadow-[0_8px_24px_rgba(0,0,0,0.12)]"
                      : "border-white/35 bg-white/10 text-white hover:border-white/65 hover:bg-white/15"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-6 w-6 rounded-full border border-black/20 shadow-[inset_0_0_0_2px_rgba(255,255,255,0.22)]"
                    style={{ backgroundColor: color.swatch }}
                  />
                  {color.name}
                </button>
              )
            })}
          </div>
        </fieldset>
      ) : null}

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
            disabled={quantity >= MAX_ORDER_QUANTITY}
            className="flex h-10 w-10 items-center justify-center rounded-full transition duration-150 hover:bg-white/15 active:scale-95 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label={`Increase ${name} quantity`}
          >
            <Plus size={17} aria-hidden="true" />
          </button>
        </div>

        <button
          type="button"
          onClick={addToBasket}
          disabled={!activeFormat}
          className="group inline-flex min-h-12 w-full items-center justify-between gap-4 rounded-full bg-white px-5 py-3 text-sm font-bold text-[#17201b] shadow-[0_12px_32px_rgba(22,25,23,0.14)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#f4f1ea] hover:shadow-[0_16px_36px_rgba(22,25,23,0.2)] active:translate-y-0 active:scale-[0.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-white"
        >
          <span className="inline-flex items-center gap-2">
            <ShoppingBag size={18} aria-hidden="true" />
            {activeFormat ? "Add to basket" : "Currently unavailable"}
          </span>
          <span className="rounded-full bg-[#17201b] px-3 py-1.5 text-xs text-white">
            {currency.format(orderPricing.total)}
          </span>
        </button>
      </div>

      <p className="mt-4 text-xs leading-5 text-white/70">
        <span className="font-bold text-white">
          {quantity.toLocaleString("en-US")} {quantity === 1 ? "vape" : "vapes"} at {currency.format(tierPrice)} each
        </span>{" "}
        = {currency.format(orderPricing.volumeSubtotal)}, then {PERMANENT_DISCOUNT_PERCENT}% off total
        (−{currency.format(orderPricing.permanentDiscount)}) ={" "}
        <span className="font-bold text-white">{currency.format(orderPricing.total)}</span>.
        {quantity < 5 && (
          <>
            {" "}Bulk pricing starts at 5+ ({currency.format(unitPriceForQuantity(5))} each) and reaches{" "}
            {currency.format(unitPriceForQuantity(1000))} each at 1,000+.
          </>
        )}
        {quantity >= 5 && bulkSavings > 0 && (
          <> Quantity pricing saves another {currency.format(bulkSavings)} before the permanent discount.</>
        )}
      </p>
      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.1em] text-white/55">
        Minimum order {currency.format(MINIMUM_ORDER_TOTAL)} after discounts
      </p>
    </div>
  )
}
