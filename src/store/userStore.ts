import { create } from "zustand"
import { User, Address, PaymentMethod } from "../types"

interface UserState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  signup: (name: string, email: string, password: string) => Promise<boolean>
  updateProfile: (name: string, email: string, profilePic?: string) => void
  addAddress: (address: Omit<Address, "id">) => void
  removeAddress: (id: string) => void
  updateAddress: (id: string, address: Partial<Address>) => void
  setDefaultAddress: (id: string) => void
  addPaymentMethod: (payment: Omit<PaymentMethod, "id">) => void
  removePaymentMethod: (id: string) => void
}

const mockInitialUser: User = {
  id: "u-101",
  name: "John Doe",
  email: "john.doe@example.com",
  profilePic: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  addresses: [
    {
      id: "addr-1",
      name: "Home",
      street: "123 Main Street, Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      isDefault: true,
    },
    {
      id: "addr-2",
      name: "Office",
      street: "500 5th Avenue, Fl 18",
      city: "New York",
      state: "NY",
      zipCode: "10110",
      country: "United States",
      isDefault: false,
    },
  ],
  paymentMethods: [
    {
      id: "pm-1",
      cardHolder: "JOHN DOE",
      cardNumber: "**** **** **** 4242",
      expiry: "12/28",
      cardType: "Visa",
    },
    {
      id: "pm-2",
      cardHolder: "JOHN DOE",
      cardNumber: "**** **** **** 5555",
      expiry: "09/27",
      cardType: "Mastercard",
    },
  ],
}

export const useUserStore = create<UserState>((set) => ({
  user: mockInitialUser,
  isAuthenticated: true, // Default to logged in for premium demo feel
  isLoading: false,

  login: async (email, password) => {
    set({ isLoading: true })
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulation
    const success = email.length > 0 && password.length > 4
    if (success) {
      set({
        user: {
          id: "u-" + Math.random().toString(36).substr(2, 9),
          name: email.split("@")[0].toUpperCase(),
          email,
          addresses: mockInitialUser.addresses,
          paymentMethods: mockInitialUser.paymentMethods,
        },
        isAuthenticated: true,
        isLoading: false,
      })
      return true
    }
    set({ isLoading: false })
    return false
  },

  logout: () => {
    set({ user: null, isAuthenticated: false })
  },

  signup: async (name, email, password) => {
    set({ isLoading: true })
    await new Promise((resolve) => setTimeout(resolve, 800)) // Simulation
    if (name && email && password.length > 4) {
      set({
        user: {
          id: "u-" + Math.random().toString(36).substr(2, 9),
          name,
          email,
          addresses: [],
          paymentMethods: [],
        },
        isAuthenticated: true,
        isLoading: false,
      })
      return true
    }
    set({ isLoading: false })
    return false
  },

  updateProfile: (name, email, profilePic) => {
    set((state) => {
      if (!state.user) return {}
      return {
        user: {
          ...state.user,
          name,
          email,
          profilePic: profilePic || state.user.profilePic,
        },
      }
    })
  },

  addAddress: (address) => {
    set((state) => {
      if (!state.user) return {}
      const newAddress: Address = {
        ...address,
        id: "addr-" + Math.random().toString(36).substr(2, 9),
        isDefault: state.user.addresses.length === 0 ? true : address.isDefault,
      }
      
      let updatedAddresses = [...state.user.addresses]
      if (newAddress.isDefault) {
        updatedAddresses = updatedAddresses.map((a) => ({ ...a, isDefault: false }))
      }
      updatedAddresses.push(newAddress)

      return {
        user: {
          ...state.user,
          addresses: updatedAddresses,
        },
      }
    })
  },

  removeAddress: (id) => {
    set((state) => {
      if (!state.user) return {}
      const updatedAddresses = state.user.addresses.filter((a) => a.id !== id)
      // If we removed default address, make another one default
      if (updatedAddresses.length > 0 && !updatedAddresses.some((a) => a.isDefault)) {
        updatedAddresses[0].isDefault = true
      }
      return {
        user: {
          ...state.user,
          addresses: updatedAddresses,
        },
      }
    })
  },

  updateAddress: (id, updatedFields) => {
    set((state) => {
      if (!state.user) return {}
      let updatedAddresses = state.user.addresses.map((a) =>
        a.id === id ? { ...a, ...updatedFields } : a
      )
      
      if (updatedFields.isDefault) {
        updatedAddresses = updatedAddresses.map((a) =>
          a.id === id ? { ...a, isDefault: true } : { ...a, isDefault: false }
        )
      }
      return {
        user: {
          ...state.user,
          addresses: updatedAddresses,
        },
      }
    })
  },

  setDefaultAddress: (id) => {
    set((state) => {
      if (!state.user) return {}
      const updatedAddresses = state.user.addresses.map((a) => ({
        ...a,
        isDefault: a.id === id,
      }))
      return {
        user: {
          ...state.user,
          addresses: updatedAddresses,
        },
      }
    })
  },

  addPaymentMethod: (payment) => {
    set((state) => {
      if (!state.user) return {}
      const newPayment: PaymentMethod = {
        ...payment,
        id: "pm-" + Math.random().toString(36).substr(2, 9),
      }
      return {
        user: {
          ...state.user,
          paymentMethods: [...state.user.paymentMethods, newPayment],
        },
      }
    })
  },

  removePaymentMethod: (id) => {
    set((state) => {
      if (!state.user) return {}
      return {
        user: {
          ...state.user,
          paymentMethods: state.user.paymentMethods.filter((pm) => pm.id !== id),
        },
      }
    })
  },
}))
