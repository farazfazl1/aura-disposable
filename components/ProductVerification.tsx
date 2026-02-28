"use client"

import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"
import { useSearchParams } from "next/navigation"
import { CheckCircle, XCircle, Search, Loader2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

type VerificationStatus = "idle" | "loading" | "success" | "error"

const ProductVerification = () => {
  const searchParams = useSearchParams()
  const [code, setCode] = useState("")
  const [status, setStatus] = useState<VerificationStatus>("idle")
  const [productName, setProductName] = useState("")
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

    try {
      if (!supabase) {
        throw new Error("Supabase is not configured")
      }

      const { data, error } = await supabase
        .from("product_codes")
        .select("product_name, is_verified")
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
      <div className="absolute inset-0 bg-black/95 z-0" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-900/20 rounded-full blur-[100px]" />

      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Product Verification
          </h2>
          <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto">
            Ensure your Aura product is authentic. Enter the unique code found on your package or scan the QR code.
          </p>
        </motion.div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="relative">
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="AURA-XXXX-XXXX-XXXX"
                className="w-full bg-black/50 border border-white/20 rounded-full py-4 pl-6 pr-14 text-white placeholder:text-gray-600 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all font-mono text-lg uppercase"
              />
              <button
                type="submit"
                disabled={status === "loading" || !code}
                className="absolute right-2 top-2 bottom-2 aspect-square bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
                className="mt-8 bg-green-500/10 border border-green-500/20 rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Authentic Product</h3>
                  <p className="text-green-400 font-medium mb-6">Verified Original Aura Disposable</p>
                  
                  <div className="bg-black/40 rounded-xl p-4 w-full max-w-sm border border-white/5">
                    <p className="text-sm text-gray-500 mb-1 uppercase tracking-wider">Product Model</p>
                    <p className="text-xl text-white font-semibold">{productName}</p>
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
                className="mt-8 bg-red-500/10 border border-red-500/20 rounded-2xl p-6 md:p-8"
              >
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mb-4 shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                    <XCircle className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">Verification Failed</h3>
                  <p className="text-red-400 font-medium text-center max-w-xs">
                    {errorMessage}
                  </p>
                  <div className="mt-6 p-4 bg-red-950/30 rounded-lg text-sm text-red-200/80 max-w-sm">
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
