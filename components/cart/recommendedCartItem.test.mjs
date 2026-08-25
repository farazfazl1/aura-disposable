import assert from "node:assert/strict"
import test from "node:test"
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
