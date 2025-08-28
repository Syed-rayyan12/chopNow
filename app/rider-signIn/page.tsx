"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { RiderLogin } from "@/components/rider-panel-components/rider-login"

const Page = () => {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return <RiderLogin />
}

export default Page
