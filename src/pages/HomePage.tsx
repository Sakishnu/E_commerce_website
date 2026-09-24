import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Smartphone, Shirt, Home, Dumbbell, Star, ChevronLeft, ChevronRight, ChevronDown, Eye } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { ProductCard } from "../components/product/ProductCard"
import { QuickView } from "../components/product/QuickView"
import { Button } from "../components/ui/Button"
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from "../services/api"
import { Product } from "../types"

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Acoustic Perfection",
    subtitle: "AeroPulse Hybrid Noise-Cancelling Headphones",
    tag: "Electronics",
    link: "/product/prod-1",
    cta: "Shop AeroPulse",
  },
  {
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Timeless Quality",
    subtitle: "Maverick Handcrafted Leather Jackets",
    tag: "Fashion & Outerwear",
    link: "/product/prod-3",
    cta: "Shop Leather",
  },
  {
    image: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1200&h=500&q=80",
    title: "Ergonomic Living",
    subtitle: "Modern Workspace Furnitures & Lighting",
    tag: "Home & Decor",
    link: "/category/home-living",
    cta: "Explore Decor",
  },
]

export const HomePage: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  // Auto-advance hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length)
  }

  const prevSlide = () => {
    setActiveSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)
  }

  // Get icons dynamically for categories
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Smartphone":
        return <Smartphone className="h-6 w-6" />
      case "Shirt":
        return <Shirt className="h-6 w-6" />
      case "Home":
        return <Home className="h-6 w-6" />
      case "Dumbbell":
        return <Dumbbell className="h-6 w-6" />
      default:
        return <Smartphone className="h-6 w-6" />
    }
  }

  const featuredProducts = MOCK_PRODUCTS.filter((p) => p.isFeatured)
  const trendingProducts = MOCK_PRODUCTS.filter((p) => p.isTrending)

  return (
    <div className="space-y-16 pb-16">
      
      {/* Hero Carousel Section */}
      <section className="relative h-[460px] sm:h-[480px] lg:h-[520px] w-full overflow-hidden bg-zinc-950">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut" }}
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HERO_SLIDES[activeSlide].image})` }}
          >
            {/* Background Dark Overlay & Centered Content */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/60 to-black/40 flex items-center pt-8 pb-16 sm:py-16 lg:py-20">
              <div className="relative mx-auto max-w-7xl px-12 sm:px-16 lg:px-20 w-full">
                <div className="max-w-xl space-y-4 sm:space-y-6 text-white">
                  <div>
                    <span className="inline-block text-xs font-bold bg-primary text-primary-foreground px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-none border-0 outline-none">
                      {HERO_SLIDES[activeSlide].tag}
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-normal leading-tight text-white border-0 outline-none">
                    {HERO_SLIDES[activeSlide].title}
                  </h1>
                  <p className="text-xs sm:text-base text-zinc-200 leading-relaxed border-0 outline-none line-clamp-2 sm:line-clamp-none">
                    {HERO_SLIDES[activeSlide].subtitle}
                  </p>
                  <div className="pt-2 sm:pt-4">
                    <Link to={HERO_SLIDES[activeSlide].link}>
                      <Button size="lg" className="font-bold text-xs uppercase tracking-wider gap-2 shadow-lg">
                        {HERO_SLIDES[activeSlide].cta}
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Slide Left/Right Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-5 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur border border-white/10 hover:bg-black/60 transition-all z-20 cursor-pointer"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-5 top-1/2 -translate-y-1/2 h-9 w-9 sm:h-11 sm:w-11 flex items-center justify-center rounded-full bg-black/40 text-white backdrop-blur border border-white/10 hover:bg-black/60 transition-all z-20 cursor-pointer"
          aria-label="Next Slide"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        {/* Carousel Indicators dots & Bottom Arrow Navigation */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center space-x-2 z-20 bg-black/40 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-white/10 shadow-lg">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activeSlide === idx ? "w-6 bg-primary" : "w-2 bg-white/40 hover:bg-white/70"
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

        {/* Bottom smooth fade to content */}
        <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-background/20 to-transparent pointer-events-none z-10" />
      </section>

      {/* Category Grid Section */}
      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-black text-foreground">Explore Categories</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {MOCK_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              to={`/category/${cat.slug}`}
              className={`flex flex-col items-center justify-center p-6 border rounded-2xl shadow-sm text-center transition-all hover:scale-[1.02] hover:shadow-md ${cat.bg}`}
            >
              <div className="p-3 rounded-full bg-background border shadow-sm text-foreground shrink-0 mb-3">
                {getCategoryIcon(cat.icon)}
              </div>
              <h3 className="text-sm font-bold text-foreground">{cat.name}</h3>
              <p className="text-[10px] text-muted-foreground font-semibold mt-1">
                {cat.count} Items
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-foreground">Featured Collections</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Carefully selected high-quality premium products.</p>
          </div>
          <Link to="/shop" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">
            Shop All &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      </section>

      {/* Trending Products Section */}
      <section className="bg-muted/30 py-16 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-foreground">Trending Arrivals</h2>
              <p className="text-xs text-muted-foreground mt-0.5">Top trending and fast selling products this week.</p>
            </div>
            <Link to="/shop" className="text-xs font-bold text-primary hover:underline uppercase tracking-wider">
              Browse Bestsellers &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {trendingProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Portal Integration */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

    </div>
  )
}
