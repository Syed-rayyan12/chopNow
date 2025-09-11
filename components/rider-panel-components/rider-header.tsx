// "use client"

// import { useEffect, useState } from "react"
// import { usePathname, useRouter } from "next/navigation"
// import Link from "next/link"
// import { cn } from "@/lib/utils"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuTrigger,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuItem,
// } from "@/components/ui/dropdown-menu"
// import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

// import {
//   MenuIcon,
//   Bell,
//   Search,
//   User,
//   LogOut,
//   Settings,
//   LayoutDashboard,
//   ShoppingBag,
//   Wallet,
// } from "lucide-react"
// import { toast } from "../ui/use-toast"


// const MenuNavigation = [
//   { href: "/rider-dashboard", name: "Dashboard", icon: LayoutDashboard },
//   { href: "/rider-dashboard/orders", name: "Orders", icon: ShoppingBag },
//   { href: "/rider-dashboard/earnings", name: "Earnings", icon: Wallet },
// ]

// type RiderUser = {
//   id?: number;
//   firstName?: string;
//   lastName?: string;
//   email?: string;
//   role?: string;
// };

// export function RiderHeader({ collapsed, setCollapsed }: any) {
//   const router = useRouter()
//   const pathname = usePathname()
//   const [mobileOpen, setMobileOpen] = useState(false) // ✅ fixed state
//   const [user, setUser] = useState<RiderUser | null>(null);
//   const [mounted, setMounted] = useState(false); // avoid hydration mismatch

//   // Read API user saved after signup/login
//   useEffect(() => {
//     setMounted(true); // Ensure the component is mounted
//     try {
//       const raw = localStorage.getItem("user");
//       if (raw) {
//         const parsedUser = JSON.parse(raw);
//         setUser(parsedUser); // Set the user state
//       } else {
//         console.warn("No user data found in localStorage.");
//       }
//     } catch (error) {
//       console.error("Failed to parse user data from localStorage:", error);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     toast({ title: "You have successfully logged out.", duration: 3000 });
//     router.push("/rider-signIn");
//   };



//   return (
//     <header className="bg-background border-b border-secondary/70 px-4 h-16  py-[13px]">
//       <div className="flex items-center justify-between">
//         {/* Left Side */}
//         <div className="flex items-center space-x-4">
//           {/* Mobile Menu Button */}
//           <div className="flex gap-2">
//             {/* Mobile: open Sheet */}
//             <div className="lg:hidden">
//               <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
//                 <SheetTrigger asChild>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     className="text-secondary hover:text-secondary cursor-pointer hover:bg-secondary/10"
//                   >
//                     <MenuIcon className="h-4 w-4" />
//                   </Button>
//                 </SheetTrigger>

//                 {/* Sidebar content */}
//                 <SheetContent
//                   side="left"
//                   className="w-72 max-w-[85vw] bg-white p-4 border-r z-50"
//                 >
//                   <h2 className="text-lg font-semibold text-secondary mb-4">
//                     Menu
//                   </h2>
//                   <div className="space-y-2">
//                     {MenuNavigation.map((item) => {
//                       const Icon = item.icon
//                       const isActive = pathname === item.href

//                       return (
//                         <Link key={item.href} href={item.href}>
//                           <Button
//                             variant="ghost"
//                             className={cn(
//                               "w-full justify-start",
//                               isActive && "bg-secondary/10 text-secondary"
//                             )}
//                           >
//                             <Icon className="mr-2 h-4 w-4" />
//                             {item.name}
//                           </Button>
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
//                 className="text-secondary hover:text-secondary cursor-pointer hover:bg-secondary/10"
//               >
//                 <MenuIcon className="h-4 w-4" />
//               </Button>
//             </div>

//             <div>
//               <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
//             </div>
//           </div>
//         </div>

//         {/* Right Side */}
//         <div className="flex items-center space-x-3">
//           {/* Search */}
//           <div className="relative">
//             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 h-4 w-4" />
//             <Input
//               placeholder="Search orders..."
//               className="pl-10 w-80 border-secondary/70 focus:border-secondary focus:ring-secondary"
//             />
//           </div>

//           {/* Notifications */}
//           <Button
//             variant="ghost"
//             size="sm"
//             className="text-secondary/60 hover:text-secondary hover:bg-secondary/10"
//           >
//             <Bell className="h-5 w-5" />
//           </Button>

//           {/* Profile Dropdown */}
//           <DropdownMenu>
//             <DropdownMenuTrigger asChild>
//               <Button variant="ghost" className="h-8 w-8 rounded-full">
//                 <Avatar className="h-8 w-8">
//                   <AvatarFallback className="bg-secondary/10 text-secondary bg:hover-none">
//                     {user
//                       ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase()
//                       : "G"}
//                   </AvatarFallback>
//                 </Avatar>
//               </Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent className="w-56" align="end" forceMount>
//               <DropdownMenuLabel className="font-normal">
//                 <div className="flex flex-col space-y-1">
//                   <p className="text-sm font-medium leading-none">Admin User</p>
//                   <p className="text-xs leading-none text-muted-foreground">
//                     {user?.email || "No email available"}
//                   </p>
//                 </div>
//               </DropdownMenuLabel>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem>
//                 <User className="h-4 w-4" />
//                 <span>Profile</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Settings className="h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuSeparator />
//               <DropdownMenuItem onClick={handleLogout}>
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

import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"

import {
  MenuIcon,
  Bell,
  Search,
  User,
  LogOut,
  Settings,
  LayoutDashboard,
  ShoppingBag,
  Wallet,
} from "lucide-react"
import { toast } from "../ui/use-toast"

const MenuNavigation = [
  { href: "/rider-dashboard", name: "Dashboard", icon: LayoutDashboard },
  { href: "/rider-dashboard/orders", name: "Orders", icon: ShoppingBag },
  { href: "/rider-dashboard/earnings", name: "Earnings", icon: Wallet },
]

type RiderUser = {
  id?: number
  firstName?: string
  lastName?: string
  email?: string
  role?: string
}


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


export function RiderHeader({ collapsed, setCollapsed,notifications }: DashboardHeaderProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<RiderUser | null>(null)
  const unreadCount = notifications.filter((n) => n.status === "unread").length

  useEffect(() => {
    try {
      const raw = localStorage.getItem("user")
      if (raw) setUser(JSON.parse(raw))
    } catch (error) {
      console.error("Failed to parse user data from localStorage:", error)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toast({ title: "You have successfully logged out.", duration: 3000 })
    router.push("/rider-signIn")
  }

  return (
    <header className="bg-background border-b border-secondary/50 px-4 h-16 py-[13px]">
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          <div className="flex gap-2">
            {/* Mobile: open Sheet */}
            <div className="lg:hidden">
              <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-secondary hover:text-secondary cursor-pointer hover:bg-secondary/10"
                  
                 >
                    <MenuIcon className="h-4 w-4" />
                  </Button>
                </SheetTrigger>

                {/* Sidebar content */}
                <SheetContent
                  side="left"
                  className="w-72 max-w-[85vw] bg-white p-4 border-r z-50"
                >
                   <Link href="/rider-dashboard">
                      <img
                        src="/chopNow.png"
                        alt="ChopNow Logo"
                        className="mx-auto w-36 h-full px-2 object-cover"
                      />
                    </Link>

                  {/* ✅ Search moved here */}
                  <div className="relative mb-4">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 h-4 w-4" />
                    <Input
                      placeholder="Search orders..."
                      className="pl-10 w-full border-secondary/50 focus:border-secondary focus:ring-secondary"
                    />
                  </div>

                  <div className="space-y-2">
                    {MenuNavigation.map((item) => {
                      const Icon = item.icon
                      const isActive = pathname === item.href

                      return (
                        <Link key={item.href} href={item.href}  onClick={() => setMobileOpen(false)}>
                          <Button
                            variant="ghost"
                            className={cn(
                              "w-full justify-start",
                              isActive && "bg-secondary/10 text-secondary"
                            )}
                          >
                            <Icon className="mr-2 h-4 w-4" />
                            {item.name}
                          </Button>
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
                className="text-secondary hover:text-secondary cursor-pointer hover:bg-secondary/10"
              >
                <MenuIcon className="h-4 w-4" />
              </Button>
            </div>

            <h1 className="text-2xl font-bold text-secondary">Dashboard</h1>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-3">
          {/* Search */}
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary/60 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10 w-80 border-secondary/50 focus:border-secondary focus:ring-secondary"
            />
          </div>
          {/* Notifications */}
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
                  <DropdownMenuItem key={notification.id} className="p-3 hover:bg-secondary hover:text-background">
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{notification.message}</p>
                      <p className="text-xs ">{notification.time}</p>
                    </div>
                  </DropdownMenuItem>
                ))
              )}
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 rounded-full hover:bg-transparent">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary/10 text-secondary">
                    {user
                      ? `${user.firstName?.charAt(0) || ""}${user.lastName?.charAt(0) || ""}`.toUpperCase()
                      : "G"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 border border-secondary" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">Rider User</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user?.email || "No email available"}
                  </p>
                </div>
              </DropdownMenuLabel>
              {/* <DropdownMenuSeparator className="border border-secondary" />
              <DropdownMenuItem onClick={() => router.push("rider-dashboard/profile")} className="hover:bg-secondary hover:text-white">
                <User className="h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-secondary hover:text-white">
                <Settings className="h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem> */}
              <DropdownMenuSeparator className="border border-secondary"/>
              <DropdownMenuItem className="hover:bg-secondary hover:text-white" onClick={handleLogout}>
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

