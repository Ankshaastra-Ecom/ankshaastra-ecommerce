import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { WishlistProvider } from "@/context/WishlistContext";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import RudrakshaCalculator from "./pages/calculators/RudrakshaCalculator";
import BraceletCalculator from "./pages/calculators/BraceletCalculator";
import GemstoneConverter from "./pages/calculators/GemstoneConverter";
import GemstoneCalculator from "./pages/calculators/GemstoneCalculator";
import GemstonesComingSoon from "./pages/GemstonesComingSoon";
import RefundPolicy from "./pages/RefundPolicy";
import ShippingPolicy from "./pages/ShippingPolicy";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsConditions from "./pages/TermsConditions";
import Auth from "./pages/Auth";
import ResetPassword from "./pages/ResetPassword";
import MyOrders from "./pages/MyOrders";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import Rewards from "./pages/Rewards";
import GiftCards from "./pages/GiftCards";
import Vouchers from "./pages/Vouchers";
import WhatsAppButton from "./components/WhatsAppButton";
import ScrollToTop from "./components/ScrollToTop";
import MobileBottomNav from "./components/layout/MobileBottomNav";
import ExitIntentPopup from "./components/ExitIntentPopup";
import CookieConsent from "./components/CookieConsent";
import SocialProofNotification from "./components/SocialProofNotification";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
    <WishlistProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/shop/gemstones" element={<GemstonesComingSoon />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/refund-policy" element={<RefundPolicy />} />
              <Route path="/shipping-policy" element={<ShippingPolicy />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsConditions />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/my-orders" element={<MyOrders />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/calculators/rudraksha" element={<RudrakshaCalculator />} />
              <Route path="/calculators/bracelet" element={<BraceletCalculator />} />
              <Route path="/calculators/gemstone-converter" element={<GemstoneConverter />} />
              <Route path="/calculators/gemstone" element={<GemstoneCalculator />} />
              <Route path="/calculators/yantra" element={<RudrakshaCalculator />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/rewards" element={<Rewards />} />
              <Route path="/gift-cards" element={<GiftCards />} />
              <Route path="/vouchers" element={<Vouchers />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <MobileBottomNav />
          </BrowserRouter>
          <WhatsAppButton />
          <ExitIntentPopup />
          <CookieConsent />
          <SocialProofNotification />
        </TooltipProvider>
      </CartProvider>
    </WishlistProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
