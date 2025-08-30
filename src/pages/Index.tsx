import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Header } from "@/components/Header"
import { FeatureCard } from "@/components/FeatureCard"
import { Zap, BarChart3, DollarSign } from "lucide-react"
import { useNavigate } from "react-router-dom"

const Index = () => {
  const navigate = useNavigate()
  const [businessUrl, setBusinessUrl] = useState("")

  const handleAnalyze = () => {
    if (!businessUrl.trim()) {
      return
    }
    // Redirect to sign in page since user is not authenticated
    navigate('/signin')
  }

  const features = [
    {
      icon: Zap,
      title: "AI-Powered Optimization",
      description: "Our AI analyzes your business and creates optimized ad campaigns that drive real results."
    },
    {
      icon: BarChart3,
      title: "Real-Time Analytics", 
      description: "Track performance with detailed analytics and insights to maximize your ROI."
    },
    {
      icon: DollarSign,
      title: "Budget Control",
      description: "Set your budget and let our AI optimize spending for maximum reach and conversions."
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Amplify Your Business with{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              AI-Powered
            </span>{" "}
            Ad Campaigns
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
            Transform your business reach with intelligent ad campaigns. TEadify uses advanced AI to create, optimize, and manage your Meta advertising campaigns for maximum impact.
          </p>

          {/* URL Input Section */}
          <div className="bg-card rounded-2xl p-8 shadow-glow border max-w-2xl mx-auto mb-16">
            <h2 className="text-2xl font-semibold mb-4">Get Started in Seconds</h2>
            <p className="text-muted-foreground mb-6">Enter your business URL to begin creating powerful ad campaigns</p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="https://your-business-website.com"
                value={businessUrl}
                onChange={(e) => setBusinessUrl(e.target.value)}
                className="flex-1 h-12 text-base"
              />
              <Button 
                onClick={handleAnalyze}
                variant="hero"
                size="lg"
                className="h-12 px-8"
              >
                Start Campaign
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 mt-4 text-sm text-muted-foreground">
              <span>• No credit card required</span>
              <span>• Free campaign analysis</span>
              <span>• Setup in under 5 minutes</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </div>
  )
};

export default Index;
