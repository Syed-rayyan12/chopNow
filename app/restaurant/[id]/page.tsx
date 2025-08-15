"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { ShoppingCart } from "lucide-react"
import { Header } from "@/components/customer-panel-components/header"
import { RestaurantHeader } from "@/components/customer-panel-components/restaurant-header"
import { MenuCategories } from "@/components/customer-panel-components/menu-categories"
import { CartSidebar } from "@/components/customer-panel-components/cart-sidebar"
import { Footer } from "@/components/customer-panel-components/footer"
import { MenuItems } from "@/components/customer-panel-components/menu-items"

// Mock restaurant data
const mockRestaurant = {
  id: 1,
  name: "Mario's Italian Kitchen",
  image: "/italian-restaurant-food.png",
  coverImage: "/italian-restaurant-interior.png",
  rating: 4.8,
  reviewCount: 324,
  deliveryTime: "25-35 min",
  deliveryFee: 0,
  serviceFee: 2.99,
  cuisine: "Italian",
  priceRange: "$$",
  distance: 1.2,
  address: "123 Main Street, Downtown",
  phone: "(555) 123-4567",
  description:
    "Authentic Italian cuisine made with fresh ingredients and traditional recipes passed down through generations.",
  featured: true,
  tags: ["Pizza", "Pasta", "Italian"],
  openingHours: "11:00 AM - 10:00 PM",
  minimumOrder: 15,
}

const mockMenuCategories = [
  { id: "appetizers", name: "Appetizers", itemCount: 8 },
  { id: "pizza", name: "Pizza", itemCount: 12 },
  { id: "pasta", name: "Pasta", itemCount: 10 },
  { id: "salads", name: "Salads", itemCount: 6 },
  { id: "desserts", name: "Desserts", itemCount: 5 },
  { id: "beverages", name: "Beverages", itemCount: 8 },
]

const mockMenuItems = {
  appetizers: [
    {
      id: 1,
      name: "Bruschetta Classica",
      description: "Toasted bread topped with fresh tomatoes, basil, garlic, and olive oil",
      price: 8.99,
      image: "/bruschetta-appetizer.png",
      category: "appetizers",
      popular: true,
      customizations: [],
    },
    {
      id: 2,
      name: "Mozzarella Sticks",
      description: "Golden fried mozzarella served with marinara sauce",
      price: 9.99,
      image: "/mozzarella-sticks.png",
      category: "appetizers",
      popular: false,
      customizations: [],
    },
  ],
  pizza: [
    {
      id: 3,
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, fresh mozzarella, and basil",
      price: 16.99,
      image: "/margherita-pizza.png",
      category: "pizza",
      popular: true,
      customizations: [
        {
          id: "size",
          name: "Size",
          required: true,
          options: [
            { id: "small", name: 'Small (10")', price: 0 },
            { id: "medium", name: 'Medium (12")', price: 3 },
            { id: "large", name: 'Large (14")', price: 6 },
          ],
        },
        {
          id: "toppings",
          name: "Extra Toppings",
          required: false,
          options: [
            { id: "pepperoni", name: "Pepperoni", price: 2 },
            { id: "mushrooms", name: "Mushrooms", price: 1.5 },
            { id: "olives", name: "Olives", price: 1.5 },
            { id: "peppers", name: "Bell Peppers", price: 1.5 },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Pepperoni Pizza",
      description: "Classic pepperoni pizza with mozzarella cheese and tomato sauce",
      price: 18.99,
      image: "/pepperoni-pizza.png",
      category: "pizza",
      popular: true,
      customizations: [
        {
          id: "size",
          name: "Size",
          required: true,
          options: [
            { id: "small", name: 'Small (10")', price: 0 },
            { id: "medium", name: 'Medium (12")', price: 3 },
            { id: "large", name: 'Large (14")', price: 6 },
          ],
        },
      ],
    },
  ],
  pasta: [
    {
      id: 5,
      name: "Spaghetti Carbonara",
      description: "Creamy pasta with pancetta, eggs, parmesan cheese, and black pepper",
      price: 15.99,
      image: "/spaghetti-carbonara.png",
      category: "pasta",
      popular: true,
      customizations: [
        {
          id: "spice",
          name: "Spice Level",
          required: false,
          options: [
            { id: "mild", name: "Mild", price: 0 },
            { id: "medium", name: "Medium", price: 0 },
            { id: "hot", name: "Hot", price: 0 },
          ],
        },
      ],
    },
  ],
  salads: [
    {
      id: 6,
      name: "Caesar Salad",
      description: "Crisp romaine lettuce with caesar dressing, croutons, and parmesan",
      price: 11.99,
      image: "/caesar-salad.png",
      category: "salads",
      popular: false,
      customizations: [
        {
          id: "protein",
          name: "Add Protein",
          required: false,
          options: [
            { id: "chicken", name: "Grilled Chicken", price: 4 },
            { id: "shrimp", name: "Grilled Shrimp", price: 6 },
          ],
        },
      ],
    },
  ],
  desserts: [
    {
      id: 7,
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 7.99,
      image: "/tiramisu-dessert.png",
      category: "desserts",
      popular: true,
      customizations: [],
    },
  ],
  beverages: [
    {
      id: 8,
      name: "Italian Soda",
      description: "Refreshing sparkling water with your choice of flavor",
      price: 3.99,
      image: "/italian-soda.png",
      category: "beverages",
      popular: false,
      customizations: [
        {
          id: "flavor",
          name: "Flavor",
          required: true,
          options: [
            { id: "lemon", name: "Lemon", price: 0 },
            { id: "orange", name: "Orange", price: 0 },
            { id: "cherry", name: "Cherry", price: 0 },
          ],
        },
      ],
    },
  ],
}

export type MenuItem = {
  id: number
  name: string
  description: string
  price: number
  image: string
  category: string
  popular: boolean
  customizations: {
    id: string
    name: string
    required: boolean
    options: { id: string; name: string; price: number }[]
  }[]
}

export default function RestaurantPage() {
  const params = useParams()
  const [selectedCategory, setSelectedCategory] = useState("appetizers")
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { items, addItem, getCartTotal, getCartCount } = useCart()

  const restaurant = mockRestaurant // In real app, fetch by params.id
  const categories = mockMenuCategories
  const menuItems = mockMenuItems[selectedCategory as keyof typeof mockMenuItems] || []

  const addToCart = (item: MenuItem, customizations: any, quantity: number) => {
    const cartItem = {
      id: `${item.id}-${Date.now()}`,
      menuItem: item,
      customizations,
      quantity,
      totalPrice: calculateItemPrice(item, customizations) * quantity,
      restaurantId: restaurant.id,
      restaurantName: restaurant.name,
    }
    addItem(cartItem)
  }

  const calculateItemPrice = (item: MenuItem, customizations: any) => {
    let price = item.price
    Object.values(customizations).forEach((customization: any) => {
      if (Array.isArray(customization)) {
        customization.forEach((option: any) => {
          price += option.price
        })
      } else if (customization?.price) {
        price += customization.price
      }
    })
    return price
  }

  const cartTotal = getCartTotal()
  const cartItemCount = getCartCount()

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <RestaurantHeader restaurant={restaurant} />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Menu Categories Sidebar */}
            <div className="lg:w-64">
              <MenuCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            {/* Menu Items */}
            <div className="flex-1">
              <MenuItems
                items={menuItems}
                categoryName={categories.find((c) => c.id === selectedCategory)?.name || ""}
                onAddToCart={addToCart}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Floating Cart Button */}
      {cartItemCount > 0 && (
        <Button
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-6 right-6 h-14 px-6 rounded-full shadow-lg z-40"
          size="lg"
        >
          <ShoppingCart className="w-5 h-5 mr-2" />
          {cartItemCount} items • ${cartTotal.toFixed(2)}
        </Button>
      )}

      {/* Cart Sidebar */}
      <CartSidebar isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} restaurant={restaurant} />

      <Footer />
    </div>
  )
}
