export type VapeType = "indica" | "sativa" | "hybrid";

export type StoreProduct = {
  slug: string;
  name: string;
  type: VapeType;
  grade: string;
  image: string;
  gallery: string[];
  flavor: string;
  effects: string;
  size: string;
  price: string;
  description: string;
  overview: string;
  experience: string;
  finish: string;
  notes: string[];
  specs: { label: string; value: string }[];
};

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    slug: "sweet-island",
    name: "Sweet Island",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/12.jpg",
    gallery: ["/images/12.jpg", "/images/4.jpg"],
    flavor: "Coconut • Guava • Mango • Pineapple",
    effects: "Creative Energy • Uplifted • Happy • Focused",
    size: "1ml . 2ml",
    price: "$20",
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
    slug: "blue-dream",
    name: "Blue Dream",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/8.jpg",
    gallery: ["/images/8.jpg", "/images/5.jpg"],
    flavor: "Sweet Blueberry",
    effects: "Creative, Energy, Focus, Uplift",
    size: "1ml . 2ml",
    price: "$20",
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
    slug: "og",
    name: "OG",
    type: "indica",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/IMG_20260408_135851_018.jpg",
    gallery: ["/images/IMG_20260408_135851_018.jpg"],
    flavor: "Berry, Bubble Gum, Earthy",
    effects: "Calm, Rest, Deep Relaxation",
    size: "1ml . 2ml",
    price: "$20",
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
    image: "/images/10.jpg",
    gallery: ["/images/10.jpg", "/images/6.jpg"],
    flavor: "Cool Mint • Earthy OG • Pine •",
    effects: "Deep Relaxation • Body Calm • Restful",
    size: "1ml . 2ml",
    price: "$20",
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
    slug: "persian-gold",
    name: "Persian Gold",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/9.jpg",
    gallery: ["/images/9.jpg", "/images/2 (1).jpg"],
    flavor: "Exotic Spice, Floral, Sweet Citrus",
    effects: "Uplifted • Creative Energy • Focus • Euphoric",
    size: "1ml - 2ml",
    price: "$20",
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
    image: "/images/13.jpg",
    gallery: ["/images/13.jpg", "/images/1.jpg"],
    flavor: "Sweet Blueberry, Light Citrus",
    effects: "Uplifted • Creative Energy • Focus • Happy",
    size: "1ml - 2ml",
    price: "$20",
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
    slug: "jealousy",
    name: "Jealousy",
    type: "hybrid",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/11.jpg",
    gallery: ["/images/11.jpg", "/images/3.jpg"],
    flavor: "Earthy • Fruity • Kush",
    effects: "Creative Boost • Euphoria • Talkative • Social Energy",
    size: "1ml - 2ml",
    price: "$20",
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
  {
    slug: "laughing-buddha",
    name: "Laughing Buddha",
    type: "sativa",
    grade: "Premium Grade | 80-90% THC",
    image: "/images/7.jpg",
    gallery: ["/images/7.jpg"],
    flavor: "Earthy • Gas • Pine",
    effects: "Energetic • Uplifted • Euphoric • Focused",
    size: "1ml • 2ml",
    price: "$20",
    description:
      "Step into a brighter state with Laughing Buddha - a vibrant sativa expression infused with earthy depth, light gassy character, and fresh pine clarity. Its balanced profile creates an energetic and uplifting headspace designed for daytime movement, positive mood, and sharp creative flow.",
    overview:
      "A vibrant sativa expression infused with earthy depth, light gassy character, and fresh pine clarity.",
    experience:
      "An energetic and uplifting headspace designed for daytime movement.",
    finish: "Fresh pine clarity with a light gassy character.",
    notes: ["Earthy", "Gas", "Pine"],
    specs: [
      { label: "THC", value: "80-90%" },
      { label: "Battery", value: "Premium Core" },
      { label: "Device", value: "Disposable" },
      { label: "Series", value: "Aura Signature" },
    ],
  },
];

const FEATURED_SLUG_ORDER = [
  "sweet-island-skunk",
  "blurr-dream",
  "double-bubble-og",
  "og-mint",
  "saffron",
  "blueberry",
  "laughing-buddha",
  "jealousy",
] as const;

export function getFeaturedStoreProducts(): StoreProduct[] {
  const bySlug = new Map(STORE_PRODUCTS.map((p) => [p.slug, p]));
  return FEATURED_SLUG_ORDER.map((slug) => bySlug.get(slug)).filter(
    (p): p is StoreProduct => Boolean(p),
  );
}

export function storeProductsByType(type: VapeType): StoreProduct[] {
  return STORE_PRODUCTS.filter((p) => p.type === type);
}

function splitToTags(s: string): string[] {
  return s
    .split(/[•,]/)
    .map((x) => x.trim())
    .filter(Boolean);
}

function terpenesFromSpecs(specs: StoreProduct["specs"]): string[] {
  const row = specs.find((x) => x.label.toLowerCase() === "terpenes");
  if (row) return splitToTags(row.value);
  return ["Curated terpene blend"];
}

function parseSizes(size: string): string[] {
  const matches = size.match(/\d+\s*ml/gi);
  if (matches?.length) {
    return matches.map((m) => m.replace(/\s+/g, "").toLowerCase());
  }
  return ["1ml", "2ml"];
}

const SHOWCASE_COLORS: Record<
  string,
  { color: string; hoverColor: string; textColor: string }
> = {
  "sweet-island-skunk": {
    color: "#4CB4A1",
    hoverColor: "#5DC5B2",
    textColor: "text-white",
  },
  "blurr-dream": {
    color: "#5B7FD1",
    hoverColor: "#6B8FE1",
    textColor: "text-white",
  },
  "double-bubble-og": {
    color: "#4a2c5c",
    hoverColor: "#5c3a72",
    textColor: "text-white",
  },
  "og-mint": {
    color: "#6c776e",
    hoverColor: "#7c877e",
    textColor: "text-white",
  },
  saffron: {
    color: "#D4AF37",
    hoverColor: "#E5C048",
    textColor: "text-gray-900",
  },
  blueberry: {
    color: "#354377",
    hoverColor: "#455487",
    textColor: "text-white",
  },
  "laughing-buddha": {
    color: "#EAB308",
    hoverColor: "#FACC15",
    textColor: "text-gray-900",
  },
  jealousy: {
    color: "#2B5D5B",
    hoverColor: "#3A6F6D",
    textColor: "text-white",
  },
};

export type ShowcaseProduct = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  effects: string[];
  flavors: string[];
  terpenes: string[];
  thcContent: string;
  color: string;
  textColor: string;
  hoverColor: string;
  sizes: string[];
};

export function storeProductToShowcase(p: StoreProduct): ShowcaseProduct {
  const palette = SHOWCASE_COLORS[p.slug] ?? {
    color: "#111827",
    hoverColor: "#1f2937",
    textColor: "text-white",
  };
  return {
    slug: p.slug,
    name: p.name,
    tagline: p.grade,
    description: p.description,
    effects: splitToTags(p.effects),
    flavors: splitToTags(p.flavor),
    terpenes: terpenesFromSpecs(p.specs),
    thcContent: p.grade,
    color: palette.color,
    textColor: palette.textColor,
    hoverColor: palette.hoverColor,
    sizes: parseSizes(p.size),
  };
}

export function showcaseProductsForType(type: VapeType): ShowcaseProduct[] {
  return storeProductsByType(type).map(storeProductToShowcase);
}
