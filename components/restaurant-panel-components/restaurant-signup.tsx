"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Phone, EyeOff, Eye, User } from "lucide-react"
import { Button } from "react-day-picker"
import Link from "next/link"

export default function RestaurantSignup() {
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        number: "",
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

            // Save token to localStorage/session if needed
            localStorage.setItem("token", data.token)

            // Redirect user based on role (example)
            if (data.user.role === "restaurant") {
                router.push("/restaurant-dashboard")
            } else {
                router.push("/dashboard")
            }
        } catch (err: any) {
            setError(err.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-orange-100">
            <Card className="w-full max-w-md bg-background max-sm:mx-4 border border-secondary">
                <CardHeader className="text-center space-y-4">
                    <Link href="/">  
                    <img
                        src="/chopNow.png"
                        alt="ChopNow Logo"
                        className="mx-auto w-32  object-cover"
                    />
                   </Link>
                    <p className="text-gray-600">Sign up to start restaurants</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* First Name */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-gray-700">First Name</label>
                            <User className="absolute top-6 inset-y-0 left-3 my-auto h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                name="firstName"
                                placeholder="First Name"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="pl-10 border border-secondary/50"
                                required
                            />
                        </div>

                        {/* Last Name */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-gray-700">Last Name</label>
                            <User className="absolute top-6 inset-y-0 left-3 my-auto h-4 w-4 text-gray-400" />
                            <Input
                                type="text"
                                name="lastName"
                                placeholder="Last Name"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="pl-10 border border-secondary/50"
                                required
                            />
                        </div>

                        {/* Phone Number */}
                        <div className="space-y-2 relative">
                            <label className="text-sm font-medium text-gray-700">Phone Number</label>
                            <Phone className="absolute top-6 inset-y-0 left-3 my-auto h-4 w-4 text-gray-400" />
                            <Input
                                type="tel"
                                name="number"
                                placeholder="+44 7123 456789"
                                value={formData.number}
                                onChange={handleChange}
                                className="pl-10 border border-secondary/50"
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
                                className=" pr-10 border border-secondary/50"
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
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>

                        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
                    </form>

                </CardContent>
            </Card>
        </div>
    )
}
