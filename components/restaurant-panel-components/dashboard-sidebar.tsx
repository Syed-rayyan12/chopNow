"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  ChefHat,
  Home,
  ShoppingCart,
  CreditCard,
  Star,
  HelpCircle,
} from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet"

const navigation = [
  { href: "/restaurant-dashboard", name: "Overview", icon: Home },
  { href: "/restaurant-dashboard/orders", name: "Orders", icon: ShoppingCart },
  { href: "/restaurant-dashboard/menu-management", name: "Menu Management", icon: ChefHat },
  { href: "/restaurant-dashboard/earning-payment", name: "Earnings & Payments", icon: CreditCard },
  { href: "/restaurant-dashboard/review-rating", name: "Reviews & Ratings", icon: Star },
  { href: "/restaurant-dashboard/support", name: "Support", icon: HelpCircle },
]

 export function DashboardSidebar({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (v: boolean) => void }) {
  const pathname = usePathname()

  const NavItems = () => (
    <nav className="flex-1 p-3 overflow-y-auto">
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center px-2 py-2 text-sm font-medium rounded-lg transition-colors",
              isActive
               ? "bg-background text-secondary border border-secondary/65"
                : "text-secondary"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden xl:flex lg:flex-col min-h-screen top-0 left-0 z-50 h-full bg-background border-r border-orange-200 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center px-4 border-b border-orange-200">
            <div className="flex items-center space-x-2">
          
              {!collapsed && (

                
                <div className="flex flex-col">
                   <img
                        src="/chopNow.png"
                        alt="ChopNow Logo"
                        className="mx-auto w-36 h-full px-2 object-cover"
                    />
                </div>
              )}

              
{collapsed && (
                <>
                  <div className="flex flex-col ">
                  <ChefHat className="text-secondary"/>
                  </div>
                </>
              )}
            </div>
          </div>
          <NavItems />
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetContent side="left" className="p-0 w-64">
          <SheetHeader className="border-b border-orange-200 p-4">
            <SheetTitle className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6 text-orange-500" />
              <span className="text-lg font-bold text-orange-800">ChopNow Admin</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <NavItems />
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
