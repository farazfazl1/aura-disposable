"use client"

import { createContext, useContext, useMemo, useState, type ReactNode } from "react"
import type { StoreProductColor } from "@/lib/storeCatalog"

type ProductColorContextValue = {
  colors: StoreProductColor[]
  selectedColor: StoreProductColor | null
  selectColor: (colorId: string) => void
}

const ProductColorContext = createContext<ProductColorContextValue | null>(null)

export default function ProductColorProvider({
  colors,
  children,
}: {
  colors: StoreProductColor[]
  children: ReactNode
}) {
  const [selectedColorId, setSelectedColorId] = useState(colors[0]?.id ?? "")

  const value = useMemo<ProductColorContextValue>(() => {
    const selectedColor = colors.find((color) => color.id === selectedColorId) ?? colors[0] ?? null

    return {
      colors,
      selectedColor,
      selectColor: (colorId) => {
        if (colors.some((color) => color.id === colorId)) setSelectedColorId(colorId)
      },
    }
  }, [colors, selectedColorId])

  return <ProductColorContext.Provider value={value}>{children}</ProductColorContext.Provider>
}

export function useProductColor() {
  return useContext(ProductColorContext)
}
