"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Reply } from "lucide-react"

interface Review {
  id: string
  customerName: string
  rating: number
  comment: string
  date: string
  replied: boolean
}

interface ReviewsSectionProps {
  reviews: Review[]
}

export function ReviewsSection({ reviews }: ReviewsSectionProps) {
  return (
    <div className="space-y-6">
      <Card className="border-orange-200">
        <CardHeader>
          <CardTitle className="text-orange-700">Average Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2">
            <div className="text-3xl font-bold text-orange-800">4.5</div>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${star <= 4 ? "text-orange-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="text-gray-600">(24 reviews)</span>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id} className="border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="font-semibold">{review.customerName}</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${star <= review.rating ? "text-orange-400 fill-current" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  {review.replied && (
                    <div className="bg-orange-50 p-3 rounded-lg border-l-4 border-orange-400">
                      <p className="text-sm text-orange-700">
                        Thank you for your feedback! We're glad you enjoyed your meal.
                      </p>
                    </div>
                  )}
                </div>
                {!review.replied && (
                  <Button size="sm" variant="outline">
                    <Reply className="h-4 w-4 mr-1" />
                    Reply
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
