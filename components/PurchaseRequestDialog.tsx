"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

interface PurchaseRequestDialogProps {
  productName: string
  buttonClass: string
}

const PurchaseRequestDialog = ({ productName, buttonClass }: PurchaseRequestDialogProps) => {
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
        <p className="text-gray-300">
          Share your details and our team will contact you to finalize the order.
        </p>
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
          <button
            type="submit"
            className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors ${buttonClass} w-full`}
          >
            Submit Request
          </button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

export default PurchaseRequestDialog
