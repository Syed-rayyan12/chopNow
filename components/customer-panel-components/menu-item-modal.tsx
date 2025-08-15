"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Minus, Plus, Star } from "lucide-react"
import type { MenuItem } from "@/app/restaurant/[id]/page"

interface MenuItemModalProps {
  item: MenuItem
  isOpen: boolean
  onClose: () => void
  onAddToCart: (item: MenuItem, customizations: any, quantity: number) => void
}

export function MenuItemModal({ item, isOpen, onClose, onAddToCart }: MenuItemModalProps) {
  const [quantity, setQuantity] = useState(1)
  const [customizations, setCustomizations] = useState<any>({})

  const handleCustomizationChange = (customizationId: string, value: any) => {
    setCustomizations((prev: any) => ({
      ...prev,
      [customizationId]: value,
    }))
  }

  const calculateTotalPrice = () => {
    let price = item.price
    Object.values(customizations).forEach((customization: any) => {
      if (Array.isArray(customization)) {
        customization.forEach((option: any) => {
          price += option.price
        })
      } else if (customization?.price) {
        price += customization.price
      }
    })
    return price * quantity
  }

  const handleAddToCart = () => {
    // Validate required customizations
    const missingRequired = item.customizations.filter((custom) => custom.required && !customizations[custom.id])

    if (missingRequired.length > 0) {
      alert(`Please select: ${missingRequired.map((c) => c.name).join(", ")}`)
      return
    }

    onAddToCart(item, customizations, quantity)
    onClose()
    setQuantity(1)
    setCustomizations({})
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="sr-only">Menu Item Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Item Image */}
          <div className="relative h-64 rounded-lg overflow-hidden">
            <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
          </div>

          {/* Item Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="font-heading font-bold text-2xl text-foreground">{item.name}</h2>
              {item.popular && (
                <Badge className="bg-primary text-primary-foreground">
                  <Star className="w-3 h-3 mr-1" />
                  Popular
                </Badge>
              )}
            </div>
            <p className="text-muted-foreground mb-4">{item.description}</p>
            <p className="font-heading font-bold text-xl text-primary">${item.price.toFixed(2)}</p>
          </div>

          {/* Customizations */}
          {item.customizations.map((customization) => (
            <div key={customization.id} className="space-y-3">
              <h3 className="font-heading font-semibold text-foreground">
                {customization.name}
                {customization.required && <span className="text-destructive ml-1">*</span>}
              </h3>

              {customization.required ? (
                <RadioGroup
                  value={customizations[customization.id]?.id || ""}
                  onValueChange={(value) => {
                    const option = customization.options.find((opt) => opt.id === value)
                    handleCustomizationChange(customization.id, option)
                  }}
                >
                  {customization.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <RadioGroupItem value={option.id} id={option.id} />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>{option.name}</span>
                          {option.price > 0 && <span className="text-muted-foreground">+${option.price}</span>}
                        </div>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              ) : (
                <div className="space-y-2">
                  {customization.options.map((option) => (
                    <div key={option.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.id}
                        checked={
                          customizations[customization.id]?.some((selected: any) => selected.id === option.id) || false
                        }
                        onCheckedChange={(checked) => {
                          const current = customizations[customization.id] || []
                          if (checked) {
                            handleCustomizationChange(customization.id, [...current, option])
                          } else {
                            handleCustomizationChange(
                              customization.id,
                              current.filter((item: any) => item.id !== option.id),
                            )
                          }
                        }}
                      />
                      <Label htmlFor={option.id} className="flex-1 cursor-pointer">
                        <div className="flex justify-between">
                          <span>{option.name}</span>
                          {option.price > 0 && <span className="text-muted-foreground">+${option.price}</span>}
                        </div>
                      </Label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Quantity and Add to Cart */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="font-medium text-lg w-8 text-center">{quantity}</span>
              <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>

            <Button onClick={handleAddToCart} size="lg" className="font-medium">
              Add to Cart • ${calculateTotalPrice().toFixed(2)}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
