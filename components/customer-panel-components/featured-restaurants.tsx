import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Truck } from "lucide-react"

const featuredRestaurants = [
  {
    id: 1,
    name: "Mario's Italian Kitchen",
    image: "/italian-restaurant-food.png",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "Free",
    cuisine: "Italian",
    featured: true,
  },
  {
    id: 2,
    name: "Spice Garden",
    image: "/indian-restaurant-curry.png",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: "$2.99",
    cuisine: "Indian",
    featured: true,
  },
  {
    id: 3,
    name: "Burger Palace",
    image: "/gourmet-burger-restaurant.png",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    cuisine: "American",
    featured: true,
  },
  {
    id: 4,
    name: "Sushi Zen",
    image: "/japanese-sushi-restaurant.png",
    rating: 4.9,
    deliveryTime: "35-45 min",
    deliveryFee: "$3.99",
    cuisine: "Japanese",
    featured: true,
  },
]

export function FeaturedRestaurants() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">Featured Restaurants</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover the most popular restaurants in your area, handpicked for quality and taste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredRestaurants.map((restaurant) => (
            <Card
              key={restaurant.id}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-border"
            >
              <div className="relative overflow-hidden rounded-t-lg">
                <img
                  src={restaurant.image || "/placeholder.svg"}
                  alt={restaurant.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {restaurant.featured && (
                  <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">Featured</Badge>
                )}
              </div>
              <CardContent className="p-4">
                <h3 className="font-heading font-semibold text-lg text-foreground mb-2">{restaurant.name}</h3>
                <p className="text-muted-foreground text-sm mb-3">{restaurant.cuisine}</p>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{restaurant.rating}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{restaurant.deliveryTime}</span>
                  </div>
                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Truck className="w-4 h-4" />
                    <span>{restaurant.deliveryFee}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
