import React, { useState } from "react"
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react"
import { useNotification } from "../context/NotificationContext"
import { Button } from "../components/ui/Button"
import { Input } from "../components/ui/Input"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { BackButton } from "../components/common/BackButton"

export const ContactUsPage: React.FC = () => {
  const { showToast } = useNotification()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (name && email && subject && message) {
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 800))
      setLoading(false)
      showToast("Your message has been sent! We will contact you shortly.", "success")
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-16">
      <BackButton className="mb-4" defaultPath="/" />
      
      <Breadcrumbs items={[{ label: "Contact Us" }]} />

      <div className="border-b pb-4 mb-8">
        <h1 className="text-xl sm:text-2xl font-black text-foreground">Contact Us</h1>
        <p className="text-xs text-muted-foreground mt-0.5">
          Have queries about orders or specifications? Reach out to us below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-4">
        
        {/* Contact Form */}
        <div className="border p-6 sm:p-8 rounded-2xl bg-card shadow-sm space-y-6">
          <h2 className="text-sm font-bold text-foreground uppercase tracking-wider border-b pb-2">Send Us A Message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Full Name</span>
                <Input placeholder="John Doe" value={name} onChange={(e) => setName(e.target.value)} required />
              </div>
              <div className="space-y-1.5">
                <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Email Address</span>
                <Input type="email" placeholder="john@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
            </div>
            
            <div className="space-y-1.5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Subject</span>
              <Input placeholder="Order Query, Product Specs" value={subject} onChange={(e) => setSubject(e.target.value)} required />
            </div>

            <div className="space-y-1.5">
              <span className="block text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Message Details</span>
              <textarea
                placeholder="Write your feedback or query details here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                className="w-full text-xs rounded-lg border border-input bg-background p-3 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              />
            </div>

            <Button type="submit" className="w-full gap-2 font-bold uppercase tracking-wider text-xs h-11" disabled={loading}>
              {loading ? "Sending..." : "Submit Message Details"}
              <Send className="h-3.5 w-3.5" />
            </Button>
          </form>
        </div>

        {/* Contact Information & Map placeholder */}
        <div className="space-y-6 flex flex-col justify-between">
          
          <div className="border p-6 rounded-2xl bg-card shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5 border-b pb-2">
                <MapPin className="h-4 w-4 text-primary" />
                Office HQ
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Nexus Commerce Inc. <br />
                500 5th Avenue, Suite 1800 <br />
                New York, NY 10110
              </p>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-foreground uppercase tracking-widest flex items-center gap-1.5 border-b pb-2">
                <Phone className="h-4 w-4 text-primary" />
                Helpline
              </h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Sales: +1 (800) 555-0199 <br />
                Support: support@nexus.com <br />
                Mon-Fri: 9AM - 6PM EST
              </p>
            </div>
          </div>

          {/* Map placeholder */}
          <div className="relative border rounded-2xl overflow-hidden aspect-[16/9] bg-muted shadow-sm flex items-center justify-center p-6 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(#80808012_1px,transparent_1px)] bg-[size:16px_16px] -z-10" />
            <div className="space-y-2">
              <MapPin className="h-8 w-8 text-primary mx-auto animate-bounce" />
              <h4 className="text-xs font-bold text-foreground">Interactive Location Map</h4>
              <p className="text-[10px] text-muted-foreground max-w-xs mx-auto leading-relaxed">
                Nexus HQ coordinates: 40.7580° N, 73.9855° W. Map visualization is disabled for demo standalone purposes.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  )
}
