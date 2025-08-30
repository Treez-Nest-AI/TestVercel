import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { CreditCard, Wallet, Building2, Shield, Check } from "lucide-react"
import { useState } from "react"

export default function FinalPayment() {
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("card")

  const handlePayment = () => {
    navigate('/success')
  }

  const handleBack = () => {
    navigate('/ad-sets')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Complete Your Payment</h1>
            <p className="text-muted-foreground">
              Secure payment to activate your campaign and start reaching your audience
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Payment Form */}
            <div className="lg:col-span-2">
              <Card className="border shadow-glow">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Payment Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Payment Methods */}
                  <div>
                    <Label className="text-base font-medium mb-4 block">Select Payment Method</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3">
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="card" id="card" />
                        <CreditCard className="w-5 h-5" />
                        <label htmlFor="card" className="flex-1 cursor-pointer">
                          <div className="font-medium">Credit/Debit Card</div>
                          <div className="text-sm text-muted-foreground">Visa, MasterCard, American Express</div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="paypal" id="paypal" />
                        <Wallet className="w-5 h-5" />
                        <label htmlFor="paypal" className="flex-1 cursor-pointer">
                          <div className="font-medium">PayPal</div>
                          <div className="text-sm text-muted-foreground">Pay with your PayPal account</div>
                        </label>
                      </div>
                      <div className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <RadioGroupItem value="bank" id="bank" />
                        <Building2 className="w-5 h-5" />
                        <label htmlFor="bank" className="flex-1 cursor-pointer">
                          <div className="font-medium">Bank Transfer</div>
                          <div className="text-sm text-muted-foreground">Direct bank transfer</div>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Card Details */}
                  {paymentMethod === "card" && (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Cardholder Name</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  {/* Billing Address */}
                  <div className="space-y-4">
                    <Label className="text-base font-medium">Billing Address</Label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="John" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Doe" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main Street" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" placeholder="New York" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input id="state" placeholder="NY" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input id="zip" placeholder="10001" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border shadow-glow sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm">Campaign Budget (30 days)</span>
                      <span className="text-sm font-medium">$3,600.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Platform Fee</span>
                      <span className="text-sm font-medium">$180.00</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Management Fee</span>
                      <span className="text-sm font-medium">$120.00</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-medium">Total</span>
                        <span className="font-bold text-lg">$3,900.00</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <h4 className="font-medium text-sm">What's Included:</h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li className="flex items-center">
                        <Check className="w-3 h-3 mr-2 text-green-600" />
                        3 Active Ad Sets
                      </li>
                      <li className="flex items-center">
                        <Check className="w-3 h-3 mr-2 text-green-600" />
                        Advanced Targeting
                      </li>
                      <li className="flex items-center">
                        <Check className="w-3 h-3 mr-2 text-green-600" />
                        Performance Analytics
                      </li>
                      <li className="flex items-center">
                        <Check className="w-3 h-3 mr-2 text-green-600" />
                        24/7 Campaign Monitoring
                      </li>
                      <li className="flex items-center">
                        <Check className="w-3 h-3 mr-2 text-green-600" />
                        Optimization Support
                      </li>
                    </ul>
                  </div>

                  <div className="space-y-3">
                    <Button onClick={handlePayment} className="w-full">
                      Complete Payment
                    </Button>
                    <p className="text-xs text-muted-foreground text-center">
                      Your payment is secured with 256-bit SSL encryption
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-between pt-8">
            <Button variant="outline" onClick={handleBack}>
              Back to Ad Sets
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}