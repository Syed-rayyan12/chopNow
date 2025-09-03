// "use client"
// import { DashboardHeader } from "@/components/restaurant-panel-components/dashboard-header"
// import { DashboardSidebar } from "@/components/restaurant-panel-components/dashboard-sidebar"

// import { useState } from "react"

// type NotificationStatus = "unread" | "read"

// interface Notification {
//   id: string
//   type: "order" | "stock" | "payout"
//   message: string
//   time: string
//   status: NotificationStatus
// }

// export default function RestaurantDashboardLayout({ children }: { children: React.ReactNode }) {
//   const [collapsed, setCollapsed] = useState(false)


//   const [notifications] = useState<Notification[]>([
//     {
//       id: "1",
//       type: "order",
//       message: "New order received from John Doe",
//       time: "2 minutes ago",
//       status: "unread",
//     },
//     {
//       id: "2",
//       type: "stock",
//       message: "Low stock alert: Chicken Wings",
//       time: "15 minutes ago",
//       status: "unread",
//     },
//     {
//       id: "3",
//       type: "payout",
//       message: "Weekly payout processed",
//       time: "1 hour ago",
//       status: "read",
//     },
//   ])

//   const handleSignOut = () => {
//     console.log("Sign out clicked")
//     // Add sign out logic here
//   }

//   return (
//     <div className="min-h-screen  w-full flex">
//       {/* Sidebar */}
//       <DashboardSidebar
//         collapsed={collapsed}
//         setCollapsed={setCollapsed}
//       />

//       {/* Main Content */}
//       <div className="flex-1 sticky flex flex-col">
//         <div className="sticky top-0 z-50">

        
//         {/* Header */}
//         <DashboardHeader
//            collapsed={collapsed}
//            notifications={notifications}
//            setCollapsed={setCollapsed}
//           onSignOut={handleSignOut}
//         />
//         </div>

//         {/* Dynamic Page Content */}
//         <main className="flex-1 overflow-y-auto bg-background py-6 px-6">{children}</main>
//       </div>
//     </div>
//   )
// }

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

export default function RestaurantDashboardLayout({ children }: { children: React.ReactNode }) {
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

  const handleSignOut = () => {
    console.log("Sign out clicked")
    // Add sign out logic here
  }

  return (
    <div className="min-h-screen w-full flex">
      {/* Sidebar - fixed and full height */}
      <div className="hidden lg:block fixed top-0 left-0 h-screen">
        <DashboardSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>

      {/* Main Content */}
      <div
        className={`flex flex-col flex-1 min-h-screen w-full ${
          collapsed ? "lg:ml-20" : "lg:ml-64"
        }`}
      >
        {/* Navbar - fixed at top */}
        <div className="sticky top-0 z-50">
          <DashboardHeader
            collapsed={collapsed}
            notifications={notifications}
            setCollapsed={setCollapsed}
            onSignOut={handleSignOut}
          />
        </div>

        {/* Scrollable main content only */}
        <main className="flex-1 overflow-y-auto bg-background py-6 px-6">
          {children}
        </main>
      </div>
    </div>
  )
}
