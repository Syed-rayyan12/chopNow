"use client"

import { usePathname, useRouter } from "next/navigation"
import type React from "react"
import { ChefHat, Home, ShoppingCart, CreditCard, Star, HelpCircle } from "lucide-react"

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  path: string
}

interface DashboardSidebarProps {
  sidebarCollapsed: boolean
}

export function DashboardSidebar({ sidebarCollapsed }: DashboardSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const sidebarItems: SidebarItem[] = [
    { id: "overview", label: "Overview", icon: Home, path: "/restaurant/overview" },
    { id: "orders", label: "Orders", icon: ShoppingCart, path: "/restaurant/orders" },
    { id: "menu", label: "Menu Management", icon: ChefHat, path: "/restaurant/menu" },
    { id: "earnings", label: "Earnings & Payments", icon: CreditCard, path: "/restaurant/earnings" },
    { id: "reviews", label: "Reviews & Ratings", icon: Star, path: "/restaurant/reviews" },
    { id: "support", label: "Support", icon: HelpCircle, path: "/restaurant/support" },
  ]

  return (
    <div
      className={`bg-sidebar border-r border-sidebar-border transition-all duration-300 ${
        sidebarCollapsed ? "w-16" : "w-64"
      } flex flex-col`}
    >
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center space-x-2">
          <div className="bg-[#dd6636] p-2 rounded-lg">
            <ChefHat className="h-6 w-6 text-white" />
          </div>
          {!sidebarCollapsed && (
            <div>
              <h1 className="font-bold text-lg text-orange-900">Restaurant Panel</h1>
              <p className="text-xs text-amber-700">Dashboard</p>
            </div>
          )}
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {sidebarItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.path

          return (
            <button
              key={item.id}
              onClick={() => router.push(item.path)}
              className={`w-full flex items-center space-x-3 text-amber-700 px-3 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-orange-100 text-amber-700 border border-orange-200"
                  : "hover:bg-orange-50 hover:text-orange-800"
              }`}
            >
              <Icon className="h-5 w-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
