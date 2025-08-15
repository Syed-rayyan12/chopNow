"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, Store } from "lucide-react"

interface AddRestaurantModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddRestaurantModal({ isOpen, onClose }: AddRestaurantModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    cuisine: "",
    address: "",
    phone: "",
    email: "",
    description: "",
    openingHours: "",
    minimumOrder: "",
    commission: "",
    deliveryTime: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Adding new restaurant:", formData)
    // Here you would typically make an API call to add the restaurant
    onClose()
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl text-orange-800 flex items-center">
            <Store className="w-6 h-6 mr-2" />
            Add New Restaurant
          </DialogTitle>
          <DialogDescription className="text-amber-600">
            Add a new restaurant partner to the ChopNow platform
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Basic Information */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-orange-700">
                    Restaurant Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter restaurant name"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="cuisine" className="text-orange-700">
                    Cuisine Type *
                  </Label>
                  <Select value={formData.cuisine} onValueChange={(value) => handleInputChange("cuisine", value)}>
                    <SelectTrigger className="border-orange-200">
                      <SelectValue placeholder="Select cuisine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Indian">Indian</SelectItem>
                      <SelectItem value="African">African</SelectItem>
                      <SelectItem value="Chinese">Chinese</SelectItem>
                      <SelectItem value="Italian">Italian</SelectItem>
                      <SelectItem value="Mexican">Mexican</SelectItem>
                      <SelectItem value="Thai">Thai</SelectItem>
                      <SelectItem value="Mediterranean">Mediterranean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="description" className="text-orange-700">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of the restaurant"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    rows={3}
                  />
                </div>

                <div>
                  <Label className="text-orange-700">Restaurant Image</Label>
                  <div className="border-2 border-dashed border-orange-200 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-orange-400 mx-auto mb-2" />
                    <p className="text-sm text-amber-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-amber-500">PNG, JPG up to 5MB</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card className="border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-800">Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-orange-700">
                    Address *
                  </Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Full restaurant address"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    rows={2}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-orange-700">
                    Phone Number *
                  </Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+44 20 1234 5678"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-orange-700">
                    Email Address *
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="restaurant@example.com"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="openingHours" className="text-orange-700">
                    Opening Hours *
                  </Label>
                  <Input
                    id="openingHours"
                    value={formData.openingHours}
                    onChange={(e) => handleInputChange("openingHours", e.target.value)}
                    placeholder="11:00 AM - 10:00 PM"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    required
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Business Settings */}
          <Card className="border-orange-200">
            <CardHeader>
              <CardTitle className="text-orange-800">Business Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="minimumOrder" className="text-orange-700">
                    Minimum Order (£) *
                  </Label>
                  <Input
                    id="minimumOrder"
                    type="number"
                    step="0.01"
                    value={formData.minimumOrder}
                    onChange={(e) => handleInputChange("minimumOrder", e.target.value)}
                    placeholder="15.00"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="commission" className="text-orange-700">
                    Commission Rate (%) *
                  </Label>
                  <Input
                    id="commission"
                    type="number"
                    step="0.1"
                    value={formData.commission}
                    onChange={(e) => handleInputChange("commission", e.target.value)}
                    placeholder="15.0"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="deliveryTime" className="text-orange-700">
                    Delivery Time *
                  </Label>
                  <Input
                    id="deliveryTime"
                    value={formData.deliveryTime}
                    onChange={(e) => handleInputChange("deliveryTime", e.target.value)}
                    placeholder="25-35 min"
                    className="border-orange-200 focus:border-orange-400 focus:ring-orange-400"
                    required
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-orange-200">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-orange-200 text-orange-700 hover:bg-orange-50 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
              Add Restaurant
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
