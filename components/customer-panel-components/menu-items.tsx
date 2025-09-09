"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

import { Star, Plus } from "lucide-react"
import type { MenuItem } from "@/app/restaurant/[id]/page"
import { MenuItemModal } from "./menu-item-modal"

interface MenuItemsProps {
  items: MenuItem[]
  categoryName: string
  onAddToCart: (item: MenuItem, customizations: any, quantity: number) => void
}

export function MenuItems({ items, categoryName, onAddToCart }: MenuItemsProps) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)

  if (items.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="font-heading font-bold text-2xl text-foreground mb-4">{categoryName}</h2>
        <p className="text-muted-foreground">No items available in this category</p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="font-heading font-bold text-2xl text-secondary mb-6">{categoryName}</h2>
      <div className="grid gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            className="group cursor-pointer  transition-all duration-300 bg-[#0F3D2E]"
            onClick={() => setSelectedItem(item)}
          >
            <CardContent className="p-0">
              <div className="flex flex-col sm:flex-row">
                <div className="flex-1 p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-heading font-semibold text-lg text-white">{item.name}</h3>
                        {item.popular && (
                          <Badge className="bg-primary border border-white p-[6px]">
                            <Star className="w-3 h-3 mr-1" />
                            Popular
                          </Badge>
                        )}
                      </div>
                      <p className="text-white text-sm mb-3 line-clamp-2">{item.description}</p>
                      <p className="font-heading font-bold text-lg text-white">${item.price.toFixed(2)}</p>
                    </div>
                  </div>

                  {item.customizations.length > 0 && (
                    <p className="text-xs text-white mb-3">Customization available</p>
                  )}

                  <Button
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      if (item.customizations.length > 0) {
                        setSelectedItem(item)
                      } else {
                        onAddToCart(item, {}, 1)
                      }
                    }}
                    className=" bg-white hover:bg-secondary hover:text-white text-foreground"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>

                <div className="w-full sm:w-48 h-48 sm:h-auto relative overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Menu Item Modal */}
      {selectedItem && (
        <MenuItemModal
          item={selectedItem}
          isOpen={!!selectedItem}
          onClose={() => setSelectedItem(null)}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  )
}
