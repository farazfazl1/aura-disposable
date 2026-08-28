import assert from "node:assert/strict"
import test from "node:test"
import { STORE_PRODUCTS } from "../../lib/storeCatalog.ts"
import { normalizeCartItemVariant } from "./cartItemVariant.ts"
import { buildRecommendedCartItem } from "./recommendedCartItem.ts"

test("recommended products use the same cutout image as direct product-page additions", () => {
  const item = buildRecommendedCartItem({
    slug: "sweet-island",
    name: "Sweet Island",
    format: "2ml",
    unitPrice: 40,
  })

  assert.deepEqual(item, {
    id: "sweet-island:2ml",
    slug: "sweet-island",
    name: "Sweet Island",
    image: "/images/cutouts/sweet-island.png",
    format: "2ml",
    unitPrice: 40,
  })
})

test("the catalog assigns the Ivory variant to Laughing Buddha, not OG", () => {
  const og = STORE_PRODUCTS.find((product) => product.slug === "og")
  const laughingBuddha = STORE_PRODUCTS.find((product) => product.slug === "laughing-buddha")

  assert.equal(og?.colors, undefined)
  assert.deepEqual(laughingBuddha?.colors, [
    {
      id: "black",
      name: "Black",
      image: "/images/cutouts/laughing-buddha.png",
      swatch: "#1b1a19",
    },
    {
      id: "ivory",
      name: "Ivory",
      image: "/images/cutouts/laughing-buddha-ivory.png",
      swatch: "#e7e5da",
    },
  ])
})

test("recommended Laughing Buddha items preserve the default color variant", () => {
  const item = buildRecommendedCartItem({
    slug: "laughing-buddha",
    name: "Laughing Buddha",
    format: "2ml",
    unitPrice: 40,
    colorId: "black",
    color: "Black",
    image: "/images/cutouts/laughing-buddha.png",
  })

  assert.deepEqual(item, {
    id: "laughing-buddha:2ml:black",
    slug: "laughing-buddha",
    name: "Laughing Buddha",
    image: "/images/cutouts/laughing-buddha.png",
    format: "2ml",
    color: "Black",
    unitPrice: 40,
  })
})

test("cart normalization removes the retired Ivory variant from OG", () => {
  const item = normalizeCartItemVariant(
    {
      id: "og:1ml:ivory",
      slug: "og",
      name: "OG",
      image: "/images/cutouts/og-ivory.png",
      format: "1ml",
      color: "Ivory",
      unitPrice: 40,
      quantity: 2,
    },
    [],
  )

  assert.deepEqual(item, {
    id: "og:1ml",
    slug: "og",
    name: "OG",
    image: "/images/cutouts/og.png",
    format: "1ml",
    color: undefined,
    unitPrice: 40,
    quantity: 2,
  })
})

test("cart normalization applies Laughing Buddha's default Black variant", () => {
  const laughingBuddha = STORE_PRODUCTS.find((product) => product.slug === "laughing-buddha")
  const item = normalizeCartItemVariant(
    {
      id: "laughing-buddha:2ml",
      slug: "laughing-buddha",
      name: "Laughing Buddha",
      image: "/images/cutouts/laughing-buddha.png",
      format: "2ml",
      unitPrice: 40,
      quantity: 1,
    },
    laughingBuddha?.colors ?? [],
  )

  assert.deepEqual(item, {
    id: "laughing-buddha:2ml:black",
    slug: "laughing-buddha",
    name: "Laughing Buddha",
    image: "/images/cutouts/laughing-buddha.png",
    format: "2ml",
    color: "Black",
    unitPrice: 40,
    quantity: 1,
  })
})
