"use client"

import Link from "next/link"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/contexts/cart-context"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"

interface CartSidebarProps {
  isOpen: boolean
  onClose: () => void
  restaurant: {
    name: string
    deliveryFee: number
    serviceFee: number
    minimumOrder: number
  }
}

export function CartSidebar({ isOpen, onClose, restaurant }: CartSidebarProps) {
  const { items, updateQuantity, removeItem, getCartTotal } = useCart()

  const subtotal = getCartTotal()
  const deliveryFee = restaurant.deliveryFee
  const serviceFee = restaurant.serviceFee
  const total = subtotal + deliveryFee + serviceFee

  const isMinimumMet = subtotal >= restaurant.minimumOrder

  if (items.length === 0) {
    return (
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-lg max-md">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
          </SheetHeader>
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="font-heading font-semibold text-lg text-foreground mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">Add some delicious items from {restaurant.name}</p>
            <Button onClick={onClose}>Continue Shopping</Button>
          </div>
        </SheetContent>
      </Sheet>
    )
  }

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <p className="text-sm text-muted-foreground">From {restaurant.name}</p>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-4 px-6">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 border border-border rounded-lg">
                <img
                  src={item.menuItem.image || "/placeholder.svg"}
                  alt={item.menuItem.name}
                  className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-foreground truncate">{item.menuItem.name}</h4>

                  {/* Customizations */}
                  {Object.entries(item.customizations).map(([key, value]: [string, any]) => (
                    <div key={key} className="text-xs text-muted-foreground mt-1">
                      {Array.isArray(value)
                        ? value.length > 0 && <span>{value.map((v: any) => v.name).join(", ")}</span>
                        : value && <span>{value.name}</span>}
                    </div>
                  ))}

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="font-medium w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="font-medium">${item.totalPrice.toFixed(2)}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(item.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-border p-6 space-y-3">
          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Delivery fee</span>
            <span>{deliveryFee === 0 ? "Free" : `$${deliveryFee.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Service fee</span>
            <span>${serviceFee.toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {!isMinimumMet && (
            <div className="p-3 bg-destructive/10 rounded-lg">
              <p className="text-sm text-destructive">
                Minimum order is ${restaurant.minimumOrder}. Add ${(restaurant.minimumOrder - subtotal).toFixed(2)}{" "}
                more.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Button className="w-full" size="lg" disabled={!isMinimumMet} asChild>
              <Link href="/cart" onClick={onClose}>
                View Cart & Checkout
              </Link>
            </Button>
            <Button variant="outline" className="w-full bg-transparent" onClick={onClose}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
