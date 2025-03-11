import React from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { AlertCircle, RefreshCcw } from "lucide-react"
import { motion } from "framer-motion"

const Error = ({ error }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background/50 backdrop-blur-sm p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="p-8 max-w-md w-full">
          <div className="text-center space-y-6">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <AlertCircle className="h-12 w-12 text-destructive mx-auto" />
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-2xl font-semibold text-destructive">
                Oops! Something went wrong
              </h2>
              <p className="text-muted-foreground">
                {error || "An unexpected error occurred. Please try again."}
              </p>
            </div>

            <div className="flex justify-center gap-4">
              <Button 
                onClick={() => window.location.reload()} 
                variant="default"
                className="gap-2"
              >
                <RefreshCcw className="h-4 w-4" />
                Try Again
              </Button>
              <Button 
                onClick={() => window.history.back()} 
                variant="outline"
              >
                Go Back
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  )
}

export default Error
