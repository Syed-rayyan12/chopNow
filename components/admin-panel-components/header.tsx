"use client"

import { Bell, Search, User, MenuIcon, Settings, LogOut, PlusCircle, BarChart3, LayoutDashboard, ShoppingBag, Store, Truck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,

} from "@/components/ui/sheet"
import { useState } from "react"
import { Separator } from "../ui/separator"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import Link from "next/link"

const MenuNav = [
  { href: "/admin-dashboard", name: "Dashboard", icon: LayoutDashboard },
  { href: "/admin-dashboard/orders", name: "Orders", icon: ShoppingBag },
  { href: "/admin-dashboard/restaurants", name: "Restaurants", icon: Store },
  { href: "/admin-dashboard/users", name: "Users", icon: Users },
  { href: "/admin-dashboard/analytics", name: "Analytics", icon: BarChart3 },
  { href: "/admin-dashboard/delivery-tracking", name: "Delivery Tracking", icon: Truck },
]

export function Header({ collapsed, setCollapsed }: any) {
  const pathname = usePathname()

  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-white border-b border-orange-200 px-6 py-4 h-16">
      <div className="flex items-center justify-between">
        {/* Left side with toggle & title */}
        <div className="flex items-center space-x-4">
          <div className="flex gap-2">
            {/* Mobile: open Sheet */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-orange-600 hover:text-orange-800 cursor-pointer hover:bg-orange-100"
                  >
                    <MenuIcon className="h-4 w-4" />
                  </Button>
                </SheetTrigger>

                {/* Overlay */}


                {/* Sidebar content */}
                <SheetContent
                  side="left"
                  className="w-72 max-w-[85vw] bg-white p-4 border-r z-50"
                >
                  <h2 className="text-lg font-semibold text-orange-800 mb-4">
                    Menu
                  </h2>
                  <div className="space-y-2">
                    {MenuNav.map((item, idx) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href

                      return (
                        <Link key={item.href} href={item.href}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start",
                              isActive && "bg-orange-100 text-orange-700"
                            )}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Button>
                          {idx < MenuNav.length - 1 && <Separator />}
                        </Link>
                      )
                    })}
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Desktop: toggle collapsed state */}
            <div className="hidden lg:block">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCollapsed(!collapsed)}
                className="text-orange-600 hover:text-orange-800 cursor-pointer hover:bg-orange-100"
              >
                <MenuIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-orange-800">Dashboard</h1>
        </div>

        {/* Right side with search, notifications & profile */}
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-amber-500 h-4 w-4" />
            <Input
              placeholder="Search orders, restaurants, users..."
              className="pl-10 w-full border-orange-200 focus:border-orange-400 focus:ring-orange-400"
            />
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="text-amber-700 hover:text-orange-800 hover:bg-orange-100"
          >
            <Bell className="h-5 w-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/admin-profile.png" alt="Admin" />
                  <AvatarFallback className="bg-orange-100 text-orange-800">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@chopnow.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
