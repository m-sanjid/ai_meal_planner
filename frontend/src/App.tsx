import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import Meal from "./pages/Meal";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Landing from "./pages/Landing";
import { ThemeProvider } from "./components/ThemeProvider";
import Dashboard from "./pages/Dashboard";
import RegisterUser from "./components/RegisterUser";
import Favorites from "./pages/Favorites";
import NotFound from "./pages/NotFound";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Blog from "./pages/Blog";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Documentation from "./pages/Documentation";
import Support from "./pages/Support";
import Careers from "./pages/Careers";
import Preview from "./pages/Preview";
import { Toaster } from "./components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import AppLayout from "./components/AppLayout";
import Settings from "./pages/Settings";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import AutoRegister from "./components/RegisterUser";
import ShoppingList from "./components/ShoppingList";
import MealCalendar from "./components/MealCalendar";
import CalorieTracker from "./pages/CalorieTracker";
import BlogDetails from "./pages/BlogDetails";

function App() {
  return (
    <>
      <ThemeProvider>
        <SubscriptionProvider>
          <SidebarProvider>
            <BrowserRouter>
              <AppContent />
            </BrowserRouter>
          </SidebarProvider>
        </SubscriptionProvider>
      </ThemeProvider>
      <Toaster position="top-right" />
    </>
  );
}

function AppContent() {
  const location = useLocation();

  const footerRoutes = [
    "/",
    "/about",
    "/contact",
    "/features",
    "/pricing",
    "/blog",
    "/terms",
    "/documentation",
    "/support",
    "/preview",
    "/privacy",
    "/careers",
    "/settings",
  ];

  return (
    <div className="w-full">
      <Navbar />
      <AutoRegister />
      <Routes>
        {/* Public routes without sidebar */}
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/features" element={<Features />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogDetails />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/support" element={<Support />} />
        <Route path="/careers" element={<Careers />} />
        <Route path="/preview" element={<Preview />} />
        <Route path="/user/register" element={<RegisterUser />} />
        <Route path="/settings" element={<Settings />} />

        {/* App routes with sidebar layout */}
        <Route element={<AppLayout />}>
          <Route path="/meal" element={<Meal />} />
          <Route path="/user/favorites" element={<Favorites />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/shopping" element={<ShoppingList />} />
          <Route path="/calendar" element={<MealCalendar />} />
          <Route path="/calorie-tracker" element={<CalorieTracker />} />
        </Route>

        {/* 404 route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {footerRoutes.includes(location.pathname) && <Footer />}
    </div>
  );
}

export default App;
