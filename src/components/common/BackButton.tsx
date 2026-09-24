import React from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "../ui/Button"

interface BackButtonProps {
  defaultPath?: string
  className?: string
}

export const BackButton: React.FC<BackButtonProps> = ({ defaultPath = "/", className = "" }) => {
  const navigate = useNavigate()

  const handleBack = () => {
    // Check if there is history to go back
    if (window.history.state && window.history.state.idx > 0) {
      navigate(-1)
    } else {
      navigate(defaultPath)
    }
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className={`inline-flex items-center gap-2 h-9 text-xs font-semibold px-3.5 rounded-xl border border-input text-muted-foreground hover:text-foreground hover:bg-muted/50 bg-background shadow-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 shrink-0 ${className}`}
      onClick={handleBack}
      title="Go Back"
    >
      <ArrowLeft className="h-4 w-4" />
      Back
    </Button>
  )
}
