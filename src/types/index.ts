export interface Product {
  id: string
  name: string
  description: string
  price: number
  discountPrice?: number
  image: string
  images: string[]
  rating: number
  reviewsCount: number
  category: string
  stock: number
  tags: string[]
  isFeatured?: boolean
  isTrending?: boolean
  specs: Record<string, string>
  subcategory?: string
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  date: string
  avatar?: string
}

export interface Address {
  id: string
  name: string
  street: string
  city: string
  state: string
  zipCode: string
  country: string
  isDefault: boolean
}

export interface PaymentMethod {
  id: string
  cardHolder: string
  cardNumber: string
  expiry: string
  cardType: string
}

export interface Order {
  id: string
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  trackingNumber?: string
  address: Address
  date: string
  paymentMethod: string
}

export interface User {
  id: string
  name: string
  email: string
  addresses: Address[]
  paymentMethods: PaymentMethod[]
  profilePic?: string
}

export interface Coupon {
  code: string
  discountType: "percentage" | "fixed"
  value: number
  minPurchase?: number
}
