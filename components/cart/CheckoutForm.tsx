"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { ArrowLeft, Loader2 } from "lucide-react"
import { useCart } from "@/components/cart/CartProvider"
import { useToast } from "@/hooks/use-toast"
import { COMPARE_AT_PRICE } from "@/lib/pricing"

type CheckoutFormProps = {
  onBack: () => void
  onComplete: () => void
}

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
})

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

const emailPattern = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
const phonePattern = "^\\+?1?\\s?\\(?[2-9]\\d{2}\\)?[\\s.\\-]?\\d{3}[\\s.\\-]?\\d{4}$"
const minIntervalMs = 60000

const inputClass =
  "w-full rounded-xl border border-[#cbd6cd] bg-[#f7f6f2] px-4 py-3 text-[#17201b] placeholder:text-[#98a39b] focus:outline-none focus:ring-2 focus:ring-[#6f42c1]/20"

export default function CheckoutForm({ onBack, onComplete }: CheckoutFormProps) {
  const { items, subtotal, baseSubtotal, discountedUnitPrice, totalItems, clearBasket } = useCart()
  const { toast } = useToast()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [deliveryArea, setDeliveryArea] = useState("orange-county")
  const [honeypot, setHoneypot] = useState("")
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const isEligible = deliveryArea === "orange-county"
  const compareAtSubtotal = totalItems * COMPARE_AT_PRICE
  const totalSavings = compareAtSubtotal - subtotal
  const totalDiscountPercent = compareAtSubtotal > 0 ? Math.round((totalSavings / compareAtSubtotal) * 100) : 0

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isEligible) {
      setError("We can only fulfill orders within Orange County.")
      return
    }
    if (items.length === 0) {
      setError("Your basket is empty.")
      return
    }
    if (!supabase) {
      setError("Checkout is not configured yet. Please contact Aura to place your order.")
      return
    }
    if (honeypot.trim()) {
      setError("Unable to place the order.")
      return
    }
    const now = Date.now()
    const last =
      typeof window !== "undefined" ? window.localStorage.getItem("basketOrderLastSubmitted") : null
    if (last && now - Number(last) < minIntervalMs) {
      setError("Please wait a moment before placing another order.")
      return
    }
    const emailValue = email.trim()
    const phoneValue = phone.trim()
    if (!new RegExp(emailPattern).test(emailValue)) {
      setError("Enter a valid email address.")
      return
    }
    if (!new RegExp(phonePattern).test(phoneValue)) {
      setError("Enter a valid US phone number.")
      return
    }

    setIsSubmitting(true)
    setError("")

    const lineItems = items.map((item) => ({
      slug: item.slug,
      name: item.name,
      format: item.format,
      quantity: item.quantity,
      unitPrice: discountedUnitPrice,
      lineTotal: discountedUnitPrice * item.quantity,
    }))
    const productName = lineItems.map((line) => `${line.quantity}× ${line.name} ${line.format}`).join(", ")

    const { error: insertError } = await supabase.from("purchase_requests").insert({
      product_name: productName,
      delivery_area: deliveryArea,
      name: name.trim(),
      email: emailValue,
      phone: phoneValue,
      address: address.trim(),
      quantity: totalItems,
      status: "pending",
      delivery_note: JSON.stringify({ kind: "basket_order", subtotal, items: lineItems }),
    })

    if (insertError) {
      setError(insertError.message || "Unable to place the order right now.")
      setIsSubmitting(false)
      return
    }

    window.localStorage.setItem("basketOrderLastSubmitted", String(now))
    clearBasket()
    setIsSubmitting(false)
    onComplete()
    toast({
      title: "Order received",
      description: "Aura will contact you shortly to confirm delivery.",
    })
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-[#dfe5df] px-6 pb-5 pt-7">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full p-2 text-[#46554c] transition-colors hover:bg-[#eef1ea] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6f42c1]/40"
          aria-label="Back to basket"
        >
          <ArrowLeft size={18} aria-hidden="true" />
        </button>
        <div>
          <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#a16207]">Aura store</p>
          <h2 className="text-2xl font-black uppercase tracking-[-0.04em] text-[#17201b]">Checkout</h2>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
        <div className="flex-1 overflow-y-auto px-6 py-5">
          <div className="mb-4 rounded-2xl border border-[#c9b4e8] bg-[#17201b] p-4 text-white shadow-[0_14px_40px_rgba(23,32,27,0.18)]">
            <div className="flex items-center justify-between gap-3">
              <span className="rounded-full bg-gradient-to-r from-[#6f42c1] via-[#a16207] to-[#087f5b] px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em]">
                30% off
              </span>
              <span className="text-xs font-semibold text-white/60">bulk pricing applied</span>
            </div>
            <div className="mt-3 flex items-end justify-between gap-3">
              <div>
                <p className="text-xs text-white/55">You save</p>
                <p className="text-3xl font-black tracking-[-0.03em] text-[#7fd6b8]">{currency.format(totalSavings)}</p>
                <p className="mt-1 text-xs text-white/55">{totalDiscountPercent}% off total</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-white/45 line-through">{currency.format(compareAtSubtotal)}</p>
                <p className="text-2xl font-black">{currency.format(subtotal)}</p>
              </div>
            </div>
          </div>

          <div className="mb-4 rounded-2xl border border-[#dfe5df] bg-[#fffefa] p-4">
            <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-[#657068]">Order summary</p>
            <ul className="space-y-1.5 text-sm">
              {items.map((item) => (
                <li key={item.id} className="flex justify-between gap-3 text-[#46554c]">
                  <span className="min-w-0 truncate">
                    {item.quantity}× {item.name} <span className="text-[#89938c]">({item.format})</span>
                  </span>
                  <span className="shrink-0 font-semibold text-[#17201b]">
                    {currency.format(discountedUnitPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t border-[#eef0ea] pt-3 text-sm font-bold text-[#17201b]">
              <span>Subtotal</span>
              <span className="text-right">
                {baseSubtotal > subtotal && (
                  <span className="mr-2 text-xs font-semibold text-[#89938c] line-through">{currency.format(baseSubtotal)}</span>
                )}
                {currency.format(subtotal)}
              </span>
            </div>
          </div>

          <p className="mb-4 rounded-xl border border-[#e6c970] bg-[#fff7dc] p-3 text-xs leading-5 text-[#805b0b]">
            Payment is not collected online — you&apos;ll pay the courier at the door. We currently deliver within Orange
            County, CA.
          </p>

          <div className="hidden">
            <label htmlFor="basket-website">Website</label>
            <input
              id="basket-website"
              name="website"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <div className="grid gap-4">
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[#536057]" htmlFor="checkout-name">
                Name
              </label>
              <input
                id="checkout-name"
                name="name"
                required
                value={name}
                onChange={(event) => setName(event.target.value)}
                className={inputClass}
                placeholder="Your full name"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[#536057]" htmlFor="checkout-email">
                Email
              </label>
              <input
                id="checkout-email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                pattern={emailPattern}
                className={inputClass}
                placeholder="you@email.com"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[#536057]" htmlFor="checkout-phone">
                Phone
              </label>
              <input
                id="checkout-phone"
                name="phone"
                type="tel"
                required
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                pattern={phonePattern}
                inputMode="tel"
                className={inputClass}
                placeholder="+1 555 123 4567"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[#536057]" htmlFor="checkout-address">
                Delivery address
              </label>
              <input
                id="checkout-address"
                name="address"
                required
                value={address}
                onChange={(event) => setAddress(event.target.value)}
                className={inputClass}
                placeholder="Street, City, State, ZIP"
              />
            </div>
            <div className="grid gap-1.5">
              <label className="text-sm font-medium text-[#536057]" htmlFor="checkout-area">
                Delivery area
              </label>
              <select
                id="checkout-area"
                name="deliveryArea"
                value={deliveryArea}
                onChange={(event) => setDeliveryArea(event.target.value)}
                className={inputClass}
              >
                <option value="orange-county">Orange County, CA</option>
                <option value="other">Outside Orange County</option>
              </select>
              {!isEligible && (
                <p className="text-sm text-orange-700">We can only fulfill orders within Orange County.</p>
              )}
            </div>
          </div>

          {error && (
            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              {error}
            </div>
          )}
        </div>

        <div className="border-t border-[#dfe5df] bg-[#fffefa] px-6 py-5">
          <button
            type="submit"
            disabled={isSubmitting || !isEligible}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#17201b] px-6 py-3.5 text-sm font-bold text-white transition-colors hover:bg-[#33423a] disabled:cursor-not-allowed disabled:opacity-55"
          >
            {isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" aria-hidden="true" />
                Placing order…
              </>
            ) : (
              <>Place order · {currency.format(subtotal)}</>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
