"use client"

import { RiderHeader } from "@/components/rider-panel-components/rider-header"
import { RiderSidebar } from "@/components/rider-panel-components/rider-sidebar"
import { useState } from "react"


export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="flex fixed w-full h-screen overflow-hidden">
      {/* Sidebar */}
      <RiderSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Header */}
        <RiderHeader collapsed={collapsed} setCollapsed={setCollapsed} />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto bg-amber-50  py-6 px-6">
          {children}
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
