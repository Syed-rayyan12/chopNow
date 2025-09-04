"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff, Phone, Lock, Mail } from "lucide-react"
import Link from "next/link"

interface RiderLoginProps {
  onLogin: () => void
}

export function RestaurantSignIn({ onLogin }: RiderLoginProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    onLogin()
  }

  return (
    <div className="min-h-screen bg-orange-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border  border-secondary">
        <CardHeader className="text-center space-y-4">
          <Link href="/">
        <img
            src="/chopNow.png"
            alt="ChopNow Logo"
            className="mx-auto w-32 object-cover"
        />
         </Link>
          <p className="text-gray-600">Sign in to start restraurants</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder=""
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="pl-10 border border-secondary/50"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 border border-secondary/50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-[#dd6636]"
            >
              Sign In
            </Button>
            <div className="text-center">
              <a href="#" className="text-sm text-orange-600 hover:text-orange-700">
                Forgot Password?
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
