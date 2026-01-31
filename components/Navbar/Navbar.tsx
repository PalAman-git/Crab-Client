import { Button } from '../ui/button'
const Navbar = () => {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">
      {/* Left */}
      <div className="flex items-center gap-3">
        <h1 className="font-medium">Dashboard</h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        <Button size="sm">+ New Attention</Button>

        {/* User menu placeholder */}
        <div className="h-8 w-8 rounded-full bg-muted" />
      </div>
    </header>
  )
}

export default Navbar