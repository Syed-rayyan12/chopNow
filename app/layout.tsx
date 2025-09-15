import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, DM_Sans } from "next/font/google"
import { CartProvider } from "@/contexts/cart-context"
import { AuthProvider } from "@/contexts/auth-context"
import "./globals.css"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-heading",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Chop Now - Food Delivery Made Easy",
  description:
    "Order your favorite food from the best restaurants near you. Fast delivery, great taste!",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${dmSans.variable}`}>
      <body className="font-sans">
        <AuthProvider>
          <CartProvider>{children}</CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
