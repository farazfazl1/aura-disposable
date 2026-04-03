"use client"

import { Suspense } from "react"
import ProductVerification from "@/components/ProductVerification"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <Suspense fallback={<div className="flex justify-center py-12"><span className="text-white/60">Loading...</span></div>}>
          <ProductVerification />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
