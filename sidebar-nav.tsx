"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Icons } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/actions"

const navigation = [
  {
    name: "მთავარი",
    href: "/dashboard",
    icon: Icons.LayoutDashboard,
  },
  {
    name: "ტენდერები",
    href: "/tenders",
    icon: Icons.FileText,
  },
  {
    name: "ანალიტიკა",
    href: "/analytics",
    icon: Icons.BarChart3,
  },
  {
    name: "კონსულტანტი",
    href: "/advisor",
    icon: Icons.MessageSquare,
  },
  {
    name: "რეპორტები",
    href: "/reports",
    icon: Icons.FileBarChart,
  },
  {
    name: "პარამეტრები",
    href: "/settings",
    icon: Icons.Settings,
  },
]

interface SidebarNavProps {
  className?: string
}

export function SidebarNav({ className }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className={cn("flex flex-col space-y-2", className)}>
      {navigation.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive ? "bg-blue-100 text-blue-900" : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
            )}
          >
            <item.icon />
            {item.name}
          </Link>
        )
      })}

      <div className="pt-4 mt-4 border-t border-gray-200">
        <form action={signOut}>
          <Button
            type="submit"
            variant="ghost"
            className="w-full justify-start gap-3 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
          >
            <Icons.LogOut />
            გასვლა
          </Button>
        </form>
      </div>
    </nav>
  )
}
