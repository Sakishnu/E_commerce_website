import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, Percent, Truck, RotateCcw } from "lucide-react"
import { useCartStore } from "../store/cartStore"
import { useNotification } from "../context/NotificationContext"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Select } from "../components/ui/Select"
import { MOCK_PRODUCTS } from "../services/api"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { BackButton } from "../components/common/BackButton"

export const ShoppingCartPage: React.FC = () => {
  const navigate = useNavigate()
  const { cart, coupon, applyCoupon, removeCoupon, updateQuantity, removeFromCart, getCartTotals } = useCartStore()
  const { showToast } = useNotification()

  const [couponCode, setCouponCode] = useState("")
  const [shippingCountry, setShippingCountry] = useState("United States")
  const [shippingZip, setShippingZip] = useState("")

  const totals = getCartTotals()

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault()
    if (couponCode.trim()) {
      const res = applyCoupon(couponCode.trim())
      showToast(res.message, res.success ? "success" : "error")
      if (res.success) {
        setCouponCode("")
      }
    }
  }

  const handleCalculateShipping = (e: React.FormEvent) => {
    e.preventDefault()
    if (shippingZip.trim()) {
      showToast(`Shipping rate calculated for ${shippingCountry} (${shippingZip})!`, "success")
    } else {
      showToast("Please enter a valid zip/postal code.", "error")
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <BackButton className="mb-4" defaultPath="/shop" />
      
      <Breadcrumbs items={[{ label: "Shopping Cart" }]} />

      <div className="border-b pb-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-foreground">Shopping Cart</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Review your items and proceed to secure checkout.
        </p>
      </div>

      {cart.length === 0 ? (
        
        /* Empty Cart State */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="p-4 rounded-full bg-muted border text-muted-foreground">
            <ShoppingBag className="h-10 w-10 animate-bounce" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h2 className="text-lg font-bold text-foreground">Your cart is empty</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Looks like you haven't added any products to your cart yet. Visit our shop directory and explore the catalog.
            </p>
          </div>
          <Link to="/shop">
            <Button size="md" className="gap-2 font-bold uppercase tracking-wider text-xs">
              Continue Shopping
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

      ) : (

        /* Active Cart Layout */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Cart items list */}
          <div className="lg:col-span-2 space-y-4">
            
            {cart.map((item, index) => {
              const price = item.product.discountPrice || item.product.price
              return (
                <div
                  key={`${item.product.id}-${item.selectedSize || ""}-${item.selectedColor || ""}-${index}`}
                  className="flex items-center gap-4 p-4 border rounded-2xl bg-card shadow-sm relative group overflow-hidden"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-xl object-cover border shrink-0 bg-muted"
                  />
                  
                  <div className="flex-1 min-w-0 pr-6 space-y-1">
                    <Link
                      to={`/product/${item.product.id}`}
                      className="text-sm font-bold text-foreground hover:underline block truncate"
                    >
                      {item.product.name}
                    </Link>
                    
                    {/* Item configuration descriptors */}
                    <div className="flex flex-wrap gap-2 text-[10px] text-muted-foreground font-semibold">
                      {item.selectedColor && (
                        <span className="bg-muted px-2 py-0.5 rounded-full border">Color: {item.selectedColor}</span>
                      )}
                      {item.selectedSize && (
                        <span className="bg-muted px-2 py-0.5 rounded-full border">Size: {item.selectedSize}</span>
                      )}
                    </div>

                    <p className="text-sm font-black text-primary pt-1">
                      ${price}
                    </p>
                  </div>

                  {/* Quantity adjustments + Delete */}
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    
                    {/* Incrementer button */}
                    <div className="flex items-center rounded-lg border h-8 bg-muted/40 text-xs font-bold">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="px-2.5 h-full hover:bg-muted text-muted-foreground transition-colors"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-6 text-center text-foreground font-extrabold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="px-2.5 h-full hover:bg-muted text-muted-foreground transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => {
                        removeFromCart(item.product.id, item.selectedSize, item.selectedColor)
                        showToast(`${item.product.name} removed from cart.`, "info")
                      }}
                      className="p-2 text-muted-foreground hover:text-red-500 rounded-full hover:bg-muted transition-colors"
                      title="Remove Item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>

                  </div>

                </div>
              )
            })}

            {/* Shopping calculator and values banner */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t">
              
              {/* Estimated Shipping Calculator Widget */}
              <div className="border p-4 rounded-xl bg-card shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                  <Truck className="h-4 w-4 text-primary" />
                  Estimate Shipping
                </div>
                <form onSubmit={handleCalculateShipping} className="space-y-3">
                  <div className="grid grid-cols-2 gap-2">
                    <Select
                      value={shippingCountry}
                      onChange={(e) => setShippingCountry(e.target.value)}
                      className="h-9 text-xs"
                    >
                      <option value="United States">USA</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">UK</option>
                    </Select>
                    <Input
                      placeholder="Zip/Postal Code"
                      value={shippingZip}
                      onChange={(e) => setShippingZip(e.target.value)}
                      required
                      className="h-9 text-xs"
                    />
                  </div>
                  <Button type="submit" variant="outline" size="sm" className="w-full text-xs py-1.5 h-auto">
                    Calculate Rate
                  </Button>
                </form>
              </div>

              {/* Secure checkout info */}
              <div className="border p-4 rounded-xl bg-card shadow-sm flex flex-col justify-center space-y-2 text-xs text-muted-foreground leading-relaxed">
                <div className="flex items-center gap-1.5 text-foreground font-bold">
                  <Percent className="h-4 w-4 text-green-500" />
                  Apply Promo Coupon Codes
                </div>
                <p>Use codes: <strong>WELCOME10</strong> (10% off site-wide) or <strong>SAVE20</strong> ($20 off purchases above $100) for demo checks.</p>
              </div>

            </div>

          </div>

          {/* Right Column: Checkout Pricing Summary Card */}
          <div className="border p-6 rounded-2xl bg-card shadow-sm h-fit space-y-6">
            <h3 className="text-sm font-bold text-foreground border-b pb-3 uppercase tracking-wider">Order Summary</h3>
            
            <div className="space-y-3 text-xs">
              <div className="flex justify-between font-semibold text-muted-foreground">
                <span>Subtotal</span>
                <span className="text-foreground font-extrabold">${totals.subtotal.toFixed(2)}</span>
              </div>

              {totals.discount > 0 && (
                <div className="flex justify-between font-semibold text-green-600">
                  <span>Coupon Discount ({coupon?.code})</span>
                  <span className="font-extrabold">-${totals.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-semibold text-muted-foreground border-b pb-3">
                <span>Estimated Shipping</span>
                <span className="text-foreground font-extrabold">
                  {totals.shipping === 0 ? "FREE" : `$${totals.shipping.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between text-sm font-bold text-foreground pt-1">
                <span>Total Amount</span>
                <span className="text-primary font-black">${totals.total.toFixed(2)}</span>
              </div>
            </div>

            {/* Coupon input form */}
            <form onSubmit={handleApplyCoupon} className="space-y-2 pt-4 border-t">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Promo Coupon</span>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button type="submit" size="sm" variant="outline" className="h-9 font-bold text-xs uppercase">
                  Apply
                </Button>
              </div>
              
              {coupon && (
                <div className="flex items-center justify-between bg-green-500/10 text-green-600 border border-green-500/20 px-3 py-1.5 rounded-lg text-[10px] font-bold">
                  <span>Coupon {coupon.code} active!</span>
                  <button type="button" onClick={removeCoupon} className="underline hover:text-green-700">
                    Remove
                  </button>
                </div>
              )}
            </form>

            <Button
              className="w-full h-11 gap-2 font-bold text-xs uppercase tracking-wider mt-4"
              onClick={() => navigate("/checkout")}
            >
              Proceed To Checkout
              <ArrowRight className="h-4 w-4" />
            </Button>

            <div className="flex justify-center text-[10px] text-muted-foreground font-semibold gap-4">
              <span>SSL Encrypted</span>
              <span>PCI Compliant</span>
            </div>

          </div>

        </div>

      )}

    </div>
  )
}
