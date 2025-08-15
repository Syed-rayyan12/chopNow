"use client"

import { useState } from "react"
import { DashboardOverview } from "./dashboard-overview"
import { OrdersManagement } from "./orders-management"
import { RestaurantManagement } from "./restaurant-management"
import { DeliveryTracking } from "./delivery-tracking"
import { Sidebar } from "./sidebar"
import { Header } from "./header"
import { UserManagement } from "./user-management"
import { AnalyticsDashboard } from "./analytics-dashboard"


const MainAdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardOverview />
      case "orders":
        return <OrdersManagement />
      case "restaurants":
        return <RestaurantManagement />
      case "users":
        return <UserManagement />
        case "analytics":
          return <AnalyticsDashboard />
      case "delivery":
        return <DeliveryTracking />
      default:
        return <DashboardOverview />
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex">
      {/* Sidebar */}
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header onMenuClick={() => setSidebarOpen(true)} />

        {/* Content */}
        <main className="flex-1 overflow-auto bg-amber-50 p-6">
          {renderContent()}
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default MainAdminDashboard
