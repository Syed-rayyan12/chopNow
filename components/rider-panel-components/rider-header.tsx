"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, Bell, Search, User, LogOut, Settings, MenuIcon } from "lucide-react"
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Input } from "../ui/input"
import { useRouter } from "next/navigation"




export function RiderHeader({collapsed, setCollapsed}:any) {
  const router = useRouter()

  const handleLogout = () => {
    // 1. Remove the token from localStorage/session
    localStorage.removeItem("token");

    // 2. Redirect to login page
    router.push("/rider-signup");
  };
  return (
    <header className="bg-white border-b border-orange-200 px-4 h-16 lg:px-6 py-4">
      {" "}
      {/* Added border-orange-200 */}
      <div className="flex items-center justify-between">
        {/* Left Side */}
        <div className="flex items-center space-x-4">
          {/* Mobile Menu Button */}
          <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="text-orange-600 hover:text-orange-800 cursor-pointer hover:bg-orange-100"
            >
              <MenuIcon className="h-4 w-4" />
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-4 w-4" />
            <Input
              placeholder="Search orders..."
              className="pl-10 w-80 border-orange-200 focus:border-orange-400 focus:ring-orange-400"
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
              <Button variant="ghost" className=" h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/admin-profile.png" alt="Admin" />
                  <AvatarFallback className="bg-orange-100 text-orange-800">AD</AvatarFallback>
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
                <User className=" h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings/>
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button onClick={handleLogout}>
                <LogOut/>
                <span>Log out</span>
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
