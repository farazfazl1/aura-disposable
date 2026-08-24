export type VolumeTier = {
  minQty: number
  unitPrice: number
}

// Base price a customer pays for a single vape.
export const BASE_UNIT_PRICE = 40

// This promotion is applied after the quantity-based unit price is calculated.
export const PERMANENT_DISCOUNT_PERCENT = 30

// Orders must reach this final total after all quantity and permanent discounts.
export const MINIMUM_ORDER_TOTAL = 160

export const MAX_ORDER_QUANTITY = 1000

// Wholesale volume tiers. Once the total order quantity reaches each threshold,
// every vape in the order drops to that unit price.
export const VOLUME_TIERS: VolumeTier[] = [
  { minQty: 1, unitPrice: 40 },
  { minQty: 5, unitPrice: 39 },
  { minQty: 10, unitPrice: 38 },
  { minQty: 20, unitPrice: 37 },
  { minQty: 30, unitPrice: 36 },
  { minQty: 50, unitPrice: 35 },
  { minQty: 100, unitPrice: 34 },
  { minQty: 250, unitPrice: 33 },
  { minQty: 500, unitPrice: 31 },
  { minQty: 1000, unitPrice: 30 },
]

export function unitPriceForQuantity(quantity: number): number {
  const qty = Math.max(1, Math.floor(quantity))
  let unitPrice = BASE_UNIT_PRICE

  for (const tier of VOLUME_TIERS) {
    if (qty >= tier.minQty) {
      unitPrice = tier.unitPrice
    } else {
      break
    }
  }

  return unitPrice
}

export function nextTierForQuantity(quantity: number): VolumeTier | null {
  const qty = Math.max(1, Math.floor(quantity))
  return VOLUME_TIERS.find((tier) => tier.minQty > qty) ?? null
}

export function volumeDiscountPercent(quantity: number): number {
  const unitPrice = unitPriceForQuantity(quantity)
  return Math.round((1 - unitPrice / BASE_UNIT_PRICE) * 100)
}

function roundCurrency(amount: number): number {
  return Math.round((amount + Number.EPSILON) * 100) / 100
}

export function calculateOrderPricing(quantity: number) {
  const safeQuantity = Math.min(MAX_ORDER_QUANTITY, Math.max(0, Math.floor(quantity)))
  const unitPrice = unitPriceForQuantity(Math.max(1, safeQuantity))
  const volumeSubtotal = roundCurrency(unitPrice * safeQuantity)
  const permanentDiscount = roundCurrency(volumeSubtotal * (PERMANENT_DISCOUNT_PERCENT / 100))
  const total = roundCurrency(volumeSubtotal - permanentDiscount)

  return {
    quantity: safeQuantity,
    unitPrice,
    volumeSubtotal,
    permanentDiscount,
    total,
  }
}
