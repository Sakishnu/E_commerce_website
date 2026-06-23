import React, { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { ShoppingCart, Heart, Plus, Minus, Star, MessageSquare, ShieldCheck, RefreshCcw, Send } from "lucide-react"
import { ProductZoom } from "../components/product/ProductZoom"
import { ProductCard } from "../components/product/ProductCard"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/Tabs"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { api } from "../services/api"
import { Product, Review } from "../types"
import { useCartStore } from "../store/cartStore"
import { useWishlistStore } from "../store/wishlistStore"
import { useNotification } from "../context/NotificationContext"
import { BackButton } from "../components/common/BackButton"
import { cn } from "../utils/cn"

export const ProductDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCartStore()
  const { toggleWishlist, isInWishlist } = useWishlistStore()
  const { showToast } = useNotification()

  const [product, setProduct] = useState<Product | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const [activeImg, setActiveImg] = useState("")
  const [qty, setQty] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")

  // Form states for writing a review
  const [newReviewName, setNewReviewName] = useState("")
  const [newReviewComment, setNewReviewComment] = useState("")
  const [newReviewRating, setNewReviewRating] = useState(5)

  const sizes = ["S", "M", "L", "XL"]
  const colors = ["Default", "Slate Grey", "Midnight Black"]

  useEffect(() => {
    const fetchProductData = async () => {
      if (!id) return
      setLoading(true)
      try {
        const prod = await api.getProductById(id)
        if (prod) {
          setProduct(prod)
          setActiveImg(prod.image)
          
          // Get reviews & related items
          const revs = await api.getReviews(prod.id)
          setReviews(revs)

          const related = await api.getProducts({ category: prod.category, limit: 4 })
          setRelatedProducts(related.products.filter((p) => p.id !== prod.id))
        }
      } catch (err) {
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchProductData()
    // Reset quantity
    setQty(1)
    setSelectedSize("")
    setSelectedColor("")
  }, [id])

  if (loading) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-8 animate-pulse">
        <div className="h-4 bg-muted rounded w-1/4" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-muted rounded-2xl" />
          <div className="space-y-4">
            <div className="h-6 bg-muted rounded w-3/4" />
            <div className="h-4 bg-muted rounded w-1/4" />
            <div className="h-10 bg-muted rounded w-1/2" />
            <div className="h-20 bg-muted rounded w-full" />
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">Product Not Found</h2>
        <p className="text-sm text-muted-foreground">The product page you are looking for does not exist or has been removed.</p>
        <Link to="/shop">
          <Button>Back To Shop</Button>
        </Link>
      </div>
    )
  }

  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = () => {
    addToCart(product, qty, selectedSize || undefined, selectedColor || undefined)
    showToast(`${qty}x ${product.name} added to cart!`, "success")
  }

  const handleToggleWishlist = () => {
    toggleWishlist(product)
    showToast(
      inWishlist ? "Removed from wishlist." : "Added to wishlist!",
      inWishlist ? "info" : "success"
    )
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newReviewName.trim() && newReviewComment.trim()) {
      const addedReview: Review = {
        id: "rev-new-" + Math.random().toString(36).substr(2, 9),
        userName: newReviewName.trim(),
        comment: newReviewComment.trim(),
        rating: newReviewRating,
        date: new Date().toISOString().split("T")[0],
      }
      setReviews((prev) => [addedReview, ...prev])
      showToast("Thank you! Review submitted successfully.", "success")
      setNewReviewName("")
      setNewReviewComment("")
      setNewReviewRating(5)
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <BackButton className="mb-4" />
      
      {/* Dynamic Breadcrumbs */}
      <Breadcrumbs
        items={[
          { label: "Shop", path: "/shop" },
          { label: product.category, path: `/category/${product.category}` },
          { label: product.name },
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-4">
        
        {/* Left Column: Image Zoom Gallery */}
        <div className="space-y-4">
          <ProductZoom imgUrl={activeImg} alt={product.name} />

          {/* Thumbnails grid */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImg(img)}
                  className={cn(
                    "h-20 w-20 rounded-xl overflow-hidden border shrink-0 transition-all",
                    activeImg === img ? "border-primary ring-2 ring-primary/20" : "border-muted"
                  )}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Title/Buy details */}
        <div className="flex flex-col">
          <span className="text-xs font-bold text-primary uppercase tracking-widest mb-1.5">
            {product.category.replace("-", " ")}
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-foreground mb-2 leading-tight">
            {product.name}
          </h1>

          {/* Rating stars & total */}
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex text-amber-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "h-4 w-4",
                    i < Math.floor(product.rating) ? "fill-current" : "opacity-35"
                  )}
                />
              ))}
            </div>
            <span className="text-xs font-bold text-muted-foreground">
              {product.rating} Rating ({reviews.length} reviews)
            </span>
          </div>

          {/* Pricing detail */}
          <div className="flex items-baseline gap-2 mb-6">
            {product.discountPrice ? (
              <>
                <span className="text-3xl font-extrabold text-foreground">${product.discountPrice}</span>
                <span className="text-base text-muted-foreground line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-3xl font-extrabold text-foreground">${product.price}</span>
            )}
          </div>

          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Variant Swappers: Colors */}
          <div className="space-y-3 mb-5">
            <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Choose Color</span>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "px-4 py-2 rounded-xl border text-xs font-semibold transition-all",
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

          {/* Variant Swappers: Sizes */}
          {product.category === "fashion" && (
            <div className="space-y-3 mb-6">
              <span className="text-xs font-extrabold uppercase tracking-wider text-muted-foreground">Select Size</span>
              <div className="flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "h-10 w-10 flex items-center justify-center rounded-xl border text-xs font-bold transition-all",
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

          {/* Buy actions */}
          <div className="pt-6 border-t flex flex-wrap items-center gap-4">
            
            {/* Quantity Incrementor */}
            <div className="flex items-center rounded-xl border h-12 bg-muted/40">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="h-full px-4 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-10 text-center text-sm font-extrabold text-foreground">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                className="h-full px-4 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            {/* Cart Button */}
            <Button
              className="h-12 flex-1 gap-2 font-bold text-xs uppercase tracking-wider"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
              Add To Cart
            </Button>

            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={cn(
                "p-3 rounded-xl border h-12 w-12 flex items-center justify-center transition-colors",
                inWishlist
                  ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                  : "bg-background border-input text-muted-foreground hover:text-foreground"
              )}
              title="Add to Wishlist"
            >
              <Heart className={cn("h-5 w-5", inWishlist && "fill-current")} />
            </button>

          </div>

          {/* Value props banner */}
          <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t text-xs text-muted-foreground font-semibold">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-green-500 shrink-0" />
              Secure Payment Gateway
            </div>
            <div className="flex items-center gap-2">
              <RefreshCcw className="h-4 w-4 text-primary shrink-0" />
              30-Day Easy Returns
            </div>
          </div>

        </div>

      </div>

      {/* Tabs Layout: Details, Specs, Reviews */}
      <section className="mt-16">
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-fit p-0">
            <TabsTrigger
              value="details"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground data-[state=active]:text-foreground"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="specs"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground data-[state=active]:text-foreground"
            >
              Specifications
            </TabsTrigger>
            <TabsTrigger
              value="reviews"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-6 py-3 font-bold text-xs uppercase tracking-wider text-muted-foreground data-[state=active]:text-foreground"
            >
              Reviews ({reviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="pt-6">
            <div className="prose prose-sm max-w-none text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-4">
              <p>{product.description}</p>
              <p>
                Every Nexus product undergoes rigorous validation assessments to meet high-performance requirements. Handcrafted with fine-finish detail alignments, this item brings a premium feeling into your daily activities.
              </p>
            </div>
          </TabsContent>

          <TabsContent value="specs" className="pt-6">
            <div className="border rounded-xl overflow-hidden max-w-xl">
              <table className="w-full text-left text-xs border-collapse">
                <tbody>
                  {Object.entries(product.specs || {}).map(([key, val], idx) => (
                    <tr key={key} className={cn("border-b", idx % 2 === 0 ? "bg-muted/10" : "bg-transparent")}>
                      <td className="p-3 font-bold text-muted-foreground w-1/3">{key}</td>
                      <td className="p-3 text-foreground font-semibold">{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="pt-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Reviews list */}
            <div className="lg:col-span-2 space-y-6">
              {reviews.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-10 w-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-xs text-muted-foreground">No reviews written for this product yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {reviews.map((rev) => (
                    <div key={rev.id} className="border p-4 rounded-xl space-y-3 bg-card">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={rev.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&h=100&q=80"}
                            alt=""
                            className="h-8 w-8 rounded-full object-cover border shrink-0"
                          />
                          <div>
                            <span className="text-xs font-bold text-foreground block">{rev.userName}</span>
                            <span className="text-[10px] text-muted-foreground">{rev.date}</span>
                          </div>
                        </div>
                        <div className="flex text-amber-500">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={cn("h-3 w-3", i < rev.rating ? "fill-current" : "opacity-35")}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Write review form */}
            <div className="border p-6 rounded-xl bg-card shadow-sm h-fit space-y-4">
              <h3 className="text-sm font-bold text-foreground border-b pb-2">Write a Review</h3>
              
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                
                {/* Rating selection stars */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Rating</span>
                  <div className="flex gap-1.5 text-amber-500">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setNewReviewRating(num)}
                        className="hover:scale-110 active:scale-95 transition-transform"
                      >
                        <Star className={cn("h-5 w-5", num <= newReviewRating ? "fill-current" : "opacity-35")} />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Your Name</span>
                  <Input
                    placeholder="Enter your name"
                    value={newReviewName}
                    onChange={(e) => setNewReviewName(e.target.value)}
                    required
                    className="text-xs"
                  />
                </div>

                {/* Comment */}
                <div className="space-y-1.5">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Review Details</span>
                  <textarea
                    placeholder="Tell us what you think of this product..."
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    required
                    rows={4}
                    className="w-full text-xs rounded-lg border border-input bg-background p-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  />
                </div>

                <Button type="submit" size="sm" className="w-full gap-1.5 font-bold uppercase tracking-wider text-[10px]">
                  <Send className="h-3 w-3" />
                  Submit Review
                </Button>

              </form>
            </div>

          </TabsContent>
        </Tabs>
      </section>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t pt-12 space-y-6">
          <h2 className="text-xl sm:text-2xl font-black text-foreground">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

    </div>
  )
}
