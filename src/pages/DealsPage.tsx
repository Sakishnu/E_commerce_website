import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Tag, Clock, Check, Copy, Flame, Percent, ShieldCheck, Zap, Sparkles, ShoppingBag } from "lucide-react"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { BackButton } from "../components/common/BackButton"
import { Button } from "../components/ui/Button"
import { ProductCard } from "../components/product/ProductCard"
import { api } from "../services/api"
import { Product } from "../types"

interface Coupon {
  code: string
  discount: string
  desc: string
  minSpend: string
}

export const DealsPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  
  // Timer state (Flash sale ends in 3h 42m 15s by default)
  const [timeLeft, setTimeLeft] = useState({ hours: 3, minutes: 42, seconds: 15 })
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Countdown logic
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        } else {
          clearInterval(timer)
          return prev
        }
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Smooth scroll to anchor hash if present
  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.substring(1)
      const element = document.getElementById(id)
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" })
        }, 200)
        return () => clearTimeout(timer)
      }
    }
  }, [window.location.hash, products])

  useEffect(() => {
    const fetchDealProducts = async () => {
      setLoading(true)
      try {
        // Query some mock products for deals listing
        const res = await api.getProducts({ limit: 12 })
        setProducts(res.products)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchDealProducts()
  }, [])

  const copyCoupon = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const coupons: Coupon[] = [
    { code: "NEXUS30", discount: "30% OFF", desc: "For Audio Accessories & Smart Wearables", minSpend: "Min. spend $150" },
    { code: "BOGO50", discount: "BUY 1 GET 1", desc: "Buy any premium apparel item, get the second at 50% discount", minSpend: "Applicable on Fashion" },
    { code: "FLASH100", discount: "Flat $100 OFF", desc: "Applicable on Matrix Workstations & Laptops", minSpend: "Min. spend $1000" },
    { code: "DEALS499", discount: "Flat 10% OFF", desc: "Flat rate discount on any item priced under ₹499 ($6)", minSpend: "No min. spend" },
  ]

  // Filter categories helper
  const flashSales = products.filter(p => p.discountPrice && p.price - p.discountPrice > 30).slice(0, 4)
  const limitedOffers = products.filter(p => p.rating && p.rating >= 4.5).slice(0, 4)
  const clearanceProducts = products.filter(p => p.discountPrice && (p.price - p.discountPrice) > 50).slice(0, 4)
  const bogoProducts = products.filter(p => p.category === "fashion").slice(0, 4)
  const under499 = products.filter(p => p.price <= 50).slice(0, 4) // mapping ₹499 to ~$50
  const under999 = products.filter(p => p.price > 50 && p.price <= 100).slice(0, 4) // mapping ₹999 to ~$100

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <BackButton className="mb-4" defaultPath="/" />
      <Breadcrumbs items={[{ label: "Deals & Promotions" }]} />

      {/* Featured Offer Banner */}
      <section id="todays-deals" className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-muted flex items-center p-6 sm:p-12 mb-12 shadow-md border bg-cover bg-center mt-4 scroll-mt-24"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=400&q=80')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
        <div className="relative max-w-xl text-white space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-red-500 text-white px-3 py-1 rounded-full uppercase tracking-wider animate-pulse">
            <Flame className="h-3.5 w-3.5 fill-current" />
            MEGA OFFER OF THE DAY
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow">AeroPulse Headset V2</h1>
          <p className="text-xs sm:text-base text-zinc-200 leading-relaxed font-medium drop-shadow-sm">
            Experience absolute acoustic perfection with our hybrid ANC premium headphones. Unlocked with an instant 30% reduction today!
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2">
            <span className="text-xl sm:text-3xl font-black text-red-400">$249.99</span>
            <span className="text-sm sm:text-lg text-zinc-400 line-through">$299.99</span>
            <span className="text-xs font-bold bg-red-500/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded">SAVE $50</span>
          </div>
          <div className="pt-6 sm:pt-8">
            <Link to="/product/prod-1">
              <Button className="font-bold text-xs uppercase tracking-wider px-6 h-11">Claim Deal Now</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Countdown Timer for Flash Sales */}
      <section id="flash-sales" className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 mb-16 shadow-sm scroll-mt-24">
        <div className="flex items-center gap-3.5 text-center md:text-left">
          <div className="p-3 rounded-full bg-red-500 text-white shrink-0">
            <Zap className="h-6 w-6 fill-current animate-bounce" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-black text-foreground flex items-center gap-2 tracking-tight">
              FLASH SALE - LIMITED TIME ONLY!
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5 font-medium">Hurry, prices increase as soon as the countdown timer runs out!</p>
          </div>
        </div>

        {/* Counter Block */}
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center">
            <div className="bg-card border rounded-xl h-14 w-14 flex items-center justify-center text-xl sm:text-2xl font-black text-foreground shadow-sm">
              {String(timeLeft.hours).padStart(2, "0")}
            </div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1.5">Hours</span>
          </div>
          <span className="text-xl font-bold text-muted-foreground -mt-5">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-card border rounded-xl h-14 w-14 flex items-center justify-center text-xl sm:text-2xl font-black text-foreground shadow-sm">
              {String(timeLeft.minutes).padStart(2, "0")}
            </div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1.5">Minutes</span>
          </div>
          <span className="text-xl font-bold text-muted-foreground -mt-5">:</span>
          <div className="flex flex-col items-center">
            <div className="bg-card border rounded-xl h-14 w-14 flex items-center justify-center text-xl sm:text-2xl font-black text-foreground shadow-sm">
              {String(timeLeft.seconds).padStart(2, "0")}
            </div>
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider mt-1.5">Seconds</span>
          </div>
        </div>
      </section>

      {/* Coupons Section */}
      <section className="mb-16 space-y-6">
        <div>
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
            <Tag className="h-5 w-5 text-primary" />
            Promo Coupons & Vouchers
          </h2>
          <p className="text-xs text-muted-foreground mt-1">Copy coupon codes below and paste them at checkout to claim additional discounts</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {coupons.map((c) => (
            <div key={c.code} className="border bg-card rounded-2xl p-5 flex flex-col justify-between space-y-4 shadow-sm relative overflow-hidden group hover:border-primary/45 transition-colors">
              <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-bl-full flex items-center justify-center text-primary font-bold text-xs pr-2 pb-2">
                <Percent className="h-4 w-4" />
              </div>
              
              <div className="space-y-1">
                <span className="text-xs font-black text-primary tracking-wider uppercase bg-primary/10 px-2 py-0.5 rounded w-fit block">{c.discount}</span>
                <h3 className="font-extrabold text-foreground text-sm pt-2">{c.code}</h3>
                <p className="text-[11px] text-muted-foreground leading-snug">{c.desc}</p>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <span className="text-[10px] font-bold text-muted-foreground uppercase">{c.minSpend}</span>
                <button
                  onClick={() => copyCoupon(c.code)}
                  className="flex items-center gap-1 text-[10px] font-bold uppercase text-primary hover:text-primary/80 transition-colors bg-primary/5 hover:bg-primary/10 px-2.5 py-1.5 rounded-lg border border-primary/20"
                >
                  {copiedCode === c.code ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-500" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      Copy Code
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Deals Catalog Grid sections */}
      <div className="space-y-16">
        
        {/* Flash Sales Spotlight Grid */}
        {flashSales.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-end justify-between border-b pb-4">
              <div>
                <h2 className="text-xl font-black text-foreground tracking-tight flex items-center gap-2">
                  <Flame className="h-5 w-5 text-red-500 fill-current animate-pulse" />
                  Flash Sales Spotlight
                </h2>
                <p className="text-xs text-muted-foreground mt-0.5">Top price cuts available right now</p>
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {flashSales.map(prod => (
                <div key={prod.id} className="relative group">
                  <ProductCard product={prod} />
                  <span className="absolute top-3 left-3 bg-red-500 text-white font-bold text-[9px] px-2 py-0.5 rounded-full uppercase tracking-wider shadow">
                    -{Math.round(((prod.price - (prod.discountPrice || prod.price)) / prod.price) * 100)}% Off
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Limited Time Offers section */}
        <section id="limited-offers" className="space-y-6 scroll-mt-24">
          <div className="flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-black text-foreground tracking-tight flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500 fill-current" />
                Limited Time Offers
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Special premium selections valid only for a few days</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {limitedOffers.length > 0 ? (
              limitedOffers.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))
            ) : (
              <p className="text-xs text-muted-foreground">Check back soon for new offers.</p>
            )}
          </div>
        </section>

        {/* Clearance Sale section */}
        <section id="clearance-sale" className="space-y-6 scroll-mt-24">
          <div className="flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-black text-foreground tracking-tight flex items-center gap-2">
                <Tag className="h-5 w-5 text-rose-500 fill-current" />
                Clearance Sale - Up to 70% Off
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Final clearance stock at absolute lowest price points</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clearanceProducts.length > 0 ? (
              clearanceProducts.map(prod => (
                <ProductCard key={prod.id} product={prod} />
              ))
            ) : (
              <p className="text-xs text-muted-foreground">Clearance catalog updating shortly.</p>
            )}
          </div>
        </section>

        {/* Buy One Get One (BOGO) section */}
        <section id="bogo" className="space-y-6 scroll-mt-24">
          <div className="flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-black text-foreground tracking-tight flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Buy One Get One (BOGO) Offer
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">Premium wardrobe choices with double value configurations</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bogoProducts.map(prod => (
              <div key={prod.id} className="relative">
                <ProductCard product={prod} />
                <span className="absolute top-3 left-3 bg-primary text-white font-bold text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow">
                  Buy 1 Get 1
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Under ₹499 (mapped to products under $50) */}
        <section id="under-499" className="space-y-6 scroll-mt-24">
          <div className="flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-black text-foreground tracking-tight">Deals Under ₹499 (Budget Picks)</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Unbeatable values on budget-friendly utility picks</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {under499.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

        {/* Under ₹999 (mapped to products between $50 and $100) */}
        <section id="under-999" className="space-y-6 scroll-mt-24">
          <div className="flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-xl font-black text-foreground tracking-tight">Premium Deals Under ₹999</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Selected accessories, fitness gear and office supplies</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {under999.map(prod => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}
