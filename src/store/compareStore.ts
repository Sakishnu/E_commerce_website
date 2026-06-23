import { create } from "zustand"
import { Product } from "../types"

interface CompareState {
  compareList: Product[]
  addToCompare: (product: Product) => { success: boolean; message: string }
  removeFromCompare: (productId: string) => void
  clearCompare: () => void
  isInCompare: (productId: string) => boolean
}

export const useCompareStore = create<CompareState>((set, get) => ({
  compareList: [],

  addToCompare: (product) => {
    const list = get().compareList
    if (list.some((item) => item.id === product.id)) {
      return { success: false, message: "Product is already in the comparison list!" }
    }
    if (list.length >= 3) {
      return { success: false, message: "You can compare a maximum of 3 products at a time!" }
    }
    set({ compareList: [...list, product] })
    return { success: true, message: "Added to comparison list!" }
  },

  removeFromCompare: (productId) => {
    set((state) => ({
      compareList: state.compareList.filter((item) => item.id !== productId),
    }))
  },

  clearCompare: () => {
    set({ compareList: [] })
  },

  isInCompare: (productId) => {
    return get().compareList.some((item) => item.id === productId)
  },
}))
