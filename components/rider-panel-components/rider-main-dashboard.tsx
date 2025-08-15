"use client"

import { useState } from "react"
import { DashboardHome } from "./dashboard-home"
import { OrdersSection } from "./orders-section"
import { EarningsSection } from "./earnings-section"
import { ProfileSection } from "./profile-section"
import { RiderSidebar } from "./rider-sidebar"
import { RiderHeader } from "./rider-header"

const RiderMainDashboard = () => {
  const [activeTab, setActiveTab] = useState("home")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return <DashboardHome />
      case "orders":
        return <OrdersSection />
      case "earnings":
        return <EarningsSection />
      case "profile":
        return <ProfileSection />
      default:
        return <DashboardHome />
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 flex">
      {/* Sidebar */}
      <RiderSidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-64">
        {/* Header */}
        <RiderHeader onMenuClick={() => setSidebarOpen(true)} />
        {/* Content */}
        <main className="flex-1 overflow-auto bg-amber-50">{renderContent()}</main>{" "}
        {/* Changed main section background from default to bg-amber-50 */}
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

export default RiderMainDashboard
