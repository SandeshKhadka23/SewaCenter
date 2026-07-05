import { Link } from "react-router-dom";
import provider from "../../assets/images/provider.jpg";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function ProviderDashboard() {
  const earningsData = [
    { week: "Apr 18-24", earnings: 10000 },
    { week: "Apr 25-May 1", earnings: 20000 },
    { week: "May 2-8", earnings: 27000 },
    { week: "May 9-15", earnings: 34000 },
    { week: "May 16-22", earnings: 45000 },
  ];

  return (
    <>
      {/* Welcome Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold">
            Welcome Back, John 👋
          </h1>

          <p className="text-gray-500 mt-2 text-lg">
            Here's what's happening today.
          </p>
        </div>

        <div className="flex items-center gap-6">
          <button className="text-3xl hover:scale-110 transition">
            🔔
          </button>

          <button className="text-3xl hover:scale-110 transition">
            💬
          </button>

          <img
            src={provider}
            alt="Provider"
            className="w-14 h-14 rounded-full border object-cover"
          />
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Pending Jobs</p>
          <h2 className="text-4xl font-bold text-blue-600 mt-2">5</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Completed Jobs</p>
          <h2 className="text-4xl font-bold text-green-600 mt-2">42</h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Rating</p>
          <h2 className="text-4xl font-bold text-yellow-500 mt-2">
            ⭐ 4.9
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">Monthly Earnings</p>
          <h2 className="text-4xl font-bold text-purple-600 mt-2">
            Rs. 45,000
          </h2>
        </div>
      </div>

      {/* Bookings + Earnings */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Bookings */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Upcoming Bookings
            </h2>

            <Link
              to="/manage-bookings"
              className="text-blue-600 font-semibold"
            >
              View All
            </Link>
          </div>

          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3">Customer</th>
                <th className="text-left py-3">Service</th>
                <th className="text-left py-3">Status</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-b">
                <td className="py-4">Ram Sharma</td>
                <td>Plumbing</td>
                <td className="text-yellow-600 font-semibold">
                  Pending
                </td>
              </tr>

              <tr className="border-b">
                <td className="py-4">Sita Karki</td>
                <td>Electrician</td>
                <td className="text-green-600 font-semibold">
                  Accepted
                </td>
              </tr>

              <tr>
                <td className="py-4">Hari KC</td>
                <td>AC Repair</td>
                <td className="text-blue-600 font-semibold">
                  In Progress
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Earnings */}
        <div className="bg-white rounded-2xl shadow p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">
              Earnings
            </h2>

            <Link
              to="/earnings"
              className="text-blue-600 font-semibold"
            >
              View All
            </Link>
          </div>

          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={earningsData}>
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="earnings"
                  stroke="#7C3AED"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          <Link
            to="/manage-bookings"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">
              📅 Manage Bookings
            </h3>

            <p className="text-gray-500 mt-2">
              View and manage customer bookings.
            </p>
          </Link>

          <Link
            to="/edit-profile"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">
              👤 Edit Profile
            </h3>

            <p className="text-gray-500 mt-2">
              Update your profile information.
            </p>
          </Link>

          <Link
            to="/earnings"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">
              💰 Earnings
            </h3>

            <p className="text-gray-500 mt-2">
              View your income and payment history.
            </p>
          </Link>

          <Link
            to="/reviews"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">
              ⭐ Reviews
            </h3>

            <p className="text-gray-500 mt-2">
              Read customer feedback.
            </p>
          </Link>

          <Link
            to="/settings"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">
              ⚙️ Settings
            </h3>

            <p className="text-gray-500 mt-2">
              Manage account settings.
            </p>
          </Link>

          <Link
            to="/availability"
            className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">
              🟢 Availability
            </h3>

            <p className="text-gray-500 mt-2">
              Set your working days and hours.
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}