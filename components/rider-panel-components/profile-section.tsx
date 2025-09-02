"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  User,
  Phone,
  Mail,
  MapPin,
  Star,
  Award,
  Settings,
  HelpCircle,
  LogOut,
  ChevronRight,
  Shield,
  CreditCard,
  Bell,
} from "lucide-react"

export function ProfileSection() {
  const menuItems = [
    { icon: Settings, label: "Account Settings", href: "#" },
    { icon: CreditCard, label: "Payment Methods", href: "#" },
    { icon: Bell, label: "Notifications", href: "#" },
    { icon: Shield, label: "Privacy & Security", href: "#" },
    { icon: HelpCircle, label: "Help & Support", href: "#" },
  ]

  return (
    <div className="p-4 space-y-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-secondary">Profile</h1>
        <p className="text-secondary/60">Manage your account and preferences</p>
      </div>

      {/* Profile Card */}
      <Card className=" border border-secondary/70">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src="/rider-avatar.png" />
              <AvatarFallback className="bg-secondary/10 text-secondary text-xl font-semibold">JS</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-secondary">John Smith</h2>
              <p className="text-secondary/60"><span className="text-secondary">Rider ID:</span> RDR-001</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-green-100 text-green-800">Active</Badge>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className=" border border-secondary/70">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-secondary/10 rounded-full  w-fit mx-auto mb-2">
              <Award className="h-6 w-6 text-secondary " />
            </div>
            <p className="text-2xl font-bold text-secondary">1,247</p>
            <p className="text-sm text-secondary/60">Total Deliveries</p>
          </CardContent>
        </Card>

        <Card className=" border border-secondary/70">
          <CardContent className="p-4 text-center">
            <div className="p-3 bg-green-100 rounded-full w-fit mx-auto mb-2">
              <Star className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-secondary">98.5%</p>
            <p className="text-sm text-secondary/60">Success Rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Contact Info */}
      <Card className="border border-secondary/70">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5 text-secondary/60" />
            <span className="text-secondary">Contact Information</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Phone className="h-5 w-5 text-secondary/60" />
            <div>
              <p className="font-medium text-secondary">+44 7123 456789</p>
              <p className="text-sm text-secondary/60">Primary phone</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="h-5 w-5 text-secondary/60" />
            <div>
              <p className="font-medium text-secondary">john.smith@example.com</p>
              <p className="text-sm text-secondary/60">Email address</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <MapPin className="h-5 w-5 text-secondary/60" />
            <div>
              <p className="font-medium text-secondary">London, UK</p>
              <p className="text-sm text-secondary/60">Service area</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Items */}
      <Card className="border border-secondary/70">
        <CardContent className="p-0">
          {menuItems.map((item, index) => {
            const Icon = item.icon
            return (
              <button
                key={index}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center space-x-3">
                  <Icon className="h-5 w-5 text-secondary/60" />
                  <span className="font-medium text-secondary">{item.label}</span>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            )
          })}
        </CardContent>
      </Card>

      {/* Logout Button */}
      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50 bg-transparent">
        <LogOut className="h-4 w-4 mr-2 text-secondary" />
        <span className="text-secondary">

        Sign Out
        </span>
      </Button>
    </div>
  )
}
