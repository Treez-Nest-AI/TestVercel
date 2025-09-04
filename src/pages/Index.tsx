import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux" // Added useSelector import
import { Input } from "@/components/ui/input"
import { Header } from "@/components/Header"
import { FeatureCard } from "@/components/FeatureCard"
import { Zap, BarChart3, DollarSign, AlertCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/contexts/AuthContext"
import { toast } from "sonner"
import { Footer } from "@/pages/Footer"
import { updateCampaignField } from "@/store/campaignSlice.js"

const Index = () => {
  const dispatch = useDispatch()
  // Get businessUrl from Redux store, with proper typing to avoid TS error
  const businessUrl = useSelector((state: any) => state.campaign?.campaignDetails?.businessUrl)
  
  const navigate = useNavigate()
  const { isAuthenticated, isLoading } = useAuth()
  const [urlError, setUrlError] = useState("")
  const [isValidating, setIsValidating] = useState(false)

  useEffect(() => {
    // Pre-fill URL if user has already entered one and it's not in Redux yet
    if (isAuthenticated && !isLoading && !businessUrl) {
      const saved = localStorage.getItem('businessUrl')
      if (saved) {
        // Update Redux with saved URL
        dispatch(updateCampaignField({ field: 'businessUrl', value: saved }))
      }
    }
  }, [isAuthenticated, isLoading, businessUrl, dispatch])

  // If user is authenticated and has completed setup, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const setupComplete = localStorage.getItem('setupComplete')
      if (setupComplete === 'true') {
        navigate('/dashboard')
        return
      }
    }
  }, [isAuthenticated, isLoading, navigate])

  const validateUrl = (url) => {
    // Basic URL validation
    const urlPattern = /^https?:\/\/.+\..+/i
    if (!urlPattern.test(url)) {
      return false
    }
    
    // Check if it's a proper domain
    try {
      const urlObj = new URL(url)
      const domain = urlObj.hostname
      const domainParts = domain.split('.')
      
      // Must have at least 2 parts (e.g., example.com)
      if (domainParts.length < 2) {
        return false
      }
      
      // Check if TLD is at least 2 characters
      if (domainParts[domainParts.length - 1].length < 2) {
        return false
      }
      
      return true
    } catch {
      return false
    }
  }

  const handleAnalyze = async () => {
    const trimmedUrl = businessUrl.trim()
    
    if (!trimmedUrl) {
      setUrlError("Please enter a business URL")
      return
    }

    if (!validateUrl(trimmedUrl)) {
      setUrlError("Please enter a valid URL (e.g., https://example.com)")
      return
    }

    setIsValidating(true)
    setUrlError("")

    try {
      // Simulate URL validation delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Store the URL in localStorage for persistence and Redux for state management
      localStorage.setItem('businessUrl', trimmedUrl)
      // Redux already has the latest value since we update it on every change
      
      if (isAuthenticated) {
        // User is already signed in - check if they have completed initial setup
        const hasBusinessDetails = localStorage.getItem('businessDetails')
        const hasCompletedInitialSetup = localStorage.getItem('hasCompletedInitialSetup')
        
        if (hasBusinessDetails && hasCompletedInitialSetup) {
          // User has completed initial setup - skip business details, go directly to pricing
          navigate('/pricing')
        } else if (hasBusinessDetails) {
          // User has business details but hasn't completed initial setup - go to business details
          navigate('/business-details')
        } else {
          // First time authenticated user - go to business details
          navigate('/business-details')
        }
      } else {
        // User not signed in - go to sign in first
        navigate('/signin')
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsValidating(false)
    }
  }

  const handleConnectToMeta = () => {
    // Simulate Meta connection process
    toast.success("Connecting to Meta...")
    
    // Store completion status
    localStorage.setItem('setupComplete', 'true')
    
    // Redirect to dashboard after successful connection
    setTimeout(() => {
      navigate('/dashboard')
    }, 2000)
  }

  const handleUrlChange = (e) => {
    const value = e.target.value
    
    // Update Redux store immediately
    dispatch(updateCampaignField({ field: 'businessUrl', value }))
    
    // Clear error when user starts typing
    if (urlError) {
      setUrlError("")
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAnalyze()
    }
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
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
          Automated Ad Campaigns Powered by {" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">
            TEadify
            </span>{" "}
            
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-3xl mx-auto">
          Turn a single URL into fully-optimized Meta & Google ads. TEadify learns, adapts, and scales your reach with AI precision
          </p>

          {/* URL Input Section - Simple Interface */}
          <div className="">
            <h2 className="text-2xl font-semibold mb-4">Get Started in Seconds</h2>
            <p className="text-muted-foreground mb-6">Enter your business URL to begin creating powerful ad campaigns</p>
            
            <div className="space-y-4 mt-12">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="https://your-business-website.com"
                    value={businessUrl}
                    onChange={handleUrlChange}
                    onKeyPress={handleKeyPress}
                    className={`h-12 text-base  border border-gray-300  ${urlError ? 'border-red-500 focus:border-red-500' : ''}`}
                  />
                  {urlError && (
                    <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>{urlError}</span>
                    </div>
                  )}
                </div>
                <Button 
                  onClick={handleAnalyze}
                  variant="hero"
                  size="lg"
                  className="h-12 px-8"
                  disabled={isValidating}
                >
                  {isValidating ? "Analyzing..." : "Analyze"}
                </Button>
              </div>
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
      <Footer />
    </div>
  )
};

export default Index;