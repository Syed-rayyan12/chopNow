import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Store, Users, DollarSign, TrendingUp, Clock, CheckCircle, AlertCircle } from "lucide-react"

const stats = [
  {
    title: "Total Orders",
    value: "2,847",
    change: "+12.5%",
    icon: ShoppingBag,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Active Restaurants",
    value: "156",
    change: "+3.2%",
    icon: Store,
    color: "text-amber-600",
    bgColor: "bg-amber-100",
  },
  {
    title: "Total Users",
    value: "18,492",
    change: "+8.1%",
    icon: Users,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    title: "Revenue",
    value: "£45,231",
    change: "+15.3%",
    icon: DollarSign,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
]

const recentOrders = [
  {
    id: "#ORD-001",
    customer: "John Smith",
    restaurant: "Udupi Kitchen",
    amount: "£31.00",
    status: "delivered",
    time: "2 mins ago",
  },
  {
    id: "#ORD-002",
    customer: "Sarah Johnson",
    restaurant: "African Delights",
    amount: "£24.50",
    status: "preparing",
    time: "5 mins ago",
  },
  {
    id: "#ORD-003",
    customer: "Mike Brown",
    restaurant: "Spice Garden",
    amount: "£18.75",
    status: "pending",
    time: "8 mins ago",
  },
  {
    id: "#ORD-004",
    customer: "Emma Wilson",
    restaurant: "Curry House",
    amount: "£42.20",
    status: "delivered",
    time: "12 mins ago",
  },
  {
    id: "#ORD-005",
    customer: "David Lee",
    restaurant: "Jollof Palace",
    amount: "£28.90",
    status: "preparing",
    time: "15 mins ago",
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "delivered":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Delivered
        </Badge>
      )
    case "preparing":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          <Clock className="w-3 h-3 mr-1" />
          Preparing
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-orange-400 to-amber-400 rounded-lg p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Welcome back, Admin!</h2>
        <p className="text-orange-100">Here's what's happening with ChopNow today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-orange-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-amber-700">{stat.title}</CardTitle>
              <div className={`p-2 rounded-full ${stat.bgColor}`}>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
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

      {/* Recent Orders */}
      <Card className="border-orange-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-orange-800">Recent Orders</CardTitle>
              <CardDescription className="text-amber-600">Latest orders from your platform</CardDescription>
            </div>
            <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent">
              View All Orders
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border border-orange-100"
              >
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-medium text-orange-800">{order.id}</p>
                    <p className="text-sm text-amber-600">{order.customer}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-orange-700">{order.restaurant}</p>
                    <p className="text-xs text-amber-600">{order.time}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-bold text-orange-800">{order.amount}</span>
                  {getStatusBadge(order.status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
