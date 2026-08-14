"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

export type CartItem = {
  id: string
  slug: string
  name: string
  image: string
  format: string
  unitPrice: number
  quantity: number
}

type AddCartItem = Omit<CartItem, "quantity">

type CartContextValue = {
  items: CartItem[]
  totalItems: number
  subtotal: number
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
  return Math.min(99, Math.max(1, Math.round(quantity)))
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
            .map((item) => ({ ...item, quantity: clampQuantity(item.quantity) })),
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
      const safeQuantity = clampQuantity(quantity)

      setItems((currentItems) => {
        const existingItem = currentItems.find((currentItem) => currentItem.id === item.id)

        if (!existingItem) return [...currentItems, { ...item, quantity: safeQuantity }]

        return currentItems.map((currentItem) =>
          currentItem.id === item.id
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

    return {
      items,
      totalItems: items.reduce((total, item) => total + item.quantity, 0),
      subtotal: items.reduce((total, item) => total + item.unitPrice * item.quantity, 0),
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
