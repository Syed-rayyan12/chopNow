"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, Search, User } from "lucide-react"

interface RiderHeaderProps {
  onMenuClick: () => void
}

export function RiderHeader({ onMenuClick }: RiderHeaderProps) {
  return (
    <header className="bg-white border-b border-orange-200 px-4 lg:px-6 py-4">
      {" "}
      {/* Added border-orange-200 */}
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
            <Menu className="h-5 w-5" />
          </Button>

          {/* Page Title */}
          <div>
            <h1 className="text-2xl font-bold text-orange-800">Dashboard</h1>
            {/* <p className="text-sm text-gray-500 hidden sm:block">Manage your deliveries and earnings</p> */}
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="hidden md:flex items-center space-x-2 bg-transparent border border-orange-200 rounded-lg px-3 py-2">
            {" "}
            {/* Made search background transparent and added border-orange-200 */}
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              placeholder="Search orders, customers..."
              className="bg-transparent border-none outline-none text-sm w-64"
            />
          </div>

          {/* Status Badge */}
          {/* <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Online</Badge> */}

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <div className="p-2 text-amber-700 hover:text-orange-800 hover:bg-orange-100">
              {" "}
              {/* Added bg-orange-100 to icon background */}
              <Bell className="h-5 w-5" />
            </div>
            <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* Profile */}
          <Button variant="ghost" size="icon">
            <div className="p-2 text-amber-700 hover:text-orange-800 hover:bg-orange-100">
              {" "}
              {/* Added bg-orange-100 to icon background */}
              <User className="h-5 w-5" />
            </div>
          </Button>
        </div>
      </div>
    </header>
  )
}
