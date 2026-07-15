import { useState } from "react";
import { Bell, Lock, LogOut, Settings as SettingsIcon } from "lucide-react";
import ToggleSwitch from "./ToggleSwitch";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="p-6 md:p-10 font-body" style={{ color: "#20261F" }}>
      <div className="max-w-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
            style={{ background: "#20261F" }}
          >
            <SettingsIcon size={18} color="#F6F3EC" />
          </div>
          <div>
            <h1 className="font-display text-2xl font-semibold">Settings</h1>
            <p className="text-sm" style={{ color: "#6B6B63" }}>
              Manage how SewaCenter works for you.
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #E7E2D4" }}>
          {/* Notifications */}
          <div
            className="flex items-center justify-between gap-4 pb-5 mb-5"
            style={{ borderBottom: "1px solid #EFEBDF" }}
          >
            <div className="flex items-center gap-3">
              <Bell size={18} style={{ color: "#3B6E8F" }} className="shrink-0" />
              <div>
                <h2 className="font-semibold text-sm">Booking notifications</h2>
                <p className="text-sm" style={{ color: "#6B6B63" }}>
                  Get notified when a new booking comes in.
                </p>
              </div>
            </div>

            <ToggleSwitch
              checked={notifications}
              onChange={() => setNotifications(!notifications)}
              activeColor="#3B6E8F"
              inactiveColor="#E7E2D4"
            />
          </div>

          {/* Change Password */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm mb-3 text-white transition hover:opacity-90"
            style={{ background: "#20261F" }}
          >
            <Lock size={16} />
            Change password
          </button>

          {/* Logout */}
          <button
            className="w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium text-sm transition hover:opacity-80"
            style={{ color: "#B24C3C", background: "#FBEEEC" }}
          >
            <LogOut size={16} />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}