"use client"

import { ShoppingBag } from "lucide-react"
import { useCart } from "@/components/cart/CartProvider"

export default function BasketButton() {
  const { totalItems, setBasketOpen } = useCart()

  return (
    <button
      type="button"
      onClick={() => setBasketOpen(true)}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#cfd8d1] bg-[#fffefa] text-[#17201b] transition duration-200 hover:-translate-y-0.5 hover:border-[#a16207] hover:text-[#805b0b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a16207] focus-visible:ring-offset-2"
      aria-label={`Open basket${totalItems > 0 ? `, ${totalItems} items` : ""}`}
    >
      <ShoppingBag size={19} strokeWidth={1.9} aria-hidden="true" />
      {totalItems > 0 ? (
        <span
          className="absolute -right-1.5 -top-1.5 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-[#17201b] px-1 text-[10px] font-bold leading-none text-white"
          aria-hidden="true"
        >
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      ) : null}
    </button>
  )
}
