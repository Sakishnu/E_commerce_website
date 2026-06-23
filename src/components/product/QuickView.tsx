import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Heart, Plus, Minus, Star } from "lucide-react"
import { Product } from "../../types"
import { useCartStore } from "../../store/cartStore"
import { useWishlistStore } from "../../store/wishlistStore"
import { useNotification } from "../../context/NotificationContext"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/Dialog"
import { Button } from "../ui/Button"
import { cn } from "../../utils/cn"

interface QuickViewProps {
  product: Product | null
  isOpen: boolean
  onClose: () => void
}

export const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const { addToCart } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { showToast } = useNotification()

  const [activeImg, setActiveImg] = useState("")
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  const sizes = ["S", "M", "L", "XL"]
  const colors = ["Default", "Slate Grey", "Midnight Black"]

  // Sync active image with product change
  useEffect(() => {
    if (product) {
      setActiveImg(product.image)
      setQty(1)
      setSelectedSize("")
      setSelectedColor("")
    }
  }, [product])

  if (!product) return null

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize || undefined, selectedColor || undefined)
    showToast(`${qty}x ${product.name} added to cart!`, "success")
    onClose()
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product)
    showToast(
      inWishlist ? "Removed from wishlist." : "Added to wishlist!",
      inWishlist ? "info" : "success"
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl overflow-hidden p-6 sm:rounded-2xl md:w-[90vw]">
        
        {/* Hidden screen-reader descriptions for accessibility */}
        <DialogTitle className="sr-only">{product.name} - Quick View</DialogTitle>
        <DialogDescription className="sr-only">
          Quick look window for viewing {product.name} specs, size variants, pricing, and stock availability.
        </DialogDescription>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 max-h-[80vh] overflow-y-auto pr-1">
          
          {/* Left Column: Image Gallery */}
          <div className="space-y-3">
            <div className="aspect-square w-full overflow-hidden rounded-xl bg-muted border">
              <img src={activeImg} alt={product.name} className="h-full w-full object-cover transition-all" />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(img)}
                    className={cn(
                      "h-14 w-14 rounded-lg overflow-hidden border shrink-0 transition-all",
                      activeImg === img ? "border-primary ring-2 ring-primary/20" : "border-muted"
                    )}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information details */}
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider mb-1">
              {product.category.replace("-", " ")}
            </span>
            <h2 className="text-xl font-bold text-foreground mb-1">{product.name}</h2>

            {/* Rating Stars & review count */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={cn(
                      "h-3.5 w-3.5",
                      i < Math.floor(product.rating) ? "fill-current" : "opacity-35"
                    )}
                  />
                ))}
              </div>
              <span className="text-xs font-semibold text-muted-foreground">
                {product.rating} ({product.reviewsCount} reviews)
              </span>
            </div>

            {/* Pricing Details */}
            <div className="flex items-baseline gap-2 mb-4">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-extrabold text-foreground">${product.discountPrice}</span>
                  <span className="text-sm text-muted-foreground line-through">${product.price}</span>
                </>
              ) : (
                <span className="text-2xl font-extrabold text-foreground">${product.price}</span>
              )}
            </div>

            {/* Short Description */}
            <p className="text-xs text-muted-foreground leading-relaxed mb-5">{product.description}</p>

            {/* Color variants selector */}
            <div className="space-y-2 mb-4">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Color</span>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all",
                      selectedColor === color
                        ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                        : "border-input text-foreground hover:bg-muted"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Size variants selector */}
            {product.category === "fashion" && (
              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Size</span>
                <div className="flex gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={cn(
                        "h-8 w-8 flex items-center justify-center rounded-lg border text-xs font-bold transition-all",
                        selectedSize === size
                          ? "border-primary bg-primary/5 text-primary ring-1 ring-primary"
                          : "border-input text-foreground hover:bg-muted"
                      )}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Action Bar (Qty selector + Cart + Wishlist buttons) */}
            <div className="mt-auto pt-4 border-t flex flex-wrap items-center gap-3">
              
              {/* Quantity incrementor */}
              <div className="flex items-center rounded-lg border h-10 bg-muted/40">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="h-full px-3 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Minus className="h-3.5 w-3.5" />
                </button>
                <span className="w-8 text-center text-xs font-extrabold text-foreground">{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  className="h-full px-3 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Plus className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Add to Cart button */}
              <Button
                variant="primary"
                className="h-10 flex-1 gap-2 font-bold text-xs uppercase tracking-wider"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="h-4 w-4" />
                Add to Cart
              </Button>

              {/* Wishlist toggle */}
              <button
                onClick={handleToggleWishlist}
                className={cn(
                  "p-2.5 rounded-lg border h-10 w-10 flex items-center justify-center transition-colors",
                  inWishlist
                    ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                    : "bg-background border-input text-muted-foreground hover:text-foreground"
                )}
                title="Wishlist"
              >
                <Heart className={cn("h-4 w-4", inWishlist && "fill-current")} />
              </button>

            </div>

            {/* Link to Full Details page */}
            <div className="mt-4 text-center">
              <Link
                to={`/product/${product.id}`}
                onClick={onClose}
                className="text-xs font-bold text-primary hover:underline"
              >
                View Full Specifications &rarr;
              </Link>
            </div>

          </div>

        </div>

      </DialogContent>
    </Dialog>
  )
}
