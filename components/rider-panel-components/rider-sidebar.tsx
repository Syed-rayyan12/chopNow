"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard, ShoppingBag, Store, Users, ChefHat, BarChart3, Truck, Settings, LogOut,
  MenuIcon
} from "lucide-react"

import {
  Sheet, SheetContent, SheetHeader, SheetTitle
} from "@/components/ui/sheet"

const navigation = [
  { href: "/rider-dashboard", name: "Dashboard", icon: LayoutDashboard },
  { href: "/rider-dashboard/orders", name: "Orders", icon: ShoppingBag },
  { href: "/rider-dashboard/earnings", name: "Earnings", icon: Store },


]

export function RiderSidebar({ collapsed, setCollapsed }: { collapsed: boolean, setCollapsed: (v: boolean) => void }) {
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
                ? "bg-white text-secondary border border-secondary/65"
                : "text-secondary "
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span className="ml-3">{item.name}</span>}
          </Link>
        )
      })}
    </nav>
  )

  // const BottomActions = () => (
  //   <div className="border-t border-orange-200 p-4 space-y-1">
  //     <Button
  //       variant="ghost"
  //       className="w-full justify-start text-amber-700 hover:bg-orange-50 hover:text-orange-800"
  //     >
  //       <LogOut className="h-5 w-5 flex-shrink-0" />
  //       {!collapsed && <span className="ml-3">Log Out</span>}
  //     </Button>
  //   </div>
  // )

  return (
    <>
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden lg:flex lg:flex-col min-h-screen top-0 left-0 z-50 h-full bg-background border-r border-secondary/70 transition-all duration-300",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-center px-4 border-b border-secondary/70">
            <div className="flex items-center space-x-2">

              {!collapsed && (
                <>
                  <div className="flex flex-col ">
                    <Link href="/rider-dashboard">
                      <img
                        src="/chopNow.png"
                        alt="ChopNow Logo"
                        className="mx-auto w-36 h-full px-2 object-cover"
                      />
                    </Link>

                  </div>
                </>
              )}

              {collapsed && (
                <>
                  <div className="flex flex-col ">
                    <ChefHat className="text-secondary" />
                  </div>
                </>
              )}
            </div>

            {/* <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="text-orange-600 hover:text-orange-800 hover:bg-orange-100"
            >
              <MenuIcon className="h-4 w-4" />
            </Button> */}
          </div>
          <NavItems />
          {/* <BottomActions /> */}
        </div>
      </div>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetContent side="left" className="p-0 w-64">
          <SheetHeader className="border-b border-secondary/70 p-4">
            <SheetTitle className="flex items-center space-x-2">
              <ChefHat className="h-6 w-6 text-secondary" />
              <span className="text-lg font-bold text-secondary">ChopNow Rider</span>
            </SheetTitle>
          </SheetHeader>
          <div className="flex flex-col h-full">
            <NavItems />
            {/* <BottomActions /> */}
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}
