import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate, useLocation } from "react-router-dom"
import { Header } from "@/components/Header"
import { useAuth } from "@/contexts/AuthContext"
import { GoogleLogin } from '@react-oauth/google'
import { toast } from "sonner"
import { useEffect } from "react"

export default function SignIn() {
  const navigate = useNavigate()
  const location = useLocation()
  const { login, isAuthenticated, isLoading } = useAuth()

  // If user is already authenticated, redirect them to the appropriate page
  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      const setupComplete = localStorage.getItem('setupComplete')
      if (setupComplete === 'true') {
        navigate('/dashboard')
        return
      }

      // If user is already authenticated, redirect to landing page
      navigate('/')
    }
  }, [isAuthenticated, isLoading, navigate])

  const handleGoogleSuccess = (credentialResponse: any) => {
    if (credentialResponse.credential) {
      login(credentialResponse.credential)
      toast.success("Successfully signed in!")
      
      // After successful login, always go to business details first
      navigate('/business-details')
    }
  }

  const handleGoogleError = () => {
    toast.error("Google sign-in failed. Please try again.")
  }

  const handleFacebookSignIn = () => {
    // Mock authentication - redirect to business details
    toast.info("Facebook sign-in coming soon!")
    navigate('/business-details')
  }

  // Show loading while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <Header />
        <div className="flex items-center justify-center min-h-[calc(100vh-80px)]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </div>
    )
  }

  // If already authenticated, don't show sign-in form
  if (isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <Header />
      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] p-4">
        <div className="w-full max-w-md">
          <div className="bg-card rounded-2xl p-8 shadow-glow border">
            <div className="text-center mb-8">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">T</span>
              </div>
              <h1 className="text-2xl font-bold mb-2">TEadify</h1>
              <h2 className="text-xl font-semibold mb-2">Welcome Back</h2>
              <p className="text-muted-foreground">Sign in to start creating powerful ad campaigns</p>
            </div>

            <div className="space-y-4">
              <div className="w-full google-btn-wrapper">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={handleGoogleError}
                  useOneTap
                  theme="filled_blue"
                  size="large"
                  text="continue_with"
                  shape="rectangular"
                />
              </div>

              <Button 
                onClick={handleFacebookSignIn}
                variant="outline" 
                className="w-full h-12 font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </Button>
            </div>

            <div className="mt-8 text-center">
              <Button 
                variant="link" 
                onClick={() => navigate('/')}
                className="text-muted-foreground hover:text-foreground"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}