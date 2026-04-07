import Link from "next/link";
import { notFound } from "next/navigation";
import { SunMoon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PurchaseRequestDialog from "@/components/PurchaseRequestDialog";
import { MoonIcon, SunIcon } from "@/components/Icons";
import { STORE_PRODUCTS } from "@/lib/storeCatalog";

export default function StoreProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const requestedSlug = decodeURIComponent(params.slug).toLowerCase();
  const product = STORE_PRODUCTS.find(
    (item) => item.slug.toLowerCase() === requestedSlug,
  );

  if (!product) {
    notFound();
  }

  const isIndica = product.type === "indica";
  const isHybrid = product.type === "hybrid";
  const accentText = isIndica
    ? "text-purple-300"
    : isHybrid
      ? "text-emerald-300"
      : "text-yellow-300";
  const accentBorder = isIndica
    ? "border-purple-700/60"
    : isHybrid
      ? "border-emerald-500/50"
      : "border-yellow-400/40";
  const accentBg = isIndica
    ? "bg-purple-900/20"
    : isHybrid
      ? "bg-emerald-500/10"
      : "bg-yellow-500/10";
  const buttonClass = isIndica
    ? "bg-purple-700 text-white hover:bg-purple-600"
    : isHybrid
      ? "bg-emerald-400 text-black hover:bg-emerald-300"
      : "bg-yellow-400 text-black hover:bg-yellow-300";

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div
              className={`rounded-3xl border ${accentBorder} ${accentBg} p-10`}
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-80 w-full max-w-md mx-auto object-contain lg:h-[420px] lg:max-w-lg"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-gray-400">
                {isIndica ? (
                  <MoonIcon className={accentText} width={18} height={18} />
                ) : isHybrid ? (
                  <SunMoon className={accentText} width={18} height={18} />
                ) : (
                  <SunIcon className={accentText} width={18} height={18} />
                )}
                <span>{product.type}</span>
              </div>
              <p className={`text-sm font-medium ${accentText}`}>
                {product.grade}
              </p>
              <h1 className="text-4xl md:text-6xl font-bold">{product.name}</h1>
              <p className="text-lg text-gray-300">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm border ${accentBorder} ${accentBg}`}
                >
                  {product.flavor}
                </span>
                <span className="px-4 py-2 rounded-full text-sm border border-gray-800 bg-gray-900/60">
                  {product.size}
                </span>
                <span className="px-4 py-2 rounded-full text-sm border border-gray-800 bg-gray-900/60">
                  {product.price}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2 uppercase tracking-wider">
                  Effects
                </p>
                <p className="text-gray-300">{product.effects}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/store"
                  className="px-6 py-3 rounded-full border border-gray-700 text-gray-200 hover:bg-gray-900 transition-colors text-center"
                >
                  Back to Store
                </Link>
                <a
                  href="mailto:auradisposable@gmail.com?subject=Store%20Product%20Inquiry&body=Hello%20Aura%20Team%2C%0A%0AI'm%20interested%20in%20Aura%20store%20products.%20Please%20send%20details%20on%20availability%20and%20pricing.%0A%0ABest%20regards%2C%0A[Your%20Name]"
                  className={`inline-flex items-center justify-center px-6 py-3 rounded-full font-semibold transition-colors text-center w-full sm:w-auto ${buttonClass}`}
                >
                  Contact for Wholesale
                </a>
                <PurchaseRequestDialog
                  productName={product.name}
                  buttonClass={buttonClass}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border border-gray-800 rounded-3xl p-10 bg-gray-900/40">
              <h2 className="text-3xl font-semibold mb-4">
                About This Release
              </h2>
              <p className="text-gray-300 leading-relaxed">
                {product.overview}
              </p>
            </div>
            <div
              className={`border ${accentBorder} ${accentBg} rounded-3xl p-8`}
            >
              <h3 className="text-2xl font-semibold mb-6">Specifications</h3>
              <div className="space-y-4">
                {product.specs.map((spec) => (
                  <div
                    key={spec.label}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-400">{spec.label}</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="border border-gray-800 rounded-3xl p-8 bg-black/60">
              <h3 className="text-2xl font-semibold mb-4">Flavor Notes</h3>
              <div className="flex flex-wrap gap-2">
                {product.notes.map((note) => (
                  <span
                    key={note}
                    className={`px-3 py-1 rounded-full text-sm border ${accentBorder} ${accentBg}`}
                  >
                    {note}
                  </span>
                ))}
              </div>
            </div>
            <div className="border border-gray-800 rounded-3xl p-8 bg-black/60">
              <h3 className="text-2xl font-semibold mb-4">Experience</h3>
              <p className="text-gray-300 leading-relaxed">
                {product.experience}
              </p>
            </div>
            <div className="border border-gray-800 rounded-3xl p-8 bg-black/60">
              <h3 className="text-2xl font-semibold mb-4">Finish</h3>
              <p className="text-gray-300 leading-relaxed">{product.finish}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
