import { Navigate, Route, Routes } from "react-router-dom";

import ProtectedRoute from "./pages/authentication/ProtectedRoute";
import Signup from "./pages/authentication/Signup";
import LoginPage from "./pages/authentication/LoginPage";
import BecomeProviderPage from "./pages/authentication/BecomeProviderpage";

import Layout from "./components/CustomerPage/Layout";
import HomePage from "./pages/CustomerDashboard/HomePage";
import SearchPage from "./pages/CustomerDashboard/SearchPage";
import CategoriesPage from "./pages/CustomerDashboard/CategoriesPage";
import CategoryPage from "./pages/CustomerDashboard/CategoryPage";
import ProviderProfilePage from "./pages/CustomerDashboard/ProviderProfilePage";
import BookingFormPage from "./pages/CustomerDashboard/BookingFormPage";
import BookingHistoryPage from "./pages/CustomerDashboard/BookingHistoryPage";
import ProvidersPage from "./pages/CustomerDashboard/ProvidersPage";
import AIMatchingPage from "./pages/CustomerDashboard/AIMatchingPage";

import ProviderLayout from "./pages/ProviderDashboard/ProviderLayout";
import ProviderDashboard from "./pages/ProviderDashboard/ProviderDashboard";
import ManageBookings from "./pages/ProviderDashboard/ManageBookings";
import EditProfile from "./pages/ProviderDashboard/EditProfile";
import Availability from "./pages/ProviderDashboard/Availability";
import Settings from "./pages/ProviderDashboard/Settings";
import Earnings from "./pages/ProviderDashboard/Earnings";
import Reviews from "./pages/ProviderDashboard/Reviews";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/become-provider" element={<BecomeProviderPage />} />
      <Route
        path="/becomeprovider"
        element={<Navigate to="/become-provider" replace />}
      />

      <Route
        path="/provider"
        element={
          // <ProtectedRoute roles={["provider", "admin"]}>
            <ProviderLayout />
          // </ProtectedRoute>
        }
      >
        <Route index element={<ProviderDashboard />} />
        <Route path="manage-bookings" element={<ManageBookings />} />
        <Route path="edit-profile" element={<EditProfile />} />
        <Route path="availability" element={<Availability />} />
        <Route path="settings" element={<Settings />} />
        <Route path="earnings" element={<Earnings />} />
        <Route path="reviews" element={<Reviews />} />
      </Route>

      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<CategoryPage />} />
        <Route path="providers" element={<ProvidersPage />} />
        <Route
          path="providers/:providerId"
          element={<ProviderProfilePage />}
        />
        <Route path="ai-match" element={<AIMatchingPage />} />
        <Route
          path="book/:providerId"
          element={
            <ProtectedRoute>
              <BookingFormPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="bookings"
          element={
            <ProtectedRoute>
              <BookingHistoryPage />
            </ProtectedRoute>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
