import React from "react"
import { X, ShoppingCart, Trash2, GitCompare, Star } from "lucide-react"
import { useCompareStore } from "../../store/compareStore"
import { useCartStore } from "../../store/cartStore"
import { useNotification } from "../../context/NotificationContext"
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../ui/Dialog"
import { Button } from "../ui/Button"

interface CompareModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CompareModal: React.FC<CompareModalProps> = ({ isOpen, onClose }) => {
  const { compareList, removeFromCompare, clearCompare } = useCompareStore()
  const { addToCart } = useCartStore()
  const { showToast } = useNotification()

  const handleAddToCart = (e: React.MouseEvent, product: any) => {
    e.preventDefault()
    addToCart(product, 1)
    showToast(`${product.name} added to cart!`, "success")
  }

  // Get unique specification keys across all items in comparison
  const allSpecKeys = Array.from(
    new Set(
      compareList.flatMap((item) => Object.keys(item.specs || {}))
    )
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl overflow-hidden p-6 sm:rounded-2xl md:w-[95vw]">
        
        {/* Screen-reader titles for accessibility */}
        <DialogTitle className="flex items-center gap-2 text-lg font-bold text-foreground">
          <GitCompare className="h-5 w-5 text-primary" />
          Product Comparison ({compareList.length}/3)
        </DialogTitle>
        <DialogDescription className="text-xs text-muted-foreground">
          Compare specifications, ratings, and features side by side to make an informed choice.
        </DialogDescription>

        {compareList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <GitCompare className="h-10 w-10 text-muted-foreground/45 mb-3" />
            <h3 className="font-bold text-foreground text-sm">Comparison list is empty</h3>
            <p className="text-xs text-muted-foreground mt-1 max-w-xs">
              Go to the shop page and click the compare icon on any product to start comparing details!
            </p>
          </div>
        ) : (
          <div className="mt-4 flex flex-col space-y-4">
            
            {/* Action Bar */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                size="sm"
                className="text-xs text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
                onClick={clearCompare}
              >
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Clear All
              </Button>
            </div>

            {/* Grid list comparing elements */}
            <div className="overflow-x-auto border rounded-xl">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-muted/40 border-b">
                    <th className="p-4 font-bold text-muted-foreground w-1/4">Details</th>
                    {compareList.map((item) => (
                      <th key={item.id} className="p-4 border-l w-1/4 relative">
                        <button
                          onClick={() => removeFromCompare(item.id)}
                          className="absolute right-2 top-2 p-1.5 text-muted-foreground hover:text-red-500 rounded-full hover:bg-muted transition-colors"
                          title="Remove item"
                        >
                          <X className="h-4 w-4" />
                        </button>
                        <div className="flex flex-col items-center text-center space-y-2 mt-4">
                          <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover border" />
                          <span className="font-extrabold text-foreground line-clamp-2 min-h-[32px]">{item.name}</span>
                          <span className="text-xs font-black text-primary">${item.discountPrice || item.price}</span>
                        </div>
                      </th>
                    ))}
                    {/* Fill in empty spots up to 3 */}
                    {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, idx) => (
                      <th key={`empty-${idx}`} className="p-4 border-l bg-muted/10 w-1/4 text-center text-muted-foreground font-semibold">
                        Add product to compare
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  
                  {/* Category row */}
                  <tr className="border-b">
                    <td className="p-3 font-bold text-muted-foreground">Category</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 border-l text-center font-semibold text-foreground capitalize">
                        {item.category.replace("-", " ")}
                      </td>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, idx) => (
                      <td key={idx} className="p-3 border-l bg-muted/10" />
                    ))}
                  </tr>

                  {/* Rating row */}
                  <tr className="border-b bg-muted/10">
                    <td className="p-3 font-bold text-muted-foreground">Rating</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 border-l text-center">
                        <div className="flex items-center justify-center gap-1">
                          <Star className="h-3 w-3 text-amber-500 fill-current" />
                          <span className="font-bold">{item.rating}</span>
                          <span className="text-muted-foreground text-[10px]">({item.reviewsCount})</span>
                        </div>
                      </td>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, idx) => (
                      <td key={idx} className="p-3 border-l bg-muted/10" />
                    ))}
                  </tr>

                  {/* Availability stock */}
                  <tr className="border-b">
                    <td className="p-3 font-bold text-muted-foreground">Availability</td>
                    {compareList.map((item) => (
                      <td key={item.id} className="p-3 border-l text-center font-bold">
                        {item.stock > 0 ? (
                          <span className="text-green-500">In Stock ({item.stock})</span>
                        ) : (
                          <span className="text-red-500">Out of Stock</span>
                        )}
                      </td>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, idx) => (
                      <td key={idx} className="p-3 border-l bg-muted/10" />
                    ))}
                  </tr>

                  {/* Specifications mapping rows */}
                  {allSpecKeys.map((key) => (
                    <tr key={key} className="border-b odd:bg-muted/10">
                      <td className="p-3 font-bold text-muted-foreground">{key}</td>
                      {compareList.map((item) => (
                        <td key={item.id} className="p-3 border-l text-center text-foreground/80 font-medium">
                          {item.specs[key] || "-"}
                        </td>
                      ))}
                      {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, idx) => (
                        <td key={idx} className="p-3 border-l bg-muted/10" />
                      ))}
                    </tr>
                  ))}

                  {/* Add to Cart Actions */}
                  <tr>
                    <td className="p-4 font-bold text-muted-foreground" />
                    {compareList.map((item) => (
                      <td key={item.id} className="p-4 border-l text-center">
                        <Button
                          size="sm"
                          className="w-full gap-1.5 font-bold uppercase tracking-wider text-[10px]"
                          disabled={item.stock === 0}
                          onClick={(e) => handleAddToCart(e, item)}
                        >
                          <ShoppingCart className="h-3 w-3" />
                          Add To Cart
                        </Button>
                      </td>
                    ))}
                    {Array.from({ length: Math.max(0, 3 - compareList.length) }).map((_, idx) => (
                      <td key={idx} className="p-4 border-l bg-muted/10" />
                    ))}
                  </tr>

                </tbody>
              </table>
            </div>

          </div>
        )}

      </DialogContent>
    </Dialog>
  )
}
