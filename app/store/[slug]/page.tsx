import Link from "next/link"
import { notFound } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import PurchaseRequestDialog from "@/components/PurchaseRequestDialog"
import { MoonIcon, SunIcon } from "@/components/Icons"

const products = [
  {
    slug: "aura-no-1",
    name: "Aura No. 1",
    type: "indica",
    image: "/images/store/aura-store-01.jpeg",
    flavor: "Lorem Blend",
    size: "2ml",
    price: "$40",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices gravida dictum fusce ut placerat orci nulla.",
    experience:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    finish:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    notes: ["Lorem Pine", "Ipsum Resin", "Dolor Spice", "Sit Citrus"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
  {
    slug: "aura-no-2",
    name: "Aura No. 2",
    type: "sativa",
    image: "/images/store/aura-store-02.jpeg",
    flavor: "Lorem Zest",
    size: "1ml",
    price: "$38",
    description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    overview:
      "Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Nibh venenatis cras sed felis eget.",
    experience:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    finish:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.",
    notes: ["Lorem Citrus", "Ipsum Bloom", "Dolor Sweet", "Sit Bright"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
  {
    slug: "aura-no-3",
    name: "Aura No. 3",
    type: "indica",
    image: "/images/store/aura-store-03.jpeg",
    flavor: "Lorem Drift",
    size: "1ml",
    price: "$36",
    description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
    overview:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
    experience:
      "Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim.",
    finish:
      "Curabitur non nulla sit amet nisl tempus convallis quis ac lectus.",
    notes: ["Lorem Floral", "Ipsum Smoke", "Dolor Calm", "Sit Velvet"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
  {
    slug: "aura-no-4",
    name: "Aura No. 4",
    type: "sativa",
    image: "/images/store/aura-store-01.jpeg",
    flavor: "Lorem Pulse",
    size: "2ml",
    price: "$44",
    description: "Duis aute irure dolor in reprehenderit in voluptate velit esse.",
    overview:
      "Vivamus suscipit tortor eget felis porttitor volutpat. Pellentesque in ipsum id orci porta dapibus.",
    experience:
      "Donec sollicitudin molestie malesuada. Proin eget tortor risus.",
    finish:
      "Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui.",
    notes: ["Lorem Berry", "Ipsum Spark", "Dolor Lift", "Sit Energy"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
  {
    slug: "aura-no-5",
    name: "Aura No. 5",
    type: "indica",
    image: "/images/store/aura-store-02.jpeg",
    flavor: "Lorem Mint",
    size: "2ml",
    price: "$42",
    description: "Excepteur sint occaecat cupidatat non proident, sunt in culpa.",
    overview:
      "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec rutrum congue leo eget malesuada.",
    experience:
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
    finish:
      "Curabitur aliquet quam id dui posuere blandit.",
    notes: ["Lorem Mint", "Ipsum Cool", "Dolor Shadow", "Sit Crisp"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
  {
    slug: "aura-no-6",
    name: "Aura No. 6",
    type: "sativa",
    image: "/images/store/aura-store-03.jpeg",
    flavor: "Lorem Wave",
    size: "1ml",
    price: "$36",
    description: "Mollit anim id est laborum, luctus et ultrices posuere cubilia.",
    overview:
      "Nulla quis lorem ut libero malesuada feugiat. Vivamus magna justo, lacinia eget consectetur sed, convallis at tellus.",
    experience:
      "Cras ultricies ligula sed magna dictum porta. Nulla porttitor accumsan tincidunt.",
    finish:
      "Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    notes: ["Lorem Citrus", "Ipsum Lift", "Dolor Glow", "Sit Clean"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
  {
    slug: "aura-no-7",
    name: "Aura No. 7",
    type: "indica",
    image: "/images/store/aura-store-01.jpeg",
    flavor: "Lorem Noir",
    size: "2ml",
    price: "$43",
    description: "Pellentesque habitant morbi tristique senectus et netus et malesuada.",
    overview:
      "Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat.",
    experience:
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
    finish:
      "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
    notes: ["Lorem Noir", "Ipsum Resin", "Dolor Depth", "Sit Echo"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
]

export default function StoreProductPage({ params }: { params: { slug: string } }) {
  const product = products.find((item) => item.slug === params.slug)

  if (!product) {
    notFound()
  }

  const isIndica = product.type === "indica"
  const accentText = isIndica ? "text-purple-300" : "text-yellow-300"
  const accentBorder = isIndica ? "border-purple-700/60" : "border-yellow-400/40"
  const accentBg = isIndica ? "bg-purple-900/20" : "bg-yellow-500/10"
  const buttonClass = isIndica
    ? "bg-purple-700 text-white hover:bg-purple-600"
    : "bg-yellow-400 text-black hover:bg-yellow-300"

  return (
    <div className="bg-black text-white min-h-screen">
      <Header />
      <main className="pt-24">
        <section className="py-16 px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
            <div className={`rounded-3xl border ${accentBorder} ${accentBg} p-10`}>
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
                ) : (
                  <SunIcon className={accentText} width={18} height={18} />
                )}
                <span>{product.type}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold">{product.name}</h1>
              <p className="text-lg text-gray-300">{product.description}</p>
              <div className="flex flex-wrap gap-3">
                <span className={`px-4 py-2 rounded-full text-sm border ${accentBorder} ${accentBg}`}>
                  {product.flavor}
                </span>
                <span className="px-4 py-2 rounded-full text-sm border border-gray-800 bg-gray-900/60">
                  {product.size}
                </span>
                <span className="px-4 py-2 rounded-full text-sm border border-gray-800 bg-gray-900/60">
                  {product.price}
                </span>
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
                <PurchaseRequestDialog productName={product.name} buttonClass={buttonClass} />
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 border border-gray-800 rounded-3xl p-10 bg-gray-900/40">
              <h2 className="text-3xl font-semibold mb-4">About This Release</h2>
              <p className="text-gray-300 leading-relaxed">{product.overview}</p>
            </div>
            <div className={`border ${accentBorder} ${accentBg} rounded-3xl p-8`}>
              <h3 className="text-2xl font-semibold mb-6">Specifications</h3>
              <div className="space-y-4">
                {product.specs.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between text-sm">
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
                  <span key={note} className={`px-3 py-1 rounded-full text-sm border ${accentBorder} ${accentBg}`}>
                    {note}
                  </span>
                ))}
              </div>
            </div>
            <div className="border border-gray-800 rounded-3xl p-8 bg-black/60">
              <h3 className="text-2xl font-semibold mb-4">Experience</h3>
              <p className="text-gray-300 leading-relaxed">{product.experience}</p>
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
  )
}
