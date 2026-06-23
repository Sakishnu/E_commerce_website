import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Lock, Mail, ArrowRight, ShieldAlert } from "lucide-react"
import { useUserStore } from "../store/userStore"
import { useNotification } from "../context/NotificationContext"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { BackButton } from "../components/common/BackButton"

export const LoginPage: React.FC = () => {
  const navigate = useNavigate()
  const { login, isLoading } = useUserStore()
  const { showToast } = useNotification()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim() && password.length >= 5) {
      const res = await login(email.trim(), password)
      if (res) {
        showToast("Signed in successfully. Welcome back!", "success")
        navigate("/dashboard")
      } else {
        showToast("Authentication failed. Check your password length.", "error")
      }
    } else {
      showToast("Please enter a valid email and 5+ character password.", "error")
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24 flex flex-col justify-center min-h-[80vh] space-y-6">
      <BackButton className="self-start" defaultPath="/" />
      
      {/* Login Card */}
      <div className="border bg-card text-card-foreground p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-black text-foreground">Sign In To Nexus</h2>
          <p className="text-xs text-muted-foreground">Access your dashboard, saved wishlists, and track orders.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          {/* Email */}
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</span>
            <div className="relative">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="pl-10 text-xs"
              />
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</span>
              <Link to="/forgot-password" className="text-[10px] font-bold text-primary hover:underline uppercase tracking-wider">
                Forgot?
              </Link>
            </div>
            <div className="relative">
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 text-xs"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          <Button type="submit" className="w-full gap-2 font-bold uppercase tracking-wider text-xs h-11" disabled={isLoading}>
            {isLoading ? "Signing in..." : "Login to Account"}
            <ArrowRight className="h-4 w-4" />
          </Button>

        </form>

        {/* Demo Hint Banner */}
        <div className="flex items-start gap-2 bg-muted/40 p-3 rounded-lg border text-[10px] text-muted-foreground leading-relaxed">
          <ShieldAlert className="h-4 w-4 text-primary shrink-0 mt-0.5" />
          <span>Demo Hint: Enter any valid email (e.g., test@user.com) and a password with 5 or more characters to sign in.</span>
        </div>

        {/* Link to Signup */}
        <div className="text-center pt-2 text-xs text-muted-foreground font-semibold">
          Don't have an account?{" "}
          <Link to="/signup" className="text-primary hover:underline">
            Register free
          </Link>
        </div>

      </div>

    </div>
  )
}
