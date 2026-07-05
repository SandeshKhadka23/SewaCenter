import { useState } from "react";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">

        <h1 className="text-3xl font-bold mb-8">
          ⚙️ Settings
        </h1>

        {/* Notifications */}
        <div className="flex justify-between items-center border-b pb-5 mb-5">
          <div>
            <h2 className="font-semibold text-lg">
              Booking Notifications
            </h2>
            <p className="text-gray-500">
              Receive notifications for new bookings.
            </p>
          </div>

          <input
            type="checkbox"
            checked={notifications}
            onChange={() => setNotifications(!notifications)}
            className="w-5 h-5"
          />
        </div>

        {/* Change Password */}
        <button className="w-full bg-blue-600 text-white py-3 rounded-xl mb-4 hover:bg-blue-700">
          Change Password
        </button>

        {/* Logout */}
        <button className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700">
          Logout
        </button>

      </div>
    </div>
  );
}