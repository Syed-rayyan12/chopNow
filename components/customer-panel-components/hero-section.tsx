"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"

export function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/restaurants?search=${encodeURIComponent(searchQuery.trim())}`)
    } else {
      router.push("/restaurants")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch()
    }
  }

  return (
    <section
    className="relative py-16 md:py-24 bg-cover bg-center"
    style={{ backgroundImage: "url('/boo.jpeg')" }}
  >
    <div className="absolute inset-0 bg-black/30 z-0" /> {/* overlay for readability */}
  
    <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        {/* Hero Content */}
        <h1 className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-[#FDFBEA] mb-6">
          Hungry? We've got you <span className="text-background">covered</span>
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-[#FDFBEA]">
          Order from your favorite restaurants and get fresh, hot food delivered to your door in minutes.
        </p>
  
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex flex-col sm:flex-row gap-4 p-2 bg-background rounded-lg shadow-lg border border-border">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                type="text"
                placeholder="Search for restaurants or dishes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                className="pl-10 border-0 focus-visible:ring-0 bg-transparent"
              />
            </div>
            <div className="flex items-center max-sm:justify-center gap-2">
              <Button variant="outline" size="sm" className="whitespace-nowrap bg-transparent hover:border-none hover:bg-secondary/80">
                <MapPin className="w-4 h-4 mr-2" />
                Current Location
              </Button>
              <Button size="sm" className="whitespace-nowrap bg-secondary hover:bg-secondary/80 text-white  cursor-pointer" onClick={handleSearch}>
                Search
              </Button>
            </div>
          </div>
        </div>
  
        {/* CTA */}
        <Button size="lg" className="font-medium bg-secondary  text-white cursor-pointer" onClick={() => router.push("/restaurants")}>
          Order Now
        </Button>
      </div>
    </div>
  
    {/* Floating Background Shapes */}
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl"></div>
    </div>
  </section>
  )
}
