"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

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
    <div className="aura-page min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="relative overflow-hidden bg-[#eef1ea] px-4 py-20">
          <div className="absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-purple-600/30 blur-3xl" />
            <div className="absolute top-24 right-10 h-72 w-72 rounded-full bg-yellow-400/30 blur-3xl" />
            <div className="absolute inset-0 bg-[#f7f6f2]/80" />
          </div>
          <div className="relative max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#657068]">
                Aura Store
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Designed for elevated experiences
              </h1>
              <p className="mb-8 text-lg text-[#536057]">
                Explore the full Aura collection with curated Indica, Sativa,
                and Hybrid profiles, premium hardware, and refined flavor notes.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/indica"
                    className="rounded-full border border-[#6f42c1] px-8 py-3 text-center text-[#6f42c1] transition-colors duration-300 hover:bg-[#6f42c1] hover:text-white"
                >
                  Shop Indica
                </Link>
                <Link
                  href="/sativa"
                    className="rounded-full border border-[#b7791f] px-8 py-3 text-center text-[#a16207] transition-colors duration-300 hover:bg-[#a16207] hover:text-white"
                >
                  Shop Sativa
                </Link>
                <Link
                  href="/hybrid"
                    className="rounded-full border border-[#087f5b] px-8 py-3 text-center text-[#087f5b] transition-colors duration-300 hover:bg-[#087f5b] hover:text-white"
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
                  className="rounded-2xl border border-[#dfe5df] bg-white/80 p-6 backdrop-blur"
                >
                  <p className="mb-2 text-sm text-[#657068]">{stat.label}</p>
                  <p className="text-2xl font-semibold">{stat.value}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <section className="bg-[#f7f6f2] px-4 py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Collections
              </h2>
              <p className="text-lg text-[#657068]">
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

        <section className="bg-[#eef1ea] px-4 py-24">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">
                Why retailers choose Aura
              </h2>
              <p className="text-lg text-[#657068]">
                Minimalist design, consistent performance, and premium flavor
                profiles that keep customers coming back.
              </p>
              <div className="grid gap-4">
                {perks.map((perk) => (
                  <div
                    key={perk.title}
                    className="rounded-2xl border border-[#dfe5df] bg-white p-6"
                  >
                    <h3 className="text-xl font-semibold mb-2">{perk.title}</h3>
                    <p className="text-[#657068]">{perk.description}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-3xl border border-[#cddbcf] bg-gradient-to-br from-[#e3f2e9] via-white to-[#fff4cf] p-10">
              <h3 className="text-3xl font-semibold mb-4">
                Wholesale Concierge
              </h3>
              <p className="mb-6 text-[#657068]">
                Partner with Aura for curated drops, premium merchandising, and
                dedicated support.
              </p>
              <button
                onClick={() =>
                  (window.location.href =
                    "mailto:auradisposable@gmail.com?subject=Store%20Wholesale%20Inquiry&body=Hello%20Aura%20Team%2C%0A%0AI'm%20interested%20in%20wholesale%20opportunities%20and%20store%20support.%20Please%20share%20details%20on%20product%20lines%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]")
                }
                className="w-full rounded-full bg-[#17201b] px-6 py-3 font-semibold text-white transition-colors hover:bg-[#33423a]"
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
