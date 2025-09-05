"use client"

import { useState, useMemo } from "react"

import { Button } from "@/components/ui/button"
import { Grid, List, SlidersHorizontal } from "lucide-react"
import { Header } from "@/components/customer-panel-components/header"
import { SearchBar } from "@/components/customer-panel-components/search-bar"
import { RestaurantFilters } from "@/components/customer-panel-components/restaurant-filters"
import { RestaurantGrid } from "@/components/customer-panel-components/restaurant-grid"
import { Footer } from "@/components/customer-panel-components/footer"
import { RestaurantRiderNavbar } from "@/components/customer-panel-components/admin-rider-navbar"

export type Restaurant = {
  id: number
  name: string
  phone: string
  address: string
  createdAt: string
  // Extended fields that will be available after migration
  image?: string
  cuisine?: string
  rating?: number
  deliveryTime?: string
  deliveryFee?: number
  priceRange?: string
  distance?: number
  featured?: boolean
  tags?: string[]
}

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
  const restaurants = [
    {
      id: 1,
      name: "Mario's Italian Kitchen",
      phone: "+1 (555) 123-4567",
      address: "123 Main Street, Downtown",
      createdAt: "2024-01-15T10:00:00Z",
      image: "/italian-restaurant-food.png",
      cuisine: "Italian",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: 0,
      priceRange: "$$",
      distance: 1.5,
      featured: true,
      tags: ["Italian", "Pizza", "Pasta"]
    },
    {
      id: 2,
      name: "Spice Garden",
      phone: "+1 (555) 234-5678",
      address: "456 Curry Lane, Spice District",
      createdAt: "2024-01-20T14:30:00Z",
      image: "/indian-restaurant-curry.png",
      cuisine: "Indian",
      rating: 4.6,
      deliveryTime: "30-40 min",
      deliveryFee: 2.99,
      priceRange: "$$",
      distance: 2.3,
      featured: true,
      tags: ["Indian", "Curry", "Spicy"]
    },
    {
      id: 3,
      name: "Burger Palace",
      phone: "+1 (555) 345-6789",
      address: "789 Burger Blvd, Fast Food Corner",
      createdAt: "2024-01-25T12:15:00Z",
      image: "/gourmet-burger-restaurant.png",
      cuisine: "American",
      rating: 4.7,
      deliveryTime: "20-30 min",
      deliveryFee: 0,
      priceRange: "$",
      distance: 0.8,
      featured: true,
      tags: ["American", "Burgers", "Fast Food"]
    },
    {
      id: 4,
      name: "Sushi Zen",
      phone: "+1 (555) 456-7890",
      address: "321 Sushi Street, Asian Quarter",
      createdAt: "2024-02-01T16:45:00Z",
      image: "/japanese-sushi-restaurant.png",
      cuisine: "Japanese",
      rating: 4.9,
      deliveryTime: "35-45 min",
      deliveryFee: 3.99,
      priceRange: "$$$",
      distance: 3.1,
      featured: true,
      tags: ["Japanese", "Sushi", "Asian"]
    },
    {
      id: 5,
      name: "Taco Fiesta",
      phone: "+1 (555) 567-8901",
      address: "654 Fiesta Ave, Mexican District",
      createdAt: "2024-02-05T11:20:00Z",
      image: "/mexican-cuisine.png",
      cuisine: "Mexican",
      rating: 4.4,
      deliveryTime: "25-35 min",
      deliveryFee: 1.99,
      priceRange: "$",
      distance: 1.9,
      featured: false,
      tags: ["Mexican", "Tacos", "Burritos"]
    },
    {
      id: 6,
      name: "Dragon Palace",
      phone: "+1 (555) 678-9012",
      address: "987 Dragon Road, Chinatown",
      createdAt: "2024-02-10T13:30:00Z",
      image: "/chinese-food-noodles.png",
      cuisine: "Chinese",
      rating: 4.5,
      deliveryTime: "30-40 min",
      deliveryFee: 2.49,
      priceRange: "$$",
      distance: 2.7,
      featured: false,
      tags: ["Chinese", "Noodles", "Dumplings"]
    },
    {
      id: 7,
      name: "Mediterranean Delight",
      phone: "+1 (555) 789-0123",
      address: "147 Olive Grove, Mediterranean Quarter",
      createdAt: "2024-02-15T15:00:00Z",
      image: "/mediterranean-hummus.png",
      cuisine: "Mediterranean",
      rating: 4.6,
      deliveryTime: "35-45 min",
      deliveryFee: 3.49,
      priceRange: "$$",
      distance: 3.5,
      featured: false,
      tags: ["Mediterranean", "Hummus", "Falafel"]
    },
    {
      id: 8,
      name: "Thai Spice House",
      phone: "+1 (555) 890-1234",
      address: "258 Spice Lane, Thai District",
      createdAt: "2024-02-20T17:15:00Z",
      image: "/thai-pad-thai.png",
      cuisine: "Thai",
      rating: 4.7,
      deliveryTime: "40-50 min",
      deliveryFee: 4.99,
      priceRange: "$$",
      distance: 4.2,
      featured: false,
      tags: ["Thai", "Pad Thai", "Curry"]
    }
  ]

  const filteredAndSortedRestaurants = useMemo(() => {
    const filtered = restaurants.filter((restaurant) => {
      // Search query filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName = restaurant.name.toLowerCase().includes(query)
        const matchesCuisine = (restaurant.cuisine || "").toLowerCase().includes(query)
        const matchesTags = (restaurant.tags || []).some((tag) => tag.toLowerCase().includes(query))
        if (!matchesName && !matchesCuisine && !matchesTags) return false
      }

      // Cuisine filter
      if (selectedCuisines.length > 0 && !selectedCuisines.includes(restaurant.cuisine || "")) {
        return false
      }

      // Price range filter
      if (selectedPriceRanges.length > 0 && !selectedPriceRanges.includes(restaurant.priceRange || "")) {
        return false
      }

      // Delivery time filter
      if (restaurant.deliveryTime) {
        const maxTime = Number.parseInt(restaurant.deliveryTime.split("-")[1])
        if (maxTime > maxDeliveryTime) return false
      }

      // Rating filter
      if ((restaurant.rating || 0) < minRating) return false

      return true
    })

    // Sort restaurants
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return (b.rating || 0) - (a.rating || 0)
        case "delivery-time":
          if (a.deliveryTime && b.deliveryTime) {
            const aTime = Number.parseInt(a.deliveryTime.split("-")[0])
            const bTime = Number.parseInt(b.deliveryTime.split("-")[0])
            return aTime - bTime
          }
          return 0
        case "distance":
          return (a.distance || 0) - (b.distance || 0)
        case "recommended":
        default:
          // Featured first, then by rating
          if ((a.featured && !b.featured) || (!a.featured && b.featured)) {
            return a.featured ? -1 : 1
          }
          return (b.rating || 0) - (a.rating || 0)
      }
    })

    return filtered
  }, [searchQuery, selectedCuisines, selectedPriceRanges, maxDeliveryTime, minRating, sortBy, restaurants])

  return (
    <div className="min-h-screen bg-background">
      <RestaurantRiderNavbar/>
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
            <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:gap-4 justify-between mb-6">
              <div className="flex max-sm:flex-col max-sm:items-start items-center gap-4">
                <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)} className="lg:hidden max-sm:w-[100%]">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <p className="text-[#0F3D2E]">{filteredAndSortedRestaurants.length} restaurants found</p>
              </div>

              <div className="flex items-center  gap-2">
                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="px-3 py-2 border border-secondary rounded-md bg-background text-foreground text-sm"
                >
                  <option value="recommended">Recommended</option>
                  <option value="rating">Highest Rated</option>
                  <option value="delivery-time">Fastest Delivery</option>
                  <option value="distance">Closest</option>
                </select>

                {/* View Mode Toggle */}
                <div className="flex max-sm:hidden border border-border rounded-md">
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
