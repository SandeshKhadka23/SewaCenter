import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/sewacenterlogo.png";
import provider from "../../assets/images/provider.jpg";

export default function ProviderSidebar() {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/provider-dashboard", icon: "📊" },
    { name: "Manage Bookings", path: "/manage-bookings", icon: "📅" },
    { name: "Availability", path: "/availability", icon: "🟢" },
    { name: "Earnings", path: "/earnings", icon: "💰" },
    { name: "Reviews", path: "/reviews", icon: "⭐" },
    { name: "Edit Profile", path: "/edit-profile", icon: "👤" },
    { name: "Settings", path: "/settings", icon: "⚙️" },
  ];

  return (
    <aside className="fixed left-0 top-0 w-64 h-screen bg-slate-900 text-white flex flex-col justify-between shadow-xl">

      {/* Top Section */}
      <div>

        {/* Logo */}
        <div className="bg-white flex justify-center items-center py-5 border-b border-slate-300">
          <img
            src={logo}
            alt="SewaCenter"
            className="w-48 object-contain"
          />
        </div>

        {/* Profile */}
        <div className="py-8 text-center border-b border-slate-700">

          <img
            src={provider}
            alt="Provider"
            className="w-24 h-24 rounded-full mx-auto border-4 border-blue-500 object-cover"
          />

          <h2 className="mt-4 text-2xl font-bold">
            John Doe
          </h2>

          <p className="text-slate-400">
            Electrician
          </p>

          <p className="text-yellow-400 mt-3 font-medium">
            ⭐ 4.9 (128 Reviews)
          </p>

        </div>

        {/* Menu */}
        <nav className="px-4 py-5 space-y-2">

          {menuItems.map((item) => {

            const active = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  active
                    ? "bg-green-600 text-white shadow-lg"
                    : "hover:bg-slate-800 text-slate-200"
                }`}
              >
                <span className="text-lg">{item.icon}</span>

                <span className="font-medium">
                  {item.name}
                </span>

              </Link>
            );

          })}

        </nav>

      </div>

      {/* Bottom */}
      <div className="p-5 border-t border-slate-700">

        <button className="w-full bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold">
          Logout
        </button>

      </div>

    </aside>
  );
}