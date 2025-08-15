"use client"

import { useState, useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/customer-panel-components/header"
import { SearchBar } from "@/components/customer-panel-components/search-bar"
import { RestaurantFilters } from "@/components/customer-panel-components/restaurant-filters"
import { RestaurantGrid } from "@/components/customer-panel-components/restaurant-grid"
import { Footer } from "@/components/customer-panel-components/footer"

// Mock restaurant data
const mockRestaurants = [
  {
    id: 1,
    name: "Mario's Italian Kitchen",
    image: "/italian-restaurant-food.png",
    rating: 4.8,
    reviewCount: 324,
    deliveryTime: "25-35 min",
    deliveryFee: 0,
    cuisine: "Italian",
    priceRange: "$$",
    distance: 1.2,
    featured: true,
    tags: ["Pizza", "Pasta", "Italian"],
  },
  {
    id: 2,
    name: "Spice Garden",
    image: "/indian-restaurant-curry.png",
    rating: 4.6,
    reviewCount: 256,
    deliveryTime: "30-40 min",
    deliveryFee: 2.99,
    cuisine: "Indian",
    priceRange: "$$",
    distance: 2.1,
    featured: true,
    tags: ["Curry", "Biryani", "Indian"],
  },
  {
    id: 3,
    name: "Burger Palace",
    image: "/gourmet-burger-restaurant.png",
    rating: 4.7,
    reviewCount: 189,
    deliveryTime: "20-30 min",
    deliveryFee: 0,
    cuisine: "American",
    priceRange: "$",
    distance: 0.8,
    featured: true,
    tags: ["Burgers", "Fries", "American"],
  },
  {
    id: 4,
    name: "Sushi Zen",
    image: "/japanese-sushi-restaurant.png",
    rating: 4.9,
    reviewCount: 412,
    deliveryTime: "35-45 min",
    deliveryFee: 3.99,
    cuisine: "Japanese",
    priceRange: "$$$",
    distance: 3.2,
    featured: true,
    tags: ["Sushi", "Ramen", "Japanese"],
  },
  {
    id: 5,
    name: "Taco Fiesta",
    image: "/placeholder-bl6g8.png",
    rating: 4.4,
    reviewCount: 167,
    deliveryTime: "15-25 min",
    deliveryFee: 1.99,
    cuisine: "Mexican",
    priceRange: "$",
    distance: 1.5,
    featured: false,
    tags: ["Tacos", "Burritos", "Mexican"],
  },
  {
    id: 6,
    name: "Dragon Wok",
    image: "/chinese-food-noodles.png",
    rating: 4.5,
    reviewCount: 298,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    cuisine: "Chinese",
    priceRange: "$$",
    distance: 2.8,
    featured: false,
    tags: ["Noodles", "Fried Rice", "Chinese"],
  },
  {
    id: 7,
    name: "Mediterranean Delight",
    image: "/mediterranean-hummus.png",
    rating: 4.3,
    reviewCount: 134,
    deliveryTime: "30-40 min",
    deliveryFee: 2.99,
    cuisine: "Mediterranean",
    priceRange: "$$",
    distance: 2.3,
    featured: false,
    tags: ["Hummus", "Falafel", "Mediterranean"],
  },
  {
    id: 8,
    name: "Thai Basil",
    image: "/thai-pad-thai.png",
    rating: 4.6,
    reviewCount: 221,
    deliveryTime: "25-35 min",
    deliveryFee: 2.49,
    cuisine: "Thai",
    priceRange: "$$",
    distance: 1.9,
    featured: false,
    tags: ["Pad Thai", "Curry", "Thai"],
  },
]

export type Restaurant = (typeof mockRestaurants)[0]
export type SortOption = "recommended" | "rating" | "delivery-time" | "distance"
export type ViewMode = "grid" | "list"

export default function RestaurantsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([])
  const [maxDeliveryTime, setMaxDeliveryTime] = useState<number>(60)
  const [minRating, setMinRating] = useState<number>(0)
  const [sortBy, setSortBy] = useState<SortOption>("recommended")
  const [viewMode, setViewMode] = useState<ViewMode>("grid")
  const [showFilters, setShowFilters] = useState(false)

  const filteredAndSortedRestaurants = useMemo(() => {
    const filtered = mockRestaurants.filter((restaurant) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = restaurant.name.toLowerCase().includes(query)
        const matchesCuisine = restaurant.cuisine.toLowerCase().includes(query)
        const matchesTags = restaurant.tags.some((tag) => tag.toLowerCase().includes(query))
        if (!matchesName && !matchesCuisine && !matchesTags) return false
      }

      // Cuisine filter
      if (selectedCuisines.length > 0 && !selectedCuisines.includes(restaurant.cuisine)) {
        return false
      }

      // Price range filter
      if (selectedPriceRanges.length > 0 && !selectedPriceRanges.includes(restaurant.priceRange)) {
        return false
      }

      // Delivery time filter
      const maxTime = Number.parseInt(restaurant.deliveryTime.split("-")[1])
      if (maxTime > maxDeliveryTime) return false

      // Rating filter
      if (restaurant.rating < minRating) return false

      return true
    })

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating
        case "delivery-time":
          const aTime = Number.parseInt(a.deliveryTime.split("-")[0])
          const bTime = Number.parseInt(b.deliveryTime.split("-")[0])
          return aTime - bTime
        case "distance":
          return a.distance - b.distance
        case "recommended":
        default:
          // Featured first, then by rating
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return b.rating - a.rating
      }
    })

    return filtered
  }, [searchQuery, selectedCuisines, selectedPriceRanges, maxDeliveryTime, minRating, sortBy])

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search restaurants, cuisines, or dishes..."
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}>
            <RestaurantFilters
              selectedCuisines={selectedCuisines}
              onCuisinesChange={setSelectedCuisines}
              selectedPriceRanges={selectedPriceRanges}
              onPriceRangesChange={setSelectedPriceRanges}
              maxDeliveryTime={maxDeliveryTime}
              onMaxDeliveryTimeChange={setMaxDeliveryTime}
              minRating={minRating}
              onMinRatingChange={setMinRating}
            />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <p className="text-muted-foreground">{filteredAndSortedRestaurants.length} restaurants found</p>
              </div>

              <div className="flex items-center gap-2">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-border rounded-md bg-background text-foreground text-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="delivery-time">Fastest Delivery</option>
                  <option value="distance">Closest</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex border border-border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Restaurant Grid */}
            <RestaurantGrid restaurants={filteredAndSortedRestaurants} viewMode={viewMode} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
