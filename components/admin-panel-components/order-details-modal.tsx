"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, MapPin, Phone, Store, Clock, CreditCard, CheckCircle, ChefHat, Truck, XCircle } from "lucide-react"

interface Order {
  id: string
  customer: string
  customerEmail: string
  restaurant: string
  items: string[]
  amount: number
  status: string
  paymentStatus: string
  orderTime: string
  deliveryTime: string | null
  address: string
  phone: string
}

interface OrderDetailsModalProps {
  order: Order
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsModal({ order, isOpen, onClose }: OrderDetailsModalProps) {
  const [currentStatus, setCurrentStatus] = useState(order.status)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "preparing":
        return <ChefHat className="w-5 h-5 text-orange-600" />
      case "pending":
        return <Clock className="w-5 h-5 text-amber-600" />
      case "out-for-delivery":
        return <Truck className="w-5 h-5 text-blue-600" />
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus)
    // Here you would typically make an API call to update the order status
    console.log(`Updating order ${order.id} status to ${newStatus}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[50%] max-lg:w-[80%] max-sm:w-[100%] mx-auto max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-secondary">Order Details - {order.id}</DialogTitle>
          <DialogDescription className="text-amber-600">Complete information about this order</DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 max-xl:grid-cols-1 gap-6 mt-6">
          {/* Customer Information */}
          <Card className="border-secondary/80 w-full">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <User className="w-5 h-5 mr-2" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-orange-800">{order.customer}</p>
                  <p className="text-sm text-amber-600">{order.customerEmail}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Delivery Address</p>
                  <p className="text-sm text-amber-600">{order.address}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Phone Number</p>
                  <p className="text-sm text-amber-600">{order.phone}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Order Information */}
          <Card className="border-secondary/80  w-full">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                <Store className="w-5 h-5 mr-2" />
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 ">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                  <Store className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-orange-800">{order.restaurant}</p>
                  <p className="text-sm text-amber-600">Restaurant</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Order Time</p>
                  <p className="text-sm text-amber-600">{order.orderTime}</p>
                </div>
              </div>

              {order.deliveryTime && (
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-orange-600" />
                  <div>
                    <p className="text-sm font-medium text-orange-800">Delivery Time</p>
                    <p className="text-sm text-amber-600">{order.deliveryTime}</p>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3">
                <CreditCard className="w-5 h-5 text-orange-600" />
                <div>
                  <p className="text-sm font-medium text-orange-800">Payment Status</p>
                  <Badge
                    className={
                      order.paymentStatus === "paid"
                        ? "bg-green-100 text-green-800"
                        : order.paymentStatus === "pending"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  >
                    {order.paymentStatus}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-6 mt-6">


          {/* Order Items */}
          <Card className="border-secondary/80  w-full">
            <CardHeader>
              <CardTitle className="text-orange-800">Order Items</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-white border border-secondary/80 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-orange-600">{index + 1}</span>
                      </div>
                      <span className="font-medium text-orange-800">{item}</span>
                    </div>
                    <span className="text-orange-600">1x</span>
                  </div>
                ))}
              </div>

              <Separator className="my-4 bg-orange-200" />

              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-orange-800">Total Amount</span>
                <span className="text-2xl font-bold text-secondary">£{order.amount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Status Management */}
          <Card className="border-secondary/80  w-full">
            <CardHeader>
              <CardTitle className="flex items-center text-orange-800">
                {getStatusIcon(currentStatus)}
                <span className="ml-2">Order Status</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4">
                <Select value={currentStatus} onValueChange={handleStatusUpdate}>
                  <SelectTrigger className="w-48 border-orange-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="preparing">Preparing</SelectItem>
                    <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>

                <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Status</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Action Buttons */}
        <div className="flex justify-end  max-lg:justify-center max-lg:flex-col max-lg:gap-3 gap-3  pt-4 border-t border-orange-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
          >
            Close
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Print Receipt</Button>
          <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent">
            Contact Customer
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
