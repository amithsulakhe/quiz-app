import React from 'react'
import { HashLoader } from 'react-spinners'

const Loader = ({ text = "Loading quiz questions..." }) => {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background/50 backdrop-blur-sm">
      <div className="text-center space-y-6">
        <HashLoader 
          color="#7C3AED" 
          size={50}
          speedMultiplier={1.2}
          className="mx-auto"
        />
        <p className="text-lg font-medium text-muted-foreground animate-pulse">
          {text}
        </p>
      </div>
    </div>
  )
}

export default Loader
