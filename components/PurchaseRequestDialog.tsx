"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface PurchaseRequestDialogProps {
  productName: string
  buttonClass: string
}

const PurchaseRequestDialog = ({ productName, buttonClass }: PurchaseRequestDialogProps) => {
  const [deliveryArea, setDeliveryArea] = useState("orange-county")
  const isEligible = deliveryArea === "orange-county"

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors ${buttonClass} w-full sm:w-auto`}
        >
          Purchase Request
        </button>
      </DialogTrigger>
      <DialogContent className="w-[92vw] max-w-lg bg-black text-white border border-gray-800">
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
        </div>
        <form
          action={`mailto:auradisposable@gmail.com?subject=Purchase%20Request%20for%20${encodeURIComponent(
            productName
          )}`}
          method="post"
          encType="text/plain"
          className="grid gap-4"
        >
          <input type="hidden" name="product" value={productName} />
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
            <label className="text-sm text-gray-300" htmlFor="purchase-name">
              Name
            </label>
            <input
              id="purchase-name"
              name="name"
              required
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
              className="w-full rounded-xl border border-gray-700 bg-black/60 px-4 py-3 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-white/20"
              placeholder="Street, City, State, ZIP"
            />
          </div>
          <button
            type="submit"
            className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors ${buttonClass} w-full disabled:cursor-not-allowed disabled:opacity-60`}
            disabled={!isEligible}
          >
            Submit Request
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PurchaseRequestDialog
