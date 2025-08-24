"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RiderLogin } from "@/components/rider-panel-components/rider-login"

const Page = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleLogin = () => {
    setIsLoggedIn(true)
    router.push("/rider-dashboard") // Navigate to dashboard after login
  }

  if (!isLoggedIn) {
    return <RiderLogin onLogin={handleLogin} />
  }

  return null
}

export default Page;
