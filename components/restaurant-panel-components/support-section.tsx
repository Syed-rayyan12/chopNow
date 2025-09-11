"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function SupportSection() {
  return (
    <div className="space-y-6">
      <Card className="border-secondary/50 bg-white">
        <CardHeader>
          <CardTitle className="text-secondary">Contact Admin</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="subject" className="pb-2 text-foreground">
              Subject
            </Label>
            <Input className="border-secondary/50" id="subject" placeholder="Enter subject" />
          </div>
          <div>
            <Label htmlFor="message" className="pb-2 text-foreground">
              Message
            </Label>
            <Textarea
              className="border-secondary/50"
              id="message"
              placeholder="Describe your issue or question"
              rows={4}
            />
          </div>
          <Button className="bg-orange-500 cursor-pointer hover:bg-secondary/80">Send Message</Button>
        </CardContent>
      </Card>

      <Card className="border-secondary/70 bg-white">
        <CardHeader>
          <CardTitle className="text-secondary">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-secondary/90">How do I update my menu items?</h4>
            <p className="text-sm text-foreground">
              Go to Menu Management section and click on the edit button next to any item.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-secondary/90">When do I receive payments?</h4>
            <p className="text-sm text-foreground">
              Payments are processed weekly every Monday for the previous week's orders.
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-secondary/90">How do I handle order cancellations?</h4>
            <p className="text-sm text-foreground">
              You can cancel orders from the Orders section before they are marked as in-progress.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
