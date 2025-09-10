// "use client"

// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Badge } from "@/components/ui/badge"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { useCart } from "@/contexts/cart-context"
// import { useAuth } from "@/contexts/auth-context"
// import { MapPin, Menu, X, ShoppingCart, User, LogOut, Settings, LogIn, UserPlus } from "lucide-react"
// import { useRouter } from "next/navigation"

// export function Header() {
//   const router = useRouter()
//   const [isMenuOpen, setIsMenuOpen] = useState(false)
//   const { getCartCount } = useCart()
//   const { user, logout } = useAuth()
//   const cartCount = getCartCount()

//   const handleLogin = () => {

//     router.push("/user-signIn")

//   }

//   const handleSignup = () => {

//     router.push("/user-signup")

//   }

//   const handleLogout = () => {
//     // ✅ Remove token
//     localStorage.removeItem("token")

//     // ✅ Optional: Clear other stored data
//     localStorage.removeItem("user")

//     // ✅ Redirect to login page
//     router.push("/login")
//   }

//   return (
//     <header className="sticky top-0 z-50 bg-background border-b border-border">
//       <div className="container mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-12">
//           {/* Logo */}
//           <Link href="/" >
//             {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
//               <span className="text-primary-foreground font-heading font-bold text-lg">C</span>
//             </div>
//             <span className="font-heading font-bold text-xl text-foreground">Chop Now</span> */}
//             <img className="w-32  px-2 object-cover" src="/chopNow.png" alt="" />
//           </Link>

//           {/* Location */}
//           <div className="hidden md:flex items-center space-x-2 text-foreground">
//             <MapPin className="w-4 h-4 " />
//             <span className="text-sm ">Deliver to</span>
//             <Button variant="ghost" size="sm" className=" font-medium">
//               Current Location
//             </Button>
//           </div>

//           {/* Desktop Navigation */}
//           <nav className="hidden md:flex items-center space-x-6">
//             <Link href="/restaurants" className=" hover:text-secondary transition-colors ">
//               Restaurants
//             </Link>
//             {/* <Link href="/cuisines" className=" hover:text-secondary transition-colors ">
//               Cuisines
//             </Link> */}
//             <Link href="/offers" className=" hover:text-secondary transition-colors ">
//               Offers
//             </Link>
//           </nav>

//           {/* Actions */}
//           <div className="flex items-center space-x-2">
//             <Button variant="ghost" size="sm" className="relative" asChild>
//               <Link href="/cart">
//                 <ShoppingCart className="w-5 h-5 " />
//                 {cartCount > 0 && (
//                   <Badge className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
//                     {cartCount > 99 ? "99+" : cartCount}
//                   </Badge>
//                 )}
//               </Link>
//             </Button>


//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="sm" className="flex items-center gap-2">
//                   <User className="w-5 h-5 " />
//                   <span className="hidden sm:inline"></span>
//                 </Button>
//               </DropdownMenuTrigger>

//               <DropdownMenuContent align="end" className="w-56">
//                 {user ? (
//                   // ✅ When user is logged in
//                   <>
//                     <DropdownMenuItem asChild>
//                       <Link href="/profile" className="flex items-center">
//                         <Settings className="w-4 h-4 mr-2" />
//                         Profile
//                       </Link>
//                     </DropdownMenuItem>

//                     <DropdownMenuSeparator />

//                     <DropdownMenuItem onClick={handleLogout} className="text-destructive">
//                       <LogOut className="w-4 h-4 mr-2" />
//                       Logout
//                     </DropdownMenuItem>
//                   </>
//                 ) : (
//                   // ✅ When user is logged out
//                   <>
//                     <DropdownMenuItem onClick={handleLogin}>
//                       <LogIn className="w-4 h-4 mr-2" />
//                       Sign In
//                     </DropdownMenuItem>

//                     <DropdownMenuItem onClick={handleSignup}>
//                       <UserPlus className="w-4 h-4 mr-2" />
//                       Sign Up
//                     </DropdownMenuItem>
//                   </>
//                 )}
//               </DropdownMenuContent>
//             </DropdownMenu>


//             <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
//               {isMenuOpen ? <X className="w-5 h-5 transition-all duration-300" /> : <Menu className="w-5 h-5 transition-all duration-300" />}
//             </Button>
//           </div>
//         </div>

//         {/* Mobile Menu */}
//         <div className={`md:hidden border-t border-border transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-96 opacity-100 py-4' : '  opacity-0 py-0'}`}>
//           <div className="flex flex-col space-y-4">
//             <div className="flex items-center space-x-2 text-muted-foreground">
//               <MapPin className="w-4 h-4" />
//               <span className="text-sm">Deliver to: Current Location</span>
//             </div>
//             <Link href="/restaurants" className="text-foreground hover:text-primary transition-colors">
//               Restaurants
//             </Link>
//             {/* <Link href="/cuisines" className="text-foreground hover:text-primary transition-colors">
//               Cuisines
//             </Link> */}
//             <Link href="/offers" className="text-foreground hover:text-primary transition-colors">
//               Offers
//             </Link>

//           </div>
//         </div>
//       </div>



//     </header>
//   )
// }


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
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    router.push("/login")
  }

  return (
    <header className="sticky top-0 z-50  py-2 bg-white border-b border-secondary/40  ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Logo */}
          <Link href="/" >
            <img className="w-42 px-2 object-cover" src="/chopnow-logo.png" alt="" />
          </Link>

          {/* Location */}
          <div className="hidden md:flex items-center space-x-2 text-foreground">
            <MapPin className="w-4 h-4 text-foreground" />
            <span className="text-sm text-foreground">Deliver to</span>
            <Button variant="ghost" size="sm" className=" font-medium bg-white">
              Current Location
            </Button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/restaurants" className="text-foreground hover:text-secondary transition-colors ">
              Restaurants
            </Link>
            <Link href="/offers" className="text-foreground hover:text-secondary transition-colors ">
              Offers
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <Button variant="tertiary" size="sm" className="relative" asChild>
              <Link href="/cart">
                <ShoppingCart className="w-5 h-5 text-foreground" />
                {cartCount > 0 && (
                  <Badge className="absolute bg-secondary -top-1 -right-1 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center p-0">
                    {cartCount > 99 ? "99+" : cartCount}
                  </Badge>
                )}
              </Link>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="tertiary" size="sm" className="flex items-center gap-2 cursor-pointer">
                  <User className="w-5 h-5 text-foreground" />
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-56 bg-white border-none">
                {user ? (
                  <>
                    <DropdownMenuItem asChild>
                      <Link href="/profile" className="flex items-center cursor-pointer">
                        <Settings className="w-4 h-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuSeparator className="text-foreground bg-foreground" />

                    <DropdownMenuItem onClick={handleLogout} className="text-destructive cursor-pointer">
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <DropdownMenuItem onClick={handleLogin} className="cursor-pointer hover:bg-secondary hover:text-white">
                      <LogIn className="w-4 h-4 mr-2  hover:text-white" />
                      Sign In
                    </DropdownMenuItem>
                   
                    <DropdownMenuItem onClick={handleSignup} className="cursor-pointer  hover:bg-secondary hover:text-white">
                      <UserPlus className="w-4 h-4 mr-2 hover:text-white" />
                      Sign Up
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5 transition-all duration-300" /> : <Menu className="w-5 h-5 transition-all duration-300" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu (fixed height + smooth animation) */}
        <div
          className={`md:hidden  border-border transition-all duration-500 overflow-hidden ${
            isMenuOpen ? "max-h-96 opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          }`}
        >
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Deliver to: Current Location</span>
            </div>
            <Link href="/restaurants" className="text-foreground hover:text-primary transition-colors">
              Restaurants
            </Link>
            <Link href="/offers" className="text-foreground hover:text-primary transition-colors">
              Offers
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

