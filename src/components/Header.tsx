import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ThemeToggle"
import { useNavigate } from "react-router-dom"

export function Header() {
  const navigate = useNavigate()

  return (
    <header className="w-full border-b bg-background/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer" 
          onClick={() => navigate('/')}
        >
          <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">T</span>
          </div>
          <span className="text-xl font-bold">TEadify</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <Button variant="ghost">Background</Button>
          <Button variant="ghost">Black</Button>
          <Button variant="ghost">White</Button>
          <ThemeToggle />
          <Button variant="outline" onClick={() => navigate('/signin')}>
            Sign In
          </Button>
        </nav>
      </div>
    </header>
  )
}