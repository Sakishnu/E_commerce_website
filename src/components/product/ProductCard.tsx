import React from "react"
import { Link } from "react-router-dom"
import { Heart, GitCompare, Eye, ShoppingCart, Star } from "lucide-react"
import { Product } from "../../types"
import { useCartStore } from "../../store/cartStore"
import { useWishlistStore } from "../../store/wishlistStore"
import { useCompareStore } from "../../store/compareStore"
import { useNotification } from "../../context/NotificationContext"
import { Button } from "../ui/Button"
import { cn } from "../../utils/cn"

interface ProductCardProps {
  product: Product
  onQuickView?: (product: Product) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { addToCompare, isInCompare, removeFromCompare } = useCompareStore()
  const { showToast } = useNotification()

  const inWishlist = isInWishlist(product.id)
  const inCompare = isInCompare(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product, 1)
    showToast(`${product.name} added to cart!`, "success")
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
    showToast(
      inWishlist
        ? `${product.name} removed from wishlist.`
        : `${product.name} added to wishlist!`,
      inWishlist ? "info" : "success"
    )
  }

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inCompare) {
      removeFromCompare(product.id)
      showToast(`${product.name} removed from comparison list.`, "info")
    } else {
      const res = addToCompare(product)
      showToast(res.message, res.success ? "success" : "error")
    }
  }

  // Calculate percentage discount
  const discountPercent = product.discountPrice
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md">
      
      {/* Product Image Panel */}
      <div className="relative aspect-square w-full overflow-hidden bg-muted">
        <Link to={`/product/${product.id}`} className="block h-full w-full">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              // Fallback image if Unsplash URL fails to load
              e.currentTarget.src = "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&h=600&q=80"
            }}
          />
        </Link>

        {/* Discount Tag */}
        {discountPercent > 0 && (
          <span className="absolute left-3 top-3 bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider">
            {discountPercent}% OFF
          </span>
        )}

        {/* Hover Controls Overlay */}
        <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center gap-2">
          {onQuickView && (
            <Button
              size="icon"
              variant="secondary"
              className="rounded-full shadow-lg"
              onClick={(e) => {
                e.preventDefault()
                onQuickView(product)
              }}
              title="Quick View"
            >
              <Eye className="h-4 w-4" />
            </Button>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full shadow-lg"
            onClick={handleAddToCart}
            title="Add to Cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Toggles (Top Right Actions) */}
        <div className="absolute right-3 top-3 flex flex-col gap-1.5 z-10">
          <button
            onClick={handleToggleWishlist}
            className={cn(
              "p-2 rounded-full border shadow-sm transition-colors",
              inWishlist
                ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                : "bg-background border-input text-muted-foreground hover:text-foreground"
            )}
            title={inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
          </button>

          <button
            onClick={handleToggleCompare}
            className={cn(
              "p-2 rounded-full border shadow-sm transition-colors",
              inCompare
                ? "bg-primary/10 border-primary/20 text-primary hover:bg-primary/20"
                : "bg-background border-input text-muted-foreground hover:text-foreground"
            )}
            title={inCompare ? "Remove Comparison" : "Compare Product"}
          >
            <GitCompare className="h-4 w-4" />
          </button>
        </div>

      </div>

      {/* Info Details Section */}
      <div className="flex flex-col flex-1 p-4">
        <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider mb-1">
          {product.category.replace("-", " ")}
        </span>

        <Link
          to={`/product/${product.id}`}
          className="text-sm font-bold text-foreground line-clamp-1 hover:underline mb-1"
        >
          {product.name}
        </Link>

        {/* Star reviews */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex text-amber-500">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={cn(
                  "h-3 w-3",
                  i < Math.floor(product.rating) ? "fill-current" : "opacity-35"
                )}
              />
            ))}
          </div>
          <span className="text-[10px] text-muted-foreground font-semibold">({product.reviewsCount})</span>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="mt-auto flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            {product.discountPrice ? (
              <>
                <span className="text-base font-extrabold text-foreground">
                  ${product.discountPrice}
                </span>
                <span className="text-xs text-muted-foreground line-through">
                  ${product.price}
                </span>
              </>
            ) : (
              <span className="text-base font-extrabold text-foreground">
                ${product.price}
              </span>
            )}
          </div>

          <Button
            size="sm"
            variant="outline"
            className="h-8 px-2.5 text-xs font-bold gap-1"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="h-3 w-3" />
            Add
          </Button>
        </div>

      </div>

    </div>
  )
}
