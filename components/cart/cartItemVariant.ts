import type { StoreProductColor } from "@/lib/storeCatalog"

type CartItemVariant = {
  id: string
  slug: string
  image: string
  format: string
  color?: string
}

export function normalizeCartItemVariant<T extends CartItemVariant>(item: T, colors: StoreProductColor[]): T {
  if (colors.length === 0) {
    if (!item.color) return item

    return {
      ...item,
      id: `${item.slug}:${item.format.toLowerCase()}`,
      image: `/images/cutouts/${item.slug}.png`,
      color: undefined,
    }
  }

  const colorId = item.id.split(":").at(-1)?.toLowerCase()
  const selectedColor =
    colors.find(
      (color) => color.id.toLowerCase() === colorId || color.name.toLowerCase() === item.color?.toLowerCase(),
    ) ?? colors[0]

  return {
    ...item,
    id: `${item.slug}:${item.format.toLowerCase()}:${selectedColor.id}`,
    image: selectedColor.image,
    color: selectedColor.name,
  }
}
