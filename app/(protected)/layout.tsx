
interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen w-screen">
      
      <main className="flex-1 overflow-y-auto bg-background px-20 py-10">
        {children}
      </main>

    </div>
  )
}