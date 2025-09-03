"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download } from "lucide-react"

interface Transaction {
  id: string
  orderId: string
  amount: number
  date: string
  status: "completed" | "pending"
}

interface EarningsSectionProps {
  transactions: Transaction[]
}

export function EarningsSection({ transactions }: EarningsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-secondary/70 bg-white">
          <CardHeader>
            <CardTitle className="text-foreground">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">$342.50</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/70 bg-white">
          <CardHeader>
            <CardTitle className="text-foreground">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">$1,250.00</div>
          </CardContent>
        </Card>
        <Card className="border-secondary/70 bg-white">
          <CardHeader>
            <CardTitle className="text-foreground">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">$4,890.00</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-secondary/70 bg-white">
        <CardHeader className="flex max-sm:flex-col max-sm:items-start max-sm:gap-3 flex-row items-center justify-between">
          <CardTitle className="text-secondary">Transaction History</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="border-secondary/65 text-secondary hover:bg-secondary bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button size="sm" variant="outline" className="border-secondary/65 text-secondary hover:bg-secondary bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b border-orange-200">
                <tr>
                  <th className="text-left p-3 font-medium text-secondary">Order ID</th>
                  <th className="text-left p-3 font-medium text-secondary">Date</th>
                  <th className="text-left p-3 font-medium text-secondary">Amount</th>
                  <th className="text-left p-3 font-medium text-secondary">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-orange-50 border-secondary/50">
                    <td className="p-3 font-medium text-orange-800">#{transaction.orderId}</td>
                    <td className="p-3 text-orange-700">{transaction.date}</td>
                    <td className="p-3 font-medium text-orange-800">${transaction.amount}</td>
                    <td className="p-3">
                      <Badge
                        className={
                          transaction.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-amber-100 text-amber-700"
                        }
                      >
                        {transaction.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
