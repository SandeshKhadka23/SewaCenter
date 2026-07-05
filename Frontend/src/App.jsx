import { Routes, Route } from "react-router-dom";

//Protected route
import ProtectedRoute from "./pages/authentication/ProtectedRoute";

// Authentication
import Signup from "./pages/authentication/Signup";
import Login from "./pages/authentication/LoginPage";
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


function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* Landing Page
      <Route path="/" element={<Home />} /> */}

      {/* Provider Pages */}
      <Route path="/providers" element={<ProvidersPage />} />
      <Route path="/providers/:providerId" element={<ProviderProfilePage />} />
      <Route path="/become-provider" element={<BecomeProviderPage />} />

      {/* Customer Dashboard */}
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<CategoryPage />} />
        <Route path="providers" element={<ProvidersPage />} />
        <Route path="providers/:providerId" element={<ProviderProfilePage />} />
        <Route path="book/:providerId" element={
          <ProtectedRoute>
            <BookingFormPage />
          </ProtectedRoute>
        } />
        <Route path="bookings" element={
          <ProtectedRoute>
            <BookingHistoryPage />
          </ProtectedRoute>
        } />
      </Route>
    </Routes>
  );
}

export default App;