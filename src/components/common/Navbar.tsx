import React, { useState, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import {
  Search,
  ShoppingCart,
  Heart,
  GitCompare,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ChevronDown,
  ShoppingBag,
  Laptop,
  Shirt,
  Home,
  Dumbbell,
  Sparkles,
  BookOpen,
  Gamepad,
  Car,
  HeartPulse,
  Tag,
  Flame,
  Zap,
  Clock,
  Percent,
  Users,
  Compass,
  Eye,
  ShieldCheck,
  Phone,
  FileText,
  Award
} from "lucide-react"
import { useCartStore } from "../../store/cartStore"
import { useWishlistStore } from "../../store/wishlistStore"
import { useCompareStore } from "../../store/compareStore"
import { useUserStore } from "../../store/userStore"
import { MOCK_PRODUCTS } from "../../services/api"
import { Product } from "../../types"
import { Input } from "../ui/Input"
import { cn } from "../../utils/cn"

export const Navbar: React.FC = () => {
  const navigate = useNavigate()
  const { cart } = useCartStore()
  const { wishlist } = useWishlistStore()
  const { compareList } = useCompareStore()
  const { user, isAuthenticated, logout } = useUserStore()

  // Theme management
  const [theme, setTheme] = useState<"light" | "dark">("light")
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark"
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle("dark", savedTheme === "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
  }

  // Mobile menu toggling
  const [mobileOpen, setMobileOpen] = useState(false)
  // Search box state
  const [searchQuery, setSearchQuery] = useState("")
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [suggestions, setSuggestions] = useState<Product[]>([])
  const suggestionRef = useRef<HTMLDivElement>(null)
  // Handle Search Input Suggestions
  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const query = searchQuery.toLowerCase()
      const filtered = MOCK_PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query)
      ).slice(0, 5)
      setSuggestions(filtered)
      setShowSuggestions(true)
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }, [searchQuery])

  // Close search suggestions on click-away
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (suggestionRef.current && !suggestionRef.current.contains(e.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      setShowSuggestions(false)
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  const handleSuggestionClick = (prodId: string) => {
    setSearchQuery("")
    setShowSuggestions(false)
    navigate(`/product/${prodId}`)
  }

  // Categories mega menu dropdown state & refs
  const [showCategories, setShowCategories] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpen = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setShowCategories(true)
  }

  const handleClose = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => {
      setShowCategories(false)
    }, 250) // 250ms delay
  }

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setShowCategories((prev) => !prev)
  }

  // Deals dropdown state & refs
  const [showDeals, setShowDeals] = useState(false)
  const dealsDropdownRef = useRef<HTMLDivElement>(null)
  const dealsTriggerRef = useRef<HTMLButtonElement>(null)
  const dealsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpenDeals = () => {
    if (dealsTimeoutRef.current) clearTimeout(dealsTimeoutRef.current)
    setShowDeals(true)
  }

  const handleCloseDeals = () => {
    if (dealsTimeoutRef.current) clearTimeout(dealsTimeoutRef.current)
    dealsTimeoutRef.current = setTimeout(() => {
      setShowDeals(false)
    }, 250) // 250ms delay
  }

  const handleToggleDeals = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (dealsTimeoutRef.current) clearTimeout(dealsTimeoutRef.current)
    setShowDeals((prev) => !prev)
  }

  // About dropdown state & refs
  const [showAbout, setShowAbout] = useState(false)
  const aboutDropdownRef = useRef<HTMLDivElement>(null)
  const aboutTriggerRef = useRef<HTMLButtonElement>(null)
  const aboutTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpenAbout = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
    setShowAbout(true)
  }

  const handleCloseAbout = () => {
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
    aboutTimeoutRef.current = setTimeout(() => {
      setShowAbout(false)
    }, 250) // 250ms delay
  }

  const handleToggleAbout = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
    setShowAbout((prev) => !prev)
  }

  // User Account dropdown state & refs
  const [showUserMenu, setShowUserMenu] = useState(false)
  const userDropdownRef = useRef<HTMLDivElement>(null)
  const userTriggerRef = useRef<HTMLButtonElement>(null)
  const userTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleOpenUserMenu = () => {
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current)
    setShowUserMenu(true)
  }

  const handleCloseUserMenu = () => {
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current)
    userTimeoutRef.current = setTimeout(() => {
      setShowUserMenu(false)
    }, 250)
  }

  const handleToggleUserMenu = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current)
    setShowUserMenu((prev) => !prev)
  }

  // Mobile Accordion Drawer states
  const [mobileCategoriesOpen, setMobileCategoriesOpen] = useState(false)
  const [mobileDealsOpen, setMobileDealsOpen] = useState(false)
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false)

  // Click outside to close mega menus, dropdowns, and suggestions
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node
      // Categories outside click
      if (
        dropdownRef.current && !dropdownRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setShowCategories(false)
      }
      // Deals outside click
      if (
        dealsDropdownRef.current && !dealsDropdownRef.current.contains(target) &&
        dealsTriggerRef.current && !dealsTriggerRef.current.contains(target)
      ) {
        setShowDeals(false)
      }
      // About outside click
      if (
        aboutDropdownRef.current && !aboutDropdownRef.current.contains(target) &&
        aboutTriggerRef.current && !aboutTriggerRef.current.contains(target)
      ) {
        setShowAbout(false)
      }
      // User menu outside click
      if (
        userDropdownRef.current && !userDropdownRef.current.contains(target) &&
        userTriggerRef.current && !userTriggerRef.current.contains(target)
      ) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      if (dealsTimeoutRef.current) clearTimeout(dealsTimeoutRef.current)
      if (aboutTimeoutRef.current) clearTimeout(aboutTimeoutRef.current)
      if (userTimeoutRef.current) clearTimeout(userTimeoutRef.current)
    }
  }, [])

  const dealsMenuItems = [
    { name: "Today's Deals", desc: "Top discounts of the day", hash: "#todays-deals", icon: <Flame className="h-4.5 w-4.5 text-red-600 dark:text-red-400 shrink-0" /> },
    { name: "Flash Sales", desc: "Hurry, timer is running!", hash: "#flash-sales", icon: <Zap className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400 fill-amber-500 dark:fill-amber-400 shrink-0" /> },
    { name: "Limited Time Offers", desc: "Exclusive selected promos", hash: "#limited-offers", icon: <Sparkles className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400 shrink-0" /> },
    { name: "Clearance Sale", desc: "Up to 70% reduction", hash: "#clearance-sale", icon: <Tag className="h-4.5 w-4.5 text-rose-600 dark:text-rose-400 shrink-0" /> },
    { name: "Buy One Get One", desc: "Two items for one price", hash: "#bogo", icon: <ShoppingBag className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" /> },
    { name: "Under ₹499", desc: "Best value budget picks", hash: "#under-499", icon: <Percent className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 shrink-0" /> },
    { name: "Under ₹999", desc: "Selected mid-range items", hash: "#under-999", icon: <Laptop className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 shrink-0" /> },
  ]

  const aboutMenuItems = [
    { name: "Corporate Profile", desc: "Identity, culture, and high-impact offerings", hash: "#about-us", path: "/about", icon: <Users className="h-4.5 w-4.5 text-indigo-600 dark:text-indigo-400 shrink-0" /> },
    { name: "Our History", desc: "Tracing our origin and growth journey", hash: "#story", path: "/about", icon: <BookOpen className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 shrink-0" /> },
    { name: "Core Principles", desc: "Empowering daily life through curation", hash: "#mission", path: "/about", icon: <Compass className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" /> },
    { name: "Our Advantage", desc: "Uncompromising quality & verified standards", hash: "#why-choose-us", path: "/about", icon: <Award className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400 shrink-0" /> },
    { name: "Get In Touch", desc: "Connect directly with global assistance", path: "/contact", icon: <Phone className="h-4.5 w-4.5 text-rose-600 dark:text-rose-400 shrink-0" /> },
    { name: "Help Center", desc: "Instant clarity on common inquiries", path: "/faq", icon: <Sparkles className="h-4.5 w-4.5 text-violet-600 dark:text-violet-400 shrink-0" /> },
    { name: "Data Protection", desc: "Robust safeguards ensuring confidentiality", hash: "#privacy", path: "/about", icon: <ShieldCheck className="h-4.5 w-4.5 text-teal-600 dark:text-teal-400 shrink-0" /> },
    { name: "Service Terms", desc: "Clear governing guidelines & standards", hash: "#terms", path: "/about", icon: <FileText className="h-4.5 w-4.5 text-slate-600 dark:text-slate-400 shrink-0" /> },
  ]

  const categories = [
    {
      name: "Electronics",
      slug: "electronics",
      icon: <Laptop className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400 shrink-0" />,
      items: ["Smartphones", "Laptops", "Accessories", "Smart Devices"],
    },
    {
      name: "Fashion",
      slug: "fashion",
      icon: <Shirt className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400 shrink-0" />,
      items: ["Men", "Women", "Kids", "Footwear"],
    },
    {
      name: "Home & Living",
      slug: "home-living",
      icon: <Home className="h-4.5 w-4.5 text-amber-600 dark:text-amber-400 shrink-0" />,
      items: ["Furniture", "Home Decor", "Kitchen", "Lighting"],
    },
    {
      name: "Sports & Fitness",
      slug: "sports-fitness",
      icon: <Dumbbell className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400 shrink-0" />,
      items: ["Gym Equipment", "Sports Gear", "Outdoor Activities", "Fitness Accessories"],
    },
    {
      name: "Beauty & Personal Care",
      slug: "beauty-personal-care",
      icon: <Sparkles className="h-4.5 w-4.5 text-pink-600 dark:text-pink-400 shrink-0" />,
      items: ["Skincare", "Hair Care", "Makeup", "Grooming"],
    },
    {
      name: "Books & Stationery",
      slug: "books-stationery",
      icon: <BookOpen className="h-4.5 w-4.5 text-red-600 dark:text-red-400 shrink-0" />,
      items: ["Books", "Notebooks", "Office Supplies", "Study Materials"],
    },
    {
      name: "Toys & Games",
      slug: "toys-games",
      icon: <Gamepad className="h-4.5 w-4.5 text-teal-600 dark:text-teal-400 shrink-0" />,
      items: ["Educational Toys", "Board Games", "Kids Toys", "Puzzles"],
    },
    {
      name: "Automotive",
      slug: "automotive",
      icon: <Car className="h-4.5 w-4.5 text-slate-600 dark:text-slate-400 shrink-0" />,
      items: ["Car Accessories", "Bike Accessories", "Helmets", "Vehicle Care"],
    },
    {
      name: "Health & Wellness",
      slug: "health-wellness",
      icon: <HeartPulse className="h-4.5 w-4.5 text-rose-600 dark:text-rose-400 shrink-0" />,
      items: ["Fitness Equipment", "Yoga Accessories", "Health Devices", "Nutrition Products"],
    },
  ]
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="relative mx-auto flex h-20 max-w-[1600px] items-center justify-between gap-6 px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight text-foreground hover:opacity-90">
            <ShoppingBag className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent font-extrabold tracking-widest">NEXUS</span>
          </Link>
        </div>

        {/* Simplified Navigation (Desktop) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-10 text-sm font-medium whitespace-nowrap">
          <Link to="/" className="text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap">Home</Link>
          <Link to="/shop" className="text-foreground/80 hover:text-foreground transition-colors whitespace-nowrap">Shop</Link>
          
          {/* Categories Dropdown Mega Menu */}
          <div>
            <button
              ref={triggerRef}
              onClick={handleToggle}
              onMouseEnter={handleOpen}
              onMouseLeave={handleClose}
              className="flex items-center space-x-1.5 text-foreground/80 hover:text-foreground focus:outline-none py-4 transition-colors whitespace-nowrap"
            >
              <span>Categories</span>
              <ChevronDown className="h-3 w-3" />
            </button>

            {showCategories && (
              <div
                ref={dropdownRef}
                onMouseEnter={handleOpen}
                onMouseLeave={handleClose}
                className="absolute left-1/2 top-full -translate-x-1/2 w-[calc(100%-6rem)] max-w-[1100px] rounded-2xl border bg-background p-8 shadow-2xl grid grid-cols-3 gap-x-8 gap-y-6 z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150 before:absolute before:bottom-full before:left-0 before:right-0 before:h-8 before:content-['']"
              >
                {categories.map((cat) => (
                  <div key={cat.slug} className="space-y-3">
                    <Link
                      to={`/category/${cat.slug}`}
                      className="font-bold text-xs uppercase tracking-wider text-primary hover:text-primary/80 transition-colors flex items-center gap-2 group/title"
                      onClick={() => setShowCategories(false)}
                    >
                      {cat.icon}
                      <span className="group-hover/title:underline">{cat.name}</span>
                    </Link>
                    <ul className="space-y-1.5 pl-[26px]">
                      {cat.items.map((item) => {
                        const subSlug = item.toLowerCase().replace(/ & /g, "-").replace(/\s+/g, "-")
                        return (
                          <li key={item}>
                            <Link
                              to={`/category/${cat.slug}/${subSlug}`}
                              className="text-xs text-muted-foreground hover:text-foreground transition-colors block font-medium"
                              onClick={() => setShowCategories(false)}
                            >
                              {item}
                            </Link>
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          {/* Deals Dropdown */}
          <div className="relative">
            <button
              ref={dealsTriggerRef}
              onClick={handleToggleDeals}
              onMouseEnter={handleOpenDeals}
              onMouseLeave={handleCloseDeals}
              className="flex items-center space-x-1.5 text-foreground/80 hover:text-foreground focus:outline-none py-4 transition-colors whitespace-nowrap"
            >
              <span>Deals</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", showDeals && "rotate-180")} />
            </button>

            {showDeals && (
              <div
                ref={dealsDropdownRef}
                onMouseEnter={handleOpenDeals}
                onMouseLeave={handleCloseDeals}
                className="absolute left-0 top-full mt-0 w-72 rounded-2xl border bg-background p-3 shadow-2xl z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150 before:absolute before:bottom-full before:left-0 before:right-0 before:h-4 before:content-['']"
              >
                <div className="space-y-1">
                  {dealsMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={`/deals${item.hash}`}
                      onClick={() => setShowDeals(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/60 transition-colors group"
                    >
                      <div className="p-2 bg-muted/80 group-hover:bg-background rounded-lg border border-border/40 transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-foreground tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground leading-normal mt-0.5 truncate">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* About Dropdown */}
          <div className="relative">
            <button
              ref={aboutTriggerRef}
              onClick={handleToggleAbout}
              onMouseEnter={handleOpenAbout}
              onMouseLeave={handleCloseAbout}
              className="flex items-center space-x-1.5 text-foreground/80 hover:text-foreground focus:outline-none py-4 transition-colors whitespace-nowrap"
            >
              <span>About</span>
              <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", showAbout && "rotate-180")} />
            </button>

            {showAbout && (
              <div
                ref={aboutDropdownRef}
                onMouseEnter={handleOpenAbout}
                onMouseLeave={handleCloseAbout}
                className="absolute left-0 top-full mt-0 w-80 rounded-2xl border bg-background p-3 shadow-2xl z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150 before:absolute before:bottom-full before:left-0 before:right-0 before:h-4 before:content-['']"
              >
                <div className="grid grid-cols-1 gap-1">
                  {aboutMenuItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.path + (item.hash || "")}
                      onClick={() => setShowAbout(false)}
                      className="flex items-center gap-3 p-2 rounded-xl hover:bg-muted/60 transition-colors group"
                    >
                      <div className="p-2 bg-muted/80 group-hover:bg-background rounded-lg border border-border/40 transition-colors shrink-0">
                        {item.icon}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-foreground tracking-tight">{item.name}</p>
                        <p className="text-[10px] text-muted-foreground leading-normal mt-0.5 truncate">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </nav>

        {/* Search Bar with Suggestions */}
        <div className="relative hidden md:flex items-center w-full max-w-[340px] xl:max-w-[440px] transition-all duration-300" ref={suggestionRef}>
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <Input
              type="search"
              placeholder="Search products..."
              className="pr-12 h-11 w-full bg-muted/40 focus:bg-background border border-input/60 focus:border-primary/60 rounded-xl text-xs sm:text-sm tracking-wide transition-all duration-300"
              value={searchQuery}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
              onFocus={() => {
                if (searchQuery.trim().length > 1) setShowSuggestions(true)
              }}
            />
            <button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground h-9 w-9 flex items-center justify-center rounded-lg hover:bg-muted/50 transition-colors"
              aria-label="Search"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>

          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border rounded-xl shadow-xl z-50 overflow-hidden animate-in fade-in-50 duration-100">
              <div className="p-2 border-b">
                <span className="text-[10px] font-semibold text-muted-foreground uppercase px-2">Suggestions</span>
              </div>
              <ul className="divide-y max-h-60 overflow-y-auto">
                {suggestions.map((p) => (
                  <li key={p.id}>
                    <button
                      onClick={() => handleSuggestionClick(p.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-muted/50 transition-colors text-left"
                    >
                      <img src={p.image} alt={p.name} className="h-8 w-8 rounded-md object-cover border shrink-0" />
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-foreground truncate">{p.name}</p>
                        <p className="text-[10px] text-muted-foreground font-medium">${p.discountPrice || p.price}</p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* User Navigation Actions */}
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-6 shrink-0">
          
          {/* Theme toggler */}
          <button
            onClick={toggleTheme}
            className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
          </button>

          {/* Product Compare Badge */}
          <Link
            to="/shop"
            state={{ openCompare: true }}
            className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors relative hidden sm:inline-flex"
            title="Product Comparison"
          >
            <GitCompare className="h-5 w-5" />
            {compareList.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {compareList.length}
              </span>
            )}
          </Link>

          {/* Wishlist Link */}
          <Link
            to="/wishlist"
            className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors relative"
            title="Wishlist"
          >
            <Heart className="h-5 w-5" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Cart Icon */}
          <Link
            to="/cart"
            className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors relative"
            title="Shopping Cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && (
              <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* User Account / Profile */}
          {isAuthenticated ? (
            <div className="relative flex items-center">
              <button
                ref={userTriggerRef}
                onClick={handleToggleUserMenu}
                onMouseEnter={handleOpenUserMenu}
                onMouseLeave={handleCloseUserMenu}
                className="flex items-center justify-center gap-2 h-11 px-3 rounded-lg border hover:bg-muted/50 transition-colors focus:outline-none"
                aria-label="User Account Menu"
              >
                {user?.profilePic ? (
                  <img src={user.profilePic} alt={user.name} className="h-6 w-6 rounded-full object-cover shrink-0" />
                ) : (
                  <User className="h-4 w-4" />
                )}
                <span className="hidden lg:inline text-xs font-semibold">{user?.name}</span>
                <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", showUserMenu && "rotate-180")} />
              </button>

              {/* Account Dropdown Menu */}
              {showUserMenu && (
                <div
                  ref={userDropdownRef}
                  onMouseEnter={handleOpenUserMenu}
                  onMouseLeave={handleCloseUserMenu}
                  className="absolute right-0 top-full mt-2 w-44 rounded-xl border bg-background p-1.5 shadow-xl z-50 animate-in fade-in-50 slide-in-from-top-2 duration-150 space-y-1"
                >
                  <Link
                    to="/dashboard"
                    onClick={() => setShowUserMenu(false)}
                    className="block text-xs font-bold px-4 py-2 text-foreground/80 hover:bg-muted rounded-lg transition-colors"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      logout()
                    }}
                    className="w-full flex items-center justify-start text-xs font-bold px-4 py-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
              title="Login"
            >
              <User className="h-5 w-5" />
            </Link>
          )}

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileOpen(true)}
            className="h-11 w-11 flex items-center justify-center lg:hidden text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
            aria-label="Open Menu"
          >
            <Menu className="h-5 w-5" />
          </button>

        </div>

      </div>

      {/* Mobile Drawer Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in-30">
          <div className="relative flex w-full max-w-xs flex-col h-full bg-background p-6 shadow-xl animate-in slide-in-from-right-5 duration-200 ml-auto">
            <div className="flex items-center justify-between border-b pb-4">
              <span className="text-sm font-bold text-foreground">Menu</span>
              <button
                onClick={() => setMobileOpen(false)}
                className="h-11 w-11 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg"
                aria-label="Close Menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Mobile Search */}
            <div className="mt-4">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="pr-10 h-10 w-full"
                  value={searchQuery}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Navigation links */}
            <div className="mt-6 flex-1 flex flex-col space-y-4 overflow-y-auto pr-1">
              <Link to="/" onClick={() => setMobileOpen(false)} className="text-sm font-bold text-foreground hover:text-primary">Home</Link>
              <Link to="/shop" onClick={() => setMobileOpen(false)} className="text-sm font-bold text-foreground hover:text-primary">Shop</Link>
              
              {/* Mobile Categories Accordion */}
              <div className="border-t pt-3">
                <button
                  onClick={() => setMobileCategoriesOpen(!mobileCategoriesOpen)}
                  className="flex items-center justify-between w-full text-xs font-black text-muted-foreground uppercase py-2 focus:outline-none"
                >
                  <span>Categories</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", mobileCategoriesOpen && "rotate-180")} />
                </button>
                {mobileCategoriesOpen && (
                  <div className="mt-1 flex flex-col space-y-2 pl-2 border-l border-primary/20 animate-in fade-in duration-100">
                    {categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        to={`/category/${cat.slug}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-xs font-semibold text-foreground/80 hover:text-primary py-1 block"
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile Deals Accordion */}
              <div className="border-t pt-3">
                <button
                  onClick={() => setMobileDealsOpen(!mobileDealsOpen)}
                  className="flex items-center justify-between w-full text-xs font-black text-muted-foreground uppercase py-2 focus:outline-none"
                >
                  <span>Deals</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", mobileDealsOpen && "rotate-180")} />
                </button>
                {mobileDealsOpen && (
                  <div className="mt-1 flex flex-col space-y-2 pl-2 border-l border-primary/20 animate-in fade-in duration-100">
                    {dealsMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={`/deals${item.hash}`}
                        onClick={() => setMobileOpen(false)}
                        className="text-xs font-semibold text-foreground/80 hover:text-primary py-1 flex items-center gap-2"
                      >
                        <span className="shrink-0 scale-75 opacity-80">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Mobile About Accordion */}
              <div className="border-t pt-3">
                <button
                  onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                  className="flex items-center justify-between w-full text-xs font-black text-muted-foreground uppercase py-2 focus:outline-none"
                >
                  <span>About</span>
                  <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-200", mobileAboutOpen && "rotate-180")} />
                </button>
                {mobileAboutOpen && (
                  <div className="mt-1 flex flex-col space-y-2 pl-2 border-l border-primary/20 animate-in fade-in duration-100">
                    {aboutMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        to={item.path + (item.hash || "")}
                        onClick={() => setMobileOpen(false)}
                        className="text-xs font-semibold text-foreground/80 hover:text-primary py-1 flex items-center gap-2"
                      >
                        <span className="shrink-0 scale-75 opacity-80">{item.icon}</span>
                        <span>{item.name}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="border-t pt-4">
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  {user?.profilePic && <img src={user.profilePic} alt={user.name} className="h-8 w-8 rounded-full object-cover border" />}
                  <div>
                    <p className="text-xs font-semibold text-foreground">{user?.name}</p>
                    <button
                      onClick={() => {
                        logout()
                        setMobileOpen(false)
                      }}
                      className="text-xs font-semibold text-red-500 hover:underline mt-0.5"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full flex items-center justify-center h-10 rounded-lg bg-primary text-primary-foreground font-semibold text-sm"
                >
                  Sign In
                </Link>
              )}
            </div>

          </div>
        </div>
      )}
    </header>
  )
}
