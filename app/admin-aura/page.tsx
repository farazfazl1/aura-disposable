"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@supabase/supabase-js"

type PurchaseRequest = {
  id: string
  product_name: string
  delivery_area: string
  name: string
  email: string
  phone: string
  address: string
  created_at: string
  status?: "pending" | "out_for_delivery" | "delivered"
  delivery_note?: string
  quantity?: number
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

const AdminPage = () => {
  const router = useRouter()
  const [requests, setRequests] = useState<PurchaseRequest[]>([])
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isAuthed, setIsAuthed] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const perPage = 5
  const totalPages = Math.max(1, Math.ceil(requests.length / perPage))

  const loadRequests = async () => {
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }
    const { data, error: fetchError } = await supabase
      .from("purchase_requests")
      .select("*")
      .order("created_at", { ascending: false })
    if (fetchError) {
      setError("Unable to load requests.")
      return
    }
    const normalized =
      data?.map((request) => ({
        ...request,
        status: request.status ?? "pending",
        delivery_note: request.delivery_note ?? "",
        quantity: request.quantity ?? 5,
      })) ?? []
    setRequests(normalized)
  }

  useEffect(() => {
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }
    supabase.auth.getSession().then(({ data }) => {
      setIsAuthed(Boolean(data.session))
    })
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthed(Boolean(session))
    })
    const channel = supabase
      .channel("purchase_requests")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "purchase_requests" },
        () => {
          loadRequests()
        }
      )
      .subscribe()
    loadRequests()
    return () => {
      authListener.subscription.unsubscribe()
      supabase.removeChannel(channel)
    }
  }, [])

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages))
  }, [totalPages])

  const removeRequest = async (id: string) => {
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }
    const { error: deleteError } = await supabase.from("purchase_requests").delete().eq("id", id)
    if (deleteError) {
      setError("Unable to remove request.")
      return
    }
    loadRequests()
  }

  const updateStatus = async (id: string, newStatus: PurchaseRequest["status"]) => {
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }
    const { error: updateError } = await supabase
      .from("purchase_requests")
      .update({ status: newStatus })
      .eq("id", id)

    if (updateError) {
      setError("Unable to update status.")
      return
    }
    // Optimistic update
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: newStatus } : req))
    )
  }

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (signInError) {
      setError(signInError.message || "Invalid email or password.")
      return
    }
    setIsAuthed(true)
    setError("")
    setPassword("")
  }

  const handleLogout = async () => {
    if (!supabase) {
      setError("Supabase is not configured.")
      return
    }
    await supabase.auth.signOut()
    setIsAuthed(false)
    setEmail("")
    setPassword("")
  }

  if (!isAuthed) {
    return (
      <main className="aura-page min-h-screen px-4 py-20">
        <div className="max-w-md mx-auto space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-[#657068]">Sign in to view purchase requests.</p>
          </div>
          <form className="space-y-4 rounded-3xl border border-[#dfe5df] bg-white p-8" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <label className="text-sm text-[#536057]" htmlFor="admin-email">
                Email
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-[#cbd6cd] bg-[#f7f6f2] px-4 py-3 text-[#17201b] placeholder:text-[#98a39b] focus:outline-none focus:ring-2 focus:ring-[#6f42c1]/20"
                placeholder="admin@aura.com"
              />
            </div>
            <div className="grid gap-2">
              <label className="text-sm text-[#536057]" htmlFor="admin-password">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-[#cbd6cd] bg-[#f7f6f2] px-4 py-3 text-[#17201b] placeholder:text-[#98a39b] focus:outline-none focus:ring-2 focus:ring-[#6f42c1]/20"
                placeholder="••••••••"
              />
            </div>
            {error && <div className="text-sm text-red-700">{error}</div>}
            <button
              type="submit"
              className="w-full rounded-full bg-[#17201b] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#33423a]"
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="w-full rounded-full border border-[#bcc8be] px-6 py-3 text-sm font-semibold text-[#46554c] transition-colors hover:bg-[#eef1ea]"
            >
              Back to Home
            </button>
          </form>
        </div>
      </main>
    )
  }

  const startIndex = (currentPage - 1) * perPage
  const visibleRequests = requests.slice(startIndex, startIndex + perPage)

  return (
    <main className="aura-page min-h-screen px-4 py-20">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Purchase Requests</h1>
          <p className="text-[#657068]">Requests are stored in Supabase.</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={loadRequests}
            className="rounded-full border border-[#bcc8be] px-5 py-2 text-sm font-semibold text-[#46554c] hover:bg-[#eef1ea]"
          >
            Refresh
          </button>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-[#bcc8be] px-5 py-2 text-sm font-semibold text-[#46554c] hover:bg-[#eef1ea]"
          >
            Sign Out
          </button>
        </div>
        {requests.length === 0 ? (
          <div className="rounded-3xl border border-[#dfe5df] bg-white p-10 text-center text-[#657068]">
            No purchase requests yet.
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-6 lg:grid-cols-2">
              {visibleRequests.map((request) => (
              <div key={request.id} className="rounded-3xl border border-[#dfe5df] bg-white p-6 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-[0.25em] text-[#657068]">Product</p>
                      <p className="text-xl font-semibold">{request.product_name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <select
                        value={request.status}
                        onChange={(e) =>
                          updateStatus(request.id, e.target.value as PurchaseRequest["status"])
                        }
                        className={`rounded-full border px-3 py-1 text-xs font-semibold focus:outline-none ${
                          request.status === "delivered"
                            ? "border-green-200 bg-green-50 text-green-700"
                            : request.status === "out_for_delivery"
                            ? "border-yellow-200 bg-yellow-50 text-yellow-700"
                            : "border-[#dfe5df] bg-[#eef1ea] text-[#536057]"
                        }`}
                      >
                        <option value="pending">Pending</option>
                        <option value="out_for_delivery">Out for Delivery</option>
                        <option value="delivered">Delivered</option>
                      </select>
                      <button
                        type="button"
                        onClick={() => removeRequest(request.id)}
                        className="rounded-full border border-red-200 bg-red-50 px-4 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                <div className="mt-4 grid gap-3 text-sm text-[#536057]">
                  <div className="grid gap-1">
                    <span className="text-[#657068]">Name</span>
                    <span>{request.name}</span>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-[#657068]">Order Details</span>
                    <div className="flex items-center gap-2">
                      <span className="rounded bg-[#eef1ea] px-2 py-1 text-sm font-medium text-[#46554c]">
                        Qty: {request.quantity ?? 5}
                      </span>
                      <span className="rounded border border-green-200 bg-green-50 px-2 py-1 text-sm font-bold text-green-700">
                        Total: ${200 + (Math.max(request.quantity ?? 5, 5) - 5) * 35}
                      </span>
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-[#657068]">Email</span>
                    <a className="underline decoration-[#9aa79d]" href={`mailto:${request.email}`}>
                      {request.email}
                    </a>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-[#657068]">Phone</span>
                    <a className="underline decoration-[#9aa79d]" href={`tel:${request.phone}`}>
                      {request.phone}
                    </a>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-[#657068]">Address</span>
                    <div className="space-y-2">
                      <span>{request.address}</span>
                      <div className="flex flex-wrap gap-2">
                        <a
                          className="rounded-full border border-[#bcc8be] px-3 py-1 text-xs font-semibold text-[#46554c] hover:bg-[#eef1ea]"
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                            request.address
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open in Maps
                        </a>
                        <button
                          type="button"
                          onClick={() => navigator.clipboard.writeText(request.address)}
                          className="rounded-full border border-[#bcc8be] px-3 py-1 text-xs font-semibold text-[#46554c] hover:bg-[#eef1ea]"
                        >
                          Copy Address
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-[#657068]">Delivery Area</span>
                    <span>{request.delivery_area}</span>
                  </div>
                  <div className="grid gap-1">
                    <span className="text-[#657068]">Submitted</span>
                    <span>{new Date(request.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
            </div>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <span className="text-sm text-[#657068]">
                Page {currentPage} of {totalPages}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border border-[#bcc8be] px-4 py-2 text-sm font-semibold text-[#46554c] hover:bg-[#eef1ea] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-[#bcc8be] px-4 py-2 text-sm font-semibold text-[#46554c] hover:bg-[#eef1ea] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}

export default AdminPage
