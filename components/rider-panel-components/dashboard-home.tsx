"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, Star, TrendingUp, Package, DollarSign, Phone, Navigation, CheckCircle, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { DashboardSummary } from "@/lib/rider-dashboard"

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
  {
    id: 3,
    status: "Delivered",
    icon: <Package className="h-4 w-4 text-green-600" />,
    iconBg: "bg-green-100",
    merchant: "McDonald's",
    items: "2 items",
    amount: "+£8.50",
    time: "2 min ago",
  },
  {
    id: 4,
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
  const [stats, setStats] = useState<DashboardSummary | null>(null);
  const [mappedStats, setMappedStats] = useState<any[]>([])

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/rider/dashboard/summary", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        })
        if (!res.ok) throw new Error("Failed to fetch summary")
        const data: DashboardSummary = await res.json()
        setStats(data)

        // Map stats to UI format after fetching
        setMappedStats([
          {
            title: "Today's Earnings",
            value: `£${data.earnings ?? 0}`,
            change: "+12% from yesterday",
            icon: DollarSign,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
          },
          {
            title: "Orders Completed",
            value: data.completedOrders ?? 0,
            change: "2 pending",
            icon: Package,
            bgColor: "bg-amber-100",
            iconColor: "text-amber-600",
          },
          {
            title: "Rating",
            value: (data.rating ?? 0).toFixed(1),
            change: "Based on 156 reviews",
            icon: Star,
            bgColor: "bg-orange-100",
            iconColor: "text-orange-600",
          },
          {
            title: "Online Time",
            value: `${data.onlineTime ?? 0} min`,
            change: "Target: 8h",
            icon: Clock,
            bgColor: "bg-green-100",
            iconColor: "text-green-600",
          },
        ])
      } catch (err) {
        console.error(err)
      }
    }

    fetchSummary()
  }, [])

  // Map stats for UI only if stats exist
 

  return (
    <div className="flex flex-col gap-6">
      {/* Welcome Section */}
      <div className="flex bg-gradient-to-r from-secondary to-secondary/80 p-6 flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg sm:space-y-0">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-white">Good Morning, John!</h2>
          <p className="text-white">Ready to start earning today?</p>
        </div>
        <div className="flex items-center space-x-3">
          <Switch
            checked={isOnline}
            onCheckedChange={setIsOnline}
            className={isOnline ? "data-[state=checked]:bg-green-500" : "data-[state=unchecked]:bg-secondary"}
          />
          <Label className={isOnline ? "text-green-700 font-medium" : "text-secondary font-medium"}>
            {isOnline ? "Online" : "Offline"}
          </Label>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {mappedStats.map((stat: any) => (
          <Card key={stat.title} className="border-secondary/70 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-foreground">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.iconColor}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">{stat.value}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                {stat.change}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Active Orders & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Orders */}
        <Card className="bg-white border-secondary/70">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-secondary">
              <Package className="h-5 w-5 text-secondary" />
              <span className="text-secondary">Active Orders</span>
              <Badge className="bg-white text-secondary">{activeOrders.length}</Badge>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {activeOrders.map((order) => (
              <div key={order.id} className="p-4 border border-secondary/70 bg-white rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-semibold text-secondary">{order.id}</p>
                    <p className="text-sm text-secondary/90">{order.restaurant} • {order.items} items</p>
                  </div>
                  {getStatusBadge(order.status)}
                </div>

                <div className="flex items-center space-x-2 text-sm text-secondary mb-3">
                  <MapPin className="h-4 w-4" />
                  <span>{order.address}</span>
                </div>

                <div className="flex space-x-2">
                  <Button size="sm" className="flex-1 bg-secondary hover:bg-[#0F3D2E] text-white">
                    <Navigation className="h-4 w-4 mr-2" />
                    Navigate
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1 bg-white border-secondary/70 text-secondary hover:bg-secondary">
                    <Phone className="h-4 w-4 mr-2" />
                    Call
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-white border-secondary/70">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-secondary">
              <TrendingUp className="h-5 w-5 text-secondary" />
              <span className="text-secondary">Recent Activity</span>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {orders.map((order, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border border-secondary/70">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 ${order.iconBg} rounded-full`}>{order.icon}</div>
                  <div>
                    <p className="font-medium text-secondary flex items-center gap-2">
                      ORD-{String(order.id).padStart(3, "0")}
                      <Badge variant="secondary" className="bg-green-100 text-green-600 font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" />
                        {order.status}
                      </Badge>
                    </p>
                    <p className="text-sm text-secondary/90">{order.merchant} • {order.items}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-secondary">{order.amount}</p>
                  <p className="text-xs text-secondary/60">{order.time}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
