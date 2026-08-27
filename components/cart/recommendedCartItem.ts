type RecommendedCartItemInput = {
  slug: string
  name: string
  format: string
  unitPrice: number
  colorId?: string
  color?: string
  image?: string
}

export function buildRecommendedCartItem({
  slug,
  name,
  format,
  unitPrice,
  colorId,
  color,
  image,
}: RecommendedCartItemInput) {
  return {
    id: [slug, format, colorId].filter(Boolean).join(":"),
    slug,
    name,
    image: image ?? `/images/cutouts/${slug}.png`,
    format,
    ...(color ? { color } : {}),
    unitPrice,
  }
}
