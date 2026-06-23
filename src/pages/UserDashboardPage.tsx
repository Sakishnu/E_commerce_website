import React, { useState, useEffect } from "react"
import { useSearchParams, useNavigate, useLocation } from "react-router-dom"
import {
  User as UserIcon,
  ShoppingBag,
  MapPin,
  CreditCard,
  Truck,
  RotateCcw,
  Plus,
  Trash2,
  CheckCircle,
  Clock,
  ExternalLink,
  ChevronRight,
  LogOut,
  Save,
} from "lucide-react"
import { useUserStore } from "../store/userStore"
import { useCartStore } from "../store/cartStore"
import { useWishlistStore } from "../store/wishlistStore"
import { useNotification } from "../context/NotificationContext"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { cn } from "../utils/cn"
import { BackButton } from "../components/common/BackButton"

// Initial mock orders database
const INITIAL_MOCK_ORDERS = [
  {
    id: "ORD-930471",
    date: "2026-06-10",
    total: 249.99,
    status: "delivered",
    trackingNumber: "TRK947021590",
    paymentMethod: "Visa (ending in 4242)",
    items: [
      { product: { name: "AeroPulse Active Noise-Cancelling Headphones", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=100&h=100&q=80" }, quantity: 1 },
    ],
  },
  {
    id: "ORD-581023",
    date: "2026-06-18",
    total: 349.99,
    status: "processing",
    trackingNumber: "TRK384102941",
    paymentMethod: "Mastercard (ending in 5555)",
    items: [
      { product: { name: "Classic Maverick Leather Jacket", image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=100&h=100&q=80" }, quantity: 1 },
      { product: { name: "Apex Hydration Insulated Bottle", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=100&h=100&q=80" }, quantity: 2 },
    ],
  },
]

export const UserDashboardPage: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout, updateProfile, addAddress, removeAddress, addPaymentMethod, removePaymentMethod } = useUserStore()
  const { wishlist } = useWishlistStore()
  const { showToast } = useNotification()

  const [searchParams, setSearchParams] = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"

  const [orders, setOrders] = useState(INITIAL_MOCK_ORDERS)
  const [selectedTrackOrder, setSelectedTrackOrder] = useState<any>(null)

  // Profile Form States
  const [profileName, setProfileName] = useState(user?.name || "")
  const [profileEmail, setProfileEmail] = useState(user?.email || "")

  // Address Dialog Form
  const [addressFormOpen, setAddressFormOpen] = useState(false)
  const [addrLabel, setAddrLabel] = useState("")
  const [addrStreet, setAddrStreet] = useState("")
  const [addrCity, setAddrCity] = useState("")
  const [addrState, setAddrState] = useState("")
  const [addrZip, setAddrZip] = useState("")

  // Payment Card Dialog Form
  const [cardFormOpen, setCardFormOpen] = useState(false)
  const [cardHolder, setCardHolder] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [cardExpiry, setCardExpiry] = useState("")
  const [cardType, setCardType] = useState("Visa")

  // Return Requests States
  const [returnModalOpen, setReturnModalOpen] = useState(false)
  const [returnOrderId, setReturnOrderId] = useState("")
  const [returnReason, setReturnReason] = useState("Size incorrect")
  const [returnDetails, setReturnDetails] = useState("")

  // Sync profile details if user state loaded
  useEffect(() => {
    if (user) {
      setProfileName(user.name)
      setProfileEmail(user.email)
    }
  }, [user])

  // Synchronize route paths (like /orders or /profile) to dashboard state
  useEffect(() => {
    if (location.pathname.endsWith("/orders")) {
      setSearchParams({ tab: "orders" })
    } else if (location.pathname.endsWith("/profile")) {
      setSearchParams({ tab: "profile" })
    } else if (location.pathname.includes("/track/")) {
      const parts = location.pathname.split("/track/")
      const trkId = parts[parts.length - 1]
      if (trkId) {
        setSearchParams({ tab: "orders", trackId: trkId })
      }
    }
  }, [location.pathname])


  // Track order sync
  const trackOrderId = searchParams.get("trackId")
  useEffect(() => {
    if (trackOrderId) {
      const match = orders.find((o) => o.id === trackOrderId)
      if (match) {
        setSelectedTrackOrder(match)
      }
    }
  }, [trackOrderId, orders])

  const setTab = (tabName: string) => {
    setSearchParams({ tab: tabName })
    setSelectedTrackOrder(null)
  }

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault()
    if (profileName.trim() && profileEmail.trim()) {
      updateProfile(profileName.trim(), profileEmail.trim())
      showToast("Profile details updated successfully!", "success")
    }
  }

  const handleCreateAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (addrLabel && addrStreet && addrCity && addrState && addrZip) {
      addAddress({
        name: addrLabel,
        street: addrStreet,
        city: addrCity,
        state: addrState,
        zipCode: addrZip,
        country: "United States",
        isDefault: user?.addresses.length === 0,
      })
      showToast("New address added!", "success")
      setAddressFormOpen(false)
      // reset
      setAddrLabel("")
      setAddrStreet("")
      setAddrCity("")
      setAddrState("")
      setAddrZip("")
    }
  }

  const handleCreateCard = (e: React.FormEvent) => {
    e.preventDefault()
    if (cardHolder && cardNumber && cardExpiry) {
      // mask card number for display
      const formattedCard = `**** **** **** ${cardNumber.slice(-4)}`
      addPaymentMethod({
        cardHolder: cardHolder.toUpperCase(),
        cardNumber: formattedCard,
        expiry: cardExpiry,
        cardType,
      })
      showToast("New card saved securely!", "success")
      setCardFormOpen(false)
      // reset
      setCardHolder("")
      setCardNumber("")
      setCardExpiry("")
    }
  }

  const handleTriggerReturn = (orderId: string) => {
    setReturnOrderId(orderId)
    setReturnModalOpen(true)
  }

  const handleReturnSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    showToast(`Return request submitted for order ${returnOrderId}!`, "success")
    setReturnModalOpen(false)
    setReturnDetails("")
  }

  const handleLogout = () => {
    logout()
    showToast("Signed out successfully.", "info")
    navigate("/")
  }

  // Sidebar navigations
  const sidebarNavItems = [
    { id: "overview", label: "Overview", icon: <UserIcon className="h-4 w-4" /> },
    { id: "orders", label: "Order History", icon: <ShoppingBag className="h-4 w-4" /> },
    { id: "addresses", label: "Saved Addresses", icon: <MapPin className="h-4 w-4" /> },
    { id: "payments", label: "Saved Payments", icon: <CreditCard className="h-4 w-4" /> },
    { id: "profile", label: "Account Profile", icon: <UserIcon className="h-4 w-4" /> },
  ]

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <BackButton className="mb-6" defaultPath="/" />
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Sidebar cockpit controls */}
        <aside className="border rounded-2xl bg-card shadow-sm p-4 h-fit space-y-6">
          <div className="flex items-center gap-3 border-b pb-4">
            {user?.profilePic ? (
              <img src={user.profilePic} alt="" className="h-10 w-10 rounded-full object-cover border" />
            ) : (
              <div className="h-10 w-10 bg-primary/10 text-primary flex items-center justify-center rounded-full font-bold">
                U
              </div>
            )}
            <div className="overflow-hidden">
              <h4 className="text-xs font-bold text-foreground truncate">{user?.name}</h4>
              <p className="text-[10px] text-muted-foreground truncate">{user?.email}</p>
            </div>
          </div>

          <nav className="flex flex-col gap-1">
            {sidebarNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={cn(
                  "flex items-center gap-2.5 w-full p-2.5 text-xs font-bold rounded-lg text-left transition-colors",
                  activeTab === item.id && !selectedTrackOrder
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground/80 hover:bg-muted"
                )}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2.5 w-full p-2.5 text-xs font-bold text-red-500 rounded-lg text-left hover:bg-red-500/5 transition-colors mt-4 border-t pt-4"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </nav>
        </aside>

        {/* Dashboard Panels */}
        <div className="lg:col-span-3">
          
          {/* TAB 1: OVERVIEW PANEL */}
          {activeTab === "overview" && !selectedTrackOrder && (
            <div className="space-y-8 animate-in fade-in-50 duration-200">
              <div className="border-b pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-foreground">Welcome back, {user?.name.split(" ")[0]}!</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Manage details, trace shipments, and request returns.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="border p-4 rounded-2xl bg-card text-card-foreground shadow-sm">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Orders Placed</span>
                  <p className="text-xl font-extrabold text-foreground mt-1">{orders.length}</p>
                </div>
                <div className="border p-4 rounded-2xl bg-card text-card-foreground shadow-sm">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Wishlist Items</span>
                  <p className="text-xl font-extrabold text-foreground mt-1">{wishlist.length}</p>
                </div>
                <div className="border p-4 rounded-2xl bg-card text-card-foreground shadow-sm col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-muted-foreground uppercase">Shipping Locations</span>
                  <p className="text-xl font-extrabold text-foreground mt-1">{user?.addresses.length}</p>
                </div>
              </div>

              {/* Recent Orders Overview */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-foreground">Recent Transactions</h3>
                <div className="border rounded-2xl overflow-hidden shadow-sm bg-card divide-y">
                  {orders.map((ord) => (
                    <div key={ord.id} className="p-4 flex flex-wrap justify-between items-center gap-4 text-xs">
                      <div>
                        <span className="font-extrabold text-foreground block uppercase">{ord.id}</span>
                        <span className="text-[10px] text-muted-foreground">Placed on {ord.date}</span>
                      </div>
                      <div>
                        <span className="font-bold text-foreground block">${ord.total.toFixed(2)}</span>
                        <span className="text-[10px] text-muted-foreground">{ord.items.length} items</span>
                      </div>
                      <div>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider",
                            ord.status === "delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          )}
                        >
                          {ord.status}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-8 text-xs font-bold" onClick={() => setSearchParams({ tab: "orders", trackId: ord.id })}>
                          Track Item
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ORDER HISTORY PANEL */}
          {activeTab === "orders" && !selectedTrackOrder && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="border-b pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-foreground">Transaction History</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Browse past invoices, download receipts, or trigger return requests.</p>
              </div>

              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="border rounded-2xl bg-card shadow-sm overflow-hidden p-6 space-y-4">
                    
                    {/* Header */}
                    <div className="flex flex-wrap justify-between items-center gap-4 border-b pb-3 text-xs">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground block">Order Code</span>
                        <span className="font-black text-foreground uppercase">{ord.id}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground block">Placed Date</span>
                        <span className="font-bold text-foreground">{ord.date}</span>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground block">Total Paid</span>
                        <span className="font-extrabold text-foreground">${ord.total.toFixed(2)}</span>
                      </div>
                      <div>
                        <span
                          className={cn(
                            "px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-wider block",
                            ord.status === "delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                          )}
                        >
                          {ord.status}
                        </span>
                      </div>
                    </div>

                    {/* Items List */}
                    <div className="space-y-3">
                      {ord.items.map((item, idx) => (
                        <div key={idx} className="flex gap-3 items-center text-xs">
                          <img src={item.product.image} alt="" className="h-10 w-10 rounded-lg object-cover border shrink-0 bg-muted" />
                          <div className="min-w-0 flex-1">
                            <span className="font-bold text-foreground block truncate">{item.product.name}</span>
                            <span className="text-[10px] text-muted-foreground font-semibold">Qty: {item.quantity}</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap justify-between items-center gap-3 border-t pt-4">
                      <p className="text-[10px] text-muted-foreground">Paid via: {ord.paymentMethod}</p>
                      
                      <div className="flex gap-2">
                        {ord.status === "delivered" && (
                          <Button size="sm" variant="outline" className="h-8 text-xs text-red-500 hover:bg-red-50" onClick={() => handleTriggerReturn(ord.id)}>
                            <RotateCcw className="h-3 w-3 mr-1" />
                            Return Order
                          </Button>
                        )}
                        <Button size="sm" className="h-8 text-xs font-bold" onClick={() => setSearchParams({ tab: "orders", trackId: ord.id })}>
                          <Truck className="h-3.5 w-3.5 mr-1" />
                          Track shipment
                        </Button>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ORDER TRACKING DETAILED PANEL */}
          {selectedTrackOrder && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="flex items-center gap-2 border-b pb-4">
                <button onClick={() => setSearchParams({ tab: "orders" })} className="text-xs font-bold text-primary hover:underline">
                  &larr; Back to History
                </button>
              </div>

              <div className="border rounded-2xl bg-card shadow-sm p-6 space-y-6">
                <div className="flex justify-between items-center flex-wrap gap-4 border-b pb-4">
                  <div>
                    <h2 className="text-sm font-bold text-foreground uppercase">Tracking shipment {selectedTrackOrder.id}</h2>
                    <p className="text-[10px] text-muted-foreground mt-0.5">Carrier code: <strong>{selectedTrackOrder.trackingNumber}</strong></p>
                  </div>
                  <span
                    className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      selectedTrackOrder.status === "delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    )}
                  >
                    {selectedTrackOrder.status}
                  </span>
                </div>

                {/* Vertical Stepper tracker representation */}
                <div className="relative pl-6 space-y-8 border-l border-muted-foreground/20 ml-2 py-2">
                  
                  {/* Step 1: Delivered */}
                  <div className="relative">
                    <div className={cn("absolute -left-[31px] top-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center bg-background", selectedTrackOrder.status === "delivered" ? "border-green-500" : "border-muted-foreground/30")}>
                      {selectedTrackOrder.status === "delivered" && <div className="h-1.5 w-1.5 bg-green-500 rounded-full" />}
                    </div>
                    <div>
                      <h4 className={cn("text-xs font-bold", selectedTrackOrder.status === "delivered" ? "text-foreground" : "text-muted-foreground")}>Delivered to Destination</h4>
                      <p className="text-[10px] text-muted-foreground">Package signed and completed at delivery box.</p>
                      {selectedTrackOrder.status === "delivered" && <span className="text-[9px] text-muted-foreground">2026-06-12 14:32</span>}
                    </div>
                  </div>

                  {/* Step 2: Shipped */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center bg-background border-primary">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Package Shipped Out</h4>
                      <p className="text-[10px] text-muted-foreground">Handed over to carrier logistics center.</p>
                      <span className="text-[9px] text-muted-foreground">2026-06-11 09:12</span>
                    </div>
                  </div>

                  {/* Step 3: Placed */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-0.5 h-4 w-4 rounded-full border-2 flex items-center justify-center bg-background border-primary">
                      <div className="h-1.5 w-1.5 bg-primary rounded-full" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-foreground">Order Placed & Processing</h4>
                      <p className="text-[10px] text-muted-foreground">Invoice cleared and sent to package fulfillment.</p>
                      <span className="text-[9px] text-muted-foreground">{selectedTrackOrder.date} 18:24</span>
                    </div>
                  </div>

                </div>

              </div>
            </div>
          )}

          {/* TAB 3: SAVED ADDRESSES PANEL */}
          {activeTab === "addresses" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-foreground">Delivery Locations</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage saved shipping addresses for faster checkouts.</p>
                </div>
                {!addressFormOpen && (
                  <Button size="sm" className="gap-1 font-bold text-xs uppercase" onClick={() => setAddressFormOpen(true)}>
                    <Plus className="h-4 w-4" /> Add Address
                  </Button>
                )}
              </div>

              {addressFormOpen && (
                <form onSubmit={handleCreateAddress} className="border p-6 rounded-2xl bg-card shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Add Shipping Address</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Label (e.g., Home)</span>
                      <Input placeholder="Home, Office" value={addrLabel} onChange={(e) => setAddrLabel(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Street</span>
                      <Input placeholder="500 5th Avenue" value={addrStreet} onChange={(e) => setAddrStreet(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">City</span>
                      <Input placeholder="New York" value={addrCity} onChange={(e) => setAddrCity(e.target.value)} required />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">State</span>
                        <Input placeholder="NY" value={addrState} onChange={(e) => setAddrState(e.target.value)} required />
                      </div>
                      <div className="space-y-1.5">
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Zip</span>
                        <Input placeholder="10001" value={addrZip} onChange={(e) => setAddrZip(e.target.value)} required />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setAddressFormOpen(false)}>Cancel</Button>
                    <Button type="submit" size="sm">Save Location</Button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user?.addresses.map((addr) => (
                  <div key={addr.id} className="border p-4 rounded-2xl bg-card shadow-sm flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs font-bold text-foreground">{addr.name}</span>
                        {addr.isDefault && (
                          <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full uppercase">Default</span>
                        )}
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">
                        {addr.street}, <br /> {addr.city}, {addr.state} {addr.zipCode}
                      </p>
                    </div>
                    <div className="flex justify-end border-t pt-3">
                      <button
                        onClick={() => {
                          removeAddress(addr.id)
                          showToast("Address deleted.", "info")
                        }}
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: SAVED PAYMENTS PANEL */}
          {activeTab === "payments" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="flex justify-between items-center border-b pb-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-foreground">Saved Payment Cards</h1>
                  <p className="text-xs text-muted-foreground mt-0.5">Manage encrypted payment credentials.</p>
                </div>
                {!cardFormOpen && (
                  <Button size="sm" className="gap-1 font-bold text-xs uppercase" onClick={() => setCardFormOpen(true)}>
                    <Plus className="h-4 w-4" /> Add Card
                  </Button>
                )}
              </div>

              {cardFormOpen && (
                <form onSubmit={handleCreateCard} className="border p-6 rounded-2xl bg-card shadow-sm space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Secure Card details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Card Holder Name</span>
                      <Input placeholder="JOHN DOE" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Card Number</span>
                      <Input placeholder="16-Digit Card Number" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} maxLength={16} required />
                    </div>
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Expiration Date</span>
                      <Input placeholder="MM/YY" value={cardExpiry} onChange={(e) => setCardExpiry(e.target.value)} maxLength={5} required />
                    </div>
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Card Network</span>
                      <Select value={cardType} onChange={(e) => setCardType(e.target.value)}>
                        <option value="Visa">Visa</option>
                        <option value="Mastercard">Mastercard</option>
                        <option value="American Express">Amex</option>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2 pt-2">
                    <Button type="button" variant="ghost" size="sm" onClick={() => setCardFormOpen(false)}>Cancel</Button>
                    <Button type="submit" size="sm">Save Payment Method</Button>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {user?.paymentMethods.map((pm) => (
                  <div key={pm.id} className="border p-5 rounded-2xl bg-card shadow-sm flex flex-col justify-between h-40">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] font-bold text-muted-foreground uppercase">{pm.cardType}</span>
                        <p className="text-sm font-black tracking-widest text-foreground mt-1">{pm.cardNumber}</p>
                      </div>
                      <span className="text-[9px] bg-primary/10 text-primary px-1.5 py-0.5 rounded font-extrabold uppercase">Saved</span>
                    </div>
                    <div className="flex justify-between items-end border-t pt-3">
                      <div className="text-[10px] text-muted-foreground font-semibold">
                        <span>Holder: {pm.cardHolder}</span>
                        <span className="ml-4">Expires: {pm.expiry}</span>
                      </div>
                      <button
                        onClick={() => {
                          removePaymentMethod(pm.id)
                          showToast("Payment card removed.", "info")
                        }}
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 flex items-center gap-1 uppercase tracking-wider"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PROFILE EDIT PANEL */}
          {activeTab === "profile" && (
            <div className="space-y-6 animate-in fade-in-50 duration-200">
              <div className="border-b pb-4">
                <h1 className="text-xl sm:text-2xl font-black text-foreground">Profile Settings</h1>
                <p className="text-xs text-muted-foreground mt-0.5">Manage personal information and email credentials.</p>
              </div>

              <form onSubmit={handleProfileSave} className="border p-6 rounded-2xl bg-card shadow-sm space-y-4 max-w-xl">
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</span>
                  <Input value={profileName} onChange={(e) => setProfileName(e.target.value)} required />
                </div>
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</span>
                  <Input type="email" value={profileEmail} onChange={(e) => setProfileEmail(e.target.value)} required />
                </div>
                <Button type="submit" size="sm" className="gap-1.5 font-bold text-xs uppercase tracking-wider">
                  <Save className="h-4 w-4" /> Save Profile Details
                </Button>
              </form>
            </div>
          )}

        </div>

      </div>

      {/* Return request Modal dialog */}
      {returnModalOpen && (
        <div className="fixed inset-0 z-50 flex bg-black/60 backdrop-blur-sm items-center justify-center p-4 animate-in fade-in-30">
          <form onSubmit={handleReturnSubmit} className="relative w-full max-w-md bg-background border p-6 shadow-xl rounded-2xl animate-in zoom-in-95">
            <h3 className="text-sm font-bold text-foreground mb-1 uppercase tracking-wider">Request Return</h3>
            <p className="text-[11px] text-muted-foreground mb-4">Submit a return request for items in order {returnOrderId}.</p>
            
            <div className="space-y-4">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Reason for Return</span>
                <Select value={returnReason} onChange={(e) => setReturnReason(e.target.value)}>
                  <option value="Size incorrect">Incorrect sizing fit</option>
                  <option value="Defective unit">Defective unit / broken parts</option>
                  <option value="Wrong item shipped">Incorrect item delivered</option>
                  <option value="No longer needed">No longer needed</option>
                </Select>
              </div>
              
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Additional Details</span>
                <textarea
                  placeholder="Explain why you wish to return the item..."
                  value={returnDetails}
                  onChange={(e) => setReturnDetails(e.target.value)}
                  rows={3}
                  required
                  className="w-full text-xs rounded-lg border border-input bg-background p-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button type="button" variant="ghost" size="sm" onClick={() => setReturnModalOpen(false)}>Cancel</Button>
              <Button type="submit" size="sm">Submit Return Request</Button>
            </div>
          </form>
        </div>
      )}

    </div>
  )
}
