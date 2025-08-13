"use client"

import { useState } from "react"
import { Icons } from "@/lib/icons"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { SidebarNav } from "./sidebar-nav"

export function MobileNav() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Icons.Menu />
          <span className="sr-only">მენიუს გახსნა</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex h-full flex-col">
          <div className="flex h-16 items-center justify-between px-6 border-b">
            <h2 className="text-lg font-semibold">TenderIntel Pro</h2>
            <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
              <Icons.X />
            </Button>
          </div>
          <div className="flex-1 overflow-auto p-6">
            <SidebarNav />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
