'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Settings,
  CircleFadingArrowUp,
  NotepadText,
  Check
} from 'lucide-react'
import Image from "next/image"

const Sidebar = () => {
  const pathname = usePathname()

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/attentions', label: 'Attentions', icon: NotepadText },
    { href: '/clients', label: 'Clients', icon: Users },
    { href: '/invoices', label: 'Invoices', icon: CreditCard },
    { href: '/upgrade', label: 'Upgrade', icon: CircleFadingArrowUp },
    { href: '/completed', label: 'Completed', icon: Check }
  ]

  return (
    <aside className="hidden md:flex w-64 flex-col border-r bg-background">
      {/* Logo */}
      <div className="h-16 flex items-center justify-center px-6 font-semibold">
        <Image src={'/crabClient.svg'} height={100} width={200} alt="Crab client logo" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            pathname.startsWith(item.href + '/')

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition',
                isActive
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom */}
      <div className="p-3 border-t">
        <Link
          href="/settings"
          className="flex items-center gap-3 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted"
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </div>
    </aside>
  )
}

export default Sidebar