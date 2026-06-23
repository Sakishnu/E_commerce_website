import React from "react"
import { Link } from "react-router-dom"
import { Slider } from "../ui/Slider"
import { Star, RotateCcw, ArrowRight } from "lucide-react"
import { cn } from "../../utils/cn"
import { MOCK_CATEGORIES } from "../../services/api"

export interface FiltersState {
  category: string
  priceRange: [number, number]
  rating: number
}

const SUBCATEGORIES_BY_CATEGORY: Record<string, { name: string; slug: string }[]> = {
  electronics: [
    { name: "Smartphones", slug: "smartphones" },
    { name: "Laptops", slug: "laptops" },
    { name: "Accessories", slug: "accessories" },
    { name: "Smart Devices", slug: "smart-devices" },
  ],
  fashion: [
    { name: "Men", slug: "men" },
    { name: "Women", slug: "women" },
    { name: "Kids", slug: "kids" },
    { name: "Footwear", slug: "footwear" },
  ],
  "home-living": [
    { name: "Furniture", slug: "furniture" },
    { name: "Home Decor", slug: "home-decor" },
    { name: "Kitchen", slug: "kitchen" },
    { name: "Lighting", slug: "lighting" },
  ],
  "sports-fitness": [
    { name: "Gym Equipment", slug: "gym-equipment" },
    { name: "Sports Gear", slug: "sports-gear" },
    { name: "Outdoor Activities", slug: "outdoor-activities" },
    { name: "Fitness Accessories", slug: "fitness-accessories" },
  ],
  "beauty-personal-care": [
    { name: "Skincare", slug: "skincare" },
    { name: "Hair Care", slug: "hair-care" },
    { name: "Makeup", slug: "makeup" },
    { name: "Grooming", slug: "grooming" },
  ],
  "books-stationery": [
    { name: "Books", slug: "books" },
    { name: "Notebooks", slug: "notebooks" },
    { name: "Office Supplies", slug: "office-supplies" },
    { name: "Study Materials", slug: "study-materials" },
  ],
  "toys-games": [
    { name: "Educational Toys", slug: "educational-toys" },
    { name: "Board Games", slug: "board-games" },
    { name: "Kids Toys", slug: "kids-toys" },
    { name: "Puzzles", slug: "puzzles" },
  ],
  automotive: [
    { name: "Car Accessories", slug: "car-accessories" },
    { name: "Bike Accessories", slug: "bike-accessories" },
    { name: "Helmets", slug: "helmets" },
    { name: "Vehicle Care", slug: "vehicle-care" },
  ],
  "health-wellness": [
    { name: "Fitness Equipment", slug: "fitness-equipment" },
    { name: "Yoga Accessories", slug: "yoga-accessories" },
    { name: "Health Devices", slug: "health-devices" },
    { name: "Nutrition Products", slug: "nutrition-products" },
  ],
}

interface ProductFiltersProps {
  filters: FiltersState
  onChange: (filters: FiltersState) => void
  onClear: () => void
  currentCategorySlug?: string
  currentSubcategorySlug?: string
}

export const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  onChange,
  onClear,
  currentCategorySlug,
  currentSubcategorySlug,
}) => {
  const handleCategorySelect = (categorySlug: string) => {
    onChange({
      ...filters,
      category: filters.category === categorySlug ? "" : categorySlug,
    })
  }

  const handlePriceChange = (val: number[]) => {
    onChange({
      ...filters,
      priceRange: [val[0], val[1]] as [number, number],
    })
  }

  const handleRatingSelect = (ratingVal: number) => {
    onChange({
      ...filters,
      rating: filters.rating === ratingVal ? 0 : ratingVal,
    })
  }

  return (
    <div className="space-y-6">
      
      {/* Header and Reset button */}
      <div className="flex items-center justify-between border-b pb-4">
        <h3 className="text-sm font-bold text-foreground">Filters</h3>
        <button
          onClick={onClear}
          className="flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider"
        >
          <RotateCcw className="h-3 w-3" />
          Clear All
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Categories</h4>
        <div className="flex flex-col gap-1">
          {MOCK_CATEGORIES.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => handleCategorySelect(cat.slug)}
              className={cn(
                "flex items-center justify-between w-full p-2 text-xs font-semibold rounded-lg hover:bg-muted text-left transition-colors",
                filters.category === cat.slug
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "text-foreground/80"
              )}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-muted-foreground bg-muted-foreground/10 px-1.5 py-0.5 rounded-full font-bold">
                {cat.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Subcategory Filter (shown if category is active) */}
      {currentCategorySlug && SUBCATEGORIES_BY_CATEGORY[currentCategorySlug] && (
        <div className="space-y-3 pt-4 border-t">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Subcategories</h4>
          <div className="flex flex-col gap-1">
            {SUBCATEGORIES_BY_CATEGORY[currentCategorySlug].map((sub) => {
              const isActive = currentSubcategorySlug === sub.slug
              return (
                <Link
                  key={sub.slug}
                  to={`/category/${currentCategorySlug}/${sub.slug}`}
                  className={cn(
                    "flex items-center justify-between w-full p-2 text-xs font-semibold rounded-lg hover:bg-muted text-left transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary hover:bg-primary/15"
                      : "text-foreground/80"
                  )}
                >
                  <span>{sub.name}</span>
                  <ArrowRight className={cn("h-3 w-3 opacity-0 transition-opacity", isActive && "opacity-100")} />
                </Link>
              )
            })}
          </div>
        </div>
      )}

      {/* Price Slider Filter */}
      <div className="space-y-4">
        <div className="flex justify-between items-baseline">
          <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Price Range</h4>
          <span className="text-xs font-extrabold text-foreground">
            ${filters.priceRange[0]} - ${filters.priceRange[1]}
          </span>
        </div>
        <Slider
          min={0}
          max={1500}
          step={50}
          value={filters.priceRange}
          onValueChange={handlePriceChange}
        />
        <div className="flex justify-between text-[10px] text-muted-foreground font-semibold">
          <span>Min: $0</span>
          <span>Max: $1500</span>
        </div>
      </div>

      {/* Rating stars filter */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Minimum Rating</h4>
        <div className="flex flex-col gap-1.5">
          {[4, 3, 2].map((num) => (
            <button
              key={num}
              onClick={() => handleRatingSelect(num)}
              className={cn(
                "flex items-center gap-2 w-full p-2 text-xs font-semibold rounded-lg hover:bg-muted text-left transition-colors",
                filters.rating === num
                  ? "bg-primary/10 text-primary hover:bg-primary/15"
                  : "text-foreground/80"
              )}
            >
              <div className="flex text-amber-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star
                    key={idx}
                    className={cn(
                      "h-3.5 w-3.5",
                      idx < num ? "fill-current" : "opacity-35"
                    )}
                  />
                ))}
              </div>
              <span className="text-[10px] font-bold text-muted-foreground">& Up</span>
            </button>
          ))}
        </div>
      </div>

    </div>
  )
}
