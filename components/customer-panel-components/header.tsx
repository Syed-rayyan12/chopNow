"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { MapPin, Menu, X, ShoppingCart, User, LogOut, Settings, LogIn, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"

export function Header() {
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { getCartCount } = useCart()
  const { user, logout } = useAuth()
  const cartCount = getCartCount()

  const handleLogin = () => {

    router.push("/user-signIn")

  }

  const handleSignup = () => {

    router.push("/user-signup")

  }

  const handleLogout = () => {
    // ✅ Remove token
    localStorage.removeItem("token")

    // ✅ Optional: Clear other stored data
    localStorage.removeItem("user")

    // ✅ Redirect to login page
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">C</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Chop Now</span>
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center space-x-2 text-muted-foreground">
            <MapPin className="w-4 h-4" />
            <span className="text-sm">Deliver to</span>
            <Button variant="ghost" size="sm" className="text-foreground font-medium">
              Current Location
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/restaurants" className="text-foreground hover:text-primary transition-colors">
              Restaurants
            </Link>
            <Link href="/cuisines" className="text-foreground hover:text-primary transition-colors">
              Cuisines
            </Link>
            <Link href="/offers" className="text-foreground hover:text-primary transition-colors">
              Offers
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Link>
            </Button>


            <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2">
            <User className="w-5 h-5" />
            <span className="hidden sm:inline"></span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-56">
          {user ? (
            // ✅ When user is logged in
            <>
              <DropdownMenuItem asChild>
                <Link href="/profile" className="flex items-center">
                  <Settings className="w-4 h-4 mr-2" />
                  Profile
                </Link>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem onClick={handleLogout} className="text-destructive">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </>
          ) : (
            // ✅ When user is logged out
            <>
              <DropdownMenuItem onClick={handleLogin}>
                <LogIn className="w-4 h-4 mr-2" />
                Sign In
              </DropdownMenuItem>

              <DropdownMenuItem onClick={handleSignup}>
                <UserPlus className="w-4 h-4 mr-2" />
                Sign Up
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>


            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Deliver to: Current Location</span>
              </div>
              <Link href="/restaurants" className="text-foreground hover:text-primary transition-colors">
                Restaurants
              </Link>
              <Link href="/cuisines" className="text-foreground hover:text-primary transition-colors">
                Cuisines
              </Link>
              <Link href="/offers" className="text-foreground hover:text-primary transition-colors">
                Offers
              </Link>

            </div>
          </div>
        )}
      </div>

     

    </header>
  )
}
