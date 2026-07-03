import { Routes, Route } from "react-router-dom";

// Authentication
import Signup from "./pages/authentication/Signup";
import Login from "./pages/authentication/LoginPage";

// Landing Page
import Home from "./pages/LandingPage/Home";

// Customer Dashboard
import Layout from "./components/CustomerPage/Layout";
import HomePage from "./pages/CustomerDashboard/HomePage";
import SearchPage from "./pages/CustomerDashboard/SearchPage";
import CategoriesPage from "./pages/CustomerDashboard/CategoriesPage";
import CategoryPage from "./pages/CustomerDashboard/CategoryPage";
import ProviderProfilePage from "./pages/CustomerDashboard/ProviderProfilePage";
import BookingFormPage from "./pages/CustomerDashboard/BookingFormPage";
import BookingHistoryPage from "./pages/CustomerDashboard/BookingHistoryPage";
import ProvidersPage from "./pages/CustomerDashboard/ProvidersPage";
import BecomeProviderPage from "./pages/CustomerDashboard/BecomeProviderpage";
import RegisterProvider from "./pages/CustomerDashboard/RegisterProvider";
import LoginChoice from "./pages/CustomerDashboard/LoginChoice";
import CustomerLogin from "./pages/CustomerDashboard/CustomerLogin";
import ProviderLogin from "./pages/CustomerDashboard/ProviderLogin";
// ProviderDashBoard
import ProviderDashboard from "./pages/ProviderDashboard/ProviderDashboard";
import ManageBookings from "./pages/ProviderDashboard/ManageBookings";
import EditProfile from "./pages/ProviderDashboard/EditProfile";
import Availability from "./pages/ProviderDashboard/Availability";
import Settings from "./pages/ProviderDashboard/Settings";


function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Provider Pages */}
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/providers/:providerId" element={<ProviderProfilePage />} />
      <Route path="/become-provider" element={<BecomeProviderPage />} />
       {/* Register Provider */}
      <Route path="/register-provider" element={<RegisterProvider />} />
      <Route path="/login" element={<LoginChoice />} />
      <Route path="/customer-login" element={<CustomerLogin />} />
      <Route path="/provider-login" element={<ProviderLogin />} />
       
{/* Provider Dashboard */}
<Route path="/provider-dashboard" element={<ProviderDashboard />} />
<Route path="/manage-bookings" element={<ManageBookings />} />
<Route path="/edit-profile" element={<EditProfile />} />
<Route path="/availability" element={<Availability />} />
<Route path="/settings" element={<Settings />} />


      {/* Customer Dashboard */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<CategoryPage />} />
        <Route path="providers" element={<ProvidersPage />} />
        <Route path="providers/:providerId" element={<ProviderProfilePage />} />
        <Route path="book/:providerId" element={<BookingFormPage />} />
        <Route path="bookings" element={<BookingHistoryPage />} />

        
      </Route>
    </Routes>
  );
}

export default App;
