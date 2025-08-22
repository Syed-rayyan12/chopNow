"use client"

import { useState } from "react"
import { Sidebar } from "@/components/admin-panel-components/sidebar"
import { Header } from "@/components/admin-panel-components/header"

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="fixed h-screen w-full  flex">
            {/* Sidebar */}
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-y-auto">
                {/* Header */}
                <Header collapsed={collapsed} setCollapsed={setCollapsed} />

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
