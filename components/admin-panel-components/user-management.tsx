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
  XCircle,
  AlertTriangle,
  MoreHorizontal,
  UserPlus,
  Mail,
  Phone,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { UserDetailsModal } from "./user-details-modal"

const users = [
  {
    id: "USR-001",
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+44 7123 456789",
    address: "123 Main St, London E1 6AN",
    status: "active",
    joinDate: "2023-01-15",
    lastOrder: "2024-01-14",
    totalOrders: 47,
    totalSpent: 1247.5,
    averageOrder: 26.54,
    favoriteRestaurant: "Udupi Kitchen",
    avatar: "/user-avatar-1.png",
  },
  {
    id: "USR-002",
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "+44 7987 654321",
    address: "456 Oak Ave, London SW1A 1AA",
    status: "active",
    joinDate: "2023-03-22",
    lastOrder: "2024-01-13",
    totalOrders: 32,
    totalSpent: 892.3,
    averageOrder: 27.88,
    favoriteRestaurant: "African Delights",
    avatar: "/user-avatar-2.png",
  },
  {
    id: "USR-003",
    name: "Mike Brown",
    email: "mike.brown@example.com",
    phone: "+44 7456 123789",
    address: "789 Pine Rd, London W1K 6PU",
    status: "inactive",
    joinDate: "2023-06-10",
    lastOrder: "2023-12-20",
    totalOrders: 18,
    totalSpent: 456.75,
    averageOrder: 25.37,
    favoriteRestaurant: "Spice Garden",
    avatar: "/user-avatar-3.png",
  },
  {
    id: "USR-004",
    name: "Emma Wilson",
    email: "emma.wilson@example.com",
    phone: "+44 7789 456123",
    address: "321 Elm St, London EC1A 1BB",
    status: "active",
    joinDate: "2022-11-08",
    lastOrder: "2024-01-15",
    totalOrders: 89,
    totalSpent: 2340.8,
    averageOrder: 26.3,
    favoriteRestaurant: "Curry House",
    avatar: "/user-avatar-4.png",
  },
  {
    id: "USR-005",
    name: "David Lee",
    email: "david.lee@example.com",
    phone: "+44 7321 987654",
    address: "654 Maple Dr, London N1 9GU",
    status: "banned",
    joinDate: "2023-08-15",
    lastOrder: "2023-11-30",
    totalOrders: 12,
    totalSpent: 234.6,
    averageOrder: 19.55,
    favoriteRestaurant: "Jollof Palace",
    avatar: "/user-avatar-5.png",
  },
  {
    id: "USR-006",
    name: "Lisa Chen",
    email: "lisa.chen@example.com",
    phone: "+44 7654 321987",
    address: "987 Cedar Ave, London SE1 9RT",
    status: "active",
    joinDate: "2023-05-20",
    lastOrder: "2024-01-12",
    totalOrders: 56,
    totalSpent: 1456.9,
    averageOrder: 26.02,
    favoriteRestaurant: "Udupi Kitchen",
    avatar: "/user-avatar-6.png",
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
    case "inactive":
      return (
        <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
          <XCircle className="w-3 h-3 mr-1" />
          Inactive
        </Badge>
      )
    case "banned":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          <AlertTriangle className="w-3 h-3 mr-1" />
          Banned
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function UserManagement() {
  const [selectedUser, setSelectedUser] = useState<(typeof users)[0] | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [activeTab, setActiveTab] = useState("all")

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    const matchesTab = activeTab === "all" || user.status === activeTab

    return matchesSearch && matchesStatus && matchesTab
  })

  const userStats = {
    total: users.length,
    active: users.filter((u) => u.status === "active").length,
    inactive: users.filter((u) => u.status === "inactive").length,
    banned: users.filter((u) => u.status === "banned").length,
    totalRevenue: users.reduce((sum, u) => sum + u.totalSpent, 0),
    avgOrderValue: users.reduce((sum, u) => sum + u.averageOrder, 0) / users.length,
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex max-sm:flex-col max-sm:gap-4 max-sm:items-start items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-orange-800">User Management</h1>
          <p className="text-amber-600">Manage customer accounts and user activity</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Users
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <UserPlus className="w-4 h-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        <Card className="border-orange-200 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-800">{userStats.total}</div>
            <div className="text-sm text-amber-600">Total Users</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-green-700">{userStats.active}</div>
            <div className="text-sm text-amber-600">Active</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-amber-700">{userStats.inactive}</div>
            <div className="text-sm text-amber-600">Inactive</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-red-700">{userStats.banned}</div>
            <div className="text-sm text-amber-600">Banned</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-800">£{userStats.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-amber-600">Total Revenue</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white">
          <CardContent className="p-4">
            <div className="text-2xl font-bold text-orange-800">£{userStats.avgOrderValue.toFixed(2)}</div>
            <div className="text-sm text-amber-600">Avg Order Value</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="border-orange-200">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex max-sm:flex-col max-sm:gap-3 items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-4 w-4" />
                <Input
                  placeholder="Search users by name, email, phone, or ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-80 max-sm:w-full border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40 border-orange-200">
                  <Filter className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="lg:grid hidden w-full grid-cols-4 bg-amber-50">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
              >
                All Users
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="inactive"
                className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
              >
                Inactive
              </TabsTrigger>
              <TabsTrigger
                value="banned"
                className="data-[state=active]:bg-orange-100 data-[state=active]:text-orange-800"
              >
                Banned
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-orange-200">
                    <TableHead className="text-orange-800">User</TableHead>
                    <TableHead className="text-orange-800">Contact</TableHead>
                    <TableHead className="text-orange-800">Orders</TableHead>
                    <TableHead className="text-orange-800">Total Spent</TableHead>
                    <TableHead className="text-orange-800">Avg Order</TableHead>
                    <TableHead className="text-orange-800">Last Order</TableHead>
                    <TableHead className="text-orange-800">Status</TableHead>
                    <TableHead className="text-orange-800">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} className="border-orange-100 hover:bg-amber-50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                            <AvatarFallback className="bg-orange-100 text-orange-800">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-orange-800">{user.name}</div>
                            <div className="text-sm text-amber-600">{user.id}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-amber-700">
                            <Mail className="w-3 h-3 mr-1" />
                            {user.email}
                          </div>
                          <div className="flex items-center text-sm text-amber-700">
                            <Phone className="w-3 h-3 mr-1" />
                            {user.phone}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium text-orange-800">{user.totalOrders}</TableCell>
                      <TableCell className="font-bold text-orange-800">£{user.totalSpent.toFixed(2)}</TableCell>
                      <TableCell className="text-orange-700">£{user.averageOrder.toFixed(2)}</TableCell>
                      <TableCell className="text-amber-600">{user.lastOrder}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedUser(user)}
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
                              <DropdownMenuItem>Send Message</DropdownMenuItem>
                              <DropdownMenuItem>View Order History</DropdownMenuItem>
                              <DropdownMenuItem>Update Status</DropdownMenuItem>
                              <DropdownMenuItem>Reset Password</DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">Ban User</DropdownMenuItem>
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

      {/* User Details Modal */}
      {selectedUser && (
        <UserDetailsModal user={selectedUser} isOpen={!!selectedUser} onClose={() => setSelectedUser(null)} />
      )}
    </div>
  )
}
