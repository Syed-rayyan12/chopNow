"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SupportSection() {
  return (
    <div className="space-y-6">
      <Card className="border-orange-200 bg-white">
        <CardHeader>
          <CardTitle className="text-orange-800">Contact Admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject" className="pb-2">
              Subject
            </Label>
            <Input className="border-orange-200" id="subject" placeholder="Enter subject" />
          </div>
          <div>
            <Label htmlFor="message" className="pb-2">
              Message
            </Label>
            <Textarea
              className="border-orange-200"
              id="message"
              placeholder="Describe your issue or question"
              rows={4}
            />
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">Send Message</Button>
        </CardContent>
      </Card>

      <Card className="border-orange-200 bg-white">
        <CardHeader>
          <CardTitle className="text-orange-800">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-orange-600">How do I update my menu items?</h4>
            <p className="text-sm text-gray-500">
              Go to Menu Management section and click on the edit button next to any item.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-orange-600">When do I receive payments?</h4>
            <p className="text-sm text-gray-500">
              Payments are processed weekly every Monday for the previous week's orders.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-orange-600">How do I handle order cancellations?</h4>
            <p className="text-sm text-gray-500">
              You can cancel orders from the Orders section before they are marked as in-progress.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
