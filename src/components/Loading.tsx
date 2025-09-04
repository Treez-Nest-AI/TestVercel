import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CheckCircle, AlertCircle } from "lucide-react"
import Logo from "../../public/logoo.png"

// Mock Progress component
const Progress = ({ value, className }) => (
  <div className={`w-full bg-gray-200 rounded-full h-2 ${className}`}>
    <div 
      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
      style={{ width: `${value}%` }}
    />
  </div>
)

interface LoadingProps {
  isLoading?: boolean
  adSetsData?: any
  error?: any
  onSuccess?: () => void
  onError?: (err?: any) => void
  onRetry?: () => void
  redirectTo?: string
}

export default function Loading({ 
  isLoading = false, 
  adSetsData, 
  error, 
  onSuccess, 
  onError, 
  onRetry,
  redirectTo
}: LoadingProps) {
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
    let progressTimer

    if (isLoading) {
      // Simulate progress while API is loading
      progressTimer = setInterval(() => {
        setProgress(prev => {
          // Don't go beyond 90% until we get actual response
          if (prev >= 90) return 90
          return prev + Math.random() * 10
        })
      }, 200)
    } else if (adSetsData && !error) {
      // API succeeded - complete the progress
      setProgress(100)
      setTimeout(() => {
        if (redirectTo) {
          navigate(redirectTo)
        } else {
          onSuccess?.()
        }
      }, 1500)
    } else if (error) {
      // API failed
      setProgress(0)
    }

    return () => {
      if (progressTimer) clearInterval(progressTimer)
    }
  }, [isLoading, adSetsData, error, onSuccess])

  // Update current step based on progress
  useEffect(() => {
    const stepIndex = Math.min(
      Math.floor((progress / 100) * steps.length),
      steps.length - 1
    )
    setCurrentStep(stepIndex)
  }, [progress, steps.length])

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
        <div className="max-w-md mx-auto text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            Campaign Creation Failed
          </h1>
          <p className="text-gray-600 mb-6">
            {error || "Something went wrong. Please try again."}
          </p>
          <button 
            onClick={onRetry}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="w-16 h-16 ">
          {/* <span className="text-white font-bold text-2xl">T</span> */}

          <img src={Logo} alt="Logo" className="w-16 h-16" />
        </div>
        
        <h1 className="text-3xl font-bold mb-4 text-gray-900">
          Creating Your Campaign
        </h1>
        
        <p className="text-gray-600 mb-8">
          {steps[currentStep]}
        </p>
        
        <div className="space-y-4">
        <div role="status">
         <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
         </svg>
        
     </div>
          
        </div>
        
        {progress === 100 && (
          <div className="mt-6 flex items-center justify-center gap-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Campaign Created Successfully!</span>
          </div>
        )}
        
        {isLoading && progress < 90 && (
         <div role="status">
         <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
             <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
             <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
         </svg>
        
     </div>
        )}
      </div>
    </div>
  )
}