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
        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-800">Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">$342.50</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-800">This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-800">$1,250.00</div>
          </CardContent>
        </Card>
        <Card className="border-orange-200 bg-white">
          <CardHeader>
            <CardTitle className="text-orange-800">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-800">$4,890.00</div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-orange-200 bg-white">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-orange-800">Transaction History</CardTitle>
          <div className="flex space-x-2">
            <Button size="sm" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button size="sm" variant="outline">
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
                  <th className="text-left p-3 font-medium text-orange-800">Order ID</th>
                  <th className="text-left p-3 font-medium text-orange-800">Date</th>
                  <th className="text-left p-3 font-medium text-orange-800">Amount</th>
                  <th className="text-left p-3 font-medium text-orange-800">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b hover:bg-orange-50 border-orange-100">
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
