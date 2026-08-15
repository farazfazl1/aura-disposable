"use client"

import { useEffect, useMemo, useState } from "react"
import { ChevronDown, Search, SlidersHorizontal, X } from "lucide-react"
import StoreProductGrid from "@/components/StoreProductGrid"
import { STORE_PRODUCTS, type VapeType } from "@/lib/storeCatalog"

type FilterValue = "all" | VapeType

const FILTERS: Array<{ value: FilterValue; label: string; activeClass: string }> = [
  { value: "all", label: "All releases", activeClass: "bg-[#17201b] text-white border-[#17201b]" },
  { value: "indica", label: "Indica", activeClass: "bg-[#78528d] text-white border-[#78528d]" },
  { value: "sativa", label: "Sativa", activeClass: "bg-[#17201b] text-white border-[#17201b]" },
  { value: "hybrid", label: "Hybrid", activeClass: "bg-[#347a59] text-white border-[#347a59]" },
]

function FilterChoices({
  activeType,
  onChange,
  className,
}: {
  activeType: FilterValue
  onChange: (value: FilterValue) => void
  className: string
}) {
  return (
    <div className={className}>
      {FILTERS.map((filter) => {
        const isActive = activeType === filter.value

        return (
          <button
            key={filter.value}
            type="button"
            aria-pressed={isActive}
            onClick={() => onChange(filter.value)}
            className={`inline-flex min-h-11 w-full items-center justify-center rounded-full border px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2] sm:min-h-0 sm:w-auto sm:px-4 sm:py-2.5 sm:text-xs ${
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
  )
}

function SearchField({
  query,
  onChange,
  onClear,
  className = "",
}: {
  query: string
  onChange: (value: string) => void
  onClear: () => void
  className?: string
}) {
  return (
    <label className={`relative block w-full ${className}`}>
      <span className="sr-only">Search the Aura collection</span>
      <Search aria-hidden="true" size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#657068]" />
      <input
        type="search"
        value={query}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search flavor or effect"
        className="min-h-12 w-full rounded-full border border-[#dfe5df] bg-[#fffefa] py-3 pl-11 pr-10 text-sm text-[#17201b] shadow-sm outline-none transition placeholder:text-[#89938c] focus:border-[#17201b] focus:ring-2 focus:ring-[#17201b]/20"
      />
      {query ? (
        <button
          type="button"
          aria-label="Clear search"
          onClick={onClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-[#657068] transition-colors hover:bg-[#eef1ea] hover:text-[#17201b] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b]"
        >
          <X size={16} aria-hidden="true" />
        </button>
      ) : null}
    </label>
  )
}

function typeFromUrl(): FilterValue {
  if (typeof window === "undefined") return "all"

  const value = new URLSearchParams(window.location.search).get("type")
  return value === "indica" || value === "sativa" || value === "hybrid" ? value : "all"
}

export default function StoreCatalog() {
  const [activeType, setActiveType] = useState<FilterValue>("all")
  const [query, setQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)

  useEffect(() => {
    const syncTypeFromUrl = () => setActiveType(typeFromUrl())

    syncTypeFromUrl()
    window.addEventListener("popstate", syncTypeFromUrl)
    return () => window.removeEventListener("popstate", syncTypeFromUrl)
  }, [])

  useEffect(() => {
    if (!isFilterOpen) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsFilterOpen(false)
    }

    document.body.style.overflow = "hidden"
    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isFilterOpen])

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
  const activeFilterLabel = FILTERS.find((filter) => filter.value === activeType)?.label ?? "All releases"

  const updateType = (nextType: FilterValue) => {
    setActiveType(nextType)
    setIsFilterOpen(false)

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
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 pb-6 md:mb-10 md:pb-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.3em] text-[#17201b]">Aura / Signature collection</p>
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
            <div className="flex items-end gap-4 border-l border-[#17201b]/60 pl-5">
              <span className="text-6xl font-light leading-none text-[#17201b]">
                {String(filteredProducts.length).padStart(2, "0")}
              </span>
              <span className="max-w-[90px] pb-1 text-[10px] font-semibold uppercase leading-5 tracking-[0.2em] text-[#657068]">
                releases shown
              </span>
            </div>
          </div>
        </div>

        <div className="sticky top-16 z-20 -mx-4 mb-10 border-b border-[#dfe5df] bg-[#f7f6f2]/[0.94] px-4 py-3 backdrop-blur-xl md:top-20 md:py-4">
          <div className="relative mx-auto max-w-7xl">
            <div className="flex items-center gap-2 lg:hidden">
              <SearchField query={query} onChange={setQuery} onClear={() => setQuery("")} className="min-w-0 flex-1" />
              <button
                type="button"
                aria-expanded={isFilterOpen}
                aria-controls="mobile-profile-filters"
                onClick={() => setIsFilterOpen((open) => !open)}
                className={`inline-flex min-h-12 min-w-[104px] shrink-0 items-center justify-center gap-2 rounded-full border px-4 text-xs font-semibold uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2] ${
                  isFilterOpen ? "border-[#17201b] bg-[#17201b] text-white" : "border-[#17201b] bg-[#fffefa] text-[#17201b]"
                }`}
              >
                <SlidersHorizontal size={16} aria-hidden="true" />
                <span>Filter</span>
                <ChevronDown size={15} aria-hidden="true" className={`transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
              </button>
            </div>

            {isFilterOpen ? (
              <>
                <button
                  type="button"
                  aria-label="Close filters"
                  onClick={() => setIsFilterOpen(false)}
                  className="fixed inset-0 z-40 bg-[#17201b]/25 backdrop-blur-[2px] animate-in fade-in duration-200 motion-reduce:animate-none lg:hidden"
                />
                <div
                  id="mobile-profile-filters"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="mobile-profile-filters-title"
                  className="fixed inset-x-0 bottom-0 z-50 rounded-t-[2rem] border-t border-[#dfe5df] bg-[#fffefa] px-4 pb-[calc(1rem+env(safe-area-inset-bottom))] pt-3 shadow-[0_-24px_70px_rgba(23,32,27,0.2)] animate-in slide-in-from-bottom-4 duration-200 motion-reduce:animate-none lg:hidden"
                >
                  <div className="mx-auto w-full max-w-lg">
                    <span className="mx-auto block h-1.5 w-12 rounded-full bg-[#dfe5df]" aria-hidden="true" />

                    <div className="mt-5 flex items-start justify-between gap-4">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#657068]">Aura / Collection</p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          <h2 id="mobile-profile-filters-title" className="text-2xl font-black uppercase leading-none tracking-[-0.04em] text-[#17201b]">
                            Filter by profile
                          </h2>
                          <span className="rounded-full bg-[#eef1ea] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#657068]">
                            {activeFilterLabel}
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        aria-label="Close filters"
                        onClick={() => setIsFilterOpen(false)}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#dfe5df] text-[#17201b] transition-colors hover:border-[#17201b] hover:bg-[#17201b] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b]"
                      >
                        <X size={18} aria-hidden="true" />
                      </button>
                    </div>

                    <FilterChoices activeType={activeType} onChange={updateType} className="mt-6 grid grid-cols-2 gap-3" />
                  </div>
                </div>
              </>
            ) : null}

            <div className="hidden items-center justify-between gap-4 lg:flex">
              <div className="flex items-center gap-2 rounded-full border border-[#17201b] bg-[#fffefa] p-2 shadow-sm" aria-label="Filter by vape profile">
                <span className="mr-1 flex items-center gap-2 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#657068]">
                  <SlidersHorizontal size={14} aria-hidden="true" />
                  <span>Profile</span>
                </span>
                <FilterChoices activeType={activeType} onChange={updateType} className="flex items-center gap-2" />
              </div>

              <SearchField query={query} onChange={setQuery} onClear={() => setQuery("")} className="max-w-xs" />
            </div>
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
              className="text-sm font-semibold text-[#17201b] underline decoration-[#17201b] underline-offset-4 transition-colors hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b]"
            >
              Reset filters
            </button>
          ) : null}
        </div>

        {filteredProducts.length > 0 ? (
          <StoreProductGrid products={filteredProducts} />
        ) : (
          <div className="rounded-[2rem] border border-dashed border-[#17201b] bg-[#fffefa] px-6 py-16 text-center">
            <p className="text-3xl font-semibold text-[#17201b]">No release matches that search.</p>
            <p className="mx-auto mt-3 max-w-md text-[#657068]">
              Try a different flavor, effect, or profile, or reset the filters to see the full collection.
            </p>
            <button
              type="button"
              onClick={resetFilters}
              className="mt-6 rounded-full bg-[#17201b] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17201b] focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7f6f2]"
            >
              Show all releases
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
