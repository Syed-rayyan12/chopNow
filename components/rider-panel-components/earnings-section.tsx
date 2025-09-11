"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Calendar, Clock, Target, Award } from "lucide-react"


const statsData = [
  {
    title: "Today's Total",
    value: "£52.50",
    icon: DollarSign,
    gradient: "from-green-500 to-emerald-500",
  },
  {
    title: "This Week",
    value: "£615.25",
    icon: TrendingUp,
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    title: "Weekly Goal",
    value: "82%",
    icon: Target,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    title: "Avg/Hour",
    value: "£12.50",
    icon: Award,
    gradient: "from-orange-500 to-red-500",
  },
];

export function EarningsSection() {
  const todayEarnings = [
    { time: "09:00 - 10:00", orders: 2, earnings: "£12.50" },
    { time: "10:00 - 11:00", orders: 3, earnings: "£18.75" },
    { time: "11:00 - 12:00", orders: 1, earnings: "£6.25" },
    { time: "12:00 - 13:00", orders: 2, earnings: "£15.00" },
  ]

  const weeklyStats = [
    { day: "Monday", orders: 12, earnings: "£68.50" },
    { day: "Tuesday", orders: 15, earnings: "£82.25" },
    { day: "Wednesday", orders: 10, earnings: "£55.75" },
    { day: "Thursday", orders: 18, earnings: "£95.00" },
    { day: "Friday", orders: 22, earnings: "£125.50" },
    { day: "Saturday", orders: 25, earnings: "£142.75" },
    { day: "Sunday", orders: 8, earnings: "£45.50" },
  ]

  return (
    <div className=" space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Earnings</h1>
        <p className="text-secondary/70">Track your income and performance</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4">
        {statsData.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Card
              key={idx}
              className=" text-secondary border border-secondary/70 bg-white"
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Icon className="h-6 w-6" />
                  <div>
                    <p className="text-sm text-foreground">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>


      {/* Detailed Breakdown */}
      <Tabs defaultValue="today" className="space-y-4 rounded-lg">
        <TabsList className="grid w-full grid-cols-2  bg-secondary border-secondary rounded-xl ">
          <TabsTrigger className="data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg cursor-pointer" value="today">Today</TabsTrigger>
          <TabsTrigger className="data-[state=active]:bg-background data-[state=active]:text-foreground text-background rounded-lg cursor-pointer" value="week">This Week</TabsTrigger>
        </TabsList>

        <TabsContent value="today" className="space-y-4 ">
          <Card className="border border-secondary/70 bg-white">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-secondary" />
                <span className="text-secondary">Hourly Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {todayEarnings.map((hour, index) => (
                <div key={index} className="flex items-center justify-between p-3  border border-secondary/70 bg-white rounded-lg">
                  <div>
                    <p className="font-medium text-secondary">{hour.time}</p>
                    <p className="text-sm text-secondary/90">{hour.orders} orders completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-secondary">{hour.earnings}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="week" className="space-y-4 ">
          <Card className="bg-white border-secondary/70">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-secondary" />
                <span className="text-secondary">Daily Breakdown</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {weeklyStats.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-secondary/70 bg-white  rounded-lg">
                  <div>
                    <p className="font-medium text-secondary">{day.day}</p>
                    <p className="text-sm text-secondary/90">{day.orders} orders completed</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-secondary">{day.earnings}</p>
                    <p className="text-xs text-secondary/80">
                      £{(Number.parseFloat(day.earnings.replace("£", "")) / day.orders).toFixed(2)}/order
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
