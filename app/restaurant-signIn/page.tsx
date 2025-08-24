"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RiderLogin } from "@/components/rider-panel-components/rider-login"
import { RestaurantSignIn } from "@/components/restaurant-panel-components/restaurant-signIn"

const Page = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    router.push("/restaurant-dashboard") // Navigate to dashboard after login
  }

  if (!isLoggedIn) {
    return <RestaurantSignIn onLogin={handleLogin} />
  }

  return null
}

export default Page;
