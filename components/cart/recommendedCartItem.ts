type RecommendedCartItemInput = {
  slug: string
  name: string
  format: string
  unitPrice: number
}

export function buildRecommendedCartItem({
  slug,
  name,
  format,
  unitPrice,
}: RecommendedCartItemInput) {
  return {
    id: `${slug}:${format}`,
    slug,
    name,
    image: `/images/cutouts/${slug}.png`,
    format,
    unitPrice,
  }
}
