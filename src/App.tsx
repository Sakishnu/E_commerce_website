import React from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { NotificationProvider } from "./context/NotificationContext"
import { ErrorBoundary } from "./components/common/ErrorBoundary"
import { Navbar } from "./components/common/Navbar"
import { Footer } from "./components/common/Footer"

// Pages
import { LandingPage } from "./pages/LandingPage"
import { HomePage } from "./pages/HomePage"
import { ProductListingPage } from "./pages/ProductListingPage"
import { ProductDetailsPage } from "./pages/ProductDetailsPage"
import { CategoryPage } from "./pages/CategoryPage"
import { SearchResultsPage } from "./pages/SearchResultsPage"
import { ShoppingCartPage } from "./pages/ShoppingCartPage"
import { WishlistPage } from "./pages/WishlistPage"
import { CheckoutPage } from "./pages/CheckoutPage"
import { OrderSuccessPage } from "./pages/OrderSuccessPage"
import { UserDashboardPage } from "./pages/UserDashboardPage"
import { LoginPage } from "./pages/LoginPage"
import { SignupPage } from "./pages/SignupPage"
import { ForgotPasswordPage } from "./pages/ForgotPasswordPage"
import { ContactUsPage } from "./pages/ContactUsPage"
import { AboutUsPage } from "./pages/AboutUsPage"
import { FAQPage } from "./pages/FAQPage"
import { DealsPage } from "./pages/DealsPage"

const App: React.FC = () => {
  return (
    <Router>
      <NotificationProvider>
        <ErrorBoundary>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/home" element={<Navigate to="/" replace />} />
                <Route path="/landing" element={<LandingPage />} />
                <Route path="/shop" element={<ProductListingPage />} />
                <Route path="/deals" element={<DealsPage />} />
                <Route path="/product/:id" element={<ProductDetailsPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/category/:slug/:subSlug" element={<ProductListingPage />} />
                <Route path="/search" element={<SearchResultsPage />} />
                <Route path="/cart" element={<ShoppingCartPage />} />
                <Route path="/wishlist" element={<WishlistPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/order-success" element={<OrderSuccessPage />} />
                
                {/* Dashboard Sub-routes */}
                <Route path="/dashboard" element={<UserDashboardPage />} />
                <Route path="/dashboard/orders" element={<UserDashboardPage />} />
                <Route path="/dashboard/profile" element={<UserDashboardPage />} />
                <Route path="/dashboard/track/:trackId" element={<UserDashboardPage />} />
                
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                <Route path="/contact" element={<ContactUsPage />} />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/faq" element={<FAQPage />} />
                
                {/* Fallback redirect */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </NotificationProvider>
    </Router>
  )
}

export default App
