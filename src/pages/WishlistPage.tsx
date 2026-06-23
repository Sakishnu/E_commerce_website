import React from "react"
import { Link } from "react-router-dom"
import { Heart, Trash2, ShoppingCart, ArrowRight } from "lucide-react"
import { useWishlistStore } from "../store/wishlistStore"
import { useCartStore } from "../store/cartStore"
import { useNotification } from "../context/NotificationContext"
import { Button } from "../components/ui/Button"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { BackButton } from "../components/common/BackButton"

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()
  const { showToast } = useNotification()

  const handleAddToCart = (product: any) => {
    addToCart(product, 1)
    showToast(`${product.name} added to cart!`, "success")
  }

  const handleRemoveFromWishlist = (product: any) => {
    toggleWishlist(product)
    showToast(`${product.name} removed from wishlist.`, "info")
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <BackButton className="mb-4" defaultPath="/shop" />
      
      <Breadcrumbs items={[{ label: "Wishlist" }]} />

      <div className="border-b pb-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-foreground">My Wishlist</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          View products you have saved for later and add them directly to your shopping cart.
        </p>
      </div>

      {wishlist.length === 0 ? (
        
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6">
          <div className="p-4 rounded-full bg-muted border text-red-500">
            <Heart className="h-10 w-10 animate-pulse" />
          </div>
          <div className="space-y-1.5 max-w-sm">
            <h2 className="text-lg font-bold text-foreground">Wishlist is empty</h2>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Browse products and click the heart icon on cards to save items to your personal wishlist catalog.
            </p>
          </div>
          <Link to="/shop">
            <Button size="md" className="gap-2 font-bold uppercase tracking-wider text-xs">
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

      ) : (

        /* Active Wishlist Catalog grid */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((prod) => (
            <div
              key={prod.id}
              className="group border rounded-2xl bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow flex flex-col relative overflow-hidden"
            >
              
              {/* Product Thumbnail */}
              <div className="relative aspect-square bg-muted">
                <img src={prod.image} alt={prod.name} className="h-full w-full object-cover" />
                
                {/* Trash delete button */}
                <button
                  onClick={() => handleRemoveFromWishlist(prod)}
                  className="absolute right-3 top-3 p-2 rounded-full bg-background border border-input shadow-sm text-muted-foreground hover:text-red-500 hover:bg-red-50 transition-colors z-10"
                  title="Remove from Wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* Info details */}
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1">
                  <span className="text-[9px] font-bold text-primary uppercase tracking-widest block">
                    {prod.category.replace("-", " ")}
                  </span>
                  <Link to={`/product/${prod.id}`} className="text-sm font-bold hover:underline line-clamp-1 block text-foreground">
                    {prod.name}
                  </Link>
                  <p className="text-xs font-black text-foreground">
                    ${prod.discountPrice || prod.price}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="primary"
                    className="w-full gap-1 text-[10px] font-bold uppercase tracking-wider h-9"
                    onClick={() => handleAddToCart(prod)}
                  >
                    <ShoppingCart className="h-3.5 w-3.5" />
                    Move to Cart
                  </Button>
                </div>
              </div>

            </div>
          ))}
        </div>

      )}

    </div>
  )
}
