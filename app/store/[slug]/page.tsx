import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PurchaseRequestDialog from "@/components/PurchaseRequestDialog";
import { MoonIcon, SunIcon } from "@/components/Icons";

const products = [
  {
    slug: "sweet-island-skunk",
    name: "Sweet Island Skunk",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/store/photo_1404-12-09 12.11.21 PM.jpeg",
    flavor: "Coconut • Guava • Mango • Pineapple • Skunk",
    effects: "Creative Energy • Uplifted • Happy • Focused",
    size: "1ml . 2ml",
    price: "$100",
    description:
      "Elevate your session with Sweet Island Skunk - a vibrant sativa profile infused with lush tropical sweetness and classic skunk depth. Bright fruit layers meet crisp herbal undertones, delivering a clean cerebral lift and an effortlessly happy vibe. Designed for daytime momentum, creativity, and social flow.",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices gravida dictum fusce ut placerat orci nulla.",
    experience:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    finish:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    notes: ["Lorem Pine", "Ipsum Resin", "Dolor Spice", "Sit Citrus"],
    specs: [{ label: "Terpenes", value: "Limonene • Pinene • Myrcene" }],
  },
  {
    slug: "blurr-dream",
    name: "Blurr Dream",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/store/photo_1404-12-09 12.11.22 PM.jpeg",
    flavor: "Sweet Blueberry",
    effects: "Creative, Energy, Focus, Uplift",
    size: "1ml . 2ml",
    price: "$100",
    description:
      "Blurr Dream is a vibrant berry-forward strain profile inspired by the classic fusion of Blueberry and Haze. Juicy blueberry sweetness opens the experience, layered with subtle citrus brightness and fresh pine undertones. Smooth on the inhale and clean on the finish — designed for daytime creativity, mental clarity, and an elevated social rhythm.",
    overview:
      "Quis ipsum suspendisse ultrices gravida dictum fusce ut placerat orci nulla. Nibh venenatis cras sed felis eget.",
    experience:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.",
    finish:
      "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur.",
    notes: ["Lorem Citrus", "Ipsum Bloom", "Dolor Sweet", "Sit Bright"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Terpenes", value: "Limonene • Pinene • Myrcene • Ocimene" },
    ],
  },
  {
    slug: "double-bubble-og",
    name: "Double Bubble OG",
    type: "indica",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/store/photo_1404-12-09 12.11.19 PM.jpeg",
    flavor: "Berry, Bubble Gum, Earthy",
    effects: "Calm, Rest, Deep Relaxation",
    size: "1ml . 2ml",
    price: "$100",
    description:
      "Double Buble OG is a rich, dessert-inspired indica profile blending sweet berry notes with nostalgic bubble gum and smooth earthy depth. Creamy on the inhale and grounding on the finish, this strain is crafted for evening wind-down, body ease, and tranquil rest.",
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
    slug: "og-mint",
    name: "OG Mint",
    type: "indica",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/store/photo_1404-12-09 12.11.16 PM.jpeg",
    flavor: "Cool Mint • Earthy OG • Pine •",
    effects: "Deep Relaxation • Body Calm • Restful",
    size: "1ml . 2ml",
    price: "$100",
    description:
      "OG Mint is a cool, earthy indica profile layered with crisp mint and classic OG depth. Smooth on the inhale with a refreshing herbal finish, this strain settles into a soothing full-body calm. Crafted for evening wind-down, quiet moments, and deep restorative rest.",
    overview:
      "Mauris blandit aliquet elit, eget tincidunt nibh pulvinar a. Donec rutrum congue leo eget malesuada.",
    experience:
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
    finish: "Curabitur aliquet quam id dui posuere blandit.",
    notes: ["Lorem Mint", "Ipsum Cool", "Dolor Shadow", "Sit Crisp"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
  {
    slug: "saffron",
    name: "Saffron",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/store/photo_1404-12-09 12.11.20 PM.jpeg",
    flavor: "Exotic Spice, Floral, Sweet Citrus",
    size: "1ml - 2ml",
    price: "$100",
    description:
      "Saffron is a rare, spice-forward sativa profile inspired by the warmth and elegance of golden saffron threads. Delicate floral sweetness blends with subtle citrus brightness and a smooth herbal finish. Light on the body yet vibrant in the mind - crafted for daytime clarity, elevated mood, and creative momentum.",
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
    slug: "blueberry",
    name: "Blueberry",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/store/photo_1404-12-09 12.11.12 PM.jpeg",
    flavor: "Sweet Blueberry, Light Citrus",
    size: "1ml - 2ml",
    price: "$100",
    description:
      "Blueberry is a vibrant fruit-forward sativa bursting with juicy berry sweetness and a subtle citrus lift. Smooth and clean on the inhale, it delivers a bright cerebral buzz with steady focus and feel-good energy - perfect for daytime creativity and social flow.",
    overview:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ultrices gravida dictum fusce ut placerat orci nulla.",
    experience:
      "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium.",
    finish:
      "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam.",
    notes: ["Lorem Pine", "Ipsum Resin", "Dolor Spice", "Sit Citrus"],
    specs: [{ label: "Terpenes", value: "Limonene • Pinene • Myrcene" }],
  },
  {
    slug: "aura-no-7",
    name: "Aura No. 7",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/store/photo_1404-12-09 12.11.12 PM.jpeg",
    flavor: "Sweet Blueberry, Light Citrus",
    size: "1ml - 2ml",
    price: "$100",
    description:
      "Blueberry is a vibrant fruit-forward sativa bursting with juicy berry sweetness and a subtle citrus lift. Smooth and clean on the inhale, it delivers a bright cerebral buzz with steady focus and feel-good energy - perfect for daytime creativity and social flow.",
    overview:
      "Sed porttitor lectus nibh. Vivamus suscipit tortor eget felis porttitor volutpat.",
    experience:
      "Praesent sapien massa, convallis a pellentesque nec, egestas non nisi.",
    finish: "Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem.",
    notes: ["Lorem Noir", "Ipsum Resin", "Dolor Depth", "Sit Echo"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
  {
    slug: "jealousy",
    name: "Jealousy",
    type: "hybrid",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/store/photo_1404-12-09 12.11.20 PM.jpeg",
    flavor: "Earthy • Fruity • Kush",
    effects: "Creative Boost • Euphoria • Talkative • Social Energy",
    size: "1ml - 2ml",
    price: "$100",
    description:
      "Elevate your experience with Jealousy - a refined hybrid that blends earthy richness with vibrant fruit undertones. Designed for smooth mental uplift and relaxed body ease, this strain delivers social warmth, giggly euphoria, and effortless clarity.",
    overview:
      "A balanced hybrid profile built for a calm body feel with a bright, social headspace.",
    experience:
      "Smooth uplift with a comfortable, grounded finish that stays clear and functional.",
    finish: "Clean kush notes with a subtle fruity sweetness.",
    notes: ["Earthy Kush", "Bright Fruit", "Smooth Uplift", "Social Ease"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
];

export default function StoreProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const requestedSlug = decodeURIComponent(params.slug).toLowerCase();
  const product = products.find(
    (item) => item.slug.toLowerCase() === requestedSlug,
  );

  if (!product) {
    notFound();
  }

  const isIndica = product.type === "indica";
  const accentText = isIndica ? "text-purple-300" : "text-yellow-300";
  const accentBorder = isIndica
    ? "border-purple-700/60"
    : "border-yellow-400/40";
  const accentBg = isIndica ? "bg-purple-900/20" : "bg-yellow-500/10";
  const buttonClass = isIndica
    ? "bg-purple-700 text-white hover:bg-purple-600"
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
