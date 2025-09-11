"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Search, Plus, Edit, Trash2 } from "lucide-react"
import { MenuItem } from "@/types/menu"
import { EditModal } from "./editModal"
import { DeleteModal } from "./deleteModal"


// ✅ Import your modal


export function MenuManagementSection() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [menuSearchQuery, setMenuSearchQuery] = useState("")
  const [showAddMenuItem, setShowAddMenuItem] = useState(false)
  const [newMenuItem, setNewMenuItem] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    available: true,
    image: "",
  })
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  // ✅ For editing
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const toggleMenuItemAvailability = (id: string) => {
    setMenuItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, available: !item.available } : item
      )
    )
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const resetForm = () => {
    setNewMenuItem({
      name: "",
      description: "",
      category: "",
      price: "",
      available: true,
      image: "",
    })
    setSelectedImage(null)
    setImagePreview("")
  }

  const handleAddMenuItem = () => {
    if (newMenuItem.name && newMenuItem.category && newMenuItem.price) {
      const newItem: MenuItem = {
        id: Date.now().toString(),
        name: newMenuItem.name,
        category: newMenuItem.category,
        price: Number.parseFloat(newMenuItem.price),
        available: newMenuItem.available,
        image: imagePreview || "/vibrant-food-dish.png",
        description: newMenuItem.description,
      }
      setMenuItems((prev) => [...prev, newItem])
      resetForm()
      setShowAddMenuItem(false)
    }
  }

  const handleEdit = (item: MenuItem) => {
    setSelectedItem(item)
    setIsEditOpen(true)
  }

  const handleDelete = (id: string) => {
    setMenuItems(prev => prev.filter(item => item.id !== id))
    setIsDeleteOpen(false)
    setSelectedItem(null)
  }

  const handleSave = (updatedItem: MenuItem) => {
    setMenuItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    )
  }

  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(menuSearchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(menuSearchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-secondary">Menu Management</h2>
        <Dialog
          open={showAddMenuItem}
          onOpenChange={(open) => {
            setShowAddMenuItem(open)
            if (!open) resetForm()
          }}
        >
          <DialogTrigger asChild>
            <Button className="bg-secondary hover:bg-[#0F3D2E] text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add New Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Menu Item</DialogTitle>
              <DialogDescription>
                Fill in the details for your new menu item.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Enter item name"
                  value={newMenuItem.name}
                  onChange={(e) =>
                    setNewMenuItem((prev) => ({ ...prev, name: e.target.value }))
                  }
                  className=" "
                />
              </div>
              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter item description"
                  value={newMenuItem.description}
                  onChange={(e) =>
                    setNewMenuItem((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Input
                  id="category"
                  placeholder="Enter category (e.g., Pizza, Burgers, Salads)"
                  value={newMenuItem.category}
                  onChange={(e) =>
                    setNewMenuItem((prev) => ({
                      ...prev,
                      category: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.00"
                  value={newMenuItem.price}
                  onChange={(e) =>
                    setNewMenuItem((prev) => ({
                      ...prev,
                      price: e.target.value,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="image">Image</Label>
                <div className="space-y-2">
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="cursor-pointer"
                  />
                  {imagePreview && (
                    <div className="flex justify-center">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-20 h-20 rounded-lg object-cover border-2 border-orange-200"
                      />
                    </div>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available"
                  checked={newMenuItem.available}
                  onCheckedChange={(checked) =>
                    setNewMenuItem((prev) => ({ ...prev, available: checked }))
                  }
                />
                <Label htmlFor="available">Available</Label>
              </div>
              <Button
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={handleAddMenuItem}
              >
                Add Item
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform  -translate-y-1/2 text-secondary h-4 w-4" />
          <Input
            placeholder="Search menu items..."
            value={menuSearchQuery}
            onChange={(e) => setMenuSearchQuery(e.target.value)}
            className="pl-10 border-secondary/50 bg-white"
          />
        </div>
        {menuSearchQuery && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setMenuSearchQuery("")}
            className="text-orange-600 border-orange-200 hover:bg-orange-50"
          >
            Clear
          </Button>
        )}
      </div>

      {/* Table */}
      <Card className="border-orange-200 bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-secondary">
                <tr>
                  <th className="text-left p-4 font-medium text-secondary">
                    Photo
                  </th>
                  <th className="text-left p-4 font-medium text-secondary">
                    Name
                  </th>
                  <th className="text-left p-4 font-medium text-secondary">
                    Category
                  </th>
                  <th className="text-left p-4 font-medium text-secondary">
                    Price
                  </th>
                  <th className="text-left p-4 font-medium text-secondary">
                    Available
                  </th>
                  <th className="text-left p-4 font-medium text-secondary">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredMenuItems.length > 0 ? (
                  filteredMenuItems.map((item) => (
                    <tr key={item.id} className="border-b border-orange-100">
                      <td className="p-4">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                      </td>
                      <td className="p-4 font-bold text-secondary">
                        {item.name}
                      </td>
                      <td className="p-4 text-secondary">{item.category}</td>
                      <td className="p-4 font-bold text-secondary">
                        ${item.price}
                      </td>
                      <td className="p-4">
                        <Switch
                          checked={item.available}
                          onCheckedChange={() =>
                            toggleMenuItemAvailability(item.id)
                          }
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(item)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => {
                              setSelectedItem(item)     // store the item to delete
                              setIsDeleteOpen(true)  // open the delete modal
                            }}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="p-8 text-center text-gray-500"
                    >
                      {menuSearchQuery
                        ? "No menu items found matching your search."
                        : "No menu items available."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* ✅ Edit Modal */}
      {selectedItem && (
        <EditModal
          open={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          item={selectedItem}
          onSave={handleSave}
        />
      )}

      {selectedItem && (
        <DeleteModal
          open={isDeleteOpen}
          onClose={() => setIsDeleteOpen(false)}
          item={selectedItem}
          onDelete={handleDelete}
        />
      )}
    </div>
  )
}
