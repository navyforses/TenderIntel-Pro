interface User {
  email?: string
  user_metadata?: {
    full_name?: string
  }
}

import { MobileNav } from "./mobile-nav"
import { UserNav } from "./user-nav"
import { Icons } from "@/lib/icons"
import { Button } from "@/components/ui/button"

interface DashboardHeaderProps {
  user: User
}

export function DashboardHeader({ user }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <div className="flex h-16 items-center gap-4 px-4 md:px-6">
        <MobileNav />

        <div className="hidden md:flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">TenderIntel Pro</h1>
        </div>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Icons.Bell />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full text-xs"></span>
            <span className="sr-only">შეტყობინებები</span>
          </Button>

          <UserNav user={user} />
        </div>
      </div>
    </header>
  )
}
