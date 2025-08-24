"use client"
import { DashboardHeader } from "@/components/restaurant-panel-components/dashboard-header"
import { DashboardSidebar } from "@/components/restaurant-panel-components/dashboard-sidebar"
import { useState } from "react"

type NotificationStatus = "unread" | "read"

interface Notification {
  id: string
  type: "order" | "stock" | "payout"
  message: string
  time: string
  status: NotificationStatus
}

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [collapsed, setCollapsed] = useState(false)
  const [activeSection, setActiveSection] = useState("overview")

  const [notifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      message: "New order received from John Doe",
      time: "2 minutes ago",
      status: "unread",
    },
    {
      id: "2",
      type: "stock",
      message: "Low stock alert: Chicken Wings",
      time: "15 minutes ago",
      status: "unread",
    },
    {
      id: "3",
      type: "payout",
      message: "Weekly payout processed",
      time: "1 hour ago",
      status: "read",
    },
  ])

  const handleSignOut = () => {
    console.log("Sign out clicked")
    // Add sign out logic here
  }

  return (
    <div className="fixed h-screen w-full flex">
      {/* Sidebar */}
      <DashboardSidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        sidebarCollapsed={collapsed}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <DashboardHeader
          sidebarCollapsed={collapsed}
          setSidebarCollapsed={setCollapsed}
          notifications={notifications}
          setActiveSection={setActiveSection}
          onSignOut={handleSignOut}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-amber-50 py-6 px-6">{children}</main>
      </div>
    </div>
  )
}
