"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, TrendingUp, Package, DollarSign, Phone, Navigation, Check, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"



const stats = [
  {
    title: "Today's Earnings",
    value: "£45.50",
    change: "+12% from yesterday",
    icon: DollarSign,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    title: "Orders Completed",
    value: "8",
    change: "2 pending",
    icon: Package,
    bgColor: "bg-amber-100",
    iconColor: "text-amber-600"
  },
  {
    title: "Rating",
    value: "4.8",
    change: "Based on 156 reviews",
    icon: Star,
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600"
  },
  {
    title: "Online Time",
    value: "6h 30m",
    change: "Target: 8h",
    icon: Clock,
    bgColor: "bg-green-100",
    iconColor: "text-green-600"
  }
];

const orders = [
  {
    id: 1,
    status: "Delivered",
    icon: <Package className="h-4 w-4 text-green-600" />,
    iconBg: "bg-green-100",
    merchant: "McDonald's",
    items: "2 items",
    amount: "+£8.50",
    time: "2 min ago",
  },
  {
    id: 2,
    status: "Completed",
    icon: <Package className="h-4 w-4 text-green-600" />,
    iconBg: "bg-green-100",
    merchant: "Burger King",
    items: "1 item",
    amount: "+£6.25",
    time: "15 min ago",
  },
];



const activeOrders = [
  {
    id: "ORD-1248",
    restaurant: "McDonald's",
    items: 3,
    address: "123 High Street, London",
    status: "delivered",
  },
  {
    id: "ORD-1250",
    restaurant: "Pizza Hut",
    items: 1,
    address: "789 Queen Street, London",
    status: "pickup",
  },
];

const getStatusBadge = (status: string) => {

  switch (status) {
    case "delivered":
    case "completed":
      return (
        <Badge className="bg-green-100 text-green-600 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    case "pickup":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          <Clock className="w-3 h-3 mr-1" />
          Pickup
        </Badge>
      );
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      );
    default:
      return <Badge variant="secondary">{status}</Badge>;
  }
};
export function DashboardHome() {
  const [isOnline, setIsOnline] = useState(true);
  return (
    <div className="p-4 lg:p-6 space-y-6">
      {/* Welcome Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold text-orange-900">Good Morning, John!</h2>
          <p className="text-orange-700">Ready to start earning today?</p>
        </div>
        <div className="flex items-center space-x-3">
      <Switch
        checked={isOnline}
        onCheckedChange={setIsOnline}
        className={isOnline ? "data-[state=checked]:bg-green-500" : "data-[state=unchecked]:bg-orange-500"}
      />
      <Label className={isOnline ? "text-green-700 font-medium" : "text-orange-700 font-medium"}>
        {isOnline ? "Online" : "Offline"}
      </Label>
    </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-orange-800">{stat.value}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change} from last month
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Orders & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Orders */}
        <Card className="bg-white border-orange-200 shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 text-orange-900">
          <Package className="h-5 w-5 text-orange-600" />
          <span>Active Orders</span>
          <Badge className="bg-orange-100 text-orange-800">
            {activeOrders.length}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {activeOrders.map((order) => (
          <div
            key={order.id}
            className="p-4 border border-orange-100 bg-orange-50 rounded-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-semibold text-orange-900">{order.id}</p>
                <p className="text-sm text-amber-600">
                  {order.restaurant} • {order.items} items
                </p>
              </div>
              {getStatusBadge(order.status)}
            </div>

            <div className="flex items-center space-x-2 text-sm text-orange-700 mb-3">
              <MapPin className="h-4 w-4" />
              <span>{order.address}</span>
            </div>

            <div className="flex space-x-2">
              <Button
                size="sm"
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white"
              >
                <Navigation className="h-4 w-4 mr-2" />
                Navigate
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="flex-1 bg-white border-orange-200 text-orange-800 hover:bg-orange-50"
              >
                <Phone className="h-4 w-4 mr-2" />
                Call
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>


        <Card className="bg-white border-orange-200 shadow-sm">
          {" "}
          {/* Added border-orange-200 to cards */}
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-900">
              <TrendingUp className="h-5 w-5 text-orange-600" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {orders.map((order, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100"
              >
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${order.iconBg} rounded-full`}>
                    {order.icon}
                  </div>
                  <div>
                    <p className="font-medium text-orange-800 flex items-center gap-2">
                      ORD-{String(order.id).padStart(3, "0")}
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-600 font-medium flex items-center gap-1"
                      >
                        <CheckCircle className="h-3 w-3" />
                        {order.status}
                      </Badge>
                    </p>
                    <p className="text-sm text-amber-600">
                      {order.merchant} • {order.items}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-orange-800">
                    {order.amount}
                  </p>
                  <p className="text-xs text-orange-600">{order.time}</p>
                </div>
              </div>
            ))}

            {/* Ratings */}
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-100 rounded-full">
                  <Star className="h-4 w-4 text-orange-600" />
                </div>
                <div>
                  <p className="font-medium text-orange-800">New 5-star Rating</p>
                  <p className="text-sm text-orange-700">Great service!</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-orange-600">1 hour ago</p>
              </div>
            </div>

            {/* Bonuses */}
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-100">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-amber-100 rounded-full">
                  <DollarSign className="h-4 w-4 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-orange-800">Weekly Bonus Earned</p>
                  <p className="text-sm text-orange-700">Completed 50+ orders</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-orange-800">+£25.00</p>
                <p className="text-xs text-orange-600">2 hours ago</p>
              </div>
            </div>
          </CardContent>

        </Card>
      </div>
    </div>
  )
}
