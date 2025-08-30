import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { useState } from "react"
import { Heart, MessageCircle, Share, ThumbsUp } from "lucide-react"

export default function CampaignSetup() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    productTitle: '',
    currency: 'USD',
    productPrice: '',
    productDescription: '',
    startDate: '',
    endDate: '', 
    callToAction: '',
    budget: '',
    targetLocation: ''
  })

  const handleCreateCampaign = () => {
    // Handle campaign creation logic here
    console.log('Campaign created:', formData)
    // Could navigate to a success page or dashboard
  }

  const handleBack = () => {
    navigate('/platform-selection')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Campaign Setup</h1>
            <p className="text-muted-foreground">Configure your ad campaign parameters for optimal performance</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Campaign Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 shadow-glow border">
                <form className="space-y-8">
                  {/* Product Information */}
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Product Information</h2>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="productTitle">Product Title</Label>
                        <Input 
                          id="productTitle"
                          placeholder="Enter your product name"
                          value={formData.productTitle}
                          onChange={(e) => setFormData({...formData, productTitle: e.target.value})}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Product Price</Label>
                          <div className="flex">
                            <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="GBP">GBP</SelectItem>
                                <SelectItem value="INR">INR</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input 
                              placeholder="99.99"
                              className="ml-2"
                              value={formData.productPrice}
                              onChange={(e) => setFormData({...formData, productPrice: e.target.value})}
                            />
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="productDescription">Product Description</Label>
                        <Textarea 
                          id="productDescription"
                          placeholder="Describe your product features and benefits..."
                          className="min-h-[100px]"
                          value={formData.productDescription}
                          onChange={(e) => setFormData({...formData, productDescription: e.target.value})}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Campaign Settings */}
                  <div>
                    <h2 className="text-xl font-semibold mb-6">Campaign Settings</h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="startDate">Start Time</Label>
                          <Input 
                            id="startDate"
                            type="datetime-local"
                            value={formData.startDate}
                            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="endDate">End Time</Label>
                          <Input 
                            id="endDate"
                            type="datetime-local"
                            value={formData.endDate}
                            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Call to Action</Label>
                        <Select value={formData.callToAction} onValueChange={(value) => setFormData({...formData, callToAction: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select call to action" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="learn-more">Learn More</SelectItem>
                            <SelectItem value="shop-now">Shop Now</SelectItem>
                            <SelectItem value="sign-up">Sign Up</SelectItem>
                            <SelectItem value="contact-us">Contact Us</SelectItem>
                            <SelectItem value="get-quote">Get Quote</SelectItem>
                            <SelectItem value="download">Download</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Campaign Budget</Label>
                          <div className="flex">
                            <Select value={formData.currency} onValueChange={(value) => setFormData({...formData, currency: value})}>
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="USD">USD</SelectItem>
                                <SelectItem value="EUR">EUR</SelectItem>
                                <SelectItem value="GBP">GBP</SelectItem>
                                <SelectItem value="INR">INR</SelectItem>
                              </SelectContent>
                            </Select>
                            <Input 
                              placeholder="1000"
                              className="ml-2"
                              value={formData.budget}
                              onChange={(e) => setFormData({...formData, budget: e.target.value})}
                            />
                          </div>
                          <p className="text-sm text-muted-foreground">Daily budget for your campaign</p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="targetLocation">Target Location</Label>
                        <Input 
                          id="targetLocation"
                          placeholder="Enter city, state, or country"
                          value={formData.targetLocation}
                          onChange={(e) => setFormData({...formData, targetLocation: e.target.value})}
                        />
                        <p className="text-sm text-muted-foreground">Use Google Places API for precise location targeting</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between pt-6">
                    <Button variant="outline" onClick={handleBack}>
                      Back
                    </Button>
                    <Button onClick={handleCreateCampaign} className="px-8">
                      Create Campaign
                    </Button>
                  </div>
                </form>
              </div>
            </div>

            {/* Right Column - Preview */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-2xl p-6 shadow-glow border sticky top-24">
                <div className="space-y-4">
                  <div className="text-center">
                    <h3 className="font-semibold text-sm text-muted-foreground mb-4">Your Name</h3>
                    <div className="text-xs text-muted-foreground mb-2">Sponsored</div>
                  </div>

                  <div className="space-y-3">
                    <Textarea 
                      placeholder="Describe your product features and benefits..."
                      className="min-h-[80px] text-sm resize-none"
                      readOnly
                      value={formData.productDescription || "Describe your product features and benefits..."}
                    />
                    
                    <div className="text-sm font-semibold">
                      {formData.productTitle || "Your Product Title"}
                    </div>

                    <div className="bg-muted rounded-lg h-40 flex items-center justify-center text-muted-foreground text-xs">
                      Click to upload images and videos<br />
                      and see the preview here
                    </div>

                    <div className="text-xs text-muted-foreground">
                      https://yourstore.com/product<br />
                      Understated Elegance, Festive ...
                    </div>

                    <Button 
                      className="w-full bg-primary text-white text-sm h-8"
                      disabled
                    >
                      Open Link
                    </Button>

                    <div className="flex items-center justify-between pt-2 text-muted-foreground">
                      <div className="flex items-center gap-4 text-xs">
                        <div className="flex items-center gap-1">
                          <ThumbsUp className="w-3 h-3" />
                          <Heart className="w-3 h-3" />
                          <span>+ You</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs">
                        <span>Like</span>
                        <span>Comment</span>
                        <span>Share</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground mt-4">
                    Preview updates as you fill campaign details. Media is not uploaded to a server in this preview.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}