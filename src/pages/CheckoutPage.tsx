import React, { useState } from "react"
import { useNavigate, Navigate } from "react-router-dom"
import { ShieldCheck, Truck, CreditCard, ChevronRight, Lock, Sparkles } from "lucide-react"
import { useCartStore } from "../store/cartStore"
import { useUserStore } from "../store/userStore"
import { useNotification } from "../context/NotificationContext"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { BackButton } from "../components/common/BackButton"
import { api } from "../services/api"
import { Address } from "../types"

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const { cart, getCartTotals, clearCart } = useCartStore()
  const { user, isAuthenticated } = useUserStore()
  const { showToast } = useNotification()

  // Selected payment and shipping states
  const [selectedAddrId, setSelectedAddrId] = useState(user?.addresses.find((a) => a.isDefault)?.id || "")
  const [selectedCardId, setSelectedCardId] = useState(user?.paymentMethods[0]?.id || "")

  // Address creation toggle
  const [newAddrFormOpen, setNewAddrFormOpen] = useState(false)
  const [newAddrName, setNewAddrName] = useState("")
  const [newAddrStreet, setNewAddrStreet] = useState("")
  const [newAddrCity, setNewAddrCity] = useState("")
  const [newAddrState, setNewAddrState] = useState("")
  const [newAddrZip, setNewAddrZip] = useState("")
  const [newAddrCountry, setNewAddrCountry] = useState("United States")

  const [loading, setLoading] = useState(false)

  // Redirect to cart if empty
  if (cart.length === 0) {
    return <Navigate to="/cart" replace />
  }

  const totals = getCartTotals()

  const handleAddNewAddress = (e: React.FormEvent) => {
    e.preventDefault()
    if (newAddrName && newAddrStreet && newAddrCity && newAddrState && newAddrZip) {
      const addedAddress: Address = {
        id: "addr-new-" + Math.random().toString(36).substr(2, 9),
        name: newAddrName,
        street: newAddrStreet,
        city: newAddrCity,
        state: newAddrState,
        zipCode: newAddrZip,
        country: newAddrCountry,
        isDefault: false,
      }
      
      if (user) {
        user.addresses.push(addedAddress)
        setSelectedAddrId(addedAddress.id)
      }

      showToast("New delivery address added successfully!", "success")
      setNewAddrFormOpen(false)
      // reset form
      setNewAddrName("")
      setNewAddrStreet("")
      setNewAddrCity("")
      setNewAddrState("")
      setNewAddrZip("")
    }
  }

  const handlePlaceOrder = async () => {
    const shippingAddress = user?.addresses.find((a) => a.id === selectedAddrId)
    const paymentMethod = user?.paymentMethods.find((p) => p.id === selectedCardId)

    if (!shippingAddress) {
      showToast("Please choose or register a shipping delivery address.", "error")
      return
    }

    if (!paymentMethod) {
      showToast("Please choose or enter a valid payment card method.", "error")
      return
    }

    setLoading(true)
    try {
      const submittedOrder = await api.submitOrder({
        items: cart,
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        address: shippingAddress,
        paymentMethod: `${paymentMethod.cardType} (ending in ${paymentMethod.cardNumber.slice(-4)})`,
      })
      
      showToast("Order placed successfully!", "success")
      clearCart()
      navigate("/order-success", { state: { order: submittedOrder } })
    } catch (err) {
      showToast("Failed to place your order. Please try again.", "error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <BackButton className="mb-4" defaultPath="/cart" />
      
      <Breadcrumbs items={[{ label: "Cart", path: "/cart" }, { label: "Checkout" }]} />

      <div className="border-b pb-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-foreground">Secure Checkout</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Enter your billing details and complete payment credentials securely.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Inputs (Address, Payments) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* STEP 1: Shipping Address Selection */}
          <div className="border rounded-2xl bg-card shadow-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Truck className="h-4.5 w-4.5 text-primary" />
                1. Delivery Address
              </h2>
              {!newAddrFormOpen && (
                <Button variant="outline" size="sm" onClick={() => setNewAddrFormOpen(true)} className="text-xs h-8">
                  Add New
                </Button>
              )}
            </div>

            {newAddrFormOpen ? (
              
              /* Add New Address form inline */
              <form onSubmit={handleAddNewAddress} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Address Label (e.g., Home)</span>
                    <Input placeholder="Home, Office, Holiday" value={newAddrName} onChange={(e) => setNewAddrName(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Street Address</span>
                    <Input placeholder="123 Main St, Apt 2" value={newAddrStreet} onChange={(e) => setNewAddrStreet(e.target.value)} required />
                  </div>
                  <div className="space-y-1.5">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">City</span>
                    <Input placeholder="New York" value={newAddrCity} onChange={(e) => setNewAddrCity(e.target.value)} required />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">State</span>
                      <Input placeholder="NY" value={newAddrState} onChange={(e) => setNewAddrState(e.target.value)} required />
                    </div>
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Zip Code</span>
                      <Input placeholder="10001" value={newAddrZip} onChange={(e) => setNewAddrZip(e.target.value)} required />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button type="button" variant="ghost" size="sm" onClick={() => setNewAddrFormOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" size="sm">
                    Save Address
                  </Button>
                </div>
              </form>

            ) : (
              
              /* Saved addresses selector lists */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {user?.addresses.map((addr) => (
                  <button
                    key={addr.id}
                    onClick={() => setSelectedAddrId(addr.id)}
                    className={`p-4 border rounded-xl text-left transition-all ${
                      selectedAddrId === addr.id
                        ? "border-primary bg-primary/5 ring-1 ring-primary"
                        : "border-input bg-background hover:bg-muted/40"
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-foreground">{addr.name}</span>
                      {addr.isDefault && (
                        <span className="text-[9px] font-bold text-primary bg-primary/10 px-1.5 py-0.5 rounded-full uppercase">Default</span>
                      )}
                    </div>
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      {addr.street}, <br /> {addr.city}, {addr.state} {addr.zipCode}
                    </p>
                  </button>
                ))}
              </div>

            )}
          </div>

          {/* STEP 2: Secure Payment Selection */}
          <div className="border rounded-2xl bg-card shadow-sm p-6 space-y-4">
            <div className="border-b pb-3">
              <h2 className="text-sm font-bold text-foreground flex items-center gap-2">
                <CreditCard className="h-4.5 w-4.5 text-primary" />
                2. Secure Payment Method
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {user?.paymentMethods.map((pm) => (
                <button
                  key={pm.id}
                  onClick={() => setSelectedCardId(pm.id)}
                  className={`p-4 border rounded-xl text-left transition-all ${
                    selectedCardId === pm.id
                      ? "border-primary bg-primary/5 ring-1 ring-primary"
                      : "border-input bg-background hover:bg-muted/40"
                  }`}
                >
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-foreground uppercase tracking-widest">{pm.cardType}</span>
                    <Lock className="h-3 w-3 text-muted-foreground" />
                  </div>
                  <span className="text-xs font-semibold text-foreground tracking-widest">{pm.cardNumber}</span>
                  <div className="flex justify-between text-[9px] text-muted-foreground font-semibold mt-2">
                    <span>Holder: {pm.cardHolder}</span>
                    <span>Expires: {pm.expiry}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: Order Review & Placement */}
        <div className="space-y-6">
          <div className="border p-6 rounded-2xl bg-card shadow-sm space-y-6">
            <h3 className="text-sm font-bold text-foreground border-b pb-3 uppercase tracking-wider">Review Order</h3>
            
            {/* Short lists of items summary */}
            <div className="divide-y max-h-48 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.product.id} className="py-3 flex justify-between items-center gap-3">
                  <div className="flex items-center gap-2">
                    <img src={item.product.image} alt="" className="h-8 w-8 rounded-md object-cover border" />
                    <div className="overflow-hidden">
                      <span className="text-[11px] font-bold text-foreground block truncate max-w-[130px]">{item.product.name}</span>
                      <span className="text-[9px] text-muted-foreground font-semibold">Qty: {item.quantity}</span>
                    </div>
                  </div>
                  <span className="text-xs font-black text-foreground">
                    ${((item.product.discountPrice || item.product.price) * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            {/* Calculations breakdown */}
            <div className="border-t pt-4 space-y-2 text-xs">
              <div className="flex justify-between text-muted-foreground font-semibold">
                <span>Subtotal</span>
                <span className="text-foreground font-bold">${totals.subtotal.toFixed(2)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-green-600 font-semibold">
                  <span>Discount Code</span>
                  <span>-${totals.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted-foreground font-semibold border-b pb-3">
                <span>Estimated Delivery</span>
                <span className="text-foreground font-bold">{totals.shipping === 0 ? "FREE" : `$${totals.shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-foreground pt-1">
                <span>Total Charge</span>
                <span className="text-primary font-black">${totals.total.toFixed(2)}</span>
              </div>
            </div>

            <Button
              className="w-full h-11 font-bold text-xs uppercase tracking-wider"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Processing Secure Payment..." : "Place Order Securely"}
            </Button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-muted-foreground font-semibold border-t pt-4">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              100% Encrypted SSL checkout transaction
            </div>

          </div>
        </div>

      </div>

    </div>
  )
}
