import React from 'react'
import { PuffLoader } from 'react-spinners'


// validator
const Validator = ({ text = "Validating quiz..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <PuffLoader 
          color="#7C3AED" 
          size={60}
          speedMultiplier={1}
          className="mx-auto"
        />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
        <p className="text-sm text-muted-foreground/60">
          Please wait while we verify your quiz
        </p>
      </div>
    </div>
  )
}

export default Validator
