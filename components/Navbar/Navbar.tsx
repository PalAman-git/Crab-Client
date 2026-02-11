'use client'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const pathname = usePathname();

  const pathMapper:Record<string,string> = {
    "/dashboard": 'Dashboard',
    "/today": 'Today',
    '/upcoming': 'Upcoming',
    '/clients': 'Clients',
    '/upgrade': 'Upgrade',
    '/overdue': 'Overdue',
    '/invoices': 'Invoices'
  }
  return (
    <header className="h-16 border-b bg-muted/40 flex items-center justify-between px-6">

      {/* Right */}
      <div className="flex font-medium text-xl items-center gap-3">
        {pathMapper[pathname]}
      </div>

      <ThemeToggle />
    </header>
  )
}

export default Navbar