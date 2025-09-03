import { OrdersSection } from '@/components/restaurant-panel-components/orders-section'
import React from 'react'

type OrderStatus = "pending" | "in-progress" | "completed" | "cancelled"

interface Order {
  id: string
  items: string[]
  customerName: string
  totalPrice: number
  time: string
  status: OrderStatus
}

const mockOrders: Order[] = [
  {
    id: "ORD001",
    items: ["Margherita Pizza", "Garlic Bread"],
    customerName: "John Doe",
    totalPrice: 25.99,
    time: "2:30 PM",
    status: "pending"
  },
  {
    id: "ORD002",
    items: ["Chicken Burger", "Fries", "Coke"],
    customerName: "Jane Smith",
    totalPrice: 18.50,
    time: "2:45 PM",
    status: "pending"
  },
  {
    id: "ORD003",
    items: ["Pasta Carbonara", "Caesar Salad"],
    customerName: "Mike Johnson",
    totalPrice: 32.75,
    time: "1:15 PM",
    status: "in-progress"
  },
  {
    id: "ORD004",
    items: ["Fish and Chips", "Onion Rings"],
    customerName: "Sarah Wilson",
    totalPrice: 22.40,
    time: "12:30 PM",
    status: "completed"
  },
  {
    id: "ORD005",
    items: ["Vegetable Stir Fry", "Spring Rolls"],
    customerName: "Tom Brown",
    totalPrice: 19.99,
    time: "11:45 AM",
    status: "completed"
  },
  {
    id: "ORD006",
    items: ["Steak", "Mashed Potatoes", "Wine"],
    customerName: "Lisa Davis",
    totalPrice: 45.80,
    time: "10:20 AM",
    status: "cancelled"
  }
]

const page = () => {
  return (
    <>
       <OrdersSection orders={mockOrders}/>
    </>
  )
}

export default page
