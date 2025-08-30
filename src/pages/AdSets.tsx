import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { Eye, Edit, Trash2, Users, Target, DollarSign } from "lucide-react"

export default function AdSets() {
  const navigate = useNavigate()

  const adSets = [
    {
      id: 1,
      name: "Demographic Targeting - Age 25-45",
      status: "Active",
      budget: "$50/day",
      reach: "12.5K",
      clicks: "234",
      ctr: "1.87%",
      cost: "$45.20",
      targeting: "Age: 25-45, Interests: Technology, Shopping"
    },
    {
      id: 2,
      name: "Interest-Based Targeting - Tech Enthusiasts",
      status: "Active", 
      budget: "$30/day",
      reach: "8.2K",
      clicks: "156",
      ctr: "1.90%",
      cost: "$28.50",
      targeting: "Interests: Technology, Gadgets, Electronics"
    },
    {
      id: 3,
      name: "Lookalike Audience - Website Visitors",
      status: "Pending",
      budget: "$40/day",
      reach: "0",
      clicks: "0",
      ctr: "0%",
      cost: "$0",
      targeting: "Lookalike: Website visitors (1%)"
    }
  ]

  const handleNext = () => {
    navigate('/final-payment')
  }

  const handleBack = () => {
    navigate('/campaign-setup')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Your Ad Sets</h1>
            <p className="text-muted-foreground">
              Review and manage your campaign ad sets. Each ad set targets different audiences for optimal performance.
            </p>
          </div>

          <div className="space-y-6">
            {adSets.map((adSet) => (
              <Card key={adSet.id} className="border shadow-glow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <CardTitle className="text-lg">{adSet.name}</CardTitle>
                      <div className="flex items-center space-x-2">
                        <Badge 
                          variant={adSet.status === 'Active' ? 'default' : 'secondary'}
                          className={adSet.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
                        >
                          {adSet.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">Ad Set #{adSet.id}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600">
                        <Trash2 className="w-4 h-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{adSet.budget}</p>
                        <p className="text-xs text-muted-foreground">Budget</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">{adSet.reach}</p>
                        <p className="text-xs text-muted-foreground">Reach</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{adSet.clicks}</p>
                      <p className="text-xs text-muted-foreground">Clicks</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{adSet.ctr}</p>
                      <p className="text-xs text-muted-foreground">CTR</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{adSet.cost}</p>
                      <p className="text-xs text-muted-foreground">Cost</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2 p-3 bg-muted/50 rounded-lg">
                    <Target className="w-4 h-4 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-xs font-medium text-muted-foreground mb-1">Targeting:</p>
                      <p className="text-sm">{adSet.targeting}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 bg-card rounded-xl p-6 border shadow-glow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Campaign Summary</h3>
                <p className="text-muted-foreground text-sm">
                  Total Budget: <span className="font-medium">$120/day</span> • 
                  Active Ad Sets: <span className="font-medium">2</span> • 
                  Estimated Reach: <span className="font-medium">20.7K people</span>
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">$73.70</p>
                <p className="text-sm text-muted-foreground">Total Spent</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-8">
            <Button variant="outline" onClick={handleBack}>
              Back to Campaign Setup
            </Button>
            <Button onClick={handleNext} className="px-8">
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}