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

function App() {
  return (
    <Routes>
      {/* Authentication */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* Landing Page */}
      <Route path="/" element={<Home />} />

      {/* Customer Dashboard */}
      <Route path="/dashboard" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="categories" element={<CategoriesPage />} />
        <Route path="categories/:categoryId" element={<CategoryPage />} />
        <Route path="providers/:providerId" element={<ProviderProfilePage />} />
        <Route path="book/:providerId" element={<BookingFormPage />} />
        <Route path="bookings" element={<BookingHistoryPage />} />
      </Route>
    </Routes>
  );
}

export default App;