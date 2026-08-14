import Link from "next/link";
import { notFound } from "next/navigation";
import { SunMoon } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PurchaseRequestDialog from "@/components/PurchaseRequestDialog";
import { MoonIcon, SunIcon } from "@/components/Icons";
import { STORE_PRODUCTS } from "@/lib/storeCatalog";
import ProductGallery from "@/components/ProductGallery";

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
    ? "text-[#6f42c1]"
    : isHybrid
      ? "text-[#087f5b]"
      : "text-[#a16207]";
  const accentBorder = isIndica
    ? "border-[#c9b4e8]"
    : isHybrid
      ? "border-[#a6d7c3]"
      : "border-[#e6c970]";
  const accentBg = isIndica
    ? "bg-[#f3ecfb]"
    : isHybrid
      ? "bg-[#e7f5ee]"
      : "bg-[#fff7dc]";
  const buttonClass = isIndica
    ? "bg-[#6f42c1] text-white hover:bg-[#58309f]"
    : isHybrid
      ? "bg-[#087f5b] text-white hover:bg-[#065f46]"
      : "bg-[#a16207] text-white hover:bg-[#854d0e]";

  return (
    <div className="aura-page min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
            <ProductGallery
              images={product.gallery && product.gallery.length > 0 ? product.gallery : [product.image]}
              productName={product.name}
              accentBorder={accentBorder}
              accentBg={accentBg}
            />
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-[#657068]">
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
              <p className="text-lg text-[#536057]">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                <span
                  className={`px-4 py-2 rounded-full text-sm border ${accentBorder} ${accentBg}`}
                >
                  {product.flavor}
                </span>
                <span className="rounded-full border border-[#dfe5df] bg-white px-4 py-2 text-sm">
                  {product.size}
                </span>
                <span className="rounded-full border border-[#dfe5df] bg-white px-4 py-2 text-sm">
                  {product.price}
                </span>
              </div>
              <div>
                <p className="mb-2 text-sm uppercase tracking-wider text-[#657068]">
                  Effects
                </p>
                <p className="text-[#536057]">{product.effects}</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/store"
                  className="rounded-full border border-[#bcc8be] px-6 py-3 text-center text-[#46554c] transition-colors hover:bg-[#eef1ea]"
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
            <div className="rounded-3xl border border-[#dfe5df] bg-white p-10 lg:col-span-2">
              <h2 className="text-3xl font-semibold mb-4">
                About This Release
              </h2>
              <p className="leading-relaxed text-[#536057]">
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
                    <span className="text-[#657068]">{spec.label}</span>
                    <span className="font-semibold">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
            <div className="rounded-3xl border border-[#dfe5df] bg-white p-8">
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
            <div className="rounded-3xl border border-[#dfe5df] bg-white p-8">
              <h3 className="text-2xl font-semibold mb-4">Experience</h3>
              <p className="leading-relaxed text-[#536057]">
                {product.experience}
              </p>
            </div>
            <div className="rounded-3xl border border-[#dfe5df] bg-white p-8">
              <h3 className="text-2xl font-semibold mb-4">Finish</h3>
              <p className="leading-relaxed text-[#536057]">{product.finish}</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
