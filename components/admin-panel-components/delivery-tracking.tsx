"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  MapPin,
  Truck,
  Clock,
  Phone,
  Star,
  Navigation,
  Package,
  CheckCircle,
  AlertCircle,
  Search,
  Filter,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const activeDeliveries = [
  {
    id: "DEL-001",
    orderId: "ORD-2024-001",
    customer: "John Doe",
    address: "123 High Street, London SW1A 1AA",
    driver: {
      name: "Ahmed Hassan",
      phone: "+44 7700 900123",
      avatar: "/driver-avatar-1.png",
      rating: 4.8,
      vehicle: "Motorcycle",
    },
    restaurant: "Udupi Kitchen",
    items: ["Jollof Rice", "Egusi Soup"],
    status: "picked_up",
    estimatedTime: "15 mins",
    distance: "2.3 km",
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    id: "DEL-002",
    orderId: "ORD-2024-002",
    customer: "Sarah Miller",
    address: "456 Baker Street, London NW1 6XE",
    driver: {
      name: "Marcus Johnson",
      phone: "+44 7700 900124",
      avatar: "/driver-avatar-2.png",
      rating: 4.9,
      vehicle: "Bicycle",
    },
    restaurant: "African Delights",
    items: ["Pepper Soup", "Plantain"],
    status: "en_route",
    estimatedTime: "8 mins",
    distance: "1.1 km",
    coordinates: { lat: 51.5155, lng: -0.1426 },
  },
  {
    id: "DEL-003",
    orderId: "ORD-2024-003",
    customer: "Michael Chen",
    address: "789 Oxford Street, London W1C 1JN",
    driver: {
      name: "Fatima Al-Rashid",
      phone: "+44 7700 900125",
      avatar: "/driver-avatar-3.png",
      rating: 4.7,
      vehicle: "Car",
    },
    restaurant: "Spice Garden",
    items: ["Curry Combo", "Naan Bread"],
    status: "preparing",
    estimatedTime: "25 mins",
    distance: "3.7 km",
    coordinates: { lat: 51.5152, lng: -0.1419 },
  },
]

const drivers = [
  {
    id: "DRV-001",
    name: "Ahmed Hassan",
    phone: "+44 7700 900123",
    avatar: "/driver-avatar-1.png",
    rating: 4.8,
    vehicle: "Motorcycle",
    status: "active",
    currentDeliveries: 1,
    todayDeliveries: 12,
    earnings: 145.5,
    location: "Central London",
  },
  {
    id: "DRV-002",
    name: "Marcus Johnson",
    phone: "+44 7700 900124",
    avatar: "/driver-avatar-2.png",
    rating: 4.9,
    vehicle: "Bicycle",
    status: "active",
    currentDeliveries: 1,
    todayDeliveries: 8,
    earnings: 98.25,
    location: "North London",
  },
  {
    id: "DRV-003",
    name: "Fatima Al-Rashid",
    phone: "+44 7700 900125",
    avatar: "/driver-avatar-3.png",
    rating: 4.7,
    vehicle: "Car",
    status: "active",
    currentDeliveries: 1,
    todayDeliveries: 15,
    earnings: 187.75,
    location: "West London",
  },
  {
    id: "DRV-004",
    name: "James Wilson",
    phone: "+44 7700 900126",
    avatar: "/driver-avatar-4.png",
    rating: 4.6,
    vehicle: "Motorcycle",
    status: "offline",
    currentDeliveries: 0,
    todayDeliveries: 10,
    earnings: 125.0,
    location: "East London",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "preparing":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "picked_up":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "en_route":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "delivered":
      return "bg-green-100 text-green-800 border-green-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "preparing":
      return <Package className="h-4 w-4" />
    case "picked_up":
      return <Truck className="h-4 w-4" />
    case "en_route":
      return <Navigation className="h-4 w-4" />
    case "delivered":
      return <CheckCircle className="h-4 w-4" />
    default:
      return <AlertCircle className="h-4 w-4" />
  }
}

const getDriverStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "busy":
      return "bg-orange-100 text-orange-800 border-orange-200"
    case "offline":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export function DeliveryTracking() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredDeliveries = activeDeliveries.filter((delivery) => {
    const matchesSearch =
      delivery.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.orderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      delivery.driver.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || delivery.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-4">
      {/* Header Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-secondary/50 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Active Deliveries</CardTitle>
            <Truck className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">23</div>
            <p className="text-xs text-green-600">+2 from last hour</p>
          </CardContent>
        </Card>
        <Card className="border border-secondary/50 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Available Drivers</CardTitle>
            <MapPin className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">8</div>
            <p className="text-xs text-green-600">3 drivers online</p>
          </CardContent>
        </Card>
        <Card className="border border-secondary/50 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Avg. Delivery Time</CardTitle>
            <Clock className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">18m</div>
            <p className="text-xs text-green-600">-2m from yesterday</p>
          </CardContent>
        </Card>
        <Card className="border border-secondary/50 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">98.5%</div>
            <p className="text-xs text-green-600">+0.3% from yesterday</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="deliveries" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 max-sm:grid-cols-1 h-12 bg-secondary cusor-pointer rounded-xl">
          <TabsTrigger value="deliveries" className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg  cursor-pointer">Active Deliveries</TabsTrigger>
          <TabsTrigger value="drivers" className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg cursor-pointer">Drivers</TabsTrigger>
          <TabsTrigger value="map" className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg cursor-pointer">Live Map</TabsTrigger>
        </TabsList>

        <TabsContent value="deliveries" className="space-y-4">
          {/* Search and Filter */}
          <div className="flex items-center max-sm:flex-col gap-4 max-sm:gap-4">
            <div className="relative flex-1 max-sm:w-full">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-secondary" />
              <Input
                placeholder="Search deliveries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8 w-full border border-secondary/50 bg-white cursor-pointer"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px] max-sm:w-full cursor-pointer bg-white border-secondary/50">
                <SelectValue className="" placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="border-secondary/50 bg-white">
                <SelectItem value="all" className="cursor-pointer">All Status</SelectItem>
                <SelectItem value="preparing" className="cursor-pointer">Preparing</SelectItem>
                <SelectItem value="picked_up" className="cursor-pointer">Picked Up</SelectItem>
                <SelectItem value="en_route" className="cursor-pointer">En Route</SelectItem>
                <SelectItem value="delivered" className="cursor-pointer">Delivered</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm" className="border-secondary/50 max-sm:w-full">
              <Filter className="mr-2 h-4 w-4 " />
              More Filters
            </Button>
          </div>

          {/* Delivery Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDeliveries.map((delivery) => (
              <Card key={delivery.id} className="border-secondary/50 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg text-secondary">{delivery.orderId}</CardTitle>
                    <Badge className={getStatusColor(delivery.status)}>
                      {getStatusIcon(delivery.status)}
                      <span className="ml-1 capitalize">{delivery.status.replace("_", " ")}</span>
                    </Badge>
                  </div>
                  <CardDescription className="text-secondary opacity-80">
                    {delivery.restaurant} → {delivery.customer}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Driver Info */}
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={delivery.driver.avatar || "/placeholder.svg"} alt={delivery.driver.name} />
                      <AvatarFallback>
                        {delivery.driver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-secondary">{delivery.driver.name}</p>
                      <div className="flex items-center space-x-2 text-sm text-secondary opacity-80">
                        <Star className="h-3 w-3 fill-current" />
                        <span>{delivery.driver.rating}</span>
                        <span>•</span>
                        <span>{delivery.driver.vehicle}</span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Delivery Details */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary opacity-90">Items:</span>
                      <span className="text-secondary">{delivery.items.join(", ")}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary opacity-90">Distance:</span>
                      <span className="text-secondary">{delivery.distance}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-secondary opacity-90">ETA:</span>
                      <span className="font-medium text-secondary">{delivery.estimatedTime}</span>
                    </div>
                  </div>

                  {/* Address */}
                  <div className="flex items-start space-x-2 text-sm">
                    <MapPin className="h-4 w-4 text-secondary mt-0.5" />
                    <span className="text-secondary opacity-90">{delivery.address}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <Button variant="outline" size="sm">
                      Track Live
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Contact Customer</DropdownMenuItem>
                        <DropdownMenuItem>Reassign Driver</DropdownMenuItem>
                        <DropdownMenuItem>Mark as Issue</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="drivers" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {drivers.map((driver) => (
              <Card key={driver.id} className="border-secondary/50 bg-white">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={driver.avatar || "/placeholder.svg"} alt={driver.name} />
                        <AvatarFallback>
                          {driver.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-secondary">{driver.name}</CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-secondary opacity-90">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{driver.rating}</span>
                          <span>•</span>
                          <span>{driver.vehicle}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getDriverStatusColor(driver.status)}>{driver.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-secondary opacity-90">Current Orders</p>
                      <p className="font-semibold text-secondary">{driver.currentDeliveries}</p>
                    </div>
                    <div>
                      <p className="text-secondary opacity-90">Today's Orders</p>
                      <p className="font-semibold text-secondary">{driver.todayDeliveries}</p>
                    </div>
                    <div>
                      <p className="text-secondary opacity-90">Today's Earnings</p>
                      <p className="font-semibold text-secondary">£{driver.earnings}</p>
                    </div>
                    <div>
                      <p className="text-secondary opacity-90">Location</p>
                      <p className="font-semibold text-secondary">{driver.location}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <Button variant="outline" size="sm">
                      <Phone className="mr-2 h-4 w-4" />
                      Call
                    </Button>
                    <Button variant="outline" size="sm">
                      <MapPin className="mr-2 h-4 w-4" />
                      Locate
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Assign Order</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuItem>View History</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map" className="space-y-4 bg-white">
          <Card className="bg-white border border-secondary/50">
            <CardHeader>
              <CardTitle className="text-secondary">Live Delivery Map</CardTitle>
              <CardDescription className="text-secondary opacity-90">Real-time tracking of all active deliveries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[600px] bg-amber-50 rounded-lg border-2 border-dashed border-amber-200 flex items-center justify-center">
                <div className="text-center space-y-2">
                  <MapPin className="h-12 w-12 text-secondary mx-auto" />
                  <p className="text-secondary opacity-90 font-medium">Interactive Map View</p>
                  <p className="text-sm text-secondary opacity-90">
                    Real-time delivery tracking with driver locations,
                    <br />
                    route optimization, and delivery status updates
                  </p>
                  <div className="flex items-center justify-center space-x-4 pt-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-secondary opacity-90">Active Drivers</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                      <span className="text-sm text-secondary opacity-90">En Route</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="text-sm text-secondary opacity-90">Pickup Points</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
