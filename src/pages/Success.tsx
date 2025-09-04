// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { useNavigate } from "react-router-dom"
// import { Header } from "@/components/Header"
// import { CheckCircle, Sparkles, BarChart3, Target } from "lucide-react"

// export default function Success() {
//   const navigate = useNavigate()

//   const handleViewDashboard = () => {
//     navigate('/dashboard')
//   }

//   const handleCreateNew = () => {
//     navigate('/')
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
//       <Header />
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <div className="text-center space-y-8">
//             {/* Success Animation */}
//             <div className="relative">
//               <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-scale-in">
//                 <CheckCircle className="w-12 h-12 text-white" />
//               </div>
//               <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce">
//                 <Sparkles className="w-4 h-4 text-white" />
//               </div>
//             </div>

//             <div className="space-y-4">
//               <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent">
//                 Congratulations!
//               </h1>
//               <h2 className="text-2xl font-semibold">Campaign Created Successfully</h2>
//               <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
//                 Your campaign is now live and actively reaching your target audience. 
//                 You can monitor performance and make adjustments anytime from your dashboard.
//               </p>
//             </div>

//             {/* Campaign Details */}
//             <Card className="border shadow-glow max-w-2xl mx-auto">
//               <CardContent className="p-8">
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                   <div className="text-center">
//                     <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                       <Target className="w-6 h-6 text-blue-600" />
//                     </div>
//                     <h3 className="font-semibold mb-1">Campaign Active</h3>
//                     <p className="text-sm text-muted-foreground">3 Ad Sets Running</p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                       <BarChart3 className="w-6 h-6 text-green-600" />
//                     </div>
//                     <h3 className="font-semibold mb-1">Budget Allocated</h3>
//                     <p className="text-sm text-muted-foreground">$120/day</p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
//                       <Sparkles className="w-6 h-6 text-purple-600" />
//                     </div>
//                     <h3 className="font-semibold mb-1">Estimated Reach</h3>
//                     <p className="text-sm text-muted-foreground">20.7K people</p>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>

//             {/* Next Steps */}
//             <div className="space-y-6">
//               <div>
//                 <h3 className="text-lg font-semibold mb-4">What's Next?</h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-2xl mx-auto">
//                   <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border">
//                     <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                       <span className="text-primary font-semibold text-sm">1</span>
//                     </div>
//                     <div>
//                       <h4 className="font-medium">Monitor Performance</h4>
//                       <p className="text-sm text-muted-foreground">Track clicks, impressions, and conversions in real-time</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border">
//                     <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
//                       <span className="text-primary font-semibold text-sm">2</span>
//                     </div>
//                     <div>
//                       <h4 className="font-medium">Optimize Campaigns</h4>
//                       <p className="text-sm text-muted-foreground">Adjust targeting and budgets based on performance data</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button onClick={handleViewDashboard} size="lg" className="px-8">
//                   View Dashboard
//                 </Button>
//                 <Button onClick={handleCreateNew} variant="outline" size="lg" className="px-8">
//                   Create New Campaign
//                 </Button>
//               </div>

//               <p className="text-sm text-muted-foreground">
//                 Need help? Contact our support team or check our{" "}
//                 <button className="text-primary hover:underline">help center</button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }




import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { CheckCircle, Sparkles, BarChart3, Target, Loader2 } from "lucide-react"
import { useAppSelector, useAppDispatch } from "../store/useRedux.js"
import { setFinalCampaignData, setCampaignLoading } from "@/store/campaignSlice"
import { toast } from "sonner"
import axios from "axios"
import { useState, useEffect } from "react"
import { resetCampaign } from "@/store/campaignSlice"

export default function Success() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [isRunningCampaign, setIsRunningCampaign] = useState(false)
  
  // Get data from Redux store
  const campaignDetails = useAppSelector((state) => state.campaign.campaignDetails)
  const adSetsData = useAppSelector((state) => state.campaign.adSetsData)
  const isLoading = useAppSelector((state) => state.campaign.isLoading)

  // Calculate campaign stats
  const totalAdSets = adSetsData?.[0]?.ad_sets?.length || 0
  const activeAdSets = adSetsData?.[0]?.ad_sets?.filter(adSet => adSet.status === 'ACTIVE')?.length || 0
  const pausedAdSets = adSetsData?.[0]?.ad_sets?.filter(adSet => adSet.status === 'PAUSED')?.length || 0

  const handleViewDashboard = async () => {
    if (!adSetsData || !campaignDetails) {
      toast.error("Missing campaign data. Please create a campaign first.")
      return
    }

    setIsRunningCampaign(true)
    dispatch(setCampaignLoading(true))

    try {
      // Prepare the API body using Redux data
      const apiBody = {
        campaign: {
          name: campaignDetails.productTitle || "Campaign",
          campaign_objective: campaignDetails.selectedOutcome, // You can make this dynamic based on campaignDetails.selectedOutcome
          status: "PAUSED",
         
          
          special_ad_categories: []
        },
        ad_creative: {
          url: campaignDetails.businessUrl,
          description: campaignDetails.productDescription,
          lead_form_id: campaignDetails.leadFormData?.[0]?.lead_form_id,
          img_hash: campaignDetails.imageHash || "",
          call_to_action: campaignDetails.callToAction?.toUpperCase() || "SIGN_UP"
        },
        ad_sets: adSetsData[0].ad_sets // Use the ad sets from Redux
      }

      console.log("Sending API request with body:", apiBody)

      const response = await axios.post(
        "https://dot123456.app.n8n.cloud/webhook/meta-ad-running",
        apiBody
      )

      // Store the final campaign run response
      dispatch(setFinalCampaignData(response.data))
      console.log("Final Campaign Response:", response.data)
      
      toast.success("Campaign is now running successfully!")
      console.log("Final Campaign Response:", response.data)
        // ✅ Reset Redux values after success
    dispatch(resetCampaign())
      
      // Navigate to dashboard
      navigate('/dashboard')

    } catch (error) {
      console.error("Error running campaign:", error)
      
      if (error.response) {
        toast.error(`Failed to run campaign: ${error.response.status} - ${error.response.data?.message || 'Server error'}`)
      } else if (error.request) {
        toast.error("Network error. Please check your connection.")
      } else {
        toast.error("Failed to run campaign. Please try again.")
      }
    } finally {
      setIsRunningCampaign(false)
      dispatch(setCampaignLoading(false))
    }
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
                Your campaign is ready to launch! Click "Launch Campaign" to start reaching your target audience 
                and monitor performance from your dashboard.
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
                    <h3 className="font-semibold mb-1">Ad Sets Ready</h3>
                    <p className="text-sm text-muted-foreground">
                      {totalAdSets} Ad Sets Configured
                      {pausedAdSets > 0 && ` (${pausedAdSets} Paused)`}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <BarChart3 className="w-6 h-6 text-green-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Budget Allocated</h3>
                    <p className="text-sm text-muted-foreground">
                      {campaignDetails.currency} {campaignDetails.budget}/day
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                      <Sparkles className="w-6 h-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-1">Product</h3>
                    <p className="text-sm text-muted-foreground">
                      {campaignDetails.productTitle || "Product Campaign"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Campaign Summary */}
            {adSetsData && (
              <Card className="border shadow-glow max-w-2xl mx-auto">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Campaign Overview</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Campaign Duration:</span>
                      <span>{campaignDetails.startDate} to {campaignDetails.endDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Target Locations:</span>
                      <span>{campaignDetails.geoLocations?.custom_locations?.length || 0} locations</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Call to Action:</span>
                      <span className="capitalize">{campaignDetails.callToAction?.replace('_', ' ') || 'Sign Up'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Product Price:</span>
                      <span>{campaignDetails.currency} {campaignDetails.productPrice}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

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
                      <h4 className="font-medium">Launch Campaign</h4>
                      <p className="text-sm text-muted-foreground">Start your ads and begin reaching your target audience</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 p-4 bg-card rounded-lg border">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-primary font-semibold text-sm">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Monitor Performance</h4>
                      <p className="text-sm text-muted-foreground">Track clicks, impressions, and conversions in real-time</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={handleViewDashboard} 
                  size="lg" 
                  className="px-8"
                  disabled={isRunningCampaign || isLoading || !adSetsData}
                >
                  {isRunningCampaign ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Launching Campaign...
                    </>
                  ) : (
                    "Launch Campaign & View Dashboard"
                  )}
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