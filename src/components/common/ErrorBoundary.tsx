import React, { Component, ErrorInfo, ReactNode } from "react"
import { AlertTriangle } from "lucide-react"
import { Button } from "../ui/Button"

interface Props {
  children?: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  }

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true }
  }

  public override componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo)
  }

  public override render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center space-y-4">
          <AlertTriangle className="h-12 w-12 text-destructive animate-bounce" />
          <h2 className="text-lg font-bold text-foreground">Something went wrong.</h2>
          <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
            An unexpected error has occurred in this section of the app. Try refreshing the window or going back to the home page.
          </p>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => (window.location.href = "/")}>
              Go Home
            </Button>
            <Button size="sm" onClick={() => window.location.reload()}>
              Reload Page
            </Button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
