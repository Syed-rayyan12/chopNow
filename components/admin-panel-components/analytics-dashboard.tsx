"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Star, Download, Filter } from "lucide-react"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts"
import { CalendarDateRangePicker } from "./date-range-picker"
import { RecentSales } from "./recent-sales"

const revenueData = [
  { name: "Jan", revenue: 45000, orders: 1200, users: 850 },
  { name: "Feb", revenue: 52000, orders: 1400, users: 920 },
  { name: "Mar", revenue: 48000, orders: 1300, users: 890 },
  { name: "Apr", revenue: 61000, orders: 1650, users: 1100 },
  { name: "May", revenue: 55000, orders: 1500, users: 1050 },
  { name: "Jun", revenue: 67000, orders: 1800, users: 1200 },
  { name: "Jul", revenue: 72000, orders: 1950, users: 1350 },
  { name: "Aug", revenue: 69000, orders: 1850, users: 1300 },
  { name: "Sep", revenue: 78000, orders: 2100, users: 1450 },
  { name: "Oct", revenue: 82000, orders: 2200, users: 1500 },
  { name: "Nov", revenue: 89000, orders: 2400, users: 1650 },
  { name: "Dec", revenue: 95000, orders: 2550, users: 1750 },
]

const categoryData = [
  { name: "African Cuisine", value: 45, color: "#FF7A00" },
  { name: "Indian Cuisine", value: 25, color: "#0F3D2E" },
  { name: "Fast Food", value: 15, color: "#222222" },
  { name: "Desserts", value: 10, color: "#92400e" },
  { name: "Beverages", value: 5, color: "#78350f" },
]

const restaurantPerformance = [
  { name: "Udupi Kitchen", orders: 450, revenue: 12500, rating: 4.8 },
  { name: "African Delights", orders: 380, revenue: 11200, rating: 4.7 },
  { name: "Spice Garden", orders: 320, revenue: 9800, rating: 4.6 },
  { name: "Curry House", orders: 290, revenue: 8900, rating: 4.5 },
  { name: "Jollof Palace", orders: 250, revenue: 7800, rating: 4.4 },
]

const hourlyOrders = [
  { hour: "6AM", orders: 12 },
  { hour: "7AM", orders: 25 },
  { hour: "8AM", orders: 45 },
  { hour: "9AM", orders: 35 },
  { hour: "10AM", orders: 28 },
  { hour: "11AM", orders: 42 },
  { hour: "12PM", orders: 85 },
  { hour: "1PM", orders: 95 },
  { hour: "2PM", orders: 78 },
  { hour: "3PM", orders: 52 },
  { hour: "4PM", orders: 38 },
  { hour: "5PM", orders: 48 },
  { hour: "6PM", orders: 72 },
  { hour: "7PM", orders: 88 },
  { hour: "8PM", orders: 92 },
  { hour: "9PM", orders: 75 },
  { hour: "10PM", orders: 45 },
  { hour: "11PM", orders: 25 },
]

export function AnalyticsDashboard() {
  const [dateRange, setDateRange] = useState("30d")

  return (
    <div className="space-y-4">
      {/* Header Controls */}
      <div className="flex items-center max-sm:flex-col max-sm:items-start max-sm:gap-3 justify-between">
        <div className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 items-center">
          <CalendarDateRangePicker />
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px] max-sm:w-full border-secondary/50">
              <SelectValue className="" placeholder="Select period" />
            </SelectTrigger>
            <SelectContent className="border-secondary/50">
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex  items-center space-x-2">
          <Button className="border border-secondary/50" variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4 " />
            Filter
          </Button>
          <Button className="border border-secondary/50" variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4 " />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-secondary/80  bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">£89,420</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +12.5% from last month
            </div>
          </CardContent>
        </Card>
        <Card className="border border-secondary/80  bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">2,547</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +8.2% from last month
            </div>
          </CardContent>
        </Card>
        <Card className="border border-secondary/80 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Active Users</CardTitle>
            <Users className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">1,750</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingUp className="mr-1 h-3 w-3" />
              +15.3% from last month
            </div>
          </CardContent>
        </Card>
        <Card className="border border-secondary/80 bg-white">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-secondary">Avg. Order Value</CardTitle>
            <DollarSign className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">£35.12</div>
            <div className="flex items-center text-xs text-green-600">
              <TrendingDown className="mr-1 h-3 w-3" />
              -2.1% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full max-sm:h-full max-sm:flex max-sm:flex-col grid-cols-5 bg-secondary rounded-xl">
          <TabsTrigger value="overview" className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg">Overview</TabsTrigger>
          <TabsTrigger value="revenue" className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg">Revenue</TabsTrigger>
          <TabsTrigger value="orders" className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg">Orders</TabsTrigger>
          <TabsTrigger value="restaurants" className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg">Restaurants</TabsTrigger>
          <TabsTrigger value="users" className="w-full data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg">Users</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="flex justify-between gap-4 max-sm:flex-col">
            <Card className="w-full bg-white border border-secondary/80">
              <CardHeader>
                <CardTitle className="text-secondary">Revenue Overview</CardTitle>
                <CardDescription className="text-foreground">Monthly revenue and order trends</CardDescription>
              </CardHeader>
              <CardContent className="pl-2 max-sm:pl-0 overflow-hidden">
                <ChartContainer
                  config={{
                    revenue: {
                      label: "Revenue",
                      color: "#FF7A00",
                    },
                    orders: {
                      label: "Orders",
                      color: "#d97706",
                    },
                  }}
                  className="h-[300px] w-[100%]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stackId="1"
                        stroke="#FF7A00"
                        fill="#FF7A00"
                       
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="w-full bg-white border border-secondary/80">
              <CardHeader className="text-center">
                <CardTitle className="text-secondary">Order Categories</CardTitle>
                <CardDescription className="text-foreground">Distribution by cuisine type</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col items-center justify-center">
                <ChartContainer
                  config={{
                    value: {
                      label: "Percentage",
                    },
                  }}
                  className="h-[300px] w-full flex flex-col items-center justify-center"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="40%" // move pie slightly up to give space for legend
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip
                        contentStyle={{ textAlign: "center" }}
                        content={<ChartTooltipContent />}
                      />
                      <Legend
                        layout="horizontal"
                        align="center"
                        verticalAlign="bottom"
                        wrapperStyle={{ marginTop: 20 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 justify-between max-sm:flex-col">
            <Card className=" w-full bg-white border border-secondary/80">
              <CardHeader>
                <CardTitle className="text-secondary">Hourly Order Pattern</CardTitle>
                <CardDescription className="text-foreground">Orders throughout the day</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    orders: {
                      label: "Orders",
                      color: "#FF7A00",
                    },
                  }}
                  className="h-[200px] w-[100%]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyOrders}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="orders" fill="#FF7A00" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card className="w-full border-secondary/80 bg-white">
              <CardHeader>
                <CardTitle className="text-secondary">Recent Activity</CardTitle>
                <CardDescription className="text-foreground">Latest orders and transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <Card className="border-secondary/80 bg-white">
            <CardHeader>
              <CardTitle className="text-secondary">Revenue Analytics</CardTitle>
              <CardDescription className="text-foreground">Detailed revenue breakdown and trends</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  revenue: {
                    label: "Revenue",
                    color: "#f59e0b",
                  },
                }}
                className="h-[400px] w-[100%]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#FF7A00"
                      strokeWidth={3}
                      dot={{ fill: "#f59e0b", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card className="border-secondary/80 bg-white">
            <CardHeader>
              <CardTitle className="text-secondary">Order Analytics</CardTitle>
              <CardDescription className="text-foreground">Order volume and patterns</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  orders: {
                    label: "Orders",
                    color: "#FF7A00",
                  },
                }}
                className="h-[400px] w-[100%]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="orders" fill="#FF7A00" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="restaurants" className="space-y-4">
          <Card className="border-secondary/80 bg-white">
            <CardHeader>
              <CardTitle className="text-secondary">Restaurant Performance</CardTitle>
              <CardDescription className="text-foreground">Top performing restaurants</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {restaurantPerformance.map((restaurant, index) => (
                  <div
                    key={restaurant.name}
                    className="flex items-center justify-between p-4 border border-secondary/50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-semibold text-foreground">#{index + 1}</span>
                      </div>
                      <div>
                        <p className="font-medium text-secondary">{restaurant.name}</p>
                        <div className="flex items-center space-x-2 text-sm text-secondary">
                          <Star className="h-4 w-4 fill-current" />
                          <span>{restaurant.rating}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-secondary">£{restaurant.revenue.toLocaleString()}</p>
                      <p className="text-sm text-secondary/90">{restaurant.orders} orders</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card className="border-secondary/80 bg-white">
            <CardHeader>
              <CardTitle className="text-secondary">User Growth</CardTitle>
              <CardDescription className="text-foreground">User acquisition and retention</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  users: {
                    label: "Users",
                    color: "#b45309",
                  },
                }}
                className="h-[400px] w-[100%]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Area type="monotone" dataKey="users" stroke="#FF7A00" fill="#FF7A00" fillOpacity={0.6} />
                  </AreaChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
