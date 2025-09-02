"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MapPin,
  Phone,
  Mail,
  Calendar,
  ShoppingBag,
  DollarSign,
  Star,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Store,
  Clock,
} from "lucide-react"

interface UserDetails {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: string
  joinDate: string
  lastOrder: string
  totalOrders: number
  totalSpent: number
  averageOrder: number
  favoriteRestaurant: string
  avatar: string
}

interface UserDetailsModalProps {
  user: UserDetails
  isOpen: boolean
  onClose: () => void
}

const recentOrders = [
  {
    id: "ORD-001",
    restaurant: "Udupi Kitchen",
    items: ["Jollof Rice", "Egusi Soup"],
    amount: 31.0,
    status: "delivered",
    date: "2024-01-14",
    time: "14:30",
  },
  {
    id: "ORD-002",
    restaurant: "African Delights",
    items: ["Pepper Soup", "Plantain"],
    amount: 24.5,
    status: "delivered",
    date: "2024-01-12",
    time: "19:15",
  },
  {
    id: "ORD-003",
    restaurant: "Spice Garden",
    items: ["Curry Rice"],
    amount: 18.75,
    status: "delivered",
    date: "2024-01-10",
    time: "13:20",
  },
  {
    id: "ORD-004",
    restaurant: "Curry House",
    items: ["Biryani", "Samosa"],
    amount: 42.2,
    status: "delivered",
    date: "2024-01-08",
    time: "20:45",
  },
  {
    id: "ORD-005",
    restaurant: "Jollof Palace",
    items: ["Jollof Rice", "Grilled Chicken"],
    amount: 28.9,
    status: "cancelled",
    date: "2024-01-06",
    time: "18:30",
  },
]

export function UserDetailsModal({ user, isOpen, onClose }: UserDetailsModalProps) {
  const [currentStatus, setCurrentStatus] = useState(user.status)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case "inactive":
        return <XCircle className="w-5 h-5 text-amber-600" />
      case "banned":
        return <AlertTriangle className="w-5 h-5 text-red-600" />
      default:
        return <Clock className="w-5 h-5 text-gray-600" />
    }
  }

  const getOrderStatusBadge = (status: string) => {
    switch (status) {
      case "delivered":
        return <Badge className="bg-green-100 text-green-800">Delivered</Badge>
      case "cancelled":
        return <Badge className="bg-red-100 text-red-800">Cancelled</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const handleStatusUpdate = (newStatus: string) => {
    setCurrentStatus(newStatus)
    console.log(`Updating user ${user.id} status to ${newStatus}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-secondary flex items-center">
            <Avatar className="h-8 w-8 mr-3">
              <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
              <AvatarFallback className="bg-orange-100 text-orange-800">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            {user.name}
          </DialogTitle>
          <DialogDescription className="text-amber-600">
            Complete user profile and activity information
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="profile" className="mt-6">
          <TabsList className="grid w-full grid-cols-4 bg-amber-50">
            <TabsTrigger
              value="profile"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              Order History
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
            >
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Personal Information */}
              <Card className="border-secondary/80">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <Avatar className="w-5 h-5 mr-2">
                      <AvatarImage src="/user-icon.svg" alt="User" />
                      <AvatarFallback className="bg-orange-100 text-orange-800">UI</AvatarFallback>
                    </Avatar>
                    Personal Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                      <AvatarFallback className="bg-orange-100 text-orange-800 text-lg">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-lg font-bold text-orange-800">{user.name}</h3>
                      <p className="text-sm text-secondary">{user.id}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-amber-700">{user.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-amber-700">{user.phone}</span>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-orange-600 mt-0.5" />
                      <span className="text-sm text-amber-700">{user.address}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5 text-orange-600" />
                      <span className="text-sm text-amber-700">Joined {user.joinDate}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Account Statistics */}
              <Card className="border-secondary/80">
                <CardHeader>
                  <CardTitle className="flex items-center text-orange-800">
                    <ShoppingBag className="w-5 h-5 mr-2" />
                    Account Statistics
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-800">{user.totalOrders}</div>
                      <div className="text-sm text-amber-600">Total Orders</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">£{user.totalSpent.toFixed(2)}</div>
                      <div className="text-sm text-amber-600">Total Spent</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-secondary">£{user.averageOrder.toFixed(2)}</div>
                      <div className="text-sm text-amber-600">Avg Order</div>
                    </div>
                    <div className="text-center p-4 bg-amber-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-800">4.8</div>
                      <div className="text-sm text-amber-600">Avg Rating</div>
                    </div>
                  </div>

                  <Separator className="bg-orange-200" />

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-amber-700">Last Order:</span>
                      <span className="font-medium text-orange-800">{user.lastOrder}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Favorite Restaurant:</span>
                      <span className="font-medium text-orange-800">{user.favoriteRestaurant}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-amber-700">Account Status:</span>
                      <Badge
                        className={
                          user.status === "active"
                            ? "bg-green-100 text-green-800"
                            : user.status === "inactive"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }
                      >
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card className="border-secondary/80">
              <CardHeader>
                <CardTitle className="text-orange-800">Recent Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                          <Store className="w-5 h-5 text-orange-600" />
                        </div>
                        <div>
                          <p className="font-medium text-secondary">{order.id}</p>
                          <p className="text-sm text-amber-600">{order.restaurant}</p>
                          <p className="text-xs text-amber-500">{order.items.join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-secondary">£{order.amount.toFixed(2)}</p>
                        <p className="text-xs text-amber-600">
                          {order.date} at {order.time}
                        </p>
                        {getOrderStatusBadge(order.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-secondary/80">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-600">This Month Orders</p>
                      <p className="text-2xl font-bold text-orange-800">12</p>
                    </div>
                    <ShoppingBag className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-secondary/80">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-600">This Month Spent</p>
                      <p className="text-2xl font-bold text-secondary">£324</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
              <Card className="border-secondary/80">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-amber-600">Customer Rating</p>
                      <p className="text-2xl font-bold text-orange-800">4.8</p>
                    </div>
                    <Star className="w-8 h-8 text-orange-500" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-secondary/80">
              <CardHeader>
                <CardTitle className="flex items-center text-orange-800">
                  {getStatusIcon(currentStatus)}
                  <span className="ml-2">Account Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-4">
                  <Select value={currentStatus} onValueChange={handleStatusUpdate}>
                    <SelectTrigger className="w-48 border-orange-200">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="banned">Banned</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button className="bg-orange-500 hover:bg-orange-600 text-white">Update Status</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="border-secondary/80">
              <CardHeader>
                <CardTitle className="text-orange-800">Account Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                >
                  Send Password Reset Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                >
                  Send Welcome Email
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
                >
                  Generate Account Report
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-orange-200">
          <Button
            variant="outline"
            onClick={onClose}
            className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
          >
            Close
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">Edit User</Button>
          <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent">
            Send Message
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
