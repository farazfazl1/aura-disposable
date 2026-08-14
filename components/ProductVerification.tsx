"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClient } from "@supabase/supabase-js"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Search, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

type VerificationStatus = "idle" | "loading" | "success" | "error"

const slugifyProductName = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")

const ProductVerification = () => {
  const searchParams = useSearchParams()
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<VerificationStatus>("idle")
  const [productName, setProductName] = useState("")
  const [productImage, setProductImage] = useState("")
  const [productSlug, setProductSlug] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState("")

  // Auto-verify if code is present in URL
  useEffect(() => {
    const codeParam = searchParams.get("code")
    if (codeParam) {
      setCode(codeParam)
      verifyCode(codeParam)
    }
  }, [searchParams])

  const verifyCode = async (codeToVerify: string) => {
    if (!codeToVerify.trim()) return

    setStatus("loading")
    setErrorMessage("")
    setProductName("")
    setProductImage("")
    setProductSlug(null)

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured")
      }

      const { data, error } = await supabase
        .from("product_codes")
        .select("product_name, is_verified, image_url")
        .eq("code", codeToVerify.trim())
        .single()

      if (error || !data) {
        setStatus("error")
        setErrorMessage("This product code is not valid. Please check your code and try again.")
        return
      }

      // If we want to mark it as verified (optional, currently just checking existence)
      // await supabase.from("product_codes").update({ is_verified: true }).eq("code", codeToVerify)

      setProductName(data.product_name)
      setProductImage(data.image_url)
      setProductSlug(slugifyProductName(data.product_name))
      setStatus("success")
    } catch (err) {
      console.error("Verification error:", err)
      setStatus("error")
      setErrorMessage("An error occurred while verifying. Please try again later.")
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    verifyCode(code)
  }

  return (
    <section className="py-20 px-4 relative overflow-hidden min-h-[calc(100vh-160px)] flex items-center justify-center" id="verify">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 bg-[#f7f6f2]/95" />
      <div className="absolute left-1/4 top-0 h-96 w-96 rounded-full bg-[#d9c8f3]/50 blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-[#c9eadb]/60 blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-[#17201b] md:text-5xl">
            Product Verification
          </h2>
          <p className="mx-auto mb-10 max-w-xl text-lg text-[#657068]">
            Ensure your Aura product is authentic. Enter the unique code found on your package or scan the QR code.
          </p>
        </motion.div>

        <div className="rounded-3xl border border-[#dfe5df] bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="AURA-XXXX-XXXX-XXXX"
                className="w-full rounded-full border border-[#cbd6cd] bg-[#f7f6f2] py-4 pl-6 pr-14 font-mono text-lg uppercase text-[#17201b] placeholder:text-[#98a39b] transition-all focus:border-[#6f42c1] focus:outline-none focus:ring-1 focus:ring-[#6f42c1]"
              />
              <button
                type="submit"
                disabled={status === "loading" || !code}
                className="absolute bottom-2 right-2 top-2 flex aspect-square items-center justify-center rounded-full bg-[#17201b] text-white transition-colors hover:bg-[#33423a] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
              </button>
            </div>
          </form>

          <AnimatePresence mode="wait">
            {status === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-8 rounded-2xl border border-green-200 bg-green-50 p-6 md:p-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-[#17201b]">Authentic Product</h3>
                  <p className="mb-6 font-medium text-green-700">Verified Original Aura Disposable</p>
                  
                  <div className="w-full max-w-sm rounded-xl border border-green-100 bg-white p-4">
                    {productImage && (
                      <div className="mb-4 flex justify-center overflow-hidden rounded-lg bg-[#f7f6f2]">
                        <img
                          src={productImage}
                          alt={productName}
                          className="h-48 w-full object-cover"
                        />
                      </div>
                    )}
                    <p className="mb-1 text-sm uppercase tracking-wider text-[#657068]">Product Model</p>
                    <p className="mb-4 text-xl font-semibold text-[#17201b]">{productName}</p>
                    <Link
                      href={productSlug ? `/store/${productSlug}` : "/store"}
                      className="inline-flex w-full justify-center rounded-full bg-[#17201b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#33423a]"
                    >
                      View Product Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6 md:p-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <XCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-[#17201b]">Verification Failed</h3>
                  <p className="max-w-xs text-center font-medium text-red-700">
                    {errorMessage}
                  </p>
                  <div className="mt-6 max-w-sm rounded-lg bg-red-100 p-4 text-sm text-red-800">
                    Warning: If you just purchased this product, it may be counterfeit. Please contact the seller.
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

export default ProductVerification
