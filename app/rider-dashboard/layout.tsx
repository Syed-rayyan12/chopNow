// "use client"

// import { RiderHeader } from "@/components/rider-panel-components/rider-header"
// import { RiderSidebar } from "@/components/rider-panel-components/rider-sidebar"
// import { useState } from "react"


// export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false)
//   const [collapsed, setCollapsed] = useState(false)

//   return (
//     <div className="flex fixed w-full h-screen overflow-hidden">
//       {/* Sidebar */}
//       <RiderSidebar collapsed={collapsed} setCollapsed={setCollapsed} />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-y-auto">
//         {/* Header */}
//         <RiderHeader collapsed={collapsed} setCollapsed={setCollapsed} />

//         {/* Dynamic Page Content */}
//         <main className="flex-1 overflow-y-auto bg-background  py-6 px-6">
//           {children}
//         </main>
//       </div>

//       {/* Mobile Sidebar Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//     </div>
//   )
// } 
"use client"

import { RiderHeader } from "@/components/rider-panel-components/rider-header"
import { RiderSidebar } from "@/components/rider-panel-components/rider-sidebar"
import { useState } from "react"


type NotificationStatus = "unread" | "read"

interface Notification {
  id: string
  type: "order" | "stock" | "payout"
  message: string
  time: string
  status: NotificationStatus
}

export default function RiderDashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)

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

  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Sidebar - Desktop (fixed) */}
      <aside className="hidden lg:block fixed top-0 left-0 h-screen z-40">
        <RiderSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </aside>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Header */}
        <header className="sticky top-0 z-30 bg-background ">
          <RiderHeader collapsed={collapsed} setCollapsed={setCollapsed} notifications={notifications} />
        </header>

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-y-auto px-6 py-6">{children}</main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <div className="absolute left-0 top-0 h-full w-64 bg-background shadow-lg">
            <RiderSidebar collapsed={false} setCollapsed={setCollapsed} />
          </div>
        </div>
      )}
    </div>
  )
}
