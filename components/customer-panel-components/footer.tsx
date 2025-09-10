"use client"
import Link from "next/link"
import { Facebook, Twitter, Instagram, Smartphone, Monitor } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-white border-t border-secondary/40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <Link href="/" >
              {/* <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-heading font-bold text-lg">C</span>
            </div>
            <span className="font-heading font-bold text-xl text-foreground">Chop Now</span> */}
              <img className="w-32 object-cover mb-2" src="/chopNow.png" alt="" />
            </Link>
            <p className="text-foreground mb-4">
              Your favorite food, delivered fresh and fast. Experience the best of local cuisine at your doorstep.
            </p>

          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-foreground hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-foreground hover:text-secondary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-foreground hover:text-secondary transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/help" className="text-foreground hover:text-secondary transition-colors">
                  Help & Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-foreground hover:text-secondary transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-foreground hover:text-secondary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-foreground hover:text-secondary transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/refund" className="text-foreground hover:text-secondary transition-colors">
                  Refund Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Download App */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-4">follow the socials</h3>

            {/* <div className="space-y-3">
              <Link
                href="#"
                className="flex items-center space-x-3 p-3 border border-border bg-foreground rounded-lg transition-colors"
              >
                <Smartphone className="w-6 h-6 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Download on the</p>
                  <p className="text-xs text-muted-foreground">App Store</p>
                </div>
              </Link>
              <Link
                href="#"
                className="flex items-center space-x-3 p-3 border border-border rounded-lg bg-background transition-colors"
              >
                <Monitor className="w-6 h-6 text-secondary" />
                <div>
                  <p className="text-sm font-medium text-foreground">Get it on</p>
                  <p className="text-xs text-foreground">Google Play</p>
                </div>
              </Link>
            </div> */} <p className="text-foreground mb-4">Get the latest update from our socials</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-foreground  transition-colors hover:bg-secondary hover:text-white w-10 h-10 rounded-full flex justify-center items-center">
                <Facebook className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-foreground  transition-colors hover:bg-secondary hover:text-white w-10 h-10 rounded-full flex justify-center items-center">
                <Twitter className="w-5 h-5" />
              </Link>
              <Link href="#" className="text-foreground  transition-colors hover:bg-secondary hover:text-white w-10 h-10 rounded-full flex justify-center items-center">
                <Instagram className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary/60 mt-8 pt-8 text-center">
          <p className="text-foreground">© 2024 Chop Now. All rights reserved. Made with ❤️ for food lovers.</p>
        </div>
      </div>
    </footer>
  )
}
