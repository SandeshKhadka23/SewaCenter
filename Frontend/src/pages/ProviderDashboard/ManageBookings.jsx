export default function ManageBookings() {
  const bookings = [
    {
      id: 1,
      customer: "Ram Sharma",
      service: "Plumbing",
      date: "May 20, 2025",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sita Karki",
      service: "Electrician",
      date: "May 20, 2025",
      time: "2:00 PM",
      status: "Confirmed",
    },
    {
      id: 3,
      customer: "Hari KC",
      service: "AC Repair",
      date: "May 21, 2025",
      time: "11:00 AM",
      status: "Completed",
    },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">
        Manage Bookings
      </h1>

      <div className="bg-white rounded-2xl shadow overflow-hidden">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="text-left px-6 py-4">Customer</th>
              <th className="text-left px-6 py-4">Service</th>
              <th className="text-left px-6 py-4">Date</th>
              <th className="text-left px-6 py-4">Time</th>
              <th className="text-left px-6 py-4">Status</th>
              <th className="text-left px-6 py-4">Action</th>
            </tr>

          </thead>

          <tbody>

            {bookings.map((booking) => (
              <tr
                key={booking.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  {booking.customer}
                </td>

                <td className="px-6 py-4">
                  {booking.service}
                </td>

                <td className="px-6 py-4">
                  {booking.date}
                </td>

                <td className="px-6 py-4">
                  {booking.time}
                </td>

                <td className="px-6 py-4">
                  <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm">
                    {booking.status}
                  </span>
                </td>

                <td className="px-6 py-4 flex gap-2">
                  <button className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                    Accept
                  </button>

                  <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700">
                    Reject
                  </button>
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>
    </div>
  );
}