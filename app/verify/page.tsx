"use client"

import { Suspense } from "react"
import ProductVerification from "@/components/ProductVerification"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function VerifyPage() {
  return (
    <main className="aura-page min-h-screen">
      <Header />
      <div className="pt-20">
          <Suspense fallback={<div className="flex justify-center py-12"><span className="text-[#657068]">Loading...</span></div>}>
          <ProductVerification />
        </Suspense>
      </div>
      <Footer />
    </main>
  )
}
