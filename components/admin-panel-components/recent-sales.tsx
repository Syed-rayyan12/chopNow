import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const salesData = [
  {
    name: "John Doe",
    avatar: "/user-avatar-1.png",
    fallback: "JD",
    items: "Jollof Rice + Egusi Soup",
    amount: "+£24.50",
  },
  {
    name: "Sarah Miller",
    avatar: "/user-avatar-2.png",
    fallback: "SM",
    items: "Pepper Soup + Plantain",
    amount: "+£18.75",
  },
  {
    name: "Michael Johnson",
    avatar: "/user-avatar-3.png",
    fallback: "MJ",
    items: "Curry Combo",
    amount: "+£32.00",
  },
  {
    name: "Lisa Wilson",
    avatar: "/user-avatar-4.png",
    fallback: "LW",
    items: "Okra Soup Special",
    amount: "+£21.25",
  },
  {
    name: "David Brown",
    avatar: "/user-avatar-5.png",
    fallback: "DB",
    items: "Mixed Grill Platter",
    amount: "+£45.00",
  },
]

export function RecentSales() {
  return (
    <div className="space-y-4">
      {salesData.map((sale, index) => (
        <div key={index} className="flex items-center border border-orange-200 rounded-lg shadow p-3">
          <Avatar className="h-9 w-9">
            <AvatarImage className="bg-orange-50" src={sale.avatar} alt={sale.name} />
            <AvatarFallback>{sale.fallback}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none text-amber-900">
              {sale.name}
            </p>
            <p className="text-sm text-amber-700">{sale.items}</p>
          </div>
          <div className="ml-auto font-medium text-amber-900">{sale.amount}</div>
        </div>
      ))}
    </div>
  )
}
