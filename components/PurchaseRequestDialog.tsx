"use client"

import { useState } from "react"
import { createClient } from "@supabase/supabase-js"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

interface PurchaseRequestDialogProps {
  productName: string
  buttonClass: string
  /** Use full-width trigger (e.g. product cards in a grid). */
  fullWidth?: boolean
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

const PurchaseRequestDialog = ({ productName, buttonClass, fullWidth }: PurchaseRequestDialogProps) => {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [deliveryArea, setDeliveryArea] = useState("orange-county")
  const isEligible = deliveryArea === "orange-county"
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")
  const [quantity, setQuantity] = useState(5)
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [honeypot, setHoneypot] = useState("")
  const phonePattern = "^\\+?1?\\s?\\(?[2-9]\\d{2}\\)?[\\s.-]?\\d{3}[\\s.-]?\\d{4}$"
  const emailPattern = "^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$"
  const minIntervalMs = 60000

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!isEligible) {
      return
    }
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }
    if (honeypot.trim()) {
      setError("Unable to submit the request.")
      return
    }
    const now = Date.now()
    const last = typeof window !== "undefined" ? window.localStorage.getItem("purchaseRequestLastSubmitted") : null
    if (last && now - Number(last) < minIntervalMs) {
      setError("Please wait a moment before submitting again.")
      return
    }
    const emailValue = email.trim()
    const phoneValue = phone.trim()
    const emailRegex = new RegExp(emailPattern)
    const phoneRegex = new RegExp(phonePattern)
    if (!emailRegex.test(emailValue)) {
      setError("Enter a valid email address.")
      return
    }
    if (!phoneRegex.test(phoneValue)) {
      setError("Enter a valid US phone number.")
      return
    }
    if (quantity < 5) {
      setError("Minimum order is 5 units.")
      return
    }
    setIsSubmitting(true)
    const { error: insertError } = await supabase.from("purchase_requests").insert({
      product_name: productName,
      delivery_area: deliveryArea,
      name: name.trim(),
      email: emailValue,
      phone: phoneValue,
      address: address.trim(),
      quantity: quantity,
      status: "pending",
      delivery_note: "",
    })
    if (insertError) {
      setError(insertError.message || "Unable to submit the request right now.")
      setIsSubmitting(false)
      return
    }
    window.localStorage.setItem("purchaseRequestLastSubmitted", String(now))
    setError("")
    setName("")
    setEmail("")
    setPhone("")
    setAddress("")
    setQuantity(5)
    setHoneypot("")
    setIsSubmitting(false)
    setOpen(false)
    toast({
      title: "Request Received",
      description: "Aura will contact you shortly.",
      variant: "success",
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors ${buttonClass} ${fullWidth ? "w-full" : "w-full sm:w-auto"}`}
        >
          Purchase Request
        </button>
      </DialogTrigger>
      <DialogContent className="w-[92vw] max-w-lg bg-black text-white border border-gray-800 max-h-[90vh] overflow-y-auto">
        <DialogHeader className="text-left">
          <DialogTitle className="text-2xl font-semibold">Purchase Request</DialogTitle>
        </DialogHeader>
        <div className="grid gap-2 text-gray-300">
          <p>Share your details and our team will contact you to finalize the order.</p>
          <ul className="list-disc pl-5 text-sm text-gray-400">
            <li>Requests are limited to Orange County, CA.</li>
            <li>Delivery is free within 15 miles of Orange County.</li>
            <li>Payment is not online and must be paid to the courier at the door.</li>
            <li>The courier will text when arriving for pickup.</li>
          </ul>
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 mt-2">
            <p className="text-yellow-200 text-sm font-semibold mb-1">Minimum Order: 5 Units ($200)</p>
            <p className="text-yellow-200/80 text-xs">Each additional unit is $35.</p>
          </div>
        </div>
        <form className="grid gap-4" onSubmit={handleSubmit}>
          <div className="hidden">
            <label className="text-sm text-gray-300" htmlFor="purchase-website">
              Website
            </label>
            <input
              id="purchase-website"
              name="website"
              value={honeypot}
              onChange={(event) => setHoneypot(event.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-white"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-300" htmlFor="purchase-area">
              Delivery area
            </label>
            <select
              id="purchase-area"
              name="deliveryArea"
              value={deliveryArea}
              onChange={(event) => setDeliveryArea(event.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <option value="orange-county">Orange County, CA</option>
              <option value="other">Outside Orange County</option>
            </select>
            {!isEligible && (
              <p className="text-sm text-orange-200">We can only fulfill orders within Orange County.</p>
            )}
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-300" htmlFor="purchase-quantity">
              Quantity
            </label>
            <div className="flex items-center gap-4">
              <input
                id="purchase-quantity"
                name="quantity"
                type="number"
                min={5}
                required
                value={quantity}
                onChange={(event) => {
                  const val = Number(event.target.value)
                  setQuantity(val)
                }}
                className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              />
              <div className="whitespace-nowrap text-sm text-gray-400 font-mono bg-white/5 px-4 py-3 rounded-xl border border-white/10">
                Total: ${quantity >= 5 ? 200 + (quantity - 5) * 35 : 0}
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-300" htmlFor="purchase-name">
              Name
            </label>
            <input
              id="purchase-name"
              name="name"
              required
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Your full name"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-300" htmlFor="purchase-email">
              Email
            </label>
            <input
              id="purchase-email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              pattern={emailPattern}
              className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="you@email.com"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-300" htmlFor="purchase-phone">
              Phone
            </label>
            <input
              id="purchase-phone"
              name="phone"
              type="tel"
              required
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              pattern={phonePattern}
              inputMode="tel"
              className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="+1 555 123 4567"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm text-gray-300" htmlFor="purchase-address">
              Address
            </label>
            <input
              id="purchase-address"
              name="address"
              required
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Street, City, State, ZIP"
            />
          </div>
          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}
          <button
            type="submit"
            className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors ${buttonClass} w-full disabled:cursor-not-allowed disabled:opacity-60`}
            disabled={!isEligible || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Request"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PurchaseRequestDialog
