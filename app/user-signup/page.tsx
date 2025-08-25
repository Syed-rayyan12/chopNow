// "use client"

// import type React from "react"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { useAuth } from "@/contexts/auth-context"
// import { Eye, EyeOff } from "lucide-react"
// import { Header } from "@/components/customer-panel-components/header"
// import { Footer } from "@/components/customer-panel-components/footer"

// export default function LoginPage() {
//   const router = useRouter()
//   const { login } = useAuth()

//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   })
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const [error, setError] = useState("")

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     setError("")

//     try {
//       const success = await login(formData.email, formData.password)
//       if (success) {
//         router.push("/profile")
//       } else {
//         setError("Invalid email or password")
//       }
//     } catch (err) {
//       setError("An error occurred. Please try again.")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="max-w-md mx-auto">
//           <Card>
//             <CardHeader className="text-center">
//               <CardTitle className="text-2xl font-heading font-bold">Welcome Back</CardTitle>
//               <p className="text-muted-foreground">Sign in to your Chop Now account</p>
//             </CardHeader>
//             <CardContent>
//               <form onSubmit={handleSubmit} className="space-y-4">
//                 <div>
//                   <Label htmlFor="email">Email</Label>
//                   <Input
//                     id="email"
//                     type="email"
//                     placeholder="john@example.com"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     required
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="password">Password</Label>
//                   <div className="relative">
//                     <Input
//                       id="password"
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Enter your password"
//                       value={formData.password}
//                       onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                       required
//                     />
//                     <Button
//                       type="button"
//                       variant="ghost"
//                       size="sm"
//                       className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
//                       onClick={() => setShowPassword(!showPassword)}
//                     >
//                       {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                     </Button>
//                   </div>
//                 </div>

//                 {error && <p className="text-sm text-destructive">{error}</p>}

//                 <Button type="submit" className="w-full" disabled={isLoading}>
//                   {isLoading ? "Signing in..." : "Sign In"}
//                 </Button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-sm text-muted-foreground">
//                   Don't have an account?{" "}
//                   <Link href="/signup" className="text-primary hover:underline">
//                     Sign up
//                   </Link>
//                 </p>
//               </div>

//               {/* Demo Credentials */}
//               <div className="mt-6 p-4 bg-muted/50 rounded-lg">
//                 <p className="text-sm font-medium mb-2">Demo Credentials:</p>
//                 <p className="text-xs text-muted-foreground">Email: john@example.com</p>
//                 <p className="text-xs text-muted-foreground">Password: password123</p>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </main>

//       <Footer />
//     </div>
//   )
// }


"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, User } from "lucide-react"
import { Button } from "react-day-picker"

export default function RiderLoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong")
      }

      if (data.token) localStorage.setItem("token", data.token)

      // Redirect based on role
      if (data.user?.role === "RIDER") {
        router.push("/rider-dashboard")
      } else {
        router.push("/profile") // or another route
      }
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-orange-100">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-[#dd6636] rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">CN</span>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-800">ChopNow Rider</CardTitle>
          <p className="text-gray-600">Login to your rider account</p>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <User className="absolute top-6 inset-y-0 left-3 my-auto h-4 w-4 text-gray-400" />
              <Input
                type="email"
                name="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="pl-10 border border-orange-200"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2 relative">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                className="pr-10 border border-orange-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-6 inset-y-0 right-3 my-auto text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>

            <Button type="submit" className="w-full bg-[#dd6636] text-white rounded-lg px-2 py-2">
              {loading ? "Signing in..." : "Sign In"}
            </Button>

            {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

