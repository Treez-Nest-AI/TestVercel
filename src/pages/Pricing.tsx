import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { Header } from "@/components/Header"
import { useState } from "react"

interface PricingPlan {
  name: string
  price: number
  period: string
  description: string
  features: string[]
  popular?: boolean
  buttonText: string
}

export default function Pricing() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState<string>('professional')

  const plans: PricingPlan[] = [
    {
      name: "Starter",
      price: 29,
      period: "/month",
      description: "Perfect for small businesses getting started",
      features: [
        "Up to 5 ad campaigns",
        "Basic analytics",
        "Email support",
        "Standard templates",
        "Social media integration"
      ],
      buttonText: "Select Starter"
    },
    {
      name: "Professional",
      price: 79,
      period: "/month",
      description: "Ideal for growing businesses",
      features: [
        "Up to 25 ad campaigns",
        "Advanced analytics",
        "Priority support",
        "Custom templates",
        "Multi-platform integration",
        "A/B testing",
        "Conversion tracking"
      ],
      popular: true,
      buttonText: "Select Professional"
    },
    {
      name: "Enterprise",
      price: 199,
      period: "/month",
      description: "For large businesses and agencies",
      features: [
        "Unlimited ad campaigns",
        "Premium analytics",
        "24/7 phone support",
        "White-label solution",
        "API access",
        "Advanced automation",
        "Custom integrations",
        "Dedicated account manager"
      ],
      buttonText: "Select Enterprise"
    }
  ]

  const handlePlanSelect = (planName: string) => {
    setSelectedPlan(planName.toLowerCase())
    navigate('/platform-selection')
  }

  const handleBack = () => {
    navigate('/business-details')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
            <p className="text-xl text-muted-foreground">Select the perfect plan for your advertising needs</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {plans.map((plan, index) => (
              <div 
                key={plan.name}
                className={`relative bg-card rounded-2xl p-8 border transition-all duration-300 hover:shadow-glow hover:-translate-y-1 ${
                  plan.popular ? 'border-primary shadow-glow scale-105' : 'border-border'
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-primary text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="mb-4">
                    <span className="text-4xl font-bold text-primary">${plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground">{plan.description}</p>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-3">
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  onClick={() => handlePlanSelect(plan.name)}
                  variant={plan.popular ? "default" : "outline"}
                  className="w-full h-12 font-semibold"
                >
                  {plan.buttonText}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button variant="link" onClick={handleBack} className="text-muted-foreground">
              Back to Business Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}