"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { useState, useEffect } from "react"
import { MenuItem } from "@/types/menu"


interface EditMenuItemModalProps {
  open: boolean
  onClose: () => void
  item: MenuItem | null
  onSave: (updatedItem: MenuItem) => void
}

export  function EditModal({
  open,
  onClose,
  item,
  onSave,
}: EditMenuItemModalProps) {
  const [editItem, setEditItem] = useState<MenuItem | null>(item)
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  // Sync item into local state when modal opens
  useEffect(() => {
    if (item) {
      setEditItem(item)
      setImagePreview(item.image || null)
    }
  }, [item])

  // Image upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setEditItem((prev) =>
          prev ? { ...prev, image: reader.result as string } : null
        )
      }
      reader.readAsDataURL(file)
    }
  }

  // Save handler
  const handleSave = () => {
    if (editItem) {
      onSave(editItem)
      onClose()
    }
  }

  if (!editItem) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Edit Menu Item</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Name */}
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={editItem.description}
              onChange={(e) =>
                setEditItem({ ...editItem, description: e.target.value })
              }
            />
          </div>

          {/* Category */}
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={editItem.category}
              onChange={(e) =>
                setEditItem({ ...editItem, category: e.target.value })
              }
            />
          </div>

          {/* Price */}
          <div>
            <Label htmlFor="price">Price</Label>
            <Input
              id="price"
              type="number"
              value={editItem.price}
              onChange={(e) =>
                setEditItem({
                  ...editItem,
                  price: parseFloat(e.target.value) || 0,
                })
              }
            />
          </div>

          {/* Image */}
          <div>
            <Label htmlFor="image">Image</Label>
            <div className="space-y-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
              {imagePreview && (
                <div className="flex justify-center">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 rounded-lg object-cover border-2 border-orange-200"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Availability */}
          <div className="flex items-center space-x-2">
            <Switch
              id="available"
              checked={editItem.available}
              onCheckedChange={(checked) =>
                setEditItem({ ...editItem, available: checked })
              }
            />
            <Label htmlFor="available">Available</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-orange-600 hover:bg-orange-700"
            onClick={handleSave}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
