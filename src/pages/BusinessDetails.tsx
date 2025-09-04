import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { useState, useEffect, useRef } from "react"
import { toast } from "sonner"

// Google Maps API key
const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDPq9MIskQ0LPm2j4DNZGHQrxcPA1aQAfM'

export default function BusinessDetails() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    description: '',
    location: '',
    phone: '',
    email: '',
    gstNumber: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const locationInputRef = useRef<HTMLInputElement>(null)
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null)
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  useEffect(() => {
    // Load Google Maps API script
    const loadGoogleMapsScript = () => {
      if (window.google && window.google.maps) {
        initializeAutocomplete()
        return
      }

      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`
      script.async = true
      script.defer = true
      script.onload = initializeAutocomplete
      document.head.appendChild(script)
    }

    loadGoogleMapsScript()

    return () => {
      // Cleanup
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current)
      }
    }
  }, [])

  const initializeAutocomplete = () => {
    if (!locationInputRef.current || !window.google) return

    autocompleteRef.current = new google.maps.places.Autocomplete(locationInputRef.current, {
      types: ['geocode', 'establishment'],
      componentRestrictions: { country: ['IN', 'US', 'CA', 'GB', 'AU'] }, // Restrict to major countries
      fields: ['formatted_address', 'geometry', 'name', 'place_id']
    })

    autocompleteRef.current.addListener('place_changed', () => {
      const place = autocompleteRef.current?.getPlace()
      if (place && place.formatted_address) {
        setFormData(prev => ({ ...prev, location: place.formatted_address }))
        toast.success("Location selected successfully!")
      }
    })
  }
  // ✅ Validation function
  const validateForm = () => {
    const newErrors: { [key: string]: string } = {}

    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required"
    }
    if (!formData.category) {
      newErrors.category = "Business category is required"
    }
    if (!formData.location.trim()) {
      newErrors.location = "Business location is required"
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits"
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      Object.values(newErrors).forEach((msg) => toast.error(msg))
      return false
    }
    return true
  }
  



  const handleContinue = async () => {
    if (!validateForm()) return

    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      localStorage.setItem("businessDetails", JSON.stringify(formData))
      localStorage.setItem("hasCompletedInitialSetup", "true")
      toast.success("Business details saved successfully!")
      navigate("/")
    } catch {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }
  const handleBack = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-card rounded-2xl p-8 shadow-glow border">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-3xl font-bold mb-2">Business Details</h1>
              <p className="text-muted-foreground">Tell us about your business to create targeted ad campaigns</p>
            </div>

            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="businessName">Business Name *</Label>
                  <Input 
                    id="businessName"
                    placeholder="Your Business Name"
                    value={formData.businessName}
                    onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ecommerce">E-commerce</SelectItem>
                      <SelectItem value="saas">SaaS</SelectItem>
                      <SelectItem value="restaurant">Restaurant</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="real-estate">Real Estate</SelectItem>
                      <SelectItem value="fitness">Fitness</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">About Your Business</Label>
                <Textarea 
                  id="description"
                  placeholder="Describe your business, products, or services..."
                  className="min-h-[100px]"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input 
                    ref={locationInputRef}
                    id="location"
                    placeholder="Start typing to search locations..."
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    required
                  />
                  <p className="text-xs text-muted-foreground">
                    Type to search for your business location. Google will suggest addresses as you type.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input 
                    id="phone"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Business Email *</Label>
                <Input 
                  id="email"
                  type="email"
                  placeholder="business@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="gstNumber">GST Number (Optional)</Label>
                <Input 
                  id="gstNumber"
                  placeholder="Enter GST number if applicable"
                  value={formData.gstNumber}
                  onChange={(e) => setFormData({...formData, gstNumber: e.target.value})}
                />
                <p className="text-sm text-muted-foreground">Provide your GST number for tax compliance (optional)</p>
              </div>

              <div className="flex justify-between pt-6">
                <Button variant="outline" onClick={handleBack} type="button">
                  Back
                </Button>
                <Button 
                  onClick={handleContinue} 
                  className="px-8"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Next"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}