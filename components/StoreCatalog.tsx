"use client"

import { useEffect, useMemo, useState } from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import StoreProductGrid from "@/components/StoreProductGrid"
import { STORE_PRODUCTS, type VapeType } from "@/lib/storeCatalog"

type FilterValue = "all" | VapeType

const FILTERS: Array<{ value: FilterValue; label: string; activeClass: string }> = [
  { value: "all", label: "All releases", activeClass: "bg-[#17201b] text-white border-[#17201b]" },
  { value: "indica", label: "Indica", activeClass: "bg-[#6f42c1] text-white border-[#6f42c1]" },
  { value: "sativa", label: "Sativa", activeClass: "bg-[#a16207] text-white border-[#a16207]" },
  { value: "hybrid", label: "Hybrid", activeClass: "bg-[#087f5b] text-white border-[#087f5b]" },
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
    <section id="catalog" className="relative bg-[#f7f6f2] px-4 pb-20 pt-12 md:pb-28 md:pt-16">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 border-b border-[#cfd8d1] pb-10 md:mb-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-[#6f42c1]">Aura / Vapes</p>
              <h1 className="font-serif text-5xl font-semibold leading-none tracking-[-0.05em] text-[#17201b] md:text-7xl">
                Vapes
              </h1>
              <p className="mt-5 max-w-xl text-base leading-7 text-[#657068] md:text-lg">
                Browse the complete Aura collection by profile, flavor, and effect.
              </p>
            </div>
            <div className="flex items-end gap-4 border-l-2 border-[#a16207] pl-4 md:min-w-[160px]">
              <span className="font-serif text-5xl leading-none text-[#17201b]">
                {String(filteredProducts.length).padStart(2, "0")}
              </span>
              <span className="max-w-[90px] pb-1 text-xs font-semibold uppercase leading-5 tracking-[0.16em] text-[#657068]">
                releases shown
              </span>
            </div>
          </div>
        </div>

        <div className="sticky top-16 z-20 -mx-4 mb-10 border-y border-[#dfe5df] bg-[#f7f6f2]/95 px-4 py-4 backdrop-blur-md md:top-20">
          <div className="mx-auto flex max-w-7xl flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2" aria-label="Filter by vape profile">
              <span className="mr-1 flex items-center gap-2 px-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#657068]">
                <SlidersHorizontal size={15} aria-hidden="true" />
                Filter
              </span>
              {FILTERS.map((filter) => {
                const isActive = activeType === filter.value
                return (
                  <button
                    key={filter.value}
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => updateType(filter.value)}
                    className={`rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6f42c1] focus-visible:ring-offset-2 ${
                      isActive
                        ? filter.activeClass
                        : "border-[#dfe5df] bg-[#fffefa] text-[#536057] hover:border-[#aebbb1] hover:text-[#17201b]"
                    }`}
                  >
                    {filter.label}
                  </button>
                )
              })}
            </div>

            <label className="relative block w-full lg:max-w-xs">
              <span className="sr-only">Search the Aura collection</span>
              <Search
                aria-hidden="true"
                size={17}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#657068]"
              />
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search flavor or effect"
                className="w-full rounded-full border border-[#dfe5df] bg-[#fffefa] py-3 pl-11 pr-10 text-sm text-[#17201b] outline-none transition-shadow placeholder:text-[#89938c] focus:border-[#b9a0df] focus:ring-2 focus:ring-[#d9c8f3]"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#657068] transition-colors hover:bg-[#eef1ea] hover:text-[#17201b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6f42c1]"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              ) : null}
            </label>
          </div>
        </div>

        <div className="mb-6 flex min-h-7 items-center justify-between gap-4">
          <p className="text-sm text-[#657068]" aria-live="polite">
            Showing <span className="font-semibold text-[#17201b]">{filteredProducts.length}</span> of {STORE_PRODUCTS.length} releases
          </p>
          {hasFilters ? (
            <button
              type="button"
              onClick={resetFilters}
              className="text-sm font-semibold text-[#6f42c1] underline decoration-[#c9b4e8] underline-offset-4 transition-colors hover:text-[#522b9f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6f42c1]"
            >
              Reset filters
            </button>
          ) : null}
        </div>

        {filteredProducts.length > 0 ? (
          <StoreProductGrid products={filteredProducts} />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#c9b4e8] bg-[#f4ecff] px-6 py-16 text-center">
            <p className="font-serif text-3xl font-semibold text-[#17201b]">No release matches that search.</p>
            <p className="mx-auto mt-3 max-w-md text-[#657068]">
              Try a different flavor, effect, or profile, or reset the filters to see the full collection.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-[#6f42c1] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#58309f] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#6f42c1] focus-visible:ring-offset-2"
            >
              Show all releases
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
