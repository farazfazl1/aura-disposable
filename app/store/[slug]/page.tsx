import type { CSSProperties } from "react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ArrowDown, ArrowLeft, ArrowUpRight, Leaf, Package, Sparkles, SunMoon, Zap } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { MoonIcon, SunIcon } from "@/components/Icons"
import ProductGallery from "@/components/ProductGallery"
import ProductPurchaseControls from "@/components/ProductPurchaseControls"
import StoreProductGrid from "@/components/StoreProductGrid"
import { STORE_PRODUCTS, type VapeType } from "@/lib/storeCatalog"

function typeIcon(type: VapeType) {
  if (type === "indica") return MoonIcon
  if (type === "hybrid") return SunMoon
  return SunIcon
}

function typeTheme(type: VapeType) {
  if (type === "indica") {
    return {
      heroStart: "#eee8f7",
      heroMiddle: "#b8a4cf",
      heroEnd: "#5c4377",
      heroDeep: "#573b75",
      accent: "#e2b93b",
      soft: "#f5effb",
      text: "text-[#5c347f]",
      border: "border-[#bca8d4]",
      softBg: "bg-[#f4ecff]",
      button: "bg-[#54336f] hover:bg-[#422657]",
    }
  }

  if (type === "hybrid") {
    return {
      heroStart: "#e9f3ed",
      heroMiddle: "#a8cdbb",
      heroEnd: "#326f5a",
      heroDeep: "#175b48",
      accent: "#e2b93b",
      soft: "#eef8f2",
      text: "text-[#17654e]",
      border: "border-[#9ac8b4]",
      softBg: "bg-[#e7f5ee]",
      button: "bg-[#17654e] hover:bg-[#104c3b]",
    }
  }

  return {
    heroStart: "#fff8dc",
    heroMiddle: "#efd783",
    heroEnd: "#98752b",
    heroDeep: "#725316",
    accent: "#5a4010",
    soft: "#fff7dc",
    text: "text-[#805b0b]",
    border: "border-[#dfc56b]",
    softBg: "bg-[#fff7dc]",
    button: "bg-[#725316] hover:bg-[#573e0e]",
  }
}

const PRODUCT_HERO_THEMES: Record<
  string,
  {
    image: string
    heroStart: string
    heroMiddle: string
    heroEnd: string
    heroDeep: string
    accent: string
  }
> = {
  "sweet-island": {
    image: "/images/cutouts/sweet-island.png",
    heroStart: "#fff9cf",
    heroMiddle: "#f1d86d",
    heroEnd: "#b98f16",
    heroDeep: "#6d4f00",
    accent: "#3f730f",
  },
  "blue-dream": {
    image: "/images/cutouts/blue-dream.png",
    heroStart: "#f2f6ff",
    heroMiddle: "#b7cbea",
    heroEnd: "#5479aa",
    heroDeep: "#254b78",
    accent: "#e4bc3e",
  },
  og: {
    image: "/images/cutouts/og.png",
    heroStart: "#ece9e2",
    heroMiddle: "#9f9a91",
    heroEnd: "#363432",
    heroDeep: "#1b1a19",
    accent: "#e0b84a",
  },
  "og-mint": {
    image: "/images/cutouts/og-mint.png",
    heroStart: "#edf5ef",
    heroMiddle: "#a8c7b0",
    heroEnd: "#356149",
    heroDeep: "#183f2c",
    accent: "#e0bd4a",
  },
  "persian-gold": {
    image: "/images/cutouts/persian-gold.png",
    heroStart: "#fff1d7",
    heroMiddle: "#f0aa52",
    heroEnd: "#a84f0c",
    heroDeep: "#753306",
    accent: "#ffe19b",
  },
  blueberry: {
    image: "/images/cutouts/blueberry.png",
    heroStart: "#eef2ff",
    heroMiddle: "#aab9e2",
    heroEnd: "#405c91",
    heroDeep: "#243c70",
    accent: "#e4bc3e",
  },
  jealousy: {
    image: "/images/cutouts/jealousy.png",
    heroStart: "#fae9e7",
    heroMiddle: "#d9918c",
    heroEnd: "#922232",
    heroDeep: "#68101e",
    accent: "#edc752",
  },
  "laughing-buddha": {
    image: "/images/cutouts/laughing-buddha.png",
    heroStart: "#fff4c8",
    heroMiddle: "#ddb94c",
    heroEnd: "#755311",
    heroDeep: "#372705",
    accent: "#fff0a8",
  },
}

function splitTags(value: string) {
  return value
    .split(/[•,]/)
    .map((item) => item.trim())
    .filter(Boolean)
}

export default function StoreProductPage({ params }: { params: { slug: string } }) {
  const requestedSlug = decodeURIComponent(params.slug).toLowerCase()
  const product = STORE_PRODUCTS.find((item) => item.slug.toLowerCase() === requestedSlug)

  if (!product) notFound()

  const typeStyles = typeTheme(product.type)
  const productHero = PRODUCT_HERO_THEMES[product.slug]
  const theme = { ...typeStyles, ...productHero }
  const TypeIcon = typeIcon(product.type)
  const typeLabel = product.type.charAt(0).toUpperCase() + product.type.slice(1)
  const availableFormats = product.size.match(/\d+\s*ml/gi)?.map((format) => format.replace(/\s+/g, "")) ?? [product.size]
  const flavorTags = splitTags(product.flavor)
  const effectTags = splitTags(product.effects)
  const terpeneValue = product.specs.find((spec) => spec.label.toLowerCase() === "terpenes")?.value
  const profileTags = terpeneValue ? splitTags(terpeneValue) : [product.grade.replace(/^Premium Grade\s*\|\s*/i, "")]
  const relatedProducts = STORE_PRODUCTS.filter((item) => item.slug !== product.slug).slice(0, 4)
  const words = product.name.trim().split(/\s+/)
  const outlineTitle = words.length > 1 ? words[0] : product.name
  const solidTitle = words.length > 1 ? words.slice(1).join(" ") : product.name
  const hasLongTitleLine = Math.max(outlineTitle.length, solidTitle.length) >= 8
  const detailItems = [
    { label: "Profile", value: typeLabel },
    { label: "Format", value: product.size },
    ...product.specs,
  ].slice(0, 4)
  const heroStyle = {
    "--hero-start": theme.heroStart,
    "--hero-middle": theme.heroMiddle,
    "--hero-end": theme.heroEnd,
    "--hero-deep": theme.heroDeep,
    "--hero-accent": theme.accent,
  } as CSSProperties

  return (
    <div className="aura-page min-h-screen">
      <Header />
      <main className="pt-16 md:pt-20">
        <section className="aura-product-hero" style={heroStyle}>
          <div className="relative z-10 mx-auto max-w-[1500px] px-4 pb-16 pt-7 sm:px-6 lg:px-10 lg:pb-24">
            <nav aria-label="Breadcrumb" className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--hero-deep)]">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <li>
                  <Link
                    href="/store"
                    className="rounded-sm opacity-65 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--hero-deep)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    Vapes
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-35">/</li>
                <li>
                  <Link
                    href={`/store?type=${product.type}`}
                    className="rounded-sm opacity-65 transition-opacity hover:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--hero-deep)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                  >
                    {typeLabel}
                  </Link>
                </li>
                <li aria-hidden="true" className="opacity-35">/</li>
                <li>
                  <span aria-current="page" className="opacity-100">{product.name}</span>
                </li>
              </ol>
            </nav>

            <div className="aura-product-stage">
              <h1 className={`aura-product-title ${hasLongTitleLine ? "aura-product-title-compact" : ""}`} aria-label={product.name}>
                <span className="aura-product-title-outline" aria-hidden="true">{outlineTitle}</span>
                <span className="aura-product-title-solid" aria-hidden="true">{solidTitle}</span>
              </h1>

              <span className="aura-profile-orbit aura-profile-orbit-one" aria-hidden="true">
                {flavorTags[0] ?? typeLabel}
              </span>
              <span className="aura-profile-orbit aura-profile-orbit-two" aria-hidden="true">
                {flavorTags[1] ?? effectTags[0] ?? "Aura"}
              </span>
              <span className="aura-profile-orbit aura-profile-orbit-three" aria-hidden="true">
                {flavorTags[2] ?? effectTags[1] ?? "Signature"}
              </span>

              <ProductGallery
                images={[productHero?.image ?? product.image]}
                productName={product.name}
                accentColor={theme.heroDeep}
                softColor={theme.soft}
              />

              <a href="#product-overview" className="aura-product-scroll-cue" aria-label="Scroll to product overview">
                <ArrowDown size={16} aria-hidden="true" />
                Explore the profile
              </a>
            </div>

            <div id="product-overview" className="aura-product-overview-grid scroll-mt-24">
              <div className="aura-product-intro">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] text-[color:var(--hero-accent)]">
                  <TypeIcon width={18} height={18} aria-hidden="true" />
                  Aura / {typeLabel}
                </div>
                <h2 className="mt-5 text-3xl font-black uppercase leading-none tracking-[-0.035em] text-white sm:text-4xl">
                  {product.name}
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-white/[0.84] lg:text-lg lg:leading-8">
                  {product.description}
                </p>

                <ProductPurchaseControls
                  slug={product.slug}
                  name={product.name}
                  image={productHero?.image ?? product.image}
                  price={product.price}
                  formats={availableFormats}
                />

                <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-white/20 pt-6">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/60">Available in</span>
                  {availableFormats.map((format) => (
                    <span key={format} className="aura-format-badge">{format}</span>
                  ))}
                  <span className="ml-auto text-lg font-bold text-white">{product.price}</span>
                </div>
              </div>

              <div className="aura-profile-table">
                <div className="aura-profile-row">
                  <span className="aura-profile-icon"><TypeIcon width={20} height={20} aria-hidden="true" /></span>
                  <div>
                    <p className="aura-profile-label">Type</p>
                    <div className="mt-2"><span className="aura-profile-chip">{typeLabel}</span></div>
                  </div>
                </div>
                <div className="aura-profile-row">
                  <span className="aura-profile-icon"><Sparkles width={20} height={20} aria-hidden="true" /></span>
                  <div>
                    <p className="aura-profile-label">Taste</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {flavorTags.map((tag) => <span key={tag} className="aura-profile-chip">{tag}</span>)}
                    </div>
                  </div>
                </div>
                <div className="aura-profile-row">
                  <span className="aura-profile-icon"><Zap width={20} height={20} aria-hidden="true" /></span>
                  <div>
                    <p className="aura-profile-label">Effects</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {effectTags.map((tag) => <span key={tag} className="aura-profile-chip">{tag}</span>)}
                    </div>
                  </div>
                </div>
                <div className="aura-profile-row">
                  <span className="aura-profile-icon"><Leaf width={20} height={20} aria-hidden="true" /></span>
                  <div>
                    <p className="aura-profile-label">{terpeneValue ? "Terpenes" : "Strength"}</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {profileTags.map((tag) => <span key={tag} className="aura-profile-chip">{tag}</span>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="aura-profile-blueprint px-4 py-16 md:py-24" style={heroStyle} aria-labelledby="details-heading">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-5 lg:grid-cols-[0.82fr_1.18fr]">
              <div className="aura-blueprint-story">
                <span className="aura-blueprint-word" aria-hidden="true">{product.name}</span>
                <div className="aura-blueprint-copy relative z-10">
                  <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-[0.24em] text-[color:var(--hero-accent)]">
                    <TypeIcon width={18} height={18} aria-hidden="true" />
                    Aura / {typeLabel}
                  </div>
                  <h2 id="details-heading" className="mt-7 max-w-xl text-4xl font-black uppercase leading-[0.92] tracking-[-0.05em] text-white sm:text-5xl md:text-6xl">
                    The profile, made tangible.
                  </h2>
                  <p className="mt-6 max-w-lg text-base leading-7 text-white/[0.72]">
                    Color, format, and formulation come together around the character of {product.name}.
                  </p>
                </div>

                <div className="aura-blueprint-meta relative z-10 mt-14 flex flex-wrap items-center gap-3 border-t border-white/15 pt-6">
                  <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.15em] text-white">
                    {product.grade}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">Aura signature</span>
                </div>
              </div>

              <div className="aura-blueprint-data">
                <div className="flex flex-col gap-3 border-b border-[color:var(--hero-deep)]/15 px-6 py-6 sm:flex-row sm:items-end sm:justify-between md:px-8">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[color:var(--hero-deep)]/55">Release profile</p>
                    <h3 className="mt-2 text-2xl font-black uppercase tracking-[-0.035em] text-[color:var(--hero-deep)] sm:text-3xl">{product.name} at a glance</h3>
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.16em] text-[color:var(--hero-deep)]/45">
                    {detailItems.length} attributes
                  </span>
                </div>

                <div>
                  {detailItems.map((item, index) => {
                    const normalizedLabel = item.label.toLowerCase()
                    const DetailIcon = normalizedLabel === "profile" ? TypeIcon : normalizedLabel === "format" ? Package : normalizedLabel === "terpenes" ? Leaf : Sparkles

                    return (
                      <article key={`${item.label}-${index}`} className="aura-blueprint-row">
                        <span className="aura-blueprint-icon">
                          <DetailIcon width={20} height={20} aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[color:var(--hero-deep)]/55">{item.label}</p>
                          <p className="mt-2 text-lg font-bold leading-7 text-[color:var(--hero-deep)] sm:text-xl">{item.value}</p>
                        </div>
                      </article>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-8 flex items-center justify-between border-t border-[color:var(--hero-deep)]/15 pt-6">
              <Link href="/store" className="inline-flex items-center gap-2 text-sm font-semibold text-[color:var(--hero-deep)]/70 transition-colors hover:text-[color:var(--hero-deep)]">
                <ArrowLeft size={16} aria-hidden="true" />
                Back to all vapes
              </Link>
              <span className="hidden text-xs font-bold uppercase tracking-[0.18em] text-[color:var(--hero-deep)]/45 sm:inline">Built around the release</span>
            </div>
          </div>
        </section>

        <section className="bg-[#f7f6f2] px-4 py-16 md:py-24">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 flex flex-col gap-4 border-b border-[#dfe5df] pb-7 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className={`mb-3 text-xs font-bold uppercase tracking-[0.24em] ${theme.text}`}>Elevate your experience</p>
                <h2 className="text-4xl font-black uppercase leading-none tracking-[-0.045em] text-[#17201b] md:text-6xl">
                  Explore more from Aura.
                </h2>
              </div>
              <Link href="/store" className="inline-flex items-center gap-2 text-sm font-semibold text-[#657068] transition-colors hover:text-[#17201b]">
                View all vapes
                <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <StoreProductGrid products={relatedProducts} />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
