import React, { useState, useEffect } from "react"
import { useSearchParams, Link } from "react-router-dom"
import { Search, ShoppingBag } from "lucide-react"
import { ProductCard } from "../components/product/ProductCard"
import { Button } from "../components/ui/Button"
import { api, MOCK_PRODUCTS } from "../services/api"
import { Product } from "../types"
import { BackButton } from "../components/common/BackButton"

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams()
  const query = searchParams.get("q") || ""
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [recommendations, setRecommendations] = useState<Product[]>([])

  useEffect(() => {
    const fetchSearchResults = async () => {
      setLoading(true)
      try {
        const res = await api.getProducts({ search: query, limit: 12 })
        setProducts(res.products)
        
        // Setup default recommendations if search has zero matches
        if (res.products.length === 0) {
          setRecommendations(MOCK_PRODUCTS.slice(0, 4))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (query) {
      fetchSearchResults()
    }
  }, [query])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <div className="pt-6 pb-4 flex items-center">
        <BackButton defaultPath="/shop" />
      </div>

      <div className="space-y-6 mt-2">
        
        {/* Results Header */}
        <div className="border-b pb-4">
          <h1 className="text-xl sm:text-2xl font-black text-foreground">Search Results</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {loading ? "Searching..." : `Found ${products.length} matches for "${query}"`}
          </p>
        </div>

        {/* Results List */}
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
          
          /* Empty Search results display */
          <div className="space-y-12 py-10">
            <div className="flex flex-col items-center justify-center text-center max-w-md mx-auto space-y-4">
              <div className="p-4 rounded-full bg-muted border text-muted-foreground">
                <Search className="h-8 w-8" />
              </div>
              <h2 className="text-lg font-bold text-foreground">No matches found</h2>
              <p className="text-xs text-muted-foreground leading-relaxed">
                We couldn't find any products matching <strong className="text-foreground">"{query}"</strong>. Double-check your spelling or explore categories using our navigation bar.
              </p>
              <div className="flex gap-2">
                <Link to="/shop">
                  <Button size="sm">Browse Full Catalog</Button>
                </Link>
              </div>
            </div>

            {/* Recommendations Grid */}
            <div className="border-t pt-10 space-y-6">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <h3 className="text-sm font-bold text-foreground uppercase tracking-wider">Recommended Products</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendations.map((prod) => (
                  <ProductCard key={prod.id} product={prod} />
                ))}
              </div>
            </div>
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
