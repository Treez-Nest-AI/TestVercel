import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/Header"
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts'

export default function Dashboard() {
  // Sample data for charts
  const weeklyData = [
    { day: 'Mon', impressions: 4000, clicks: 135 },
    { day: 'Tue', impressions: 3000, clicks: 125 },
    { day: 'Wed', impressions: 5000, clicks: 150 },
    { day: 'Thu', impressions: 4500, clicks: 135 },
    { day: 'Fri', impressions: 6000, clicks: 180 },
    { day: 'Sat', impressions: 5500, clicks: 165 },
    { day: 'Sun', impressions: 4500, clicks: 140 }
  ]

  const conversionData = [
    { day: 'Mon', conversions: 25 },
    { day: 'Tue', conversions: 18 },
    { day: 'Wed', conversions: 33 },
    { day: 'Thu', conversions: 28 },
    { day: 'Fri', conversions: 38 },
    { day: 'Sat', conversions: 35 },
    { day: 'Sun', conversions: 30 }
  ]

  const ctrData = [
    { day: 'Mon', ctr: 3.4 },
    { day: 'Tue', ctr: 4.2 },
    { day: 'Wed', ctr: 3.0 },
    { day: 'Thu', ctr: 3.8 },
    { day: 'Fri', ctr: 3.2 },
    { day: 'Sat', ctr: 3.5 },
    { day: 'Sun', ctr: 3.1 }
  ]

  const campaigns = [
    {
      name: "Summer Sale Campaign",
      status: "Active",
      budget: "$150/day",
      spent: "$1,245",
      ctr: "2.73%",
      impressions: "45.2K",
      clicks: "1,234"
    },
    {
      name: "Brand Awareness Drive", 
      status: "Active",
      budget: "$100/day",
      spent: "$890",
      ctr: "2.67%",
      impressions: "32.1K",
      clicks: "856"
    },
    {
      name: "Product Launch",
      status: "Paused",
      budget: "$200/day",
      spent: "$2,156",
      ctr: "3.00%", 
      impressions: "67.8K",
      clicks: "2,034"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold">TEadify Dashboard</h1>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    3 Active Campaigns
                  </Badge>
                </div>
              </div>
            </div>
            <Button>Create Campaign</Button>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border shadow-glow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Spent</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="text-2xl font-bold">$4,291</div>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </CardContent>
                </Card>
                <Card className="border shadow-glow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Impressions</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="text-2xl font-bold">145.1K</div>
                    <p className="text-xs text-green-600">+8% from last month</p>
                  </CardContent>
                </Card>
                <Card className="border shadow-glow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Clicks</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="text-2xl font-bold">4,124</div>
                    <p className="text-xs text-green-600">+15% from last month</p>
                  </CardContent>
                </Card>
                <Card className="border shadow-glow">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Avg. CTR</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-4">
                    <div className="text-2xl font-bold">2.84%</div>
                    <p className="text-xs text-red-600">+0.3% from last month</p>
                  </CardContent>
                </Card>
              </div>

              {/* Weekly Performance Chart */}
              <Card className="border shadow-glow">
                <CardHeader>
                  <CardTitle>Weekly Performance</CardTitle>
                  <p className="text-sm text-muted-foreground">Impressions and clicks over the last 7 days</p>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={weeklyData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="day" className="text-muted-foreground" />
                        <YAxis className="text-muted-foreground" />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="impressions" 
                          stroke="hsl(var(--primary))" 
                          strokeWidth={2}
                          name="Impressions"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="clicks" 
                          stroke="hsl(var(--chart-2))" 
                          strokeWidth={2}
                          name="Clicks"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Campaigns Tab */}
            <TabsContent value="campaigns" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Campaigns */}
                <Card className="border shadow-glow">
                  <CardHeader>
                    <CardTitle>Active Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {campaigns.filter(c => c.status === 'Active').map((campaign, index) => (
                      <div key={index} className="p-4 border rounded-lg space-y-2">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium">{campaign.name}</h3>
                          <Badge className="bg-green-100 text-green-800">Active</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Budget: {campaign.budget}</p>
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div>
                            <span className="text-muted-foreground">Spent</span>
                            <p className="font-medium">{campaign.spent}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">CTR</span>
                            <p className="font-medium">{campaign.ctr}</p>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Clicks</span>
                            <p className="font-medium">{campaign.clicks}</p>
                          </div>
                        </div>
                        <div className="text-sm">
                          <span className="text-muted-foreground">Impressions: </span>
                          <span className="font-medium">{campaign.impressions}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Select a Campaign */}
                <Card className="border shadow-glow">
                  <CardHeader>
                    <CardTitle>Select a Campaign</CardTitle>
                  </CardHeader>
                  <CardContent className="flex items-center justify-center h-64">
                    <p className="text-muted-foreground text-center">
                      Click on a campaign to view its ad sets
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* All Campaigns List */}
              {campaigns.length > 2 && (
                <Card className="border shadow-glow">
                  <CardHeader>
                    <CardTitle>All Campaigns</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {campaigns.map((campaign, index) => (
                        <div key={index} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-medium">{campaign.name}</h3>
                            <Badge 
                              variant={campaign.status === 'Active' ? 'default' : 'secondary'}
                              className={campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                            >
                              {campaign.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <span className="text-muted-foreground">Budget: </span>
                              <span className="font-medium">{campaign.budget}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Spent: </span>
                              <span className="font-medium">{campaign.spent}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">CTR: </span>
                              <span className="font-medium">{campaign.ctr}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Clicks: </span>
                              <span className="font-medium">{campaign.clicks}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Conversion Trends */}
                <Card className="border shadow-glow">
                  <CardHeader>
                    <CardTitle>Conversion Trends</CardTitle>
                    <p className="text-sm text-muted-foreground">Daily conversions over the last week</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={conversionData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="day" className="text-muted-foreground" />
                          <YAxis className="text-muted-foreground" />
                          <Tooltip />
                          <Bar 
                            dataKey="conversions" 
                            fill="hsl(var(--primary))" 
                            radius={[4, 4, 0, 0]} 
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Click-Through Rate */}
                <Card className="border shadow-glow">
                  <CardHeader>
                    <CardTitle>Click-Through Rate</CardTitle>
                    <p className="text-sm text-muted-foreground">CTR performance over time</p>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={ctrData}>
                          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                          <XAxis dataKey="day" className="text-muted-foreground" />
                          <YAxis className="text-muted-foreground" />
                          <Tooltip />
                          <Line 
                            type="monotone" 
                            dataKey="ctr" 
                            stroke="hsl(var(--chart-2))" 
                            strokeWidth={2}
                            name="CTR (%)"
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Campaign Performance Details */}
              <Card className="border shadow-glow">
                <CardHeader>
                  <CardTitle>Campaign Performance Details</CardTitle>
                  <p className="text-sm text-muted-foreground">Comprehensive metrics for all campaigns</p>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Campaign</th>
                          <th className="text-left py-2">Status</th>
                          <th className="text-left py-2">Budget</th>
                          <th className="text-left py-2">Spent</th>
                          <th className="text-left py-2">Impressions</th>
                          <th className="text-left py-2">Clicks</th>
                          <th className="text-left py-2">CTR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaigns.map((campaign, index) => (
                          <tr key={index} className="border-b">
                            <td className="py-3 font-medium">{campaign.name}</td>
                            <td className="py-3">
                              <Badge 
                                variant={campaign.status === 'Active' ? 'default' : 'secondary'}
                                className={campaign.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}
                              >
                                {campaign.status}
                              </Badge>
                            </td>
                            <td className="py-3">{campaign.budget}</td>
                            <td className="py-3">{campaign.spent}</td>
                            <td className="py-3">{campaign.impressions}</td>
                            <td className="py-3">{campaign.clicks}</td>
                            <td className="py-3">{campaign.ctr}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}