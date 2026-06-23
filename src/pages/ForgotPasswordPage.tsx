import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, KeyRound, ArrowRight, ShieldCheck } from "lucide-react"
import { useNotification } from "../context/NotificationContext"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { BackButton } from "../components/common/BackButton"

export const ForgotPasswordPage: React.FC = () => {
  const navigate = useNavigate()
  const { showToast } = useNotification()

  const [step, setStep] = useState(1) // 1: Email, 2: Code Verification, 3: Reset Password
  const [email, setEmail] = useState("")
  const [verificationCode, setVerificationCode] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (email.trim()) {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setLoading(false)
      showToast("Security reset code sent to your email!", "success")
      setStep(2)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (verificationCode.trim() === "123456") {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 500))
      setLoading(false)
      showToast("Code verified successfully! Enter your new password.", "success")
      setStep(3)
    } else {
      showToast("Invalid code! Use code 123456 for testing.", "error")
    }
  }

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newPassword.length >= 5) {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setLoading(false)
      showToast("Password updated successfully! Please sign in.", "success")
      navigate("/login")
    } else {
      showToast("Password must be at least 5 characters.", "error")
    }
  }

  return (
    <div className="mx-auto max-w-md px-4 py-16 sm:py-24 flex flex-col justify-center min-h-[80vh] space-y-6">
      <BackButton className="self-start" defaultPath="/login" />
      
      {/* Reset Card */}
      <div className="border bg-card text-card-foreground p-6 sm:p-8 rounded-2xl shadow-xl space-y-5">
        
        {step === 1 && (
          <div className="space-y-4">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl font-black text-foreground">Forgot Password</h2>
              <p className="text-xs text-muted-foreground">Enter your email and we'll dispatch a security code to recover your account.</p>
            </div>
            
            <form onSubmit={handleRequestCode} className="space-y-4">
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
              <Button type="submit" className="w-full gap-2 font-bold uppercase tracking-wider text-xs h-11" disabled={loading}>
                {loading ? "Sending link..." : "Request Reset Code"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl font-black text-foreground">Verify OTP Code</h2>
              <p className="text-xs text-muted-foreground">Enter the 6-digit confirmation code sent to <strong className="text-foreground">{email}</strong>.</p>
            </div>
            
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Security Code</span>
                <div className="relative">
                  <Input
                    placeholder="Enter 123456"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    maxLength={6}
                    required
                    className="pl-10 text-xs tracking-[0.4em] text-center font-bold"
                  />
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              
              <Button type="submit" className="w-full gap-2 font-bold uppercase tracking-wider text-xs h-11" disabled={loading}>
                {loading ? "Verifying..." : "Verify Code"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <div className="flex items-start gap-2 bg-muted/40 p-3 rounded-lg border text-[10px] text-muted-foreground leading-relaxed">
              <ShieldCheck className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>Testing Hint: Enter code <strong>123456</strong> to successfully verify this step.</span>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <div className="text-center space-y-1.5">
              <h2 className="text-2xl font-black text-foreground">Reset Password</h2>
              <p className="text-xs text-muted-foreground">Create a secure new password for your Nexus account.</p>
            </div>
            
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">New Password</span>
                <div className="relative">
                  <Input
                    type="password"
                    placeholder="Min 5 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="pl-10 text-xs"
                  />
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <Button type="submit" className="w-full gap-2 font-bold uppercase tracking-wider text-xs h-11" disabled={loading}>
                {loading ? "Updating..." : "Update Password"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </div>
        )}

        {/* Link back to login */}
        <div className="text-center pt-2 text-xs text-muted-foreground font-semibold">
          Back to{" "}
          <Link to="/login" className="text-primary hover:underline">
            Login
          </Link>
        </div>

      </div>

    </div>
  )
}
