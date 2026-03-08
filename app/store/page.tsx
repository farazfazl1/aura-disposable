"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { MoonIcon, SunIcon } from "@/components/Icons";

const featuredProducts = [
  {
    name: "Sweet Island Skunk",
    slug: "sweet-island-skunk",
    type: "sativa",
    image: "/images/store/photo_1404-12-09 12.11.21 PM.jpeg",
    flavor: "Coconut • Guava • Mango • Pineapple • Skunk",
    effects: "Creative Energy • Uplifted • Happy • Focused",
    size: "1ml . 2ml",
    price: "$100",
    description:
      "Elevate your session with Sweet Island Skunk - a vibrant sativa profile infused with lush tropical sweetness and classic skunk depth. Bright fruit layers meet crisp herbal undertones, delivering a clean cerebral lift and an effortlessly happy vibe. Designed for daytime momentum, creativity, and social flow.",
  },
  {
    name: "Blurr Dream",
    slug: "blurr-dream",
    type: "sativa",
    image: "/images/store/photo_1404-12-09 12.11.22 PM.jpeg",
    flavor: "Sweet Blueberry",
    effects: "Creative, Energy, Focus, Uplift",
    size: "1ml . 2ml",
    price: "$100",
    description:
      "Blurr Dream is a vibrant berry-forward strain profile inspired by the classic fusion of Blueberry and Haze. Juicy blueberry sweetness opens the experience, layered with subtle citrus brightness and fresh pine undertones. Smooth on the inhale and clean on the finish — designed for daytime creativity, mental clarity, and an elevated social rhythm.",
  },
  {
    name: "Double Bubble OG",
    slug: "double-bubble-og",
    type: "indica",
    image: "/images/store/photo_1404-12-09 12.11.19 PM.jpeg",
    flavor: "Berry, Bubble Gum, Earthy",
    effects: "Calm, Rest, Deep Relaxation",
    size: "1ml . 2ml",
    price: "$100",
    description:
      "Double Buble OG is a rich, dessert-inspired indica profile blending sweet berry notes with nostalgic bubble gum and smooth earthy depth. Creamy on the inhale and grounding on the finish, this strain is crafted for evening wind-down, body ease, and tranquil rest.",
  },
  {
    name: "OG Mint",
    slug: "og-mint",
    type: "indica",
    image: "/images/store/photo_1404-12-09 12.11.16 PM.jpeg",
    flavor: "Cool Mint • Earthy OG • Pine •",
    effects: "Deep Relaxation • Body Calm • Restful",
    size: "1ml . 2ml",
    price: "$100",
    description:
      "OG Mint is a cool, earthy indica profile layered with crisp mint and classic OG depth. Smooth on the inhale with a refreshing herbal finish, this strain settles into a soothing full-body calm. Crafted for evening wind-down, quiet moments, and deep restorative rest.",
  },
  {
    name: "Saffron",
    slug: "Saffron",
    type: "sativa",
    image: "/images/store/photo_1404-12-09 12.11.20 PM.jpeg",
    flavor: "Exotic Spice, Floral, Sweet Citrus",
    size: "1ml - 2ml",
    price: "$100",
    description:
      "Saffron is a rare, spice-forward sativa profile inspired by the warmth and elegance of golden saffron threads. Delicate floral sweetness blends with subtle citrus brightness and a smooth herbal finish. Light on the body yet vibrant in the mind - crafted for daytime clarity, elevated mood, and creative momentum.",
  },
  {
    name: "Blueberry",
    slug: "blueberry",
    type: "sativa",
    image: "/images/store/photo_1404-12-09 12.11.12 PM.jpeg",
    flavor: "Sweet Blueberry, Light Citrus",
    size: "1ml - 2ml",
    price: "$100",
    description:
      "Blueberry is a vibrant fruit-forward sativa bursting with juicy berry sweetness and a subtle citrus lift. Smooth and clean on the inhale, it delivers a bright cerebral buzz with steady focus and feel-good energy - perfect for daytime creativity and social flow.",
  },
  {
    name: "Aura No. 7",
    slug: "aura-no-7",
    type: "sativa",
    image: "/images/store/photo_1404-12-09 12.11.12 PM.jpeg",
    flavor: "Sweet Blueberry, Light Citrus",
    size: "1ml - 2ml",
    price: "$100",
    description:
      "Blueberry is a vibrant fruit-forward sativa bursting with juicy berry sweetness and a subtle citrus lift. Smooth and clean on the inhale, it delivers a bright cerebral buzz with steady focus and feel-good energy - perfect for daytime creativity and social flow.",
  },
];

const perks = [
  {
    title: "Premium Hardware",
    description:
      "Precision-crafted devices with consistent airflow and premium materials.",
  },
  {
    title: "Curated Terpenes",
    description: "Elevated flavor profiles tailored to each Aura experience.",
  },
  {
    title: "Wholesale Ready",
    description:
      "Optimized for retailers with consistent inventory and clean packaging.",
  },
];

export default function StorePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="relative overflow-hidden py-20 px-4">
          <div className="absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/30 blur-3xl" />
            <div className="absolute top-24 right-10 h-72 w-72 rounded-full bg-yellow-400/30 blur-3xl" />
            <div className="absolute inset-0 bg-black/70" />
          </div>
          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="uppercase tracking-[0.3em] text-sm text-gray-400 mb-4">
                Aura Store
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Designed for elevated experiences
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Explore the full Aura collection with curated Indica, Sativa,
                and Hybrid profiles, premium hardware, and refined flavor notes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/indica"
                  className="px-8 py-3 rounded-full border border-purple-500 text-purple-300 hover:bg-purple-600 hover:text-white transition-colors duration-300 text-center"
                >
                  Shop Indica
                </Link>
                <Link
                  href="/sativa"
                  className="px-8 py-3 rounded-full border border-yellow-500 text-yellow-300 hover:bg-yellow-500 hover:text-black transition-colors duration-300 text-center"
                >
                  Shop Sativa
                </Link>
                <Link
                  href="/hybrid"
                  className="px-8 py-3 rounded-full border border-emerald-400 text-emerald-200 hover:bg-emerald-400 hover:text-black transition-colors duration-300 text-center"
                >
                  Shop Hybrid
                </Link>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {[
                { label: "Premium THC", value: "80-90%" },
                { label: "Flavor Profiles", value: "12+" },
                { label: "Device Sizes", value: "1ml / 2ml" },
                { label: "Wholesale", value: "Available" },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="border border-gray-800 rounded-2xl p-6 bg-black/60 backdrop-blur"
                >
                  <p className="text-sm text-gray-400 mb-2">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="py-24 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Collections
              </h2>
              <p className="text-gray-400 text-lg">
                Choose your path with curated Aura profiles
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-10">
              <ProductCard
                type="indica"
                title="Indica"
                tagline="Bold, mysterious, intense"
                description="Deep relaxation, rich flavor, and a refined evening experience crafted with premium OG oil."
              />
              <ProductCard
                type="sativa"
                title="Sativa"
                tagline="Energizing, uplifting, creative"
                description="Bright citrus and sweet berry notes designed for daytime clarity and social energy."
              />
              <ProductCard
                type="hybrid"
                title="Hybrid"
                tagline="Balanced, smooth, versatile"
                description="A harmonious blend of calm and clarity, crafted for all-day balance with layered flavor."
              />
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-black">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">
                  Featured Picks
                </h2>
                <p className="text-gray-400 text-lg">
                  A refined selection of Aura favorites
                </p>
              </div>
              <Link
                href="/#products"
                className="inline-flex items-center text-sm uppercase tracking-[0.3em] text-gray-400 hover:text-white transition-colors"
              >
                Explore Highlights
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => {
                const isIndica = product.type === "indica";
                return (
                  <div
                    key={product.name}
                    className={`rounded-3xl border ${
                      isIndica
                        ? "border-purple-800/60 bg-purple-900/20"
                        : "border-yellow-400/40 bg-yellow-500/10"
                    } p-6 flex flex-col gap-4`}
                  >
                    <div className="rounded-2xl bg-white/5 overflow-hidden">
                      <Link href={`/store/${product.slug}`} className="w-full">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-48 w-full object-contain"
                        />
                      </Link>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {isIndica ? (
                          <MoonIcon
                            className="text-purple-300"
                            width={20}
                            height={20}
                          />
                        ) : (
                          <SunIcon
                            className="text-yellow-300"
                            width={20}
                            height={20}
                          />
                        )}
                        <span className="text-sm uppercase tracking-[0.2em] text-gray-400">
                          {product.type}
                        </span>
                      </div>
                      <span className="text-lg font-semibold">
                        {product.price}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-2xl font-semibold mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-400">
                        {product.flavor} · {product.size}
                      </p>
                    </div>
                    <p className="text-gray-300 line-clamp-3">{product.description}</p>
                    <Link
                      href={`/store/${product.slug}`}
                      className={`mt-auto px-6 py-3 rounded-full text-sm font-semibold transition-colors duration-300 ${
                        isIndica
                          ? "bg-purple-700 text-white hover:bg-purple-600"
                          : "bg-yellow-400 text-black hover:bg-yellow-300"
                      } text-center`}
                    >
                      View Details
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 px-4 bg-black">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Why retailers choose Aura
              </h2>
              <p className="text-gray-400 text-lg">
                Minimalist design, consistent performance, and premium flavor
                profiles that keep customers coming back.
              </p>
              <div className="grid gap-4">
                {perks.map((perk) => (
                  <div
                    key={perk.title}
                    className="border border-gray-800 rounded-2xl p-6 bg-gray-900/40"
                  >
                    <h3 className="text-xl font-semibold mb-2">{perk.title}</h3>
                    <p className="text-gray-400">{perk.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-gray-800 p-10 bg-gradient-to-br from-gray-900 via-black to-gray-900">
              <h3 className="text-3xl font-semibold mb-4">
                Wholesale Concierge
              </h3>
              <p className="text-gray-400 mb-6">
                Partner with Aura for curated drops, premium merchandising, and
                dedicated support.
              </p>
              <button
                onClick={() =>
                  (window.location.href =
                    "mailto:auradisposable@gmail.com?subject=Store%20Wholesale%20Inquiry&body=Hello%20Aura%20Team%2C%0A%0AI'm%20interested%20in%20wholesale%20opportunities%20and%20store%20support.%20Please%20share%20details%20on%20product%20lines%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
                }
                className="w-full px-6 py-3 rounded-full bg-white text-black font-semibold hover:bg-gray-200 transition-colors"
              >
                Contact Wholesale Team
              </button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
