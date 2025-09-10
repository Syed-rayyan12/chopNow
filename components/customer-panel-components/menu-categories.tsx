"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface MenuCategoriesProps {
  categories: { id: string; name: string; itemCount: number }[]
  selectedCategory: string
  onCategoryChange: (categoryId: string) => void
}

export function MenuCategories({ categories, selectedCategory, onCategoryChange }: MenuCategoriesProps) {
  return (
    <Card className="sticky top-24 border border-secondary/50 bg-white">
      <CardContent className="p-4">
        <h2 className="font-heading font-semibold text-lg  text-foreground mb-4">Menu Categories</h2>
        <div className="space-y-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "secondary" : "white"}
              className="w-full justify-between"
              onClick={() => onCategoryChange(category.id)}
            >
              <span className={selectedCategory === category.id ? "text-white" : "opacity/70"}>{category.name}</span>
              <span className={`text-xs ${selectedCategory === category.id ? "text-white" : "opacity/70"}`}>({category.itemCount})</span>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
