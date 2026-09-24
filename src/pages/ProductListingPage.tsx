import React, { useState, useEffect } from "react"
import { useLocation, useParams, useNavigate } from "react-router-dom"
import { Filter, ChevronDown, SlidersHorizontal, Grid, Grid3X3, RefreshCw } from "lucide-react"
import { ProductFilters, FiltersState } from "../components/product/ProductFilters"
import { ProductCard } from "../components/product/ProductCard"
import { QuickView } from "../components/product/QuickView"
import { CompareModal } from "../components/product/CompareModal"
import { BackButton } from "../components/common/BackButton"
import { Button } from "../components/ui/Button"
import { Select } from "../components/ui/Select"
import { api } from "../services/api"
import { Product } from "../types"

export const ProductListingPage: React.FC = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { slug, subSlug } = useParams<{ slug?: string; subSlug?: string }>()

  // Compare Modal control (navbar trigger state)
  const [compareOpen, setCompareOpen] = useState(false)
  useEffect(() => {
    if (location.state && (location.state as any).openCompare) {
      setCompareOpen(true)
    }
  }, [location.state])

  // Filters State
  const [filters, setFilters] = useState<FiltersState>({
    category: slug || "",
    priceRange: [0, 1500],
    rating: 0,
  })

  const [sortBy, setSortBy] = useState("default")
  const [products, setProducts] = useState<Product[]>([])
  const [totalProducts, setTotalProducts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  // Mobile Filter Sidebar toggler
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  // Quick View selected product
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)

  // Query API when filters or page changes
  const fetchProducts = async (currentPage: number, append = false) => {
    setLoading(true)
    try {
      const res = await api.getProducts({
        category: slug && !subSlug ? slug : filters.category || undefined,
        subcategory: subSlug || undefined,
        minPrice: filters.priceRange[0],
        maxPrice: filters.priceRange[1],
        rating: filters.rating > 0 ? filters.rating : undefined,
        sortBy: sortBy !== "default" ? sortBy : undefined,
        page: currentPage,
        limit: 6,
      })
      if (append) {
        setProducts((prev) => [...prev, ...res.products])
      } else {
        setProducts(res.products)
      }
      setTotalProducts(res.total)
      setHasMore(res.hasMore)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  // Sync URL slug to category filter state
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      category: slug || "",
    }))
  }, [slug])

  // Reload products from page 1 on filter/sort changes
  useEffect(() => {
    setPage(1)
    fetchProducts(1, false)
  }, [filters, sortBy, slug, subSlug])

  // Fetch next page when page incremented
  useEffect(() => {
    if (page > 1) {
      fetchProducts(page, true)
    }
  }, [page])

  const handleFilterChange = (newFilters: FiltersState) => {
    if (newFilters.category !== (slug || "")) {
      if (newFilters.category) {
        navigate(`/category/${newFilters.category}`)
      } else {
        navigate("/shop")
      }
    } else {
      setFilters(newFilters)
    }
  }

  const handleClearFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 1500],
      rating: 0,
    })
    if (slug || subSlug) {
      navigate("/shop")
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="pt-6 pb-4 flex items-center">
        <BackButton defaultPath="/shop" />
      </div>

      {/* Grid listing content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-2">
        
        {/* Sidebar filters (Desktop only) */}
        <aside className="hidden lg:block border p-6 rounded-2xl bg-card shadow-sm h-fit">
          <ProductFilters
            filters={filters}
            onChange={handleFilterChange}
            onClear={handleClearFilters}
            currentCategorySlug={slug}
            currentSubcategorySlug={subSlug}
          />
        </aside>

        {/* Product grid list (takes 3 cols) */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Header Controls (Sort + Grid count) */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b pb-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-foreground">
                {(() => {
                  const formatLabel = (str: string) => {
                    return str.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" ")
                  }
                  return subSlug ? formatLabel(subSlug) : slug ? formatLabel(slug) : "Catalog"
                })()}
              </h1>
              <p className="text-xs text-muted-foreground mt-0.5">Showing {products.length} of {totalProducts} items</p>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden gap-1.5 font-bold uppercase tracking-wider text-xs"
                onClick={() => setMobileFiltersOpen(true)}
              >
                <SlidersHorizontal className="h-3.5 w-3.5" />
                Filters
              </Button>

              <div className="w-44">
                <Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 text-xs"
                >
                  <option value="default">Sort by: Relevance</option>
                  <option value="price-low-high">Price: Low to High</option>
                  <option value="price-high-low">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </Select>
              </div>

              {/* Compare items shortcut list */}
              <Button
                variant="outline"
                size="sm"
                className="h-9 px-3 gap-1.5 text-xs font-bold uppercase tracking-wider text-primary"
                onClick={() => setCompareOpen(true)}
              >
                Compare Overlay
              </Button>

            </div>
          </div>

          {/* Grid display */}
          {products.length === 0 && !loading ? (
            <div className="flex flex-col items-center justify-center py-20 text-center border rounded-2xl bg-muted/20">
              <SlidersHorizontal className="h-10 w-10 text-muted-foreground/45 mb-3" />
              <h3 className="font-bold text-foreground text-sm">No items found</h3>
              <p className="text-xs text-muted-foreground mt-1 max-w-xs">
                We couldn't find any products matching your current filters. Try relaxing pricing sliders or clearing categories!
              </p>
              <Button size="sm" className="mt-4" onClick={handleClearFilters}>
                Reset Filters
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={(p) => setQuickViewProduct(p)}
                />
              ))}

              {/* Loading Skeleton Cards */}
              {loading &&
                Array.from({ length: 3 }).map((_, idx) => (
                  <div
                    key={`skeleton-${idx}`}
                    className="border rounded-2xl overflow-hidden p-4 space-y-4 animate-pulse bg-muted/40"
                  >
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
          )}

          {/* Pagination Load More Controls */}
          {hasMore && !loading && (
            <div className="flex justify-center pt-8 border-t">
              <Button
                variant="outline"
                className="gap-2 font-bold uppercase tracking-wider text-xs px-6"
                onClick={() => setPage((p) => p + 1)}
              >
                Load More Products
              </Button>
            </div>
          )}

        </div>
      </div>

      {/* Mobile Filters Drawer Modal */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-sm animate-in fade-in-30">
          <div className="relative flex w-full max-w-xs flex-col bg-background p-6 shadow-xl animate-in slide-in-from-left-5 duration-200 mr-auto">
            <div className="flex items-center justify-between border-b pb-4 mb-4">
              <span className="text-sm font-bold text-foreground">Sort & Filter</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileFiltersOpen(false)}
                className="p-1 rounded-full text-muted-foreground"
              >
                Close
              </Button>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-1">
              <ProductFilters
                filters={filters}
                onChange={handleFilterChange}
                onClear={handleClearFilters}
                currentCategorySlug={slug}
                currentSubcategorySlug={subSlug}
              />
            </div>

            <Button
              className="w-full mt-4 font-bold text-xs uppercase tracking-wider"
              onClick={() => setMobileFiltersOpen(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      )}

      {/* Overlays */}
      {quickViewProduct && (
        <QuickView
          product={quickViewProduct}
          isOpen={!!quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}

      <CompareModal isOpen={compareOpen} onClose={() => setCompareOpen(false)} />

    </div>
  )
}
