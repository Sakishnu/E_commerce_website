import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Lock, Mail, User, ArrowRight, ShieldCheck } from "lucide-react"
import { useUserStore } from "../store/userStore"
import { useNotification } from "../context/NotificationContext"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { BackButton } from "../components/common/BackButton"

export const SignupPage: React.FC = () => {
  const navigate = useNavigate()
  const { signup, isLoading } = useUserStore()
  const { showToast } = useNotification()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "error")
      return
    }

    if (password.length < 5) {
      showToast("Password must be at least 5 characters.", "error")
      return
    }

    if (!agreeTerms) {
      showToast("You must agree to the Terms of Service.", "error")
      return
    }

    const res = await signup(name.trim(), email.trim(), password)
    if (res) {
      showToast("Account created successfully! Welcome.", "success")
      navigate("/dashboard")
    } else {
      showToast("Registration failed. Please check inputs.", "error")
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24 flex flex-col justify-center min-h-[80vh] space-y-6">
      <BackButton className="self-start" defaultPath="/login" />
      
      {/* Signup Card */}
      <div className="border bg-card text-card-foreground p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
        
        <div className="text-center space-y-1.5">
          <h2 className="text-2xl font-black text-foreground">Create Account</h2>
          <p className="text-xs text-muted-foreground">Register free to start tracking purchases and saving items.</p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          
          {/* Name */}
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</span>
            <div className="relative">
              <Input
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="pl-10 text-xs"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</span>
            <div className="relative">
              <Input
                type="email"
                placeholder="john@example.com"
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
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Password</span>
            <div className="relative">
              <Input
                type="password"
                placeholder="Min 5 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pl-10 text-xs"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1.5">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Confirm Password</span>
            <div className="relative">
              <Input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="pl-10 text-xs"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Terms checkbox */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="terms"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary cursor-pointer"
            />
            <label htmlFor="terms" className="text-[10px] sm:text-xs text-muted-foreground font-semibold cursor-pointer">
              I agree to the{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </label>
          </div>

          <Button type="submit" className="w-full gap-2 font-bold uppercase tracking-wider text-xs h-11" disabled={isLoading}>
            {isLoading ? "Creating..." : "Create Free Account"}
            <ArrowRight className="h-4 w-4" />
          </Button>

        </form>

        {/* Link to Login */}
        <div className="text-center pt-2 text-xs text-muted-foreground font-semibold">
          Already registered?{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login here
          </Link>
        </div>

      </div>

    </div>
  )
}
