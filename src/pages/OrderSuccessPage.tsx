import React from "react"
import { useLocation, Link, Navigate } from "react-router-dom"
import { CheckCircle2, ShoppingBag, ArrowRight, Truck, Gift } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/Button"
import { Order } from "../types"

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation()
  const order = (location.state as any)?.order as Order

  // If no order in state, redirect to home
  if (!order) {
    return <Navigate to="/" replace />
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8 flex flex-col items-center text-center space-y-8">
      
      {/* Animated Checkmark Icon */}
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        className="p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-full shrink-0"
      >
        <CheckCircle2 className="h-16 w-16" />
      </motion.div>

      <div className="space-y-2">
        <span className="text-[10px] font-bold bg-primary/10 text-primary px-3 py-1 rounded-full uppercase tracking-wider">Order Confirmed</span>
        <h1 className="text-3xl font-black text-foreground">Thank You For Your Order!</h1>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
          We have received your order details. A confirmation email containing receipt copy and tracking codes has been sent to your account email address.
        </p>
      </div>

      {/* Order Info Receipt Side Card */}
      <div className="w-full border rounded-2xl bg-card shadow-sm p-6 text-left space-y-4">
        <h3 className="text-xs font-bold text-foreground uppercase tracking-widest border-b pb-2">Receipt Details</h3>
        
        <div className="grid grid-cols-2 gap-4 text-xs font-semibold text-muted-foreground">
          <div>
            <span>Order Code</span>
            <p className="text-foreground font-extrabold mt-0.5 tracking-wider uppercase">{order.id}</p>
          </div>
          <div>
            <span>Tracking Reference</span>
            <p className="text-foreground font-extrabold mt-0.5 tracking-wider">{order.trackingNumber}</p>
          </div>
          <div>
            <span>Payment Method</span>
            <p className="text-foreground font-bold mt-0.5">{order.paymentMethod}</p>
          </div>
          <div>
            <span>Shipment Destination</span>
            <p className="text-foreground font-bold mt-0.5 line-clamp-1">{order.address.street}</p>
          </div>
        </div>

        <div className="border-t pt-4 space-y-2 text-xs font-semibold text-muted-foreground">
          <div className="flex justify-between">
            <span>Subtotal Amount</span>
            <span className="text-foreground font-bold">${order.subtotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Applied Discount</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="flex justify-between">
            <span>Estimated Shipping</span>
            <span className="text-foreground font-bold">{order.shipping === 0 ? "FREE" : `$${order.shipping.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm font-bold text-foreground border-t pt-2">
            <span>Total Paid</span>
            <span className="text-primary font-black">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full justify-center">
        <Link to={`/dashboard/track/${order.id}`}>
          <Button className="w-full sm:w-auto gap-2 font-bold uppercase tracking-wider text-xs px-6">
            <Truck className="h-4 w-4" />
            Track Package
          </Button>
        </Link>
        <Link to="/shop">
          <Button variant="outline" className="w-full sm:w-auto gap-2 font-bold uppercase tracking-wider text-xs px-6">
            <ShoppingBag className="h-4 w-4" />
            Continue Shopping
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

    </div>
  )
}
