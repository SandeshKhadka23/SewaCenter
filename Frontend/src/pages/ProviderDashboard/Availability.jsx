import { useState } from "react";

export default function Availability() {
  const [available, setAvailable] = useState(true);

  const schedule = [
    { day: "Sunday", time: "9:00 AM - 5:00 PM" },
    { day: "Monday", time: "9:00 AM - 5:00 PM" },
    { day: "Tuesday", time: "9:00 AM - 5:00 PM" },
    { day: "Wednesday", time: "9:00 AM - 5:00 PM" },
    { day: "Thursday", time: "9:00 AM - 5:00 PM" },
    { day: "Friday", time: "9:00 AM - 5:00 PM" },
    { day: "Saturday", time: "Holiday" },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Availability
      </h1>

      {/* Status Card */}
      <div className="bg-white rounded-2xl shadow p-6 mb-8">

        <div className="flex justify-between items-center">

          <div>
            <h2 className="text-2xl font-semibold">
              Current Status
            </h2>

            <p className="text-gray-500 mt-2">
              Let customers know whether you're available.
            </p>
          </div>

          <button
            onClick={() => setAvailable(!available)}
            className={`px-6 py-3 rounded-xl text-white font-semibold transition ${
              available
                ? "bg-green-600 hover:bg-green-700"
                : "bg-red-600 hover:bg-red-700"
            }`}
          >
            {available ? "Available" : "Unavailable"}
          </button>

        </div>

      </div>

      {/* Weekly Schedule */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Weekly Schedule
        </h2>

        <table className="w-full">

          <thead className="border-b">

            <tr>
              <th className="text-left py-3">Day</th>
              <th className="text-left py-3">Working Hours</th>
            </tr>

          </thead>

          <tbody>

            {schedule.map((item) => (

              <tr
                key={item.day}
                className="border-b hover:bg-slate-50"
              >

                <td className="py-4 font-medium">
                  {item.day}
                </td>

                <td className="py-4">
                  {item.time}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}