import React, { useState } from "react"
import { Link } from "react-router-dom"
import { Globe, Send, Camera, Play, Mail, ShieldCheck, Truck, HelpCircle, RotateCcw } from "lucide-react"
import { useNotification } from "../../context/NotificationContext"
import { Button } from "../ui/Button"
import { Input } from "../ui/Input"

export const Footer: React.FC = () => {
  const { showToast } = useNotification()
  const [email, setEmail] = useState("")

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      showToast("Thank you for subscribing to our newsletter!", "success")
      setEmail("")
    }
  }

  return (
    <footer className="bg-muted/40 border-t">
      
      {/* Brand value features banner */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 border-b grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="flex items-center gap-3">
          <Truck className="h-6 w-6 text-primary shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-foreground">Free Shipping</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">On all orders over $150</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <RotateCcw className="h-6 w-6 text-primary shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-foreground">30-Day Returns</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Hassle-free return policy</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <ShieldCheck className="h-6 w-6 text-primary shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-foreground">Secure Checkout</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">SSL encrypted transactions</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <HelpCircle className="h-6 w-6 text-primary shrink-0" />
          <div>
            <h4 className="text-xs font-bold text-foreground">24/7 Support</h4>
            <p className="text-[10px] text-muted-foreground mt-0.5">Dedicated customer team</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Brand Summary */}
        <div className="lg:col-span-2 space-y-4">
          <span className="text-lg font-bold tracking-tight text-foreground uppercase">Nexus E-Commerce</span>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
            Nexus delivers premium items directly to your doorstep. Combining cutting-edge design with unparalleled customer service for a modern shopping experience.
          </p>
          <div className="flex items-center space-x-3 text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors"><Globe className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Send className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Camera className="h-4 w-4" /></a>
            <a href="#" className="hover:text-foreground transition-colors"><Play className="h-4 w-4" /></a>
          </div>
        </div>


        {/* Links Column 1: Shop */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Shop</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/category/electronics" className="hover:text-foreground">Electronics</Link></li>
            <li><Link to="/category/fashion" className="hover:text-foreground">Fashion</Link></li>
            <li><Link to="/category/home-living" className="hover:text-foreground">Home & Decor</Link></li>
          </ul>
        </div>

        {/* Links Column 2: Information */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground mb-4">Information</h3>
          <ul className="space-y-2 text-xs text-muted-foreground">
            <li><Link to="/about" className="hover:text-foreground">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Contact Us</Link></li>
            <li><Link to="/faq" className="hover:text-foreground">FAQs</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">Location</Link></li>
          </ul>
        </div>

        {/* Links Column 3: Newsletter */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Newsletter</h3>
          <p className="text-xs text-muted-foreground">Sign up to get the latest sales, new releases, and shop updates.</p>
          <form onSubmit={handleSubscribe} className="flex flex-col gap-2">
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter your email"
                className="pr-10 text-xs w-full bg-background"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
            <Button type="submit" variant="primary" size="sm" className="w-full">
              Subscribe
            </Button>
          </form>
        </div>

      </div>

      <div className="bg-muted/80 border-t py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>&copy; {new Date().getFullYear()} Nexus Inc. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Sitemap</a>
          </div>
        </div>
      </div>

    </footer>
  )
}
