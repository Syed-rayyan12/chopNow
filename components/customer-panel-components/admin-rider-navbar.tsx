"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Car, UtensilsCrossed, LogIn, UserPlus, ArrowBigDown, ArrowDown, ChevronDown, PanelBottom } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export function RestaurantRiderNavbar() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  const navigateTo = (path: string) => {
    router.push(path)
  }

  return (
    <nav className="bg-[#ff7A00] border-border px-4 py-3">
      <div className="max-w-7xl max-sm:flex-col max-sm:gap-3 max-sm:items-center mx-auto flex items-center justify-between">
        {/* Logo / Brand */}
        <div className="flex items-center space-x-2">
          <PanelBottom className="w-6 h-6 text-white max-sm:hidden" />
          <span className="text-md max-sm:text-xs font-normal text-white max-sm:text-center">
          select the desired panel you want to connect with
          </span>
        </div>

        {/* Dropdown Menu */}
       
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <div className="relative flex items-center">
              <Button
                className="bg-background text-foreground px-4 flex border-none hover:bg-none cursor-pointer items-center justify-between gap-2"
                variant="my"
              >
                Select Panel
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    open ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </div>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-56">
            {/* Rider Panel */}
            <DropdownMenuLabel>Rider Panel</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigateTo("/rider-signIn")}>
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateTo("/rider-signup")}>
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </DropdownMenuItem>

            {/* Restaurant Panel */}
            <DropdownMenuLabel>Restaurant Panel</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigateTo("/restaurant-signIn")}>
              <LogIn className="w-4 h-4 mr-2" />
              Sign In
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigateTo("/restaurant-signup")}>
              <UserPlus className="w-4 h-4 mr-2" />
              Sign Up
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  )
}
