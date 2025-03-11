import React from 'react'
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { HomeIcon, RefreshCcw } from "lucide-react"

const ErrorPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6">
        {/* Error Code */}
        <h1 className="text-9xl font-bold text-primary">404</h1>
        
        {/* Error Animation */}
        <div className="relative">
          <div className="animate-bounce">
            <span className="text-7xl">🤔</span>
          </div>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight">
            Oops! Page not found
          </h2>
          <p className="text-muted-foreground max-w-[500px]">
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button 
            onClick={() => navigate('/')}
            className="min-w-[200px]"
            variant="default"
          >
            <HomeIcon className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <Button 
            onClick={() => window.location.reload()}
            className="min-w-[200px]"
            variant="outline"
          >
            <RefreshCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
