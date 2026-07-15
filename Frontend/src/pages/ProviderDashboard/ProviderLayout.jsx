import { Outlet } from "react-router-dom";
import ProviderSidebar from "./ProviderSidebar";

// import Navbar from "../../components/CustomerPage/Navbar";
import Footer from "../../components/CustomerPage/Footer";

export default function ProviderLayout() {
  return (
    <div className="min-h-screen bg-slate-100">

      {/* Fixed Sidebar */}
      <ProviderSidebar />

      {/* Right Side */}
      <div className="ml-64 flex flex-col min-h-screen">

        {/* Header */}
        {/* <Navbar /> */}

        {/* Page Content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

      </div>

    </div>
  );
}