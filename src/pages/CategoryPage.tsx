import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { SlidersHorizontal, ArrowRight, Layers } from "lucide-react"
import { ProductCard } from "../components/product/ProductCard"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { Button } from "../components/ui/Button"
import { api } from "../services/api"
import { Product } from "../types"
import { BackButton } from "../components/common/BackButton"

interface SubcategoryDetail {
  name: string
  slug: string
  desc: string
  image: string
}

interface CategoryDetail {
  name: string
  desc: string
  banner: string
  subcategories: SubcategoryDetail[]
}

const CATEGORY_MAP: Record<string, CategoryDetail> = {
  electronics: {
    name: "Electronics & Wearables",
    desc: "Discover next-generation gear from immersive noise-cancelling audio setups to AMOLED smartwatches and premium laptops.",
    banner: "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Smartphones", slug: "smartphones", desc: "Flagship 5G phones & high-res displays", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Laptops", slug: "laptops", desc: "High-performance laptops for creators & professionals", image: "https://images.unsplash.com/photo-1496181130204-7552cc145cd5?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Accessories", slug: "accessories", desc: "Premium wireless audio & multi-port adapters", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Smart Devices", slug: "smart-devices", desc: "IoT hubs, ambient bulbs & smart sensors", image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  },
  fashion: {
    name: "Premium Fashion & Apparel",
    desc: "Elevate your daily wardrobe with our curated apparel lines, handcrafted footwear, and modern silhouettes for all seasons.",
    banner: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Men", slug: "men", desc: "Slim fit chinos, hoodies & tailored shirts", image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Women", slug: "women", desc: "Bohemian cotton dresses, skirts & blazers", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Kids", slug: "kids", desc: "Organic certified cotton play suits & sets", image: "https://images.unsplash.com/photo-1519457431-44ccd64a579b?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Footwear", slug: "footwear", desc: "Ergonomic leather sneakers, boots & loafers", image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  },
  "home-living": {
    name: "Modern Home & Living",
    desc: "Reimagine your space with adaptive mesh office chairs, matte-glazed ceramics, and state-of-the-art ambient lighting.",
    banner: "https://images.unsplash.com/photo-1505797149-43b0069ec26b?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Furniture", slug: "furniture", desc: "Minimalist structured furniture & office seating", image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Home Decor", slug: "home-decor", desc: "Curated objects, woven rugs & soy candles", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Kitchen", slug: "kitchen", desc: "Cast iron Dutch ovens, chef knives & kettles", image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Lighting", slug: "lighting", desc: "Flicker-free desk lamps & glass pendant lights", image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  },
  "sports-fitness": {
    name: "Sports & Training Fitness",
    desc: "Maximize your training potential with adjustable strength systems, heavy-duty gear, and professional outdoor equipment.",
    banner: "https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Gym Equipment", slug: "gym-equipment", desc: "Rapid-dial adjustable dumbbells & benches", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Sports Gear", slug: "sports-gear", desc: "Tournament tennis rackets, balls & gear", image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Outdoor Activities", slug: "outdoor-activities", desc: "Waterproof tents, camp hammocks & daypacks", image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Fitness Accessories", slug: "fitness-accessories", desc: "Double-wall thermo bottles & smart scales", image: "https://images.unsplash.com/photo-1518481612222-68bbe828ecd1?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  },
  "beauty-personal-care": {
    name: "Beauty & Personal Care",
    desc: "Enhance your skincare and styling routine with plant-based formulas, professional makeup tools, and precision grooming kits.",
    banner: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Skincare", slug: "skincare", desc: "Hydrating hyaluronic serums & SPF sunscreens", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Hair Care", slug: "hair-care", desc: "Sulfate-free shampoos & deep repair hair masks", image: "https://images.unsplash.com/photo-1527799851257-3593d843806e?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Makeup", slug: "makeup", desc: "Velvet liquid lipsticks, foundations & highlighters", image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Grooming", slug: "grooming", desc: "Safety razor sets, beard oils & grooming kits", image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  },
  "books-stationery": {
    name: "Books & Creative Stationery",
    desc: "Ignite your intellect with creative theory literature, acid-free bullet journals, and architectural steel desk tools.",
    banner: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Books", slug: "books", desc: "Hardcover novels & coding system design patterns", image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Notebooks", slug: "notebooks", desc: "Washed linen sketchbooks & thread-bound journals", image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Office Supplies", slug: "office-supplies", desc: "Fine-point brass gel pens & acrylic organizers", image: "https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Study Materials", slug: "study-materials", desc: "Flashcard learning sets & high-contrast markers", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  },
  "toys-games": {
    name: "Toys & Interactive Games",
    desc: "Cultivate spatial reasoning, logic, and family bonding with robotics starter kits, board games, and 3D gear puzzles.",
    banner: "https://images.unsplash.com/photo-1559251606-c623743a6d76?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Educational Toys", slug: "educational-toys", desc: "STEM robotics kits & solar engine blocks", image: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Board Games", slug: "board-games", desc: "Tactical tabletop boards & card mystery decks", image: "https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Kids Toys", slug: "kids-toys", desc: "Wooden mini train sets & organic plush dolls", image: "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Puzzles", slug: "puzzles", desc: "Interlocking jigsaw landscapes & Rubik cubes", image: "https://images.unsplash.com/photo-1585250004683-154a37651c5e?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  },
  automotive: {
    name: "Automotive Gear & Care",
    desc: "Enhance your commute with high-resolution 4K dash cams, MIPS polycarbonate helmets, and pro detail wash kits.",
    banner: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Car Accessories", slug: "car-accessories", desc: "Dual 4K dashcams & memory foam cushions", image: "https://images.unsplash.com/photo-1622445262465-2481c4574875?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Bike Accessories", slug: "bike-accessories", desc: "High-security steel U-locks & saddle bags", image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Helmets", slug: "helmets", desc: "Carbon full-face & protective MIPS designs", image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Vehicle Care", slug: "vehicle-care", desc: "Carnauba liquid wax sets & high-foam soaps", image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  },
  "health-wellness": {
    name: "Health & Active Wellness",
    desc: "Track health metrics and fuel your active recovery with smart BP cuffs, organic plant proteins, and extension yoga blocks.",
    banner: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: [
      { name: "Fitness Equipment", slug: "fitness-equipment", desc: "Eco yoga mats & home strength bars", image: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Yoga Accessories", slug: "yoga-accessories", desc: "EVA alignment blocks & cotton strap kits", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Health Devices", slug: "health-devices", desc: "Smart BP blood pressure cuffs & oximeters", image: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&w=600&h=400&q=80" },
      { name: "Nutrition Products", slug: "nutrition-products", desc: "Plant-based proteins & triple fish oil pills", image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=600&h=400&q=80" }
    ]
  }
}

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const activeCategorySlug = slug || "electronics"
  const categoryDetails = CATEGORY_MAP[activeCategorySlug] || {
    name: "Nexus Collection",
    desc: "Explore Nexus items engineered for high-performance quality and modern aesthetics.",
    banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=400&q=80",
    subcategories: []
  }

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true)
      try {
        const res = await api.getProducts({ category: activeCategorySlug, limit: 12 })
        setProducts(res.products)
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchCategoryProducts()
  }, [activeCategorySlug])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <BackButton className="mb-4" />
      
      {/* Breadcrumb navigation */}
      <Breadcrumbs
        items={[
          { label: "Shop", path: "/shop" },
          { label: categoryDetails.name },
        ]}
      />

      {/* Category Hero Banner */}
      <div
        className="relative h-60 sm:h-80 w-full rounded-3xl overflow-hidden bg-muted flex items-center p-6 sm:p-12 mb-12 shadow-md border bg-cover bg-center mt-4 transition-all duration-300"
        style={{ backgroundImage: `url(${categoryDetails.banner})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/25" />
        <div className="relative max-w-2xl text-white space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-primary/95 text-white px-3 py-1 rounded-full uppercase tracking-wider">
            <Layers className="h-3 w-3" />
            Category Collection
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight drop-shadow-md text-white">{categoryDetails.name}</h1>
          <p className="text-xs sm:text-base text-zinc-200 leading-relaxed font-medium drop-shadow">{categoryDetails.desc}</p>
        </div>
      </div>

      {/* Subcategories Grid */}
      {categoryDetails.subcategories && categoryDetails.subcategories.length > 0 && (
        <section className="mb-16">
          <div className="flex flex-col mb-6">
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Shop by Subcategory</h2>
            <p className="text-xs text-muted-foreground mt-1">Explore our highly curated sub-collections designed for specific focus areas</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categoryDetails.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                to={`/category/${activeCategorySlug}/${sub.slug}`}
                className="relative overflow-hidden rounded-2xl border bg-card aspect-[4/3] group shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
              >
                {/* Background image */}
                <img
                  src={sub.image}
                  alt={sub.name}
                  className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Dark premium overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10 transition-opacity duration-300" />
                
                {/* Text Content */}
                <div className="absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end">
                  <h3 className="text-base sm:text-lg font-black text-white group-hover:text-primary transition-colors flex items-center gap-1">
                    {sub.name}
                  </h3>
                  <p className="text-[11px] text-zinc-300 line-clamp-2 mt-1 leading-snug font-medium">
                    {sub.desc}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-white bg-primary px-3 py-1.5 rounded-lg w-fit opacity-90 group-hover:opacity-100 transition-opacity">
                    Explore items
                    <ArrowRight className="h-3 w-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Grid listing */}
      <div className="space-y-6 border-t pt-10">
        <div className="flex items-end justify-between border-b pb-4">
          <div>
            <h2 className="text-xl font-black text-foreground tracking-tight">Collection Highlights</h2>
            <p className="text-xs text-muted-foreground mt-1">Featured products trending under this category</p>
          </div>
          <Link to={`/category/${activeCategorySlug}/${categoryDetails.subcategories?.[0]?.slug || ""}`}>
            <Button variant="outline" size="sm" className="gap-1.5 font-bold uppercase tracking-wider text-[10px] h-9">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filter & Sort
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, idx) => (
              <div key={idx} className="border rounded-2xl p-4 space-y-4 animate-pulse bg-muted/40">
                <div className="aspect-square bg-muted rounded-xl" />
                <div className="h-4 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="flex justify-between items-center pt-2">
                  <div className="h-4 bg-muted rounded w-1/4" />
                  <div className="h-8 bg-muted rounded w-1/3" />
                </div>
              </div>
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center border rounded-2xl bg-muted/20">
            <h3 className="font-bold text-foreground text-sm">No items in category</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">We currently do not have items listed in this specific category collection.</p>
            <Link to="/shop" className="mt-4">
              <Button size="sm">Back to catalog</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}
