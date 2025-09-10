"use client"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const popularCuisines = [
  {
    id: 1,
    name: "Italian",
    image: "/italian-food-pizza-pasta.png",
    restaurantCount: 45,
  },
  {
    id: 2,
    name: "Chinese",
    image: "/chinese-food-noodles.png",
    restaurantCount: 38,
  },
  {
    id: 3,
    name: "Indian",
    image: "/indian-curry-spices.png",
    restaurantCount: 32,
  },
  {
    id: 4,
    name: "Mexican",
    image: "/mexican-cuisine.png",
    restaurantCount: 28,
  },
  {
    id: 5,
    name: "Japanese",
    image: "/japanese-sushi-platter.png",
    restaurantCount: 25,
  },
  {
    id: 6,
    name: "American",
    image: "/american-burgers.png",
    restaurantCount: 42,
  },
  {
    id: 7,
    name: "Thai",
    image: "/thai-pad-thai.png",
    restaurantCount: 22,
  },
  {
    id: 8,
    name: "Mediterranean",
    image: "/mediterranean-hummus.png",
    restaurantCount: 18,
  },
]

export function PopularCuisines() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
        <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4">
            Popular{" "}
            <span className="text-secondary animate-pulse">
             Cuisines
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore a world of flavors from your favorite cuisines, all available for delivery.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {popularCuisines.map((cuisine) => (
            <Link key={cuisine.id} href="/restaurants" passHref>
            <Card className="group cursor-pointer transition-all duration-300 border-secondary/50 bg-white">
              <CardContent className="p-4 text-center">
                <div className="relative overflow-hidden rounded-lg mb-3">
                  <img
                    src={cuisine.image || "/placeholder.svg"}
                    alt={cuisine.name}
                    className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-heading font-semibold text-sm text-foreground mb-1">
                  {cuisine.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {cuisine.restaurantCount} restaurants
                </p>
              </CardContent>
            </Card>
          </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
