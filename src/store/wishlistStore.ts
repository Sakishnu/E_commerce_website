import { create } from "zustand"
import { Product } from "../types"

interface WishlistState {
  wishlist: Product[]
  toggleWishlist: (product: Product) => void
  isInWishlist: (productId: string) => boolean
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  wishlist: [],

  toggleWishlist: (product) => {
    set((state) => {
      const exists = state.wishlist.some((item) => item.id === product.id)
      if (exists) {
        return { wishlist: state.wishlist.filter((item) => item.id !== product.id) }
      } else {
        return { wishlist: [...state.wishlist, product] }
      }
    })
  },

  isInWishlist: (productId) => {
    return get().wishlist.some((item) => item.id === productId)
  },
}))
