import { Mail, Phone, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "@/hooks/use-toast"

import { 
  FaTwitter, 
  FaLinkedinIn, 
  FaFacebookF, 
  FaInstagram 
} from "react-icons/fa";

export const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribing, setIsSubscribing] = useState(false);
  const currentYear = new Date().getFullYear()

  const handleNewsletterSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive"
      })
      return
    }

    if (!email.includes('@')) {
      toast({
        title: "Error", 
        description: "Please enter a valid email address",
        variant: "destructive"
      })
      return
    }

    setIsSubscribing(true)
    
    try {
      // Simulate newsletter subscription
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast({
        title: "Success!",
        description: "Thanks for subscribing to our newsletter!"
      })
      
      setEmail("")
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsSubscribing(false)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-card via-card to-primary/5 border-t border-border">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Company Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="bg-gradient-primary w-8 h-8 rounded-lg flex items-center justify-center">
                <div className="w-4 h-4 bg-primary-foreground rounded-sm transform rotate-12"></div>
              </div>
              <span className="font-bold text-xl text-foreground">TEadify</span>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-6 max-w-md">
              Empowering businesses with AI-driven Meta advertising campaigns. Transform your reach, optimize your spend, and drive meaningful results with intelligent automation.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <a 
                href="https://twitter.com/teadify" 
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
                data-testid="link-twitter"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaTwitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com/company/teadify"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
                data-testid="link-linkedin"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com/teadify"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
                data-testid="link-facebook"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com/teadify"
                className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:-translate-y-0.5"
                data-testid="link-instagram"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaInstagram className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-lg">Product</h3>
            <nav className="space-y-4">
              <Link to="/features" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-features">
                Features
              </Link>
              <Link to="/pricing" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-pricing">
                Pricing
              </Link>
              <Link to="/integrations" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-integrations">
                Integrations
              </Link>
              <Link to="/api" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-api">
                API
              </Link>
              <Link to="/updates" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-updates">
                Updates
              </Link>
              <Link to="/roadmap" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-roadmap">
                Roadmap
              </Link>
            </nav>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-lg">Company</h3>
            <nav className="space-y-4">
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-about">
                About Us
              </Link>
              <Link to="/careers" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-careers">
                Careers
              </Link>
              <Link to="/blog" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-blog">
                Blog
              </Link>
              <Link to="/press" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-press">
                Press Kit
              </Link>
              <Link to="/partners" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-partners">
                Partners
              </Link>
              <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-contact">
                Contact
              </Link>
            </nav>
          </div>

          {/* Support & Newsletter */}
          <div>
            <h3 className="font-semibold text-foreground mb-6 text-lg">Support</h3>
            <nav className="space-y-4 mb-8">
              <Link to="/help" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-help">
                Help Center
              </Link>
              <Link to="/docs" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-docs">
                Documentation
              </Link>
              <Link to="/community" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-community">
                Community
              </Link>
              <Link to="/status" className="block text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-status">
                Status
              </Link>
            </nav>

            {/* Newsletter Signup */}
            <div className="bg-muted/30 rounded-xl p-6 border">
              <h4 className="font-semibold text-foreground mb-3">Stay Updated</h4>
              <p className="text-sm text-muted-foreground mb-4">Get the latest tips and product updates delivered to your inbox.</p>
              <form onSubmit={handleNewsletterSignup} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-10 text-sm"
                  data-testid="input-newsletter-email"
                />
                <Button 
                  type="submit"
                  variant="hero"
                  className="w-full h-10 text-sm"
                  disabled={isSubscribing}
                  data-testid="button-newsletter-subscribe"
                >
                  {isSubscribing ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Copyright */}
            <div className="text-sm text-muted-foreground" data-testid="text-copyright">
              © {currentYear} TEadify, Inc. All rights reserved.
            </div>

            {/* Legal Links */}
            <nav className="flex items-center gap-6 text-sm">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-privacy">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-terms">
                Terms of Service
              </Link>
              <Link to="/cookies" className="text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-cookies">
                Cookies
              </Link>
              <Link to="/security" className="text-muted-foreground hover:text-primary transition-colors duration-200" data-testid="link-security">
                Security
              </Link>
            </nav>

            {/* Contact Info */}
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <a 
                  href="mailto:hello@teadify.com" 
                  className="hover:text-primary transition-colors duration-200"
                  data-testid="link-email"
                >
                  hello@teadify.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <a 
                  href="tel:+1-555-832-3439" 
                  className="hover:text-primary transition-colors duration-200"
                  data-testid="link-phone"
                >
                  +1 (555) TEA-DIFY
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info Bar */}
          <div className="mt-6 pt-6 border-t border-border/50">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-6">
                <span data-testid="text-global">🌍 Global AI Ad Platform</span>
                <span data-testid="text-compliance">🛡️ SOC 2 Compliant</span>
                <span data-testid="text-uptime">⚡ 99.9% Uptime</span>
              </div>
              <div className="flex items-center gap-2" data-testid="text-made-with-love">
                <span>Made with</span>
                <Heart className="w-3 h-3 text-red-400 fill-current" />
                <span>for ambitious businesses</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
