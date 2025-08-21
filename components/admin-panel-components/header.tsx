import { Bell, Search, User, Menu, MenuIcon, Settings, LogOut } from "lucide-react"
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
import { useState } from "react"

// Added props so Header can control sidebar open state



export function Header({collapsed, setCollapsed}:any){


  
  return (
    <header className="bg-white border-b border-orange-200 px-6 py-4 h-16">
      <div className="flex items-center justify-between">
        
        {/* Left side with toggle & search */}
        <div className="flex items-center space-x-4">
          {/* Sidebar toggle button (hidden on large screens) */}
          <div className="flex gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed(!collapsed)}
              className="text-orange-600 hover:text-orange-800 cursor-pointer hover:bg-orange-100"
            >
              <MenuIcon className="h-4 w-4" />
            </Button>
          </div>

          <h1 className="text-2xl font-bold text-orange-800">Dashboard</h1>
         
        </div>

        {/* Right side with notifications & profile */}
        <div className="flex items-center space-x-4">
        <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-500 h-4 w-4" />
            <Input
              placeholder="Search orders, restaurants, users..."
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
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
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
                <LogOut/>
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

