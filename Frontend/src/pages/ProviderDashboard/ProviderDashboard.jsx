import { Link } from "react-router-dom";

export default function ProviderDashboard() {
  return (
    <div className="min-h-screen bg-slate-100 p-10">
      <h1 className="text-4xl font-bold mb-8">
        Provider Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-6">

        <Link
          to="/manage-bookings"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            📅 Manage Bookings
          </h2>

          <p className="text-gray-500 mt-2">
            Accept, reject and complete jobs.
          </p>
        </Link>

        <Link
          to="/edit-profile"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            👤 Edit Profile
          </h2>

          <p className="text-gray-500 mt-2">
            Update your personal information.
          </p>
        </Link>

        <Link
          to="/availability"
          className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl"
        >
          <h2 className="text-2xl font-bold">
            🟢 Availability
          </h2>

          <p className="text-gray-500 mt-2">
            Set your working days and hours.
          </p>
        </Link>
        <Link
  to="/settings"
  className="bg-white shadow-lg rounded-xl p-8 hover:shadow-xl"
>
  <h2 className="text-2xl font-bold">
    ⚙️ Settings
  </h2>

  <p className="text-gray-500 mt-2">
    Manage account settings and security.
  </p>
</Link>

      </div>
    </div>
  );
}