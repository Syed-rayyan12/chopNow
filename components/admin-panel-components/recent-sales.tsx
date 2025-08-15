import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user-avatar-1.png" alt="Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-amber-900">John Doe</p>
          <p className="text-sm text-amber-700">Jollof Rice + Egusi Soup</p>
        </div>
        <div className="ml-auto font-medium text-amber-900">+£24.50</div>
      </div>
      <div className="flex items-center">
        <Avatar className="flex h-9 w-9 items-center justify-center space-y-0 border">
          <AvatarImage src="/user-avatar-2.png" alt="Avatar" />
          <AvatarFallback>SM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-amber-900">Sarah Miller</p>
          <p className="text-sm text-amber-700">Pepper Soup + Plantain</p>
        </div>
        <div className="ml-auto font-medium text-amber-900">+£18.75</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user-avatar-3.png" alt="Avatar" />
          <AvatarFallback>MJ</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-amber-900">Michael Johnson</p>
          <p className="text-sm text-amber-700">Curry Combo</p>
        </div>
        <div className="ml-auto font-medium text-amber-900">+£32.00</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user-avatar-4.png" alt="Avatar" />
          <AvatarFallback>LW</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-amber-900">Lisa Wilson</p>
          <p className="text-sm text-amber-700">Okra Soup Special</p>
        </div>
        <div className="ml-auto font-medium text-amber-900">+£21.25</div>
      </div>
      <div className="flex items-center">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/user-avatar-5.png" alt="Avatar" />
          <AvatarFallback>DB</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none text-amber-900">David Brown</p>
          <p className="text-sm text-amber-700">Mixed Grill Platter</p>
        </div>
        <div className="ml-auto font-medium text-amber-900">+£45.00</div>
      </div>
    </div>
  )
}
