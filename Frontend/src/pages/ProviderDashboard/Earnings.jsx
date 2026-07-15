import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function Earnings() {
  const earningsData = [
    { month: "Jan", amount: 12000 },
    { month: "Feb", amount: 18000 },
    { month: "Mar", amount: 25000 },
    { month: "Apr", amount: 32000 },
    { month: "May", amount: 45000 },
    { month: "Jun", amount: 52000 },
  ];

  return (
    <div>

      <h1 className="text-3xl font-bold mb-8">
        Earnings
      </h1>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Total Earnings
          </p>

          <h2 className="text-4xl font-bold text-green-600 mt-2">
            Rs. 2,45,000
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            This Month
          </p>

          <h2 className="text-4xl font-bold text-blue-600 mt-2">
            Rs. 45,000
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow p-6">
          <p className="text-gray-500">
            Pending Payments
          </p>

          <h2 className="text-4xl font-bold text-orange-500 mt-2">
            Rs. 8,500
          </h2>
        </div>

      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl shadow p-6">

        <h2 className="text-2xl font-bold mb-6">
          Monthly Earnings
        </h2>

        <div className="h-96">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={earningsData}>

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="amount"
                stroke="#3B82F6"
                strokeWidth={3}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

      {/* Recent Payments */}
      <div className="bg-white rounded-2xl shadow p-6 mt-8">

        <h2 className="text-2xl font-bold mb-6">
          Recent Payments
        </h2>

        <table className="w-full">

          <thead className="border-b">

            <tr>

              <th className="text-left py-3">
                Customer
              </th>

              <th className="text-left py-3">
                Service
              </th>

              <th className="text-left py-3">
                Amount
              </th>

              <th className="text-left py-3">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="py-4">
                Ram Sharma
              </td>

              <td>
                Plumbing
              </td>

              <td className="text-green-600 font-semibold">
                Rs. 2,500
              </td>

              <td>
                July 10, 2026
              </td>

            </tr>

            <tr className="border-b">

              <td className="py-4">
                Sita Karki
              </td>

              <td>
                Electrician
              </td>

              <td className="text-green-600 font-semibold">
                Rs. 3,200
              </td>

              <td>
                July 8, 2026
              </td>

            </tr>

            <tr>

              <td className="py-4">
                Hari KC
              </td>

              <td>
                AC Repair
              </td>

              <td className="text-green-600 font-semibold">
                Rs. 4,000
              </td>

              <td>
                July 5, 2026
              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>
  );
}