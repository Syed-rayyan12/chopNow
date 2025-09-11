// "use client"

// import { Bell, Search, User, MenuIcon, Settings, LogOut, PlusCircle, BarChart3, LayoutDashboard, ShoppingBag, Store, Truck, Users } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import {
//   Sheet,
//   SheetContent,
//   SheetTrigger,

// } from "@/components/ui/sheet"
// import { useState } from "react"
// import { Separator } from "../ui/separator"
// import { cn } from "@/lib/utils"
// import { usePathname } from "next/navigation"
// import Link from "next/link"

// interface Notification {
//   id: string
//   message: string
//   time: string
//   status: "read" | "unread"
// }
// type DashboardHeaderProps = {
//   collapsed: boolean
//   setCollapsed: (collapsed: boolean) => void
//   notifications: Notification[]
// }

// const MenuNav = [
//   { href: "/admin-dashboard", name: "Dashboard", icon: LayoutDashboard },
//   { href: "/admin-dashboard/orders", name: "Orders", icon: ShoppingBag },
//   { href: "/admin-dashboard/restaurants", name: "Restaurants", icon: Store },
//   { href: "/admin-dashboard/users", name: "Users", icon: Users },
//   { href: "/admin-dashboard/analytics", name: "Analytics", icon: BarChart3 },
//   { href: "/admin-dashboard/delivery-tracking", name: "Delivery Tracking", icon: Truck },
// ]

// export function Header({ collapsed, setCollapsed, notifications }: DashboardHeaderProps) {
//   const pathname = usePathname()
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const unreadCount = notifications.filter((n) => n.status === "unread").length

//   return (
//     <header className="bg-background border-b border-secondary/65 px-6 py-[13px] h-16">
//       <div className="flex items-center justify-between">
//         {/* Left side with toggle & title */}
//         <div className="flex items-center space-x-4">
//           <div className="flex gap-2">
//             {/* Mobile: open Sheet */}
//             <div className="lg:hidden">
//               <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
//                 <SheetTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="text-orange-600 hover:text-orange-800 cursor-pointer hover:bg-orange-100"
//                   >
//                     <MenuIcon className="h-4 w-4" />
//                   </Button>
//                 </SheetTrigger>

//                 {/* Overlay */}


//                 {/* Sidebar content */}
//                 <SheetContent
//                   side="left"
//                   className="w-72 max-w-[85vw] bg-white p-4 border-r z-50"
//                 >
//                   <h2 className="text-lg font-semibold text-orange-800 mb-4">
//                     Menu
//                   </h2>
//                   <div className="space-y-2">
//                     {MenuNav.map((item, idx) => {
//                       const Icon = item.icon
//                       const isActive = pathname === item.href

//                       return (
//                         <Link key={item.href} href={item.href}>
//                           <Button
//                             variant="ghost"
//                             className={cn(
//                               "w-full justify-start",
//                               isActive && "bg-orange-100 text-orange-700"
//                             )}
//                           >
//                             <Icon className="mr-2 h-4 w-4" />
//                             {item.name}
//                           </Button>
//                           {idx < MenuNav.length - 1 && <Separator />}
//                         </Link>
//                       )
//                     })}
//                   </div>
//                 </SheetContent>
//               </Sheet>
//             </div>

//             {/* Desktop: toggle collapsed state */}
//             <div className="hidden lg:block">
//               <Button
//                 variant="ghost"
//                 size="sm"
//                 onClick={() => setCollapsed(!collapsed)}
//                 className="text-orange-600 hover:text-orange-800 cursor-pointer hover:bg-orange-100"
//               >
//                 <MenuIcon className="h-4 w-4" />
//               </Button>
//             </div>
//           </div>

//           <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
//         </div>

//         {/* Right side with search, notifications & profile */}
//         <div className="flex items-center space-x-4">
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-amber-500 h-4 w-4" />
//             <Input
//               placeholder="Search orders, restaurants, users..."
//               className="pl-10 w-full border-secondary/70"
//             />
//           </div>

        

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" size="sm" className="relative text-secondary/60 hover:text-secondary hover:bg-secondary/10">
//                 <Bell className="h-5 w-5" />
//                 {unreadCount > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                     {unreadCount}
//                   </span>
//                 )}
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent align="end" className="w-80 border border-secondary">
//               {notifications.length === 0 ? (
//                 <DropdownMenuItem className="p-3 text-sm text-gray-500">
//                   No new notifications
//                 </DropdownMenuItem>
//               ) : (
//                 notifications.slice(0, 3).map((notification) => (
//                   <DropdownMenuItem key={notification.id} className="p-3">
//                     <div className="space-y-1">
//                       <p className="text-sm font-medium">{notification.message}</p>
//                       <p className="text-xs text-gray-500">{notification.time}</p>
//                     </div>
//                   </DropdownMenuItem>
//                 ))
//               )}
//             </DropdownMenuContent>
//           </DropdownMenu>

//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="relative h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="/admin-profile.png" alt="Admin" />
//                   <AvatarFallback className="bg-orange-100 text-secondary">
//                     AD
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56 border border-secondary" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">Admin User</p>
//                   <p className="text-xs leading-none text-muted-foreground">
//                     admin@chopnow.com
//                   </p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator className="border border-secondary" />
//               <DropdownMenuItem>
//                 <User className="h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Settings className="h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator className="border border-secondary" />
//               <DropdownMenuItem>
//                 <LogOut className="h-4 w-4" />
//                 <span>Log out</span>
//               </DropdownMenuItem>
//             </DropdownMenuContent>
//           </DropdownMenu>
//         </div>
//       </div>
//     </header>
//   )
// } 


"use client"

import {
  Bell,
  Search,
  User,
  MenuIcon,
  Settings,
  LogOut,
  BarChart3,
  LayoutDashboard,
  ShoppingBag,
  Store,
  Truck,
  Users,
} from "lucide-react"
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

interface Notification {
  id: string
  message: string
  time: string
  status: "read" | "unread"
}
type DashboardHeaderProps = {
  collapsed: boolean
  setCollapsed: (collapsed: boolean) => void
  notifications: Notification[]
}

const MenuNav = [
  { href: "/admin-dashboard", name: "Dashboard", icon: LayoutDashboard },
  { href: "/admin-dashboard/orders", name: "Orders", icon: ShoppingBag },
  { href: "/admin-dashboard/restaurants", name: "Restaurants", icon: Store },
  { href: "/admin-dashboard/users", name: "Users", icon: Users },
  { href: "/admin-dashboard/analytics", name: "Analytics", icon: BarChart3 },
  { href: "/admin-dashboard/delivery-tracking", name: "Delivery Tracking", icon: Truck },
]

export function Header({ collapsed, setCollapsed, notifications }: DashboardHeaderProps) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const unreadCount = notifications.filter((n) => n.status === "unread").length

  return (
    <header className="bg-background border-b border-secondary/50 px-6 py-[13px] h-16">
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

                {/* Sidebar content */}
                <SheetContent
                  side="left"
                  className="w-72 max-w-[85vw] bg-white p-4 border-r z-50"
                >
                   <Link href="/admin-dashboard">
                      <img
                        src="/chopNow.png"
                        alt="ChopNow Logo"
                        className="mx-auto w-36 h-full px-2 object-cover"
                      />
                    </Link>

                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-amber-500 h-4 w-4" />
                    <Input
                      placeholder="Search orders, restaurants, users..."
                      className="pl-10 w-full border-secondary/70"
                    />
                  </div>

                  <div className="space-y-2">
                    {MenuNav.map((item, idx) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href

                      return (
                        <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start",
                              isActive && "bg-orange-100 text-secondary"
                            )}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Button>
                          {idx < MenuNav.length - 1}
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

          <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
        </div>

        {/* Right side with search, notifications & profile */}
        <div className="flex items-center space-x-4">
          {/* Search bar on desktop only */}
          <div className="hidden lg:block relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 transform text-amber-500 h-4 w-4" />
            <Input
              placeholder="Search orders, restaurants, users..."
              className="pl-10 w-64 border-secondary/50"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative text-secondary/60 hover:text-secondary hover:bg-secondary/10">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 border border-secondary">
              {notifications.length === 0 ? (
                <DropdownMenuItem className="p-3 text-sm text-gray-500">
                  No new notifications
                </DropdownMenuItem>
              ) : (
                notifications.slice(0, 3).map((notification) => (
                  <DropdownMenuItem key={notification.id} className="p-3 hover:bg-secondary hover:text-background bg-white">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/admin-profile.png" alt="Admin" />
                  <AvatarFallback className="bg-orange-100 text-secondary">
                    AD
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border border-secondary" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Admin User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    admin@chopnow.com
                  </p>
                </div>
              </DropdownMenuLabel>
              {/* <DropdownMenuSeparator className="border border-secondary" /> */}
              {/* <DropdownMenuItem>
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator className="border border-secondary" />
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

