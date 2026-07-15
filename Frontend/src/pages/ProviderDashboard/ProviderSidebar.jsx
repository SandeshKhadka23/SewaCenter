import {
  LayoutDashboard,
  CalendarDays,
  IndianRupee,
  Star,
  Clock3,
  User,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";
import logo from "../../assets/images/sewacenterlogo.png";

const menu = [
  { title: "Dashboard", icon: LayoutDashboard, path: "/provider" },
  { title: "Bookings", icon: CalendarDays, path: "/provider/manage-bookings" },
  { title: "Earnings", icon: IndianRupee, path: "/provider/earnings" },
  { title: "Reviews", icon: Star, path: "/provider/reviews" },
  { title: "Availability", icon: Clock3, path: "/provider/availability" },
  { title: "Profile", icon: User, path: "/provider/edit-profile" },
  { title: "Settings", icon: Settings, path: "/provider/settings" },
];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

export default function ProviderSidebar() {
  return (
    <aside
      className="w-72 h-screen flex flex-col font-body"
      style={{ background: "#FFFFFF", borderRight: "1px solid #E7E2D4" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
      `}</style>

      {/* Logo */}
      <div className="px-7 py-7" style={{ borderBottom: "1px solid #EFEBDF" }}>
        <div className="flex items-center gap-2">
          <img src={logo} alt="sewacenterlogo" />

        </div>
        <p className="text-xs uppercase tracking-widest mt-2 text-center" style={{ color: "#8A8A78" }}>
          Provider desk
        </p>
      </div>

      {/* Profile */}
      <div className="px-7 py-6 flex items-center gap-4" style={{ borderBottom: "1px solid #EFEBDF" }}>
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center text-white font-display font-semibold text-lg shrink-0"
          style={{ background: "#3B6E8F" }}
        >
          {initials("Sandesh Khadka")}
        </div>

        <div className="min-w-0">
          <h2 className="font-semibold truncate" style={{ color: "#20261F" }}>
            Sandesh Khadka
          </h2>
          <p className="text-sm" style={{ color: "#8A8A78" }}>
            Electrician
          </p>
          <div className="flex items-center gap-1 mt-1">
            <Star className="w-3.5 h-3.5" style={{ fill: "#E8A33D", color: "#E8A33D" }} />
            <span className="text-sm font-medium" style={{ color: "#20261F" }}>
              4.9
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-1 overflow-y-auto">
        {menu.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center gap-3 pl-4 pr-4 py-3 rounded-lg font-medium text-sm transition-colors relative`
              }
              style={({ isActive }) => ({
                color: isActive ? "#20261F" : "#6B6B63",
                background: isActive ? "#F1EEE3" : "transparent",
              })}
            >
              {({ isActive }) => (
                <>
                  <span
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 rounded-full transition-all"
                    style={{
                      height: isActive ? "60%" : "0%",
                      background: "#E8A33D",
                    }}
                  />
                  <Icon size={19} />
                  {item.title}
                </>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-5" style={{ borderTop: "1px solid #EFEBDF" }}>
        <button
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg transition-colors font-medium text-sm hover:bg-[#FBEEEC]"
          style={{ color: "#B24C3C" }}
        >
          <LogOut size={18} />
          Log out
        </button>
      </div>
    </aside>
  );
}