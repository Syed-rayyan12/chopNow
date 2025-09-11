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
  Plus,
  Eye,
  Star,
  MapPin,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { RestaurantDetailsModal } from "./restaurant-details-modal"
import { AddRestaurantModal } from "./add-restaurant-modal"

const restaurants = [
  {
    id: "REST-001",
    name: "Udupi Kitchen",
    cuisine: "Indian",
    address: "123 Brick Lane, London E1 6SB",
    phone: "+44 20 7247 8888",
    email: "info@udupikitchen.com",
    status: "active",
    rating: 4.5,
    totalOrders: 1247,
    revenue: 18750.0,
    joinDate: "2023-01-15",
    deliveryTime: "25-35 min",
    commission: 15,
    image: "/indian-restaurant-exterior.png",
    description: "Authentic South Indian cuisine with traditional flavors",
    openingHours: "11:00 AM - 10:00 PM",
    minimumOrder: 15.0,
  },
  {
    id: "REST-002",
    name: "African Delights",
    cuisine: "African",
    address: "456 Peckham High St, London SE15 5DP",
    phone: "+44 20 7639 2222",
    email: "hello@africandelights.co.uk",
    status: "active",
    rating: 4.7,
    totalOrders: 892,
    revenue: 14230.0,
    joinDate: "2023-03-22",
    deliveryTime: "30-40 min",
    commission: 12,
    image: "/african-restaurant.png",
    description: "Traditional African dishes with authentic spices and flavors",
    openingHours: "12:00 PM - 11:00 PM",
    minimumOrder: 20.0,
  },
  {
    id: "REST-003",
    name: "Spice Garden",
    cuisine: "Indian",
    address: "789 Southall Broadway, London UB1 1JR",
    phone: "+44 20 8574 3333",
    email: "orders@spicegarden.com",
    status: "pending",
    rating: 4.2,
    totalOrders: 567,
    revenue: 8940.0,
    joinDate: "2024-01-10",
    deliveryTime: "20-30 min",
    commission: 18,
    image: "/spice-garden-restaurant.png",
    description: "Modern Indian cuisine with contemporary presentation",
    openingHours: "5:00 PM - 11:00 PM",
    minimumOrder: 12.0,
  },
  {
    id: "REST-004",
    name: "Curry House",
    cuisine: "Indian",
    address: "321 Tooting High St, London SW17 0SZ",
    phone: "+44 20 8682 4444",
    email: "info@curryhouse.london",
    status: "active",
    rating: 4.3,
    totalOrders: 1089,
    revenue: 16780.0,
    joinDate: "2022-11-08",
    deliveryTime: "25-35 min",
    commission: 14,
    image: "/curry-house-restaurant.png",
    description: "Classic Indian curries and tandoor specialties",
    openingHours: "11:30 AM - 10:30 PM",
    minimumOrder: 18.0,
  },
  {
    id: "REST-005",
    name: "Jollof Palace",
    cuisine: "African",
    address: "654 Camberwell New Rd, London SE5 0RR",
    phone: "+44 20 7703 5555",
    email: "contact@jollofpalace.com",
    status: "inactive",
    rating: 4.1,
    totalOrders: 234,
    revenue: 3450.0,
    joinDate: "2024-01-20",
    deliveryTime: "35-45 min",
    commission: 16,
    image: "/jollof-palace-restaurant.png",
    description: "Specializing in West African rice dishes and grilled meats",
    openingHours: "1:00 PM - 9:00 PM",
    minimumOrder: 25.0,
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <AlertCircle className="w-3 h-3 mr-1" />
          Pending
        </Badge>
      )
    case "inactive":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <XCircle className="w-3 h-3 mr-1" />
          Inactive
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function RestaurantManagement() {
  const [selectedRestaurant, setSelectedRestaurant] = useState<(typeof restaurants)[0] | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [cuisineFilter, setCuisineFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesSearch =
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
      restaurant.address.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || restaurant.status === statusFilter
    const matchesCuisine = cuisineFilter === "all" || restaurant.cuisine === cuisineFilter
    const matchesTab = activeTab === "all" || restaurant.status === activeTab

    return matchesSearch && matchesStatus && matchesCuisine && matchesTab
  })

  const restaurantStats = {
    total: restaurants.length,
    active: restaurants.filter((r) => r.status === "active").length,
    pending: restaurants.filter((r) => r.status === "pending").length,
    inactive: restaurants.filter((r) => r.status === "inactive").length,
    totalRevenue: restaurants.reduce((sum, r) => sum + r.revenue, 0),
    avgRating: restaurants.reduce((sum, r) => sum + r.rating, 0) / restaurants.length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="">
        <div>
          <h1 className="text-3xl font-bold text-secondary">Restaurant Management</h1>
          <p className="text-secondary/70">Manage partner restaurants and their performance</p>
        </div>
        {/* <div className="flex items-center space-x-3">
          <Button onClick={() => setShowAddModal(true)} className="bg-orange-500 hover:bg-orange-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Restaurant
          </Button>
        </div> */}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-secondary/50 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{restaurantStats.total}</div>
            <div className="text-sm text-foreground">Total Restaurants</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/50 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{restaurantStats.active}</div>
            <div className="text-sm text-foreground">Active</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/50 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{restaurantStats.pending}</div>
            <div className="text-sm text-foreground">Pending</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/50 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{restaurantStats.inactive}</div>
            <div className="text-sm text-foreground">Inactive</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/50 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">£{restaurantStats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-foreground">Total Revenue</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/50 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-secondary">{restaurantStats.avgRating.toFixed(1)}</div>
            <div className="text-sm text-foreground">Avg Rating</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-secondary/50 bg-white">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex items-center max-md:flex-col gap-3 max-md:items-center max-md:gap-3">
              <div className="relative max-sm:w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-4 w-4" />
                <Input
                  placeholder="Search restaurants, cuisine, location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 max-sm:w-full border-secondary/50  bg-white"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 max-sm:w-full cursor-pointer bg-white border-secondary/50">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Status" className="" />
                </SelectTrigger>
                <SelectContent className="border border-secondary/50 bg-white">
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={cuisineFilter} onValueChange={setCuisineFilter}>
                <SelectTrigger className="w-40 cursor-pointer max-sm:w-full border-secondary/50 bg-white">
                  <SelectValue placeholder="Cuisine" />
                </SelectTrigger>
                <SelectContent className="border border-secondary/50 bg-white">
                  <SelectItem value="all">All Cuisines</SelectItem>
                  <SelectItem value="Indian">Indian</SelectItem>
                  <SelectItem value="African">African</SelectItem>
                  <SelectItem value="Chinese">Chinese</SelectItem>
                  <SelectItem value="Italian">Italian</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="lg:grid hidden w-full  grid-cols-4 bg-secondary rounded-xl">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg cursor-pointer"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg cursor-pointer"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="pending"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg cursor-pointer"
              >
                Pending
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg cursor-pointer"
              >
                Inactive
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-orange-200">
                    <TableHead className="text-secondary">Restaurant</TableHead>
                    <TableHead className="text-secondary">Cuisine</TableHead>
                    <TableHead className="text-secondary">Location</TableHead>
                    <TableHead className="text-secondary">Rating</TableHead>
                    <TableHead className="text-secondary">Orders</TableHead>
                    <TableHead className="text-secondary">Revenue</TableHead>
                    <TableHead className="text-secondary">Status</TableHead>
                    <TableHead className="text-secondary">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRestaurants.map((restaurant) => (
                    <TableRow key={restaurant.id} className="border-orange-100 hover:bg-amber-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={restaurant.image || "/placeholder.svg"}
                            alt={restaurant.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <div className="font-bold text-secondary ">{restaurant.name}</div>
                            <div className="text-sm text-secondary">{restaurant.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="border-secondary/50">
                          {restaurant.cuisine}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center text-amber-600">
                          <MapPin className="w-4 h-4 mr-1 text-secondary" />
                          <span className="text-sm text-secondary">{restaurant.address.split(",")[0]}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-secondary mr-1" />
                          <span className="font-medium text-secondary">{restaurant.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-secondary">{restaurant.totalOrders}</TableCell>
                      <TableCell className="font-bold text-secondary">
                        £{restaurant.revenue.toLocaleString()}
                      </TableCell>
                      <TableCell>{getStatusBadge(restaurant.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedRestaurant(restaurant)}
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
                              <DropdownMenuItem>Edit Details</DropdownMenuItem>
                              <DropdownMenuItem>View Menu</DropdownMenuItem>
                              <DropdownMenuItem>Contact Restaurant</DropdownMenuItem>
                              <DropdownMenuItem>Update Commission</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
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

      {/* Modals */}
      {selectedRestaurant && (
        <RestaurantDetailsModal
          restaurant={selectedRestaurant}
          isOpen={!!selectedRestaurant}
          onClose={() => setSelectedRestaurant(null)}
        />
      )}

      {showAddModal && <AddRestaurantModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} />}
    </div>
  )
}
