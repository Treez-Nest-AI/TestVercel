import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Progress } from "@/components/ui/progress"
import { CheckCircle } from "lucide-react"

interface LoadingProps {
  onComplete?: () => void
  redirectTo?: string
}

export default function Loading({ onComplete, redirectTo }: LoadingProps) {
  const [progress, setProgress] = useState(0)
  const [currentStep, setCurrentStep] = useState(0)
  const navigate = useNavigate()

  const steps = [
    "Analyzing your campaign data...",
    "Creating ad sets...",
    "Optimizing targeting...",
    "Setting up budget allocation...",
    "Finalizing campaign structure...",
    "Campaign created successfully!"
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => {
            if (redirectTo) {
              navigate(redirectTo)
            } else if (onComplete) {
              onComplete()
            }
          }, 1000)
          return 100
        }
        return prev + 2
      })
    }, 100)

    return () => clearInterval(timer)
  }, [navigate, redirectTo, onComplete])

  useEffect(() => {
    const stepIndex = Math.floor((progress / 100) * (steps.length - 1))
    setCurrentStep(stepIndex)
  }, [progress, steps.length])

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center">
      <div className="max-w-md mx-auto px-4">
        <div className="text-center space-y-8">
          <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Creating Your Campaign</h1>
            <p className="text-muted-foreground">
              {steps[currentStep]}
            </p>
          </div>

          <div className="space-y-4">
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-muted-foreground">
              {Math.round(progress)}% Complete
            </p>
          </div>

          {progress === 100 && (
            <div className="flex items-center justify-center space-x-2 text-green-600">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Campaign Created Successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}