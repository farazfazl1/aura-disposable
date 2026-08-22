"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react"
import { useCart } from "@/components/cart/CartProvider"
import CheckoutForm from "@/components/cart/CheckoutForm"
import {
  MAX_ORDER_QUANTITY,
  PERMANENT_DISCOUNT_PERCENT,
  nextTierForQuantity,
} from "@/lib/pricing"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
})

export default function BasketDrawer() {
  const {
    items,
    totalItems,
    baseSubtotal,
    volumeSubtotal,
    volumeSavings,
    volumeDiscountPercent,
    permanentDiscount,
    total,
    tierUnitPrice,
    isBasketOpen,
    setBasketOpen,
    updateQuantity,
    removeItem,
    clearBasket,
  } = useCart()
  const [view, setView] = useState<"basket" | "checkout">("basket")

  return (
    <Sheet
      open={isBasketOpen}
      onOpenChange={(open) => {
        setBasketOpen(open)
        if (!open) setView("basket")
      }}
    >
      <SheetContent
        side="right"
        className="flex h-full w-full flex-col border-[#dfe5df] bg-[#f7f6f2] p-0 text-[#17201b] sm:max-w-md"
      >
        {view === "checkout" ? (
          <CheckoutForm
            onBack={() => setView("basket")}
            onComplete={() => {
              setView("basket")
              setBasketOpen(false)
            }}
          />
        ) : (
          <>
            <SheetHeader className="border-b border-[#dfe5df] px-6 pb-5 pt-7 text-left">
              <div className="flex items-end justify-between gap-4 pr-8">
                <div>
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a16207]">Aura store</p>
                  <SheetTitle className="text-3xl font-black uppercase tracking-[-0.04em] text-[#17201b]">
                    Your basket
                  </SheetTitle>
                </div>
                <span className="text-xs font-bold uppercase tracking-[0.14em] text-[#657068]">
                  {totalItems} {totalItems === 1 ? "item" : "items"}
                </span>
              </div>
              <SheetDescription className="sr-only">
                Review and update the products in your basket.
              </SheetDescription>
            </SheetHeader>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                <span className="flex h-16 w-16 items-center justify-center rounded-full border border-[#dfe5df] bg-[#fffefa] text-[#657068]">
                  <ShoppingBag size={26} strokeWidth={1.6} aria-hidden="true" />
                </span>
                <h3 className="mt-6 text-2xl font-black uppercase tracking-[-0.03em]">Your basket is empty</h3>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[#657068]">
                  Choose a product and add the quantity you want to start your order.
                </p>
                <SheetClose asChild>
                  <Link
                    href="/store"
                    className="mt-7 rounded-full bg-[#17201b] px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-[#33423a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2"
                  >
                    Explore products
                  </Link>
                </SheetClose>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto px-5 py-5">
                  <div className="space-y-3">
                    {items.map((item) => (
                      <article key={item.id} className="rounded-[1.25rem] border border-[#dfe5df] bg-[#fffefa] p-4 shadow-[0_10px_30px_rgba(23,32,27,0.04)]">
                        <div className="flex gap-4">
                          <div className="relative h-24 w-20 shrink-0 overflow-hidden rounded-2xl bg-[#eef1ea]">
                            <Image
                              src={item.image}
                              alt={`${item.name} Aura vape`}
                              fill
                              sizes="80px"
                              className="object-contain p-2"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <Link
                                  href={`/store/${item.slug}`}
                                  onClick={() => setBasketOpen(false)}
                                  className="font-bold text-[#17201b] transition-colors hover:text-[#6f42c1]"
                                >
                                  {item.name}
                                </Link>
                                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#657068]">
                                  {item.format}
                                </p>
                              </div>
                              <button
                                type="button"
                                onClick={() => removeItem(item.id)}
                                className="rounded-full p-2 text-[#89938c] transition-colors hover:bg-red-50 hover:text-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-300"
                                aria-label={`Remove ${item.name} ${item.format} from basket`}
                              >
                                <Trash2 size={16} aria-hidden="true" />
                              </button>
                            </div>

                            <div className="mt-4 flex items-center justify-between gap-3">
                              <div className="inline-flex h-9 items-center rounded-full border border-[#cfd8d1] bg-[#f7f6f2]">
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  disabled={item.quantity <= 1}
                                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#46554c] transition-colors hover:bg-[#eef1ea] disabled:cursor-not-allowed disabled:opacity-35"
                                  aria-label={`Decrease ${item.name} quantity`}
                                >
                                  <Minus size={14} aria-hidden="true" />
                                </button>
                                <output className="min-w-8 text-center text-sm font-bold" aria-live="polite">
                                  {item.quantity}
                                </output>
                                <button
                                  type="button"
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  disabled={item.quantity >= MAX_ORDER_QUANTITY}
                                  className="flex h-9 w-9 items-center justify-center rounded-full text-[#46554c] transition-colors hover:bg-[#eef1ea] disabled:cursor-not-allowed disabled:opacity-35"
                                  aria-label={`Increase ${item.name} quantity`}
                                >
                                  <Plus size={14} aria-hidden="true" />
                                </button>
                              </div>
                              <div className="text-right">
                                <p className="font-bold text-[#17201b]">{currency.format(tierUnitPrice * item.quantity)}</p>
                                {volumeDiscountPercent > 0 && (
                                  <p className="mt-0.5 text-[11px] font-semibold text-[#087f5b]">
                                    {currency.format(tierUnitPrice)} each
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>

                <div className="border-t border-[#dfe5df] bg-[#fffefa] px-6 py-5">
                  {volumeSavings > 0 && (
                    <div className="mb-3 flex items-center justify-between gap-3 rounded-xl border border-[#b9ddce] bg-[#e1f5ec] px-4 py-3">
                      <div>
                        <p className="text-sm font-black uppercase tracking-[0.06em] text-[#087f5b]">
                          {volumeDiscountPercent}% off bulk price
                        </p>
                        <p className="mt-0.5 text-xs text-[#087f5b]/80">You&apos;re saving {currency.format(volumeSavings)}</p>
                      </div>
                      <span className="text-xl font-black text-[#087f5b]">
                        {currency.format(tierUnitPrice)} <span className="text-xs font-bold">each</span>
                      </span>
                    </div>
                  )}

                  {(() => {
                    const next = nextTierForQuantity(totalItems)
                    if (!next) return null
                    const toAdd = next.minQty - totalItems
                    return (
                      <p className="mb-3 text-xs text-[#657068]">
                        Add <span className="font-bold text-[#17201b]">{toAdd} more</span> to unlock{" "}
                        {currency.format(next.unitPrice)} each
                      </p>
                    )
                  })()}

                  <div className="space-y-2 border-t border-[#eef0ea] pt-4 text-sm">
                    <div className="flex items-center justify-between gap-4 text-[#657068]">
                      <span>Volume subtotal</span>
                      <span className="font-semibold text-[#17201b]">{currency.format(volumeSubtotal)}</span>
                    </div>
                    <div className="flex items-center justify-between gap-4 text-[#087f5b]">
                      <span>Permanent {PERMANENT_DISCOUNT_PERCENT}% discount</span>
                      <span className="font-bold">−{currency.format(permanentDiscount)}</span>
                    </div>
                    <div className="flex items-end justify-between gap-4 border-t border-[#eef0ea] pt-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#657068]">Total</p>
                        <p className="mt-1 text-xs text-[#89938c]">Shipping and taxes calculated at checkout</p>
                      </div>
                      <div className="text-right">
                        {baseSubtotal > total && <p className="text-xs text-[#89938c] line-through">{currency.format(baseSubtotal)}</p>}
                        <p className="text-2xl font-black text-[#17201b]">{currency.format(total)}</p>
                      </div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setView("checkout")}
                    className="mt-5 w-full rounded-full bg-[#17201b] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#33423a] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2"
                  >
                    Checkout · {currency.format(total)}
                  </button>
                  <p className="mt-2 text-center text-[11px] leading-5 text-[#657068]">
                    Pay the courier at the door — no online payment required.
                  </p>
                  <button
                    type="button"
                    onClick={clearBasket}
                    className="mt-3 w-full py-2 text-xs font-semibold text-[#657068] underline decoration-[#bcc8be] underline-offset-4 transition-colors hover:text-red-700"
                  >
                    Clear basket
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </SheetContent>
    </Sheet>
  )
}
