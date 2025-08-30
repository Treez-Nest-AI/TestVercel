import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { CheckCircle, Sparkles, BarChart3, Target } from "lucide-react"

export default function Success() {
  const navigate = useNavigate()

  const handleViewDashboard = () => {
    navigate('/dashboard')
  }

  const handleCreateNew = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            {/* Success Animation */}
            <div className="relative">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
                Congratulations!
              </h1>
              <h2 className="text-2xl font-semibold">Campaign Created Successfully</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Your campaign is now live and actively reaching your target audience. 
                You can monitor performance and make adjustments anytime from your dashboard.
              </p>
            </div>

            {/* Campaign Details */}
            <Card className="border shadow-glow max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Target className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Campaign Active</h3>
                    <p className="text-sm text-muted-foreground">3 Ad Sets Running</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Budget Allocated</h3>
                    <p className="text-sm text-muted-foreground">$120/day</p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Estimated Reach</h3>
                    <p className="text-sm text-muted-foreground">20.7K people</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
                  <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-semibold text-sm">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Monitor Performance</h4>
                      <p className="text-sm text-muted-foreground">Track clicks, impressions, and conversions in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Optimize Campaigns</h4>
                      <p className="text-sm text-muted-foreground">Adjust targeting and budgets based on performance data</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button onClick={handleViewDashboard} size="lg" className="px-8">
                  View Dashboard
                </Button>
                <Button onClick={handleCreateNew} variant="outline" size="lg" className="px-8">
                  Create New Campaign
                </Button>
              </div>

              <p className="text-sm text-muted-foreground">
                Need help? Contact our support team or check our{" "}
                <button className="text-primary hover:underline">help center</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}