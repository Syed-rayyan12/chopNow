"use client"

import { Home, Package, DollarSign, User, Settings, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface RiderSidebarProps {
  activeTab: string
  onTabChange: (tab: string) => void
  isOpen: boolean
  onClose: () => void
}

export function RiderSidebar({ activeTab, onTabChange, isOpen, onClose }: RiderSidebarProps) {
  const menuItems = [
    { id: "home", label: "Dashboard", icon: Home },
    { id: "orders", label: "Orders", icon: Package },
    { id: "earnings", label: "Earnings", icon: DollarSign },
    { id: "profile", label: "Profile", icon: User },
  ]

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 bg-white">
        <div className="flex flex-col flex-1 border-r border-orange-200">
          {/* Logo */}
          <div className="flex items-center px-6 py-4 border-b border-orange-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-orange-900">ChopNow</h1>
                <p className="text-xs text-orange-700">Rider Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center px-3 py-2 text-sm text-left rounded-lg transition-colors ${
                    isActive ? "bg-orange-100 text-amber-800 font-medium text-sm" : "text-amber-700 hover:bg-orange-50 hover:text-orange-800"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-4 border-t border-orange-200 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-sm font-medium text-amber-700 hover:bg-orange-50 hover:text-orange-800">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-sm font-medium text-amber-700 hover:bg-orange-50 hover:text-orange-800">
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-orange-50 border-r border-orange-200 transform transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Mobile Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-orange-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">C</span>
              </div>
              <div>
                <h1 className="text-lg font-bold text-orange-900">ChopNow</h1>
                <p className="text-xs text-orange-700">Rider Panel</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-orange-800 hover:bg-orange-100">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id)
                    onClose()
                  }}
                  className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors ${
                    isActive ? "bg-orange-200 text-orange-900 font-medium" : "text-orange-800 hover:bg-orange-100"
                  }`}
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Bottom Actions */}
          <div className="px-4 py-4 border-t border-orange-200 space-y-2">
            <Button variant="ghost" className="w-full justify-start text-orange-800 hover:bg-orange-100">
              <Settings className="h-5 w-5 mr-3" />
              Settings
            </Button>
            <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
              <LogOut className="h-5 w-5 mr-3" />
              Log Out
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
