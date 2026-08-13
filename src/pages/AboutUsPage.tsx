import React, { useState, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { 
  ShieldCheck, 
  Users, 
  Eye, 
  Sparkles, 
  Award, 
  Compass, 
  HeartHandshake, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Globe, 
  ChevronDown, 
  ChevronUp, 
  FileText 
} from "lucide-react"
import { Breadcrumbs } from "../components/common/Breadcrumbs"
import { BackButton } from "../components/common/BackButton"

export const AboutUsPage: React.FC = () => {
  const location = useLocation()
  const [privacyExpanded, setPrivacyExpanded] = useState(false)
  const [termsExpanded, setTermsExpanded] = useState(false)

  // Smooth scroll to anchor hash & auto-expand policy sections if targeted
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = location.hash || window.location.hash
      if (hash) {
        const id = hash.substring(1)
        
        // Auto-expand if the hash matches the policy sections
        if (id === "privacy") {
          setPrivacyExpanded(true)
        } else if (id === "terms") {
          setTermsExpanded(true)
        }

        const timer = setTimeout(() => {
          const element = document.getElementById(id)
          if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        }, 150)
        return () => clearTimeout(timer)
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }

    handleHashScroll()
  }, [location.pathname, location.hash])

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
      <BackButton className="mb-4" defaultPath="/" />
      <Breadcrumbs items={[{ label: "About Us" }]} />

      {/* Hero Header Section - Company Introduction */}
      <section 
        id="about-us" 
        className="relative h-64 sm:h-96 w-full rounded-3xl overflow-hidden bg-muted flex items-center p-6 sm:p-12 mb-12 shadow-md border bg-cover bg-center mt-4 scroll-mt-24"
        style={{ backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1200&h=400&q=80')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-black/20" />
        <div className="relative max-w-2xl text-white space-y-4">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold bg-primary text-primary-foreground px-3 py-1 rounded-full uppercase tracking-wider">
            <Compass className="h-3.5 w-3.5 fill-current" />
            NEXUS DIRECTIVE
          </span>
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white drop-shadow">Corporate Profile</h1>
          <p className="text-xs sm:text-base text-zinc-200 leading-relaxed font-medium drop-shadow-sm">
            Discover our identity, culture, and high-impact product offerings. We construct modern interfaces for modern living.
          </p>
        </div>
      </section>

      {/* Brand Story & Philosophy */}
      <section id="story" className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16 scroll-mt-24">
        <div className="space-y-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Our History</h2>
          <p>
            Tracing the origin and growth journey of our platform. What began as a localized supply circle for custom mechanical workstation setups has matured into a global catalog offering premium consumer electronics, fitness instruments, and tailored accessories.
          </p>
          <p>
            Nexus represents a strategic response to the excessive noise of the digital marketplace. We set out to build a highly refined catalog aggregator that eliminates the standard compromise between form and utility.
          </p>
          <div className="border-l-4 border-primary pl-4 py-2 italic bg-muted/40 rounded-r-xl">
            "Nexus does not just deliver retail packages; we curate interfaces for modern, aesthetics-focused living."
          </div>
        </div>
        <div className="relative border rounded-2xl overflow-hidden aspect-[16/10] shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&h=500&q=80"
            alt="Nexus creative team collaborating on product selection"
            className="h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Mission & Vision */}
      <section id="mission" className="bg-muted/40 border rounded-2xl p-6 sm:p-10 mb-16 scroll-mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3.5">
          <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-extrabold text-foreground tracking-tight">Core Principles</h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            Empowering daily life through thoughtful, high-standard curation. To empower developers, designers, and creators with clean-line workspace utilities and daily apparel that enhance focus and productivity.
          </p>
        </div>
        <div className="space-y-3.5 border-t md:border-t-0 md:border-l pt-8 md:pt-0 md:pl-8">
          <div className="p-3 bg-primary/10 text-primary rounded-xl w-fit">
            <Eye className="h-6 w-6" />
          </div>
          <h3 className="text-lg font-extrabold text-foreground tracking-tight">Forward Vision</h3>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            To become the benchmark aesthetic standard for modern lifestyle items globally. We envision an ecosystem where sustainable production practices meet advanced composite materials.
          </p>
        </div>
      </section>

      {/* Why Choose Us & Customer Commitment */}
      <section id="why-choose-us" className="mb-16 space-y-8 scroll-mt-24">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Our Advantage</h2>
          <p className="text-xs text-muted-foreground">Uncompromising quality, customer-first service, and verified standards.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border p-6 rounded-2xl bg-card shadow-sm space-y-4 hover:border-primary/45 transition-colors">
            <Award className="h-8 w-8 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Verified Quality Standards</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              We vet every partner and test structural resilience. Quality control parameters ensure absolute confidence across all product categories.
            </p>
          </div>

          <div className="border p-6 rounded-2xl bg-card shadow-sm space-y-4 hover:border-primary/45 transition-colors">
            <Sparkles className="h-8 w-8 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Aesthetic & Functional Harmony</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Every item features clean lines and functional utility tailored to seamlessly integrate into modern workspaces and homes.
            </p>
          </div>

          <div className="border-card p-6 border rounded-2xl bg-card shadow-sm space-y-4 hover:border-primary/45 transition-colors">
            <HeartHandshake className="h-8 w-8 text-primary" />
            <h3 className="text-sm font-bold text-foreground">Customer-First Service</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your fulfillment is our target. We provide dedicated support channels, express logistics, and transparent return policies.
            </p>
          </div>
        </div>
      </section>

      {/* Trust Indicators Section */}
      <section id="trust" className="border rounded-2xl p-6 sm:p-10 mb-16 bg-muted/20 scroll-mt-24">
        <h2 className="text-lg font-extrabold text-foreground tracking-tight mb-6 flex items-center gap-2">
          <ShieldCheck className="h-5 w-5 text-emerald-500" />
          Trust Indicators & Service Guarantees
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Safe & Secure Checkout", desc: "PCI-DSS Level 1 compliant gateway processing using 256-bit SSL tokenization." },
            { title: "Genuine Catalog Items", desc: "100% authenticity guaranteed directly from authorized suppliers." },
            { title: "Premium Express Logistics", desc: "Real-time step-by-step courier monitoring from sorting dock to your doorstep." },
            { title: "Hassle-Free Returns", desc: "Flexible return options within 30 days of item receipt, no questions asked." }
          ].map((item, idx) => (
            <div key={idx} className="space-y-1.5 p-4 bg-card rounded-xl border border-border/60 shadow-sm">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-wide">{item.title}</h4>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Information & Social Links */}
      <section id="contact" className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 scroll-mt-24">
        <div className="space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-foreground tracking-tight">Contact Information</h2>
            <p className="text-xs text-muted-foreground">Reach out to our customer care team. We respond within 12 hours.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Global Headquarters</p>
                <p className="text-muted-foreground">104 Tech Boulevard, Suite 500, Austin, TX 78701, United States</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Phone Support</p>
                <p className="text-muted-foreground">+1 (800) 555-NEXUS (Mon - Fri, 9 AM - 6 PM EST)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Mail className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Email Communications</p>
                <p className="text-muted-foreground">support@nexus-store.com (24/7 support request gateway)</p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-xs sm:text-sm">
              <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground">Fulfillment Centers</p>
                <p className="text-muted-foreground">Direct shipping nodes active in USA, Germany, Singapore, and India.</p>
              </div>
            </div>
          </div>

          {/* Social Media Links Section */}
          <div id="social" className="pt-4 border-t space-y-3 scroll-mt-24">
            <h3 className="text-xs font-bold uppercase tracking-wider text-foreground">Connect With Us On Social</h3>
            <div className="flex items-center gap-3">
              {[
                { icon: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  ), label: "Twitter / X", url: "https://twitter.com" },
                { icon: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  ), label: "Instagram", url: "https://instagram.com" },
                { icon: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ), label: "Facebook", url: "https://facebook.com" },
                { icon: (
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                      <rect width="4" height="12" x="2" y="9"/>
                      <circle cx="4" cy="4" r="2"/>
                    </svg>
                  ), label: "LinkedIn", url: "https://linkedin.com" }
              ].map((social, idx) => (
                <a 
                  key={idx} 
                  href={social.url} 
                  target="_blank" 
                  rel="noreferrer"
                  className="h-10 w-10 flex items-center justify-center border bg-card rounded-lg text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                  aria-label={social.label}
                  title={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="border bg-card p-6 sm:p-8 rounded-2xl shadow-sm space-y-4">
          <h3 className="text-base font-extrabold text-foreground tracking-tight">Drop Us A Message</h3>
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">First Name</label>
                <input 
                  type="text" 
                  placeholder="John" 
                  className="w-full h-10 border rounded-lg px-3 bg-muted/40 text-xs focus:outline-none focus:border-primary transition-colors" 
                  required 
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-muted-foreground uppercase">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Doe" 
                  className="w-full h-10 border rounded-lg px-3 bg-muted/40 text-xs focus:outline-none focus:border-primary transition-colors" 
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Email Address</label>
              <input 
                type="email" 
                placeholder="john.doe@example.com" 
                className="w-full h-10 border rounded-lg px-3 bg-muted/40 text-xs focus:outline-none focus:border-primary transition-colors" 
                required 
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">Message / Inquiry</label>
              <textarea 
                rows={4} 
                placeholder="Let us know what you are looking for..." 
                className="w-full border rounded-lg p-3 bg-muted/40 text-xs focus:outline-none focus:border-primary transition-colors resize-none" 
                required 
              />
            </div>
            <button 
              type="submit" 
              className="w-full h-11 bg-primary text-primary-foreground text-xs font-bold uppercase tracking-wider rounded-lg hover:bg-primary/95 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Collapsible Policy Sections */}
      <section className="border-t pt-10 space-y-6">
        
        {/* Data Protection */}
        <div id="privacy" className="border rounded-2xl bg-card overflow-hidden shadow-sm scroll-mt-24">
          <button 
            onClick={() => setPrivacyExpanded(!privacyExpanded)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/40 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <span className="text-sm font-extrabold text-foreground tracking-tight block">Data Protection</span>
                <span className="text-[11px] text-muted-foreground font-normal">Robust safeguards ensuring confidentiality</span>
              </div>
            </div>
            {privacyExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>

          {privacyExpanded && (
            <div className="p-6 border-t bg-muted/20 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-4">
              <p className="font-bold text-foreground">Last updated: June 20, 2026</p>
              <p>
                At Nexus, we respect your confidentiality. This Privacy Statement documents how we collect, store, and utilize visitor credentials across the platform. We utilize advanced security integrations to process payments and handle shipment routing, ensuring zero unauthorized leakages.
              </p>
              <h4 className="font-bold text-foreground mt-4">1. Information We Collect</h4>
              <p>
                We capture basic account metadata (name, email, delivery coordinates) and hardware configurations (IP coordinates, viewport dimensions) when executing orders to support cart layouts, wishlist synchronizations, and session security.
              </p>
              <h4 className="font-bold text-foreground mt-4">2. Cookies & Tracker Management</h4>
              <p>
                We use persistent cookies to retain your shopping cart configuration, recently viewed products, and site layout settings across page updates and reloads.
              </p>
            </div>
          )}
        </div>

        {/* Service Terms */}
        <div id="terms" className="border rounded-2xl bg-card overflow-hidden shadow-sm scroll-mt-24">
          <button 
            onClick={() => setTermsExpanded(!termsExpanded)}
            className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/40 transition-colors focus:outline-none"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="h-5 w-5 text-primary" />
              <div>
                <span className="text-sm font-extrabold text-foreground tracking-tight block">Service Terms</span>
                <span className="text-[11px] text-muted-foreground font-normal">Clear governing guidelines & standards</span>
              </div>
            </div>
            {termsExpanded ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>

          {termsExpanded && (
            <div className="p-6 border-t bg-muted/20 text-xs sm:text-sm text-muted-foreground leading-relaxed space-y-4">
              <p className="font-bold text-foreground">Last updated: June 20, 2026</p>
              <p>
                By navigating Nexus and checkout workflows, you signify agreement to the following rules. Please exit our platform if you do not consent to these criteria.
              </p>
              <h4 className="font-bold text-foreground mt-4">1. Catalog Transactions</h4>
              <p>
                Product pricing and availability details are subject to updates. In cases of catalog errors or logistics blocks, Nexus retains the authorization to reject or refund transactions.
              </p>
              <h4 className="font-bold text-foreground mt-4">2. Intellectual Property</h4>
              <p>
                All custom images, designs, layout codes, and text scripts displayed on Nexus are the exclusive asset of Nexus and protected under international copyright regulations.
              </p>
            </div>
          )}
        </div>

      </section>

    </div>
  )
}
