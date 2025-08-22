"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Navigation, Package, CheckCircle, Timer } from "lucide-react"

export function OrdersSection() {
  const [activeOrders] = useState([
    {
      id: "ORD-1248",
      restaurant: "McDonald's",
      customer: "John Smith",
      items: 3,
      total: "£12.50",
      address: "123 High Street, London",
      phone: "+44 7123 456789",
      status: "picked_up",
      estimatedTime: "15 min",
      distance: "0.8 miles",
    },
    {
      id: "ORD-1250",
      restaurant: "Pizza Hut",
      customer: "Sarah Johnson",
      items: 1,
      total: "£18.75",
      address: "789 Queen Street, London",
      phone: "+44 7987 654321",
      status: "ready_for_pickup",
      estimatedTime: "5 min",
      distance: "1.2 miles",
    },
  ])

  const [completedOrders] = useState([
    {
      id: "ORD-1248",
      restaurant: "Burger King",
      customer: "Mike Brown",
      items: 2,
      total: "£15.25",
      earnings: "£8.50",
      completedAt: "2 hours ago",
      rating: 5,
    },
    {
      id: "ORD-1250",
      restaurant: "Pizza Hut",
      customer: "Emma Wilson",
      items: 1,
      total: "£22.00",
      earnings: "£12.00",
      completedAt: "4 hours ago",
      rating: 4,
    },
  ])

  return (
    <div className="p-4">
      <div className="mb-6 ">
        <h1 className="text-2xl font-bold text-orange-800">Orders</h1>
        <p className="text-amber-600">Manage your deliveries</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-orange-200/30 border border-orange-200">
          <TabsTrigger value="active" className="text-black">Active Orders</TabsTrigger>
          <TabsTrigger value="completed" className="text-black">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.map((order) => (
            <Card key={order.id} className="border border-orange-200 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-orange-800">{order.id}</CardTitle>
                  <Badge
                    className={
                      order.status === "picked_up" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {order.status === "picked_up" ? "En Route" : "Ready for Pickup"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="font-medium text-amber-600">{order.restaurant}</span>
                  <span>•</span>
                  <span className="text-amber-600">{order.items} items</span>
                  <span>•</span>
                  <span className="font-semibold text-orange-800">{order.total}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-orange-800" />
                    <span className="text-sm text-orange-700">{order.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-orange-800" />
                    <span className="text-sm text-orange-700">{order.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4 text-orange-800" />
                    <span className="text-sm text-orange-700">ETA: {order.estimatedTime}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent border border-orange-200 hover:bg-orange-400">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button size="sm" className="flex-1 bg-orange-500 hover:bg-orange-600">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                </div>

                {order.status === "picked_up" && (
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark as Delivered
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 ">
          {completedOrders.map((order) => (
            <Card key={order.id} className="border border-orange-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-orange-800">{order.id}</h3>
                    <p className="text-sm text-amber-600">{order.restaurant}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-orange-800">+{order.earnings}</p>
                    <p className="text-xs text-gray-500">{order.completedAt}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-amber-400" />
                    <span className="text-sm text-amber-600">
                      {order.items} items • <span className="text-orange-700">{order.total}</span> 
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`text-sm ${i < order.rating ? "text-yellow-400" : "text-gray-300"}`}>
                        ★
                      </span>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
