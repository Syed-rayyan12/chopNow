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
    <div className="">
      <div className="mb-6 ">
        <h1 className="text-2xl font-bold text-secondary">Orders</h1>
        <p className="text-secondary/70">Manage your deliveries</p>
      </div>

      <Tabs defaultValue="active" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 bg-secondary border-secondary">
          <TabsTrigger value="active" className="data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg">Active Orders</TabsTrigger>
          <TabsTrigger value="completed" className="data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg">Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          {activeOrders.map((order) => (
            <Card key={order.id} className="border border-secondary/70 bg-white">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-secondary">{order.id}</CardTitle>
                  <Badge
                    className={
                      order.status === "picked_up" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {order.status === "picked_up" ? "En Route" : "Ready for Pickup"}
                  </Badge>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span className="font-medium text-secondary/90">{order.restaurant}</span>
                  <span>•</span>
                  <span className="text-secondary/90">{order.items} items</span>
                  <span>•</span>
                  <span className="font-semibold text-secondary">{order.total}</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-secondary">{order.address}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-secondary">{order.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Timer className="h-4 w-4 text-secondary" />
                    <span className="text-sm text-secondary">ETA: {order.estimatedTime}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" variant="outline" className="flex-1 bg-white border-secondary/70 text-secondary hover:bg-secondary">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Customer
                  </Button>
                  <Button size="sm" className="flex-1 bg-secondary hover:bg-[#0F3D2E] text-white">
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
            <Card key={order.id} className="border border-secondary/70 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-secondary">{order.id}</h3>
                    <p className="text-sm text-secondary/90">{order.restaurant}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-secondary">+{order.earnings}</p>
                    <p className="text-xs text-secondary/80">{order.completedAt}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-secondary/80" />
                    <span className="text-sm text-secondary/90">
                      {order.items} items • <span className="text-secondary">{order.total}</span>
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
