"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Package, CheckCircle, CircleX, TrendingUp } from "lucide-react"

type OrderStatus = "pending" | "in-progress" | "completed" | "cancelled"

interface Order {
  id: string
  items: string[]
  customerName: string
  totalPrice: number
  time: string
  status: OrderStatus
}

interface MenuItem {
  id: string
  name: string
  category: string
  price: number
  available: boolean
  image: string
}

interface OverviewSectionProps {
  orders: Order[]
  menuItems: MenuItem[]
}

export function OverviewSection({ orders, menuItems }: OverviewSectionProps) {
  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-secondary/70 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Pending Orders</CardTitle>
            <div className="bg-orange-100 p-2 rounded-full">
              <Clock className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{getOrdersByStatus("pending").length}</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/70 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">In Progress</CardTitle>
            <div className="bg-amber-100 rounded-full p-2">
              <Package className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{getOrdersByStatus("in-progress").length}</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/70 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Completed</CardTitle>
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold  text-secondary">{getOrdersByStatus("completed").length}</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/70 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Cancelled</CardTitle>
            <div className="rounded-full bg-orange-100 p-2">
              <CircleX className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold  text-secondary">{getOrdersByStatus("cancelled").length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-secondary/70 bg-white">
          <CardHeader>
            <CardTitle className="text-secondary">Today's Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold  text-secondary mb-2">$342.50</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +12% from yesterday
            </div>
          </CardContent>
        </Card>

        <Card className="border-secondary/70 bg-white">
          <CardHeader>
            <CardTitle className="text-secondary">Weekly Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-secondary mb-2">$1,250.00</div>
            <div className="text-sm text-green-600 flex items-center">
              <TrendingUp className="h-4 w-4 mr-1" />
              +8% from last week
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-secondary/70 bg-white">
        <CardHeader>
          <CardTitle className="text-secondary">Top Selling Dishes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {menuItems.slice(0, 3).map((item, index) => (
              <div key={item.id} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 text-orange-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">
                    {index + 1}
                  </div>
                  <span className="font-medium text-orange-700">{item.name}</span>
                </div>
                <span className="text-orange-600 font-medium">${item.price}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
