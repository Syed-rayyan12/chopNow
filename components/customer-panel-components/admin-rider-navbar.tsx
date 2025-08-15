"use client"

import { Button } from "@/components/ui/button"
import { Car, PanelBottomCloseIcon, UtensilsCrossed } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"

export function RestaurantRiderNavbar() {
  const [activePanel, setActivePanel] = useState<"rider" | "restaurant" | null>(null)
  const router = useRouter()

  const handlePanelSelect = (panel: "rider" | "restaurant") => {
    setActivePanel(panel)
    console.log(`Navigating to ${panel} panel`)

    if (panel === "rider") {
      router.push("/rider-login")
    } else if (panel === "restaurant") {
      router.push("/restaurant-login") // go to login first
    }
  }

  return (
    <nav className="bg-orange-100 border-b border-border px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo/Brand */}
        <PanelBottomCloseIcon />
        <p className="text-md text-muted-foreground">
          Click below to go to Rider or Restaurant Panel
        </p>

        {/* Panel Buttons */}
        <div className="flex items-center space-x-3">
          {/* Rider Panel */}
          <Button
            className={`flex items-center space-x-2 ${
              activePanel === "rider" ? "bg-blue-500 text-white hover:bg-blue-600" : ""
            }`}
            onClick={() => handlePanelSelect("rider")}
          >
            <Car className="w-4 h-4" />
            <span>Rider Panel</span>
          </Button>

          {/* Restaurant Panel */}
          <Button
            className={`flex items-center space-x-2 ${
              activePanel === "restaurant" ? "bg-green-500 text-white hover:bg-green-600" : ""
            }`}
            onClick={() => handlePanelSelect("restaurant")}
          >
            <UtensilsCrossed className="w-4 h-4" />
            <span>Restaurant Panel</span>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button variant="ghost" size="sm">
            <Car className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </nav>
  )
}
