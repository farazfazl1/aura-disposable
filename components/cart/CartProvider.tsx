"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { calculateOrderPricing, MAX_ORDER_QUANTITY, volumeDiscountPercent } from "@/lib/pricing"
import { getStoreProductColors, isStoreFormatAvailable } from "@/lib/storeCatalog"
import { normalizeCartItemVariant } from "@/components/cart/cartItemVariant"

export type CartItem = {
  id: string
  slug: string
  name: string
  image: string
  format: string
  color?: string
  unitPrice: number
  quantity: number
}

type AddCartItem = Omit<CartItem, "quantity">

type CartContextValue = {
  items: CartItem[]
  totalItems: number
  baseSubtotal: number
  volumeSubtotal: number
  volumeSavings: number
  volumeDiscountPercent: number
  permanentDiscount: number
  total: number
  tierUnitPrice: number
  isBasketOpen: boolean
  setBasketOpen: (open: boolean) => void
  addItem: (item: AddCartItem, quantity: number) => void
  updateQuantity: (id: string, quantity: number) => void
  removeItem: (id: string) => void
  clearBasket: () => void
}

const STORAGE_KEY = "aura-basket-v1"
const CartContext = createContext<CartContextValue | null>(null)

function clampQuantity(quantity: number) {
  return Math.min(MAX_ORDER_QUANTITY, Math.max(1, Math.round(quantity)))
}

function isCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false
  const item = value as Partial<CartItem>

  return (
    typeof item.id === "string" &&
    typeof item.slug === "string" &&
    typeof item.name === "string" &&
    typeof item.image === "string" &&
    typeof item.format === "string" &&
    (item.color === undefined || typeof item.color === "string") &&
    typeof item.unitPrice === "number" &&
    Number.isFinite(item.unitPrice) &&
    typeof item.quantity === "number" &&
    Number.isFinite(item.quantity)
  )
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isBasketOpen, setBasketOpen] = useState(false)
  const [isHydrated, setIsHydrated] = useState(false)

  useEffect(() => {
    try {
      const savedBasket = window.localStorage.getItem(STORAGE_KEY)
      const parsed = savedBasket ? JSON.parse(savedBasket) : []

      if (Array.isArray(parsed)) {
        setItems(
          parsed
            .filter(isCartItem)
            .filter((item) => isStoreFormatAvailable(item.slug, item.format))
            .map((item) =>
              normalizeCartItemVariant(
                { ...item, quantity: clampQuantity(item.quantity) },
                getStoreProductColors(item.slug),
              ),
            ),
        )
      }
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
    } finally {
      setIsHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!isHydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [isHydrated, items])

  const value = useMemo<CartContextValue>(() => {
    const addItem = (item: AddCartItem, quantity: number) => {
      if (!isStoreFormatAvailable(item.slug, item.format)) return

      const safeQuantity = clampQuantity(quantity)
      const normalizedItem = normalizeCartItemVariant(item, getStoreProductColors(item.slug))

      setItems((currentItems) => {
        const existingItem = currentItems.find((currentItem) => currentItem.id === normalizedItem.id)

        if (!existingItem) return [...currentItems, { ...normalizedItem, quantity: safeQuantity }]

        return currentItems.map((currentItem) =>
          currentItem.id === normalizedItem.id
            ? { ...currentItem, quantity: clampQuantity(currentItem.quantity + safeQuantity) }
            : currentItem,
        )
      })
      setBasketOpen(true)
    }

    const updateQuantity = (id: string, quantity: number) => {
      setItems((currentItems) =>
        currentItems.map((item) =>
          item.id === id ? { ...item, quantity: clampQuantity(quantity) } : item,
        ),
      )
    }

    const removeItem = (id: string) => {
      setItems((currentItems) => currentItems.filter((item) => item.id !== id))
    }

    const totalItems = items.reduce((total, item) => total + item.quantity, 0)
    const baseSubtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0)
    const pricing = calculateOrderPricing(totalItems)

    return {
      items,
      totalItems,
      baseSubtotal,
      volumeSubtotal: pricing.volumeSubtotal,
      volumeSavings: baseSubtotal - pricing.volumeSubtotal,
      volumeDiscountPercent: volumeDiscountPercent(totalItems),
      permanentDiscount: pricing.permanentDiscount,
      total: pricing.total,
      tierUnitPrice: pricing.unitPrice,
      isBasketOpen,
      setBasketOpen,
      addItem,
      updateQuantity,
      removeItem,
      clearBasket: () => setItems([]),
    }
  }, [isBasketOpen, items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error("useCart must be used within CartProvider")
  return context
}
