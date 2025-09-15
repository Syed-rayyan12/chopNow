"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin } from "lucide-react"
import ExpandableDock from "../ui/expandable-dock"
import { motion } from "framer-motion"

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

 // Variants
const leftVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const rightVariant = {
  hidden: { opacity: 0, x: 100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const boxVariant = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

  return (
    <section
      className="relative py-16 md:py-24 bg-cover bg-center"
      style={{ backgroundImage: "url('/boo.jpeg')" }}
    >
      <div className="absolute inset-0 bg-black/30 z-0" /> {/* overlay for readability */}

      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <motion.h1
            initial={{ y: -100, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="font-heading font-bold text-4xl md:text-6xl lg:text-7xl text-[#FDFBEA] mb-6"
          >
            Hungry? We've got you <span className="text-background">covered</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-[#FDFBEA]"
          >
            Order from your favorite restaurants and get fresh, hot food delivered
            to your door in minutes.
          </motion.p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <motion.div
              className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-lg text-primary"
              variants={boxVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
            >
              {/* Search Input (slides from right) */}
              <motion.div variants={rightVariant} className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search for restaurants or dishes"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 bg-transparent border-none"
                />
              </motion.div>

              {/* Buttons (slide from left) */}
              <motion.div variants={leftVariant} className="flex items-center max-sm:justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap bg-transparent hover:border-none hover:bg-secondary/80"
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  Current Location
                </Button>
                <Button
                  size="sm"
                  className="whitespace-nowrap bg-secondary hover:bg-secondary/80 text-white cursor-pointer"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </motion.div>
            </motion.div>

          </div>

          {/* CTA */}
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
          >
            <Button
              size="lg"
              className="font-medium bg-secondary hover:bg-secondary/80 text-white cursor-pointer"
              onClick={() => router.push("/restaurants")}
            >
              Order Now
            </Button>
          </motion.div>
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
