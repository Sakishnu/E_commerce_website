import React from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Star, ShieldCheck, Heart, Sparkles, Flame } from "lucide-react"
import { motion } from "framer-motion"
import { Button } from "../components/ui/Button"
import { MOCK_PRODUCTS } from "../services/api"

export const LandingPage: React.FC = () => {
  const featuredProds = MOCK_PRODUCTS.slice(0, 3)

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Showcase Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-background py-20 lg:py-32">
        
        {/* Decorative Grid items */}
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-center lg:text-left"
          >
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Revolutionizing Shopping
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-none tracking-tight text-foreground">
              Discover the Next <br />
              <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">Generation of Tech & Style</span>
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed">
              Explore our curated selection of high-fidelity audio, wearables, designer apparel, and eco-friendly home decors engineered for modern living.
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <Link to="/home">
                <Button size="lg" className="gap-2 font-bold uppercase tracking-wider text-xs">
                  Shop Now
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="font-bold uppercase tracking-wider text-xs">
                  Learn More
                </Button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative mx-auto lg:ml-auto max-w-md w-full"
          >
            <div className="absolute inset-0 bg-primary/10 rounded-2xl filter blur-2xl -z-10" />
            <div className="border bg-card text-card-foreground rounded-2xl shadow-xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=600&h=500&q=80"
                alt="Nexus devices showcasing headphones and lifestyle apparel"
                className="w-full h-80 object-cover"
              />
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-wider">Premium Launch</span>
                  <div className="flex items-center text-amber-500 gap-1">
                    <Star className="h-3.5 w-3.5 fill-current" />
                    <span className="text-xs font-bold text-foreground">4.9</span>
                  </div>
                </div>
                <h3 className="font-bold text-foreground text-sm">AeroPulse Noise-Cancelling Pro</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Engineered with hybrid active cancellation for complete auditory immersion.
                </p>
                <div className="flex justify-between items-center pt-2">
                  <span className="font-black text-foreground">$249.99</span>
                  <Link to="/product/prod-1">
                    <Button size="sm" variant="outline">Buy Now</Button>
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Seasonal Promo Showcase Grid */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">Exclusive Seasonal Categories</h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Upgrade your lifestyle with our premium, high-demand collections designed to redefine modern quality standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="relative group overflow-hidden rounded-2xl border aspect-[4/3] bg-muted">
            <img
              src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&h=400&q=80"
              alt="Wearable devices category"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Electronics</span>
              <h3 className="font-bold text-base">Apex Smart Watches</h3>
              <p className="text-[11px] text-zinc-300">Modern fitness trackers and screen AMOLED displays.</p>
              <Link to="/category/electronics" className="text-xs font-semibold text-blue-300 hover:text-white underline-offset-4 hover:underline mt-2">
                Shop Collection &rarr;
              </Link>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl border aspect-[4/3] bg-muted">
            <img
              src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=500&h=400&q=80"
              alt="Apparel collection category"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">Apparel</span>
              <h3 className="font-bold text-base">Leather & Outerwear</h3>
              <p className="text-[11px] text-zinc-300">Handcrafted full-grain leather apparel collections.</p>
              <Link to="/category/fashion" className="text-xs font-semibold text-purple-300 hover:text-white underline-offset-4 hover:underline mt-2">
                Shop Collection &rarr;
              </Link>
            </div>
          </div>

          <div className="relative group overflow-hidden rounded-2xl border aspect-[4/3] bg-muted">
            <img
              src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=500&h=400&q=80"
              alt="Home decors category"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">Decor</span>
              <h3 className="font-bold text-base">Minimalist Home Essentials</h3>
              <p className="text-[11px] text-zinc-300">Stoneware ceramics and energy-saving desk lights.</p>
              <Link to="/category/home-living" className="text-xs font-semibold text-amber-300 hover:text-white underline-offset-4 hover:underline mt-2">
                Shop Collection &rarr;
              </Link>
            </div>
          </div>

        </div>
      </section>

      {/* Featured Items Grid Section */}
      <section className="bg-muted/30 py-16 border-y">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-red-500 text-xs font-bold uppercase tracking-wider">
                <Flame className="h-4 w-4 fill-current" />
                Featured Picks
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-foreground">Featured Products</h2>
            </div>
            <Link to="/shop">
              <Button variant="outline" className="font-bold uppercase tracking-wider text-xs">
                Explore Full Shop &rarr;
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProds.map((prod) => (
              <div
                key={prod.id}
                className="bg-card text-card-foreground border rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
              >
                <div className="relative aspect-square w-full bg-muted">
                  <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" />
                </div>
                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-foreground text-sm line-clamp-1">{prod.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{prod.description}</p>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-black text-foreground">${prod.discountPrice || prod.price}</span>
                    <Link to={`/product/${prod.id}`}>
                      <Button size="sm" variant="outline">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Trust Testimonials banner */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 space-y-10">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-foreground">What Our Customers Say</h2>
          <p className="text-xs sm:text-sm text-muted-foreground max-w-md mx-auto">
            Real reviews from real shoppers who upgraded their gear and apparel with Nexus.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              name: "Sarah K.",
              role: "Tech Professional",
              comment: "The AeroPulse headphones are amazing. I work in a loud open-plan office and turning the ANC on completely isolates me. Sound response is full and deep.",
              rating: 5,
            },
            {
              name: "Marcus T.",
              role: "Design Lead",
              comment: "I love the minimalist aesthetic of the desk lamp and stoneware ceramic mug set. They have transformed my home office into a beautiful, productive workspace.",
              rating: 5,
            },
            {
              name: "Amanda L.",
              role: "Fitness Coach",
              comment: "The adjustable dumbbells are solid. Dial settings are seamless and the grip is very comfortable. Saved me tons of space in my home gym.",
              rating: 4,
            },
          ].map((item, index) => (
            <div key={index} className="border p-6 rounded-2xl bg-card text-card-foreground shadow-sm space-y-4">
              <div className="flex text-amber-500">
                {Array.from({ length: item.rating }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed italic">"{item.comment}"</p>
              <div>
                <h4 className="font-bold text-foreground text-xs">{item.name}</h4>
                <p className="text-[10px] text-muted-foreground">{item.role}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  )
}
