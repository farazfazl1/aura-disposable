"use client"

import ProductVerification from "@/components/ProductVerification"
import Header from "@/components/Header"
import Footer from "@/components/Footer"

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <Header />
      <div className="pt-20">
        <ProductVerification />
      </div>
      <Footer />
    </main>
  )
}
