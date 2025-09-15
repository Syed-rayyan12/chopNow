"use client"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Truck } from "lucide-react"
import Link from "next/link"
import { easeOut, motion } from "framer-motion"

const featuredRestaurants = [
  {
    id: 1,
    name: "Funzo",
    image: "/restaurant-1.jpeg",
    rating: 4.8,
    deliveryTime: "25-35 min",
    deliveryFee: "Free",
    cuisine: "Morrocan",
    featured: true,
  },
  {
    id: 2,
    name: "Bwibo",
    image: "/restaurant-2.jpeg",
    rating: 4.6,
    deliveryTime: "30-40 min",
    deliveryFee: "$2.99",
    cuisine: "Nigerian",
    featured: true,
  },
  {
    id: 3,
    name: "Mombasa",
    image: "/restaurant-3.jpeg",
    rating: 4.7,
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    cuisine: "Madagascar",
    featured: true,
  },
  {
    id: 4,
    name: "Safari",
    image: "/restaurant-4.jpeg",
    rating: 4.9,
    deliveryTime: "35-45 min",
    deliveryFee: "$3.99",
    cuisine: "Egyption",
    featured: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: easeOut } }
}

export function FeaturedRestaurants() {
  return (
    <section className="py-16 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Featured{" "}
            <span className="text-secondary">
              Restaurants
            </span>
          </motion.h2>
          <motion.p
            className="text-lg text-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Discover the most popular restaurants in your area, handpicked for quality and taste.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
        >
          {featuredRestaurants.map((restaurant) => (

            <Link key={restaurant.id} href="/restaurants" passHref>
              <motion.div   variants={itemVariants}>
              <Card
                className="group cursor-pointer bg-white rounded-2xl border-secondary/50 transform-3d hover:-translate-y-1 duration-300 transition-all  shadow-sm overflow-hidden"
              
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={restaurant.image || "/placeholder.svg"}
                    alt={restaurant.name}
                    className="w-full h-48 object-cover"
                  />
                  {restaurant.featured && (
                    <Badge className="absolute top-3 left-3 bg-secondary text-primary-foreground">
                      Featured
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-heading font-semibold text-lg text-foreground mb-2">
                    {restaurant.name}
                  </h3>
                  <p className="text-sm mb-3">{restaurant.cuisine}</p>

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
                      <Truck className="w-4 h-4 text-secondary" />
                      <span className="text-secondary font-bold">{restaurant.deliveryFee}</span>
                    </div>
                  </div>
                </CardContent>
                </Card>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
