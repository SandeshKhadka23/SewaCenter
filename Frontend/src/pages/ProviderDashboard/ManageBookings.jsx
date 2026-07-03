import { useState } from "react";

export default function ManageBookings() {
  const [bookings, setBookings] = useState([
    {
      id: 1,
      customer: "Ram Sharma",
      service: "Plumbing",
      date: "2026-07-10",
      status: "Pending",
    },
    {
      id: 2,
      customer: "Sita Karki",
      service: "Electrician",
      date: "2026-07-12",
      status: "Accepted",
    },
  ]);

  const updateStatus = (id, status) => {
    setBookings(
      bookings.map((booking) =>
        booking.id === id
          ? { ...booking, status }
          : booking
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-100 p-8">
      <h1 className="text-3xl font-bold mb-8">
        Booking Requests
      </h1>

      {bookings.map((booking) => (
        <div
          key={booking.id}
          className="bg-white rounded-xl shadow-md p-6 mb-5"
        >
          <h2 className="text-xl font-semibold">
            {booking.customer}
          </h2>

          <p>Service: {booking.service}</p>

          <p>Date: {booking.date}</p>

          <p className="mb-4">
            Status:
            <span className="font-bold ml-2">
              {booking.status}
            </span>
          </p>

          {booking.status === "Pending" && (
            <div className="flex gap-4">
              <button
                onClick={() => updateStatus(booking.id, "Accepted")}
                className="bg-green-600 text-white px-5 py-2 rounded-lg"
              >
                Accept
              </button>

              <button
                onClick={() => updateStatus(booking.id, "Rejected")}
                className="bg-red-600 text-white px-5 py-2 rounded-lg"
              >
                Reject
              </button>
            </div>
          )}

          {booking.status === "Accepted" && (
            <div className="flex gap-4">
              <button
                onClick={() => updateStatus(booking.id, "In Progress")}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg"
              >
                Start Job
              </button>
            </div>
          )}

          {booking.status === "In Progress" && (
            <div className="flex gap-4">
              <button
                onClick={() => updateStatus(booking.id, "Completed")}
                className="bg-purple-600 text-white px-5 py-2 rounded-lg"
              >
                Mark Complete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}