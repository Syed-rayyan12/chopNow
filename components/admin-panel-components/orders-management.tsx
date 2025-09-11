"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

import {
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  Clock,
  XCircle,
  Truck,
  ChefHat,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { OrderDetailsModal } from "./order-details-modal"

// ---------- ORDERS DATA ----------
const orders = [
  {
    id: "ORD-001",
    customer: "John Smith",
    customerEmail: "john@example.com",
    restaurant: "Udupi Kitchen",
    items: ["Jollof Rice", "Egusi Soup"],
    amount: 31.0,
    status: "delivered",
    paymentStatus: "paid",
    orderTime: "2024-01-15 14:30",
    deliveryTime: "2024-01-15 15:15",
    address: "123 Main St, London",
    phone: "+44 7123 456789",
  },
  {
    id: "ORD-002",
    customer: "Sarah Johnson",
    customerEmail: "sarah@example.com",
    restaurant: "African Delights",
    items: ["Pepper Soup", "Plantain"],
    amount: 24.5,
    status: "preparing",
    paymentStatus: "paid",
    orderTime: "2024-01-15 14:25",
    deliveryTime: null,
    address: "456 Oak Ave, London",
    phone: "+44 7987 654321",
  },
  {
    id: "ORD-003",
    customer: "Mike Brown",
    customerEmail: "mike@example.com",
    restaurant: "Spice Garden",
    items: ["Curry Rice", "Naan"],
    amount: 18.75,
    status: "pending",
    paymentStatus: "pending",
    orderTime: "2024-01-15 14:22",
    deliveryTime: null,
    address: "789 Pine Rd, London",
    phone: "+44 7456 123789",
  },
  {
    id: "ORD-004",
    customer: "Emma Wilson",
    customerEmail: "emma@example.com",
    restaurant: "Curry House",
    items: ["Biryani", "Samosa", "Lassi"],
    amount: 42.2,
    status: "out-for-delivery",
    paymentStatus: "paid",
    orderTime: "2024-01-15 13:45",
    deliveryTime: null,
    address: "321 Elm St, London",
    phone: "+44 7789 456123",
  },
  {
    id: "ORD-005",
    customer: "David Lee",
    customerEmail: "david@example.com",
    restaurant: "Jollof Palace",
    items: ["Jollof Rice", "Grilled Chicken"],
    amount: 28.9,
    status: "cancelled",
    paymentStatus: "refunded",
    orderTime: "2024-01-15 13:30",
    deliveryTime: null,
    address: "654 Maple Dr, London",
    phone: "+44 7321 987654",
  },
]

// ---------- TABS DATA ----------
const tabs = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "preparing", label: "Preparing" },
  { value: "out-for-delivery", label: "Delivery" },
  { value: "delivered", label: "Delivered" },
  { value: "cancelled", label: "Cancelled" },
]

// ---------- STATUS BADGES ----------
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
          <ChefHat className="w-3 h-3 mr-1" />
          Preparing
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <Clock className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      )
    case "out-for-delivery":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          <Truck className="w-3 h-3 mr-1" />
          Out for Delivery
        </Badge>
      )
    case "cancelled":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="w-3 h-3 mr-1" />
          Cancelled
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case "paid":
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Paid</Badge>
    case "pending":
      return <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Pending</Badge>
    case "refunded":
      return <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">Refunded</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

// ---------- MAIN COMPONENT ----------
export function OrdersManagement() {
  const [selectedOrder, setSelectedOrder] = useState<(typeof orders)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.restaurant.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || order.status === statusFilter
    const matchesTab = activeTab === "all" || order.status === activeTab

    return matchesSearch && matchesStatus && matchesTab
  })

  const orderStats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    preparing: orders.filter((o) => o.status === "preparing").length,
    outForDelivery: orders.filter((o) => o.status === "out-for-delivery").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-3 md:space-y-0">
        <div>
          <h1 className="text-2xl font-bold text-secondary">Orders Management</h1>
          <p className="text-amber-600">Manage and track all customer orders</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-secondary/50 text-secondary cursor-pointer hover:bg-secondary bg-white">
            <Download className="w-4 h-4 mr-2" />
            Export Orders
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-6 gap-4 max-lg:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
        {Object.entries(orderStats).map(([key, value]) => (
          <Card key={key} className="border-secondary/50 bg-white shadow-none">
            <CardContent className="p-4">
              <div className="text-2xl font-bold text-secondary">{value}</div>
              <div className="text-sm text-foreground">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters and Search */}
      <Card className="border-secondary/50 bg-white shadow-none w-full mx-auto">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 max-sm:gap-3">
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-4 w-4" />
                <Input
                  placeholder="Search orders, customers, restaurants..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full sm:w-80 border-secondary/50 focus:border-orange-400 focus:ring-orange-400 cursor-pointer"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-40 border-secondary/50 cursor-pointer flex items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent className="bg-white boder border-secondary/50">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="preparing">Preparing</SelectItem>
                  <SelectItem value="out-for-delivery">Out for Delivery</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="w-full overflow-x-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className=" gap-2 hidden overflow-x-auto lg:grid lg:grid-cols-6 w-full bg-secondary text-white">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="text-background data-[state=active]:rounded-lg data-[state=active]:border-secondary/50 data-[state=active]:border-b-2 cursor-pointer data-[state=active]:text-black min-w-[120px]"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Table className="min-w-[700px] md:min-w-full">
                <TableHeader>
                  <TableRow className="border-secondary/50">
                    <TableHead className="text-secondary">Order ID</TableHead>
                    <TableHead className="text-secondary">Customer</TableHead>
                    <TableHead className="text-secondary">Restaurant</TableHead>
                    <TableHead className="text-secondary">Amount</TableHead>
                    <TableHead className="text-secondary">Status</TableHead>
                    <TableHead className="text-secondary">Payment</TableHead>
                    <TableHead className="text-secondary">Order Time</TableHead>
                    <TableHead className="text-secondary">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredOrders.map((order) => (
                    <TableRow key={order.id} className="border-secondary/50 hover:bg-amber-50">
                      <TableCell className="font-medium text-secondary">{order.id}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-bold text-secondary/80">{order.customer}</div>
                          <div className="text-sm text-secondary/80">{order.customerEmail}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-secondary/80">{order.restaurant}</TableCell>
                      <TableCell className="font-bold text-secondary">£{order.amount.toFixed(2)}</TableCell>
                      <TableCell>{getStatusBadge(order.status)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                      <TableCell className="text-secondary">{order.orderTime}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedOrder(order)}
                            className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
                              >
                                <MoreHorizontal className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                              <DropdownMenuItem>Print Receipt</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Cancel Order</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailsModal order={selectedOrder} isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)} />
      )}
    </div>
  )
}
