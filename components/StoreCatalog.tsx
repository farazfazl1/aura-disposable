"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import StoreProductGrid from "@/components/StoreProductGrid"
import { STORE_PRODUCTS, type VapeType } from "@/lib/storeCatalog"

type FilterValue = "all" | VapeType

const FILTERS: Array<{ value: FilterValue; label: string; activeClass: string }> = [
  { value: "all", label: "All releases", activeClass: "bg-[#d5aa55] text-[#11110b] border-[#d5aa55]" },
  { value: "indica", label: "Indica", activeClass: "bg-[#78528d] text-white border-[#78528d]" },
  { value: "sativa", label: "Sativa", activeClass: "bg-[#d5aa55] text-[#11110b] border-[#d5aa55]" },
  { value: "hybrid", label: "Hybrid", activeClass: "bg-[#347a59] text-white border-[#347a59]" },
]

function typeFromUrl(): FilterValue {
  if (typeof window === "undefined") return "all"

  const value = new URLSearchParams(window.location.search).get("type")
  return value === "indica" || value === "sativa" || value === "hybrid" ? value : "all"
}

export default function StoreCatalog() {
  const [activeType, setActiveType] = useState<FilterValue>("all")
  const [query, setQuery] = useState("")

  useEffect(() => {
    const syncTypeFromUrl = () => setActiveType(typeFromUrl())

    syncTypeFromUrl()
    window.addEventListener("popstate", syncTypeFromUrl)
    return () => window.removeEventListener("popstate", syncTypeFromUrl)
  }, [])

  const filteredProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()

    return STORE_PRODUCTS.filter((product) => {
      const matchesType = activeType === "all" || product.type === activeType
      if (!matchesType) return false
      if (!normalizedQuery) return true

      return [product.name, product.type, product.flavor, product.effects, product.grade, product.size]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery)
    })
  }, [activeType, query])

  const hasFilters = activeType !== "all" || query.trim().length > 0

  const updateType = (nextType: FilterValue) => {
    setActiveType(nextType)

    const url = new URL(window.location.href)
    if (nextType === "all") {
      url.searchParams.delete("type")
    } else {
      url.searchParams.set("type", nextType)
    }

    window.history.replaceState({}, "", `${url.pathname}${url.search}${url.hash}`)
  }

  const resetFilters = () => {
    setQuery("")
    updateType("all")
  }

  return (
    <section id="catalog" className="relative isolate overflow-hidden bg-[#f7f6f2] px-4 pb-24 pt-12 text-[#17201b] md:pb-32 md:pt-16">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[42rem] bg-[radial-gradient(circle_at_25%_10%,rgba(213,170,85,0.16),transparent_34%),radial-gradient(circle_at_82%_22%,rgba(52,122,89,0.08),transparent_28%)]" />

      <div className="mx-auto max-w-7xl">
        <div className="mb-10 border-b border-[#d8d5ca] pb-10 md:mb-12 md:pb-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#9b6e21]">Aura / Signature collection</p>
              <h1
                className="text-[clamp(4.2rem,11vw,9rem)] font-black uppercase leading-[0.76] tracking-[-0.075em] text-[#17201b]"
                style={{ fontFamily: '"Archivo Black", "Arial Black", sans-serif' }}
              >
                Vapes
              </h1>
              <p className="mt-7 max-w-xl text-base leading-7 text-[#657068] md:text-lg">
                Explore each profile through its color, character, and defining flavor notes.
              </p>
            </div>
            <div className="flex items-end gap-4 border-l border-[#b88932]/60 pl-5">
              <span className="text-6xl font-light leading-none text-[#a16207]">
                {String(filteredProducts.length).padStart(2, "0")}
              </span>
              <span className="max-w-[90px] pb-1 text-[10px] font-semibold uppercase leading-5 tracking-[0.2em] text-[#657068]">
                releases shown
              </span>
            </div>
          </div>
        </div>

        <div className="sticky top-16 z-20 -mx-4 mb-10 border-y border-[#dfe5df] bg-[#f7f6f2]/[0.94] px-4 py-4 backdrop-blur-xl md:top-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-wrap items-center gap-2 rounded-[1.6rem] border border-[#c9b078] bg-[#fffefa] p-2 shadow-sm sm:rounded-full" aria-label="Filter by vape profile">
              <span className="mr-1 flex items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#657068]">
                <SlidersHorizontal size={14} aria-hidden="true" />
                Profile
              </span>
              {FILTERS.map((filter) => {
                const isActive = activeType === filter.value
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => updateType(filter.value)}
                    className={`rounded-full border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88932] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2] ${
                      isActive
                        ? filter.activeClass
                        : "border-transparent text-[#657068] hover:border-[#dfe5df] hover:bg-[#eef1ea] hover:text-[#17201b]"
                    }`}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>

            <label className="relative block w-full xl:max-w-xs">
              <span className="sr-only">Search the Aura collection</span>
              <Search aria-hidden="true" size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#657068]" />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search flavor or effect"
                className="w-full rounded-full border border-[#dfe5df] bg-[#fffefa] py-3.5 pl-11 pr-10 text-sm text-[#17201b] shadow-sm outline-none transition placeholder:text-[#89938c] focus:border-[#b88932] focus:ring-2 focus:ring-[#d5aa55]/20"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#657068] transition-colors hover:bg-[#eef1ea] hover:text-[#17201b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88932]"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              ) : null}
            </label>
          </div>
        </div>

        <div className="mb-7 flex min-h-7 items-center justify-between gap-4">
          <p className="text-sm text-[#657068]" aria-live="polite">
            Showing <span className="font-semibold text-[#17201b]">{filteredProducts.length}</span> of {STORE_PRODUCTS.length} releases
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-[#9b6e21] underline decoration-[#c9b078] underline-offset-4 transition-colors hover:text-[#704b14] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88932]"
            >
              Reset filters
            </button>
          ) : null}
        </div>

        {filteredProducts.length > 0 ? (
          <StoreProductGrid products={filteredProducts} />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#c9b078] bg-[#fffefa] px-6 py-16 text-center">
            <p className="text-3xl font-semibold text-[#17201b]">No release matches that search.</p>
            <p className="mx-auto mt-3 max-w-md text-[#657068]">
              Try a different flavor, effect, or profile, or reset the filters to see the full collection.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-[#b88932] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#9b6e21] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#b88932] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2]"
            >
              Show all releases
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
