import { create } from "zustand"
import { CartItem, Product, Coupon } from "../types"

interface CartState {
  cart: CartItem[]
  coupon: Coupon | null
  shippingCost: number
  addToCart: (product: Product, quantity?: number, selectedSize?: string, selectedColor?: string) => void
  removeFromCart: (productId: string, selectedSize?: string, selectedColor?: string) => void
  updateQuantity: (productId: string, quantity: number, selectedSize?: string, selectedColor?: string) => void
  clearCart: () => void
  applyCoupon: (code: string) => { success: boolean; message: string }
  removeCoupon: () => void
  getCartTotals: () => { subtotal: number; discount: number; shipping: number; total: number }
}

const MOCK_COUPONS: Record<string, Coupon> = {
  WELCOME10: { code: "WELCOME10", discountType: "percentage", value: 10 },
  SAVE20: { code: "SAVE20", discountType: "fixed", value: 20, minPurchase: 100 },
  FREESHIP: { code: "FREESHIP", discountType: "percentage", value: 0 }, // Handled separately
}

export const useCartStore = create<CartState>((set, get) => ({
  cart: [],
  coupon: null,
  shippingCost: 15, // Default flat shipping

  addToCart: (product, quantity = 1, selectedSize, selectedColor) => {
    set((state) => {
      const existingItemIndex = state.cart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === selectedSize &&
          item.selectedColor === selectedColor
      )

      let newCart = [...state.cart]
      if (existingItemIndex > -1) {
        newCart[existingItemIndex] = {
          ...newCart[existingItemIndex],
          quantity: newCart[existingItemIndex].quantity + quantity,
        }
      } else {
        newCart.push({ product, quantity, selectedSize, selectedColor })
      }

      return { cart: newCart }
    })
  },

  removeFromCart: (productId, selectedSize, selectedColor) => {
    set((state) => ({
      cart: state.cart.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === selectedSize &&
            item.selectedColor === selectedColor
          )
      ),
    }))
  },

  updateQuantity: (productId, quantity, selectedSize, selectedColor) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, selectedSize, selectedColor)
      return
    }
    set((state) => ({
      cart: state.cart.map((item) =>
        item.product.id === productId &&
        item.selectedSize === selectedSize &&
        item.selectedColor === selectedColor
          ? { ...item, quantity }
          : item
      ),
    }))
  },

  clearCart: () => {
    set({ cart: [], coupon: null })
  },

  applyCoupon: (code) => {
    const activeCoupon = MOCK_COUPONS[code.toUpperCase()]
    if (!activeCoupon) {
      return { success: false, message: "Invalid coupon code!" }
    }

    const { subtotal } = get().getCartTotals()
    if (activeCoupon.minPurchase && subtotal < activeCoupon.minPurchase) {
      return {
        success: false,
        message: `Min purchase of $${activeCoupon.minPurchase} required!`,
      }
    }

    set({ coupon: activeCoupon })
    return { success: true, message: `Coupon applied successfully!` }
  },

  removeCoupon: () => {
    set({ coupon: null })
  },

  getCartTotals: () => {
    const { cart, coupon } = get()
    const subtotal = cart.reduce((acc, item) => {
      const price = item.product.discountPrice || item.product.price
      return acc + price * item.quantity
    }, 0)

    let discount = 0
    if (coupon) {
      if (coupon.discountType === "percentage") {
        discount = (subtotal * coupon.value) / 100
      } else if (coupon.discountType === "fixed") {
        discount = coupon.value
      }
    }

    // Free shipping above $150
    const shipping = subtotal > 150 || (coupon && coupon.code === "FREESHIP") || subtotal === 0 ? 0 : 15
    const total = Math.max(0, subtotal - discount + shipping)

    return {
      subtotal,
      discount,
      shipping,
      total,
    }
  },
}))
