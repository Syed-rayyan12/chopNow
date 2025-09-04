"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Eye } from "lucide-react"

type OrderStatus = "pending" | "in-progress" | "completed" | "cancelled"

interface Order {
  id: string
  items: string[]
  customerName: string
  totalPrice: number
  time: string
  status: OrderStatus
}

interface OrdersSectionProps {
  orders: Order[]
}

export function OrdersSection({ orders }: OrdersSectionProps) {
  const [activeOrderTab, setActiveOrderTab] = useState("new")

  const getOrdersByStatus = (status: OrderStatus) => {
    return orders.filter((order) => order.status === status)
  }

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700"
      case "in-progress":
        return "bg-blue-100 text-blue-800"
      case "completed":
        return "bg-green-100 text-green-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Tabs value={activeOrderTab} onValueChange={setActiveOrderTab} className="">
      <TabsList className="grid w-full max-sm:h-full grid-cols-4 max-sm:flex max-sm:flex-col bg-secondary border-secondary rounded-lg">
  <TabsTrigger
    value="new"
    className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg"
  >
    New Orders
  </TabsTrigger>
  <TabsTrigger
    value="progress"
    className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg"
  >
    In Progress
  </TabsTrigger>
  <TabsTrigger
    value="completed"
    className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg"
  >
    Completed
  </TabsTrigger>
  <TabsTrigger
    value="cancelled"
    className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg"
  >
    Cancelled
  </TabsTrigger>
</TabsList>



        <TabsContent value="new" className="space-y-4">
          {getOrdersByStatus("pending").map((order) => (
            <Card key={order.id} className="border-orange-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center max-sm:flex-col gap-2 max-sm:items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-orange-800">#{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Customer:</strong> {order.customerName}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Items:</strong> {order.items.join(", ")}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Total:</strong> ${order.totalPrice}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Time:</strong> {order.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button size="sm" className="bg-green-600 max-sm:items-center hover:bg-green-700">
                      <Check className="h-4 w-4 mr-1" />
                      Accept
                    </Button>
                    <Button size="sm" variant="destructive">
                      <X className="h-4 w-4 mr-1" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="progress" className="space-y-4">
          {getOrdersByStatus("in-progress").map((order) => (
            <Card key={order.id} className="border-orange-200 bg-white">
              <CardContent className="p-4">
                <div className="flex items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-orange-800">#{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Customer:</strong> {order.customerName}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Items:</strong> {order.items.join(", ")}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Total:</strong> ${order.totalPrice}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Time:</strong> {order.time}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                    Mark Ready
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4 bg-white">
          {getOrdersByStatus("completed").map((order) => (
            <Card key={order.id} className="border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-orange-700">#{order.id}</span>
                      <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                    </div>
                    <div className="text-sm text-gray-600">
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Customer:</strong> {order.customerName}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Items:</strong> {order.items.join(", ")}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Total:</strong> ${order.totalPrice}
                      </p>
                      <p className="text-orange-600">
                        <strong className="text-orange-700">Time:</strong> {order.time}
                      </p>
                    </div>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="space-y-4">
          {getOrdersByStatus("cancelled").length > 0 ? (
            getOrdersByStatus("cancelled").map((order) => (
              <Card key={order.id} className="border-orange-200 bg-white">
                <CardContent className="p-4">
                  <div className="flex items-center max-sm:flex-col max-sm:gap-2 max-sm:items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-orange-800">#{order.id}</span>
                        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                      </div>
                      <div className="text-sm text-gray-600">
                        <p className="text-orange-600">
                          <strong className="text-orange-700">Customer:</strong> {order.customerName}
                        </p>
                        <p className="text-orange-600">
                          <strong className="text-orange-700">Items:</strong> {order.items.join(", ")}
                        </p>
                        <p className="text-orange-600">
                          <strong className="text-orange-700">Total:</strong> ${order.totalPrice}
                        </p>
                        <p className="text-orange-600">
                          <strong className="text-orange-700">Time:</strong> {order.time}
                        </p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-1" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="text-center py-8 text-gray-500">No cancelled orders today</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
