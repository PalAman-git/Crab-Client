import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import { Button } from '../ui/button'
const Navbar = () => {
  return (
    <header className="h-16 border-b bg-background flex items-center justify-between px-6">

      {/* Right */}
      <div className="flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-muted" />
      </div>

      <ThemeToggle />
    </header>
  )
}

export default Navbar