"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  LayoutDashboard,
  ShoppingBag,
  Store,
  Users,
  MenuIcon,
  BarChart3,
  Truck,
  ChefHat,
  Settings,
  LogOut,
} from "lucide-react"

// Navigation items for state-based dashboard
const navigation = [
  { id: "dashboard", name: "Dashboard", icon: LayoutDashboard },
  { id: "orders", name: "Orders", icon: ShoppingBag },
  { id: "restaurants", name: "Restaurants", icon: Store },
  { id: "users", name: "Users", icon: Users },
  { id: "menu", name: "Menu Management", icon: ChefHat },
  { id: "analytics", name: "Analytics", icon: BarChart3 },
  { id: "delivery", name: "Delivery Tracking", icon: Truck },
]

export interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Sidebar({ activeTab, onTabChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div
      className={cn(
        "bg-white border-r border-orange-200 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-orange-200">
          {!collapsed && (
            <div className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-xl font-bold text-orange-800">ChopNow</span>
              <span className="text-sm text-orange-600 font-medium">Admin</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCollapsed(!collapsed)}
            className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
          >
            <MenuIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => {
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={cn(
                  "flex w-full items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "bg-orange-100 text-orange-800 border border-orange-200"
                    : "text-amber-700 hover:bg-orange-50 hover:text-orange-800"
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span className="ml-3">{item.name}</span>}
              </button>
            )
          })}
        </nav>

        {/* Bottom section */}
        <div className="border-t border-orange-200 p-4 space-y-1">
          <button
            onClick={() => onTabChange("settings")}
            className="flex w-full items-center px-3 py-2 text-sm font-medium text-amber-700 hover:bg-orange-50 hover:text-orange-800 rounded-lg transition-colors"
          >
            <Settings className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">Settings</span>}
          </button>
          <Button
            variant="ghost"
            className="w-full justify-start text-amber-700 hover:bg-orange-50 hover:text-orange-800"
          >
            <LogOut className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">Log Out</span>}
          </Button>
        </div>
      </div>
    </div>
  )
}
