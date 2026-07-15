import {
  Calendar,
  Wallet,
  Star,
  Clock,
  ArrowUpRight,
} from "lucide-react";

import StatCard from "./StatCard";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const ACCENT = {
  blue: "#3B6E8F",
  green: "#3E7C59",
  amber: "#E8A33D",
  brick: "#B24C3C",
};

const stats = [
  {
    title: "Today's bookings",
    value: "12",
    subtitle: "+3 from yesterday",
    icon: Calendar,
    accent: ACCENT.blue,
  },
  {
    title: "Monthly earnings",
    value: "Rs. 45,000",
    subtitle: "+12% vs last month",
    icon: Wallet,
    accent: ACCENT.green,
  },
  {
    title: "Average rating",
    value: "4.9",
    subtitle: "247 reviews",
    icon: Star,
    accent: ACCENT.amber,
  },
  {
    title: "Pending requests",
    value: "6",
    subtitle: "Need confirmation",
    icon: Clock,
    accent: ACCENT.brick,
  },
];

const earnings = [
  { month: "Jan", value: 12000 },
  { month: "Feb", value: 18000 },
  { month: "Mar", value: 24000 },
  { month: "Apr", value: 32000 },
  { month: "May", value: 39000 },
  { month: "Jun", value: 45000 },
];

const STATUS_STYLE = {
  Confirmed: { color: ACCENT.blue },
  Pending: { color: ACCENT.amber },
  Completed: { color: ACCENT.green },
};

const AVATAR_PALETTE = [ACCENT.blue, ACCENT.green, ACCENT.amber, ACCENT.brick, "#6B5B95"];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function avatarColor(name) {
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

const bookings = [
  {
    name: "Ram Sharma",
    service: "Electrical Repair",
    amount: "Rs. 2,500",
    status: "Confirmed",
  },
  {
    name: "Sita KC",
    service: "Home Cleaning",
    amount: "Rs. 1,800",
    status: "Pending",
  },
  {
    name: "Hari Gautam",
    service: "Plumbing",
    amount: "Rs. 3,200",
    status: "Completed",
  },
];

export default function ProviderDashboard() {
  return (
    <div className="min-h-screen font-body" style={{ background: "#F6F3EC", color: "#20261F" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');
        .font-display { font-family: 'Space Grotesk', sans-serif; }
        .font-body { font-family: 'IBM Plex Sans', sans-serif; }
      `}</style>

      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="font-display text-4xl font-semibold">
              Good morning, Sandesh
            </h1>
            <p className="mt-1" style={{ color: "#6B6B63" }}>
              Here's what's happening on the board today.
            </p>
          </div>

          <button
            className="px-6 py-3 rounded-xl font-semibold text-white flex items-center gap-2 transition hover:opacity-90"
            style={{ background: "#20261F" }}
          >
            View all jobs
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-2 mb-8">
          {stats.map((item) => (
            <StatCard
              key={item.title}
              title={item.title}
              value={item.value}
              subtitle={item.subtitle}
              icon={item.icon}
              accent={item.accent}
            />
          ))}
        </div>

        {/* Bottom */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Chart */}
          <div
            className="lg:col-span-2 rounded-xl p-6 bg-white"
            style={{ border: "1px solid #E7E2D4" }}
          >
            <div className="flex justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-semibold">
                  Earnings overview
                </h2>
                <p className="text-sm" style={{ color: "#8A8A78" }}>
                  Last 6 months
                </p>
              </div>
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={earnings}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EFEBDF" />
                <XAxis
                  dataKey="month"
                  stroke="#8A8A78"
                  tick={{ fill: "#8A8A78", fontSize: 12 }}
                  axisLine={{ stroke: "#E7E2D4" }}
                  tickLine={false}
                />
                <YAxis
                  stroke="#8A8A78"
                  tick={{ fill: "#8A8A78", fontSize: 12 }}
                  axisLine={{ stroke: "#E7E2D4" }}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    background: "#20261F",
                    border: "none",
                    borderRadius: 8,
                    color: "#F6F3EC",
                    fontSize: 13,
                  }}
                  labelStyle={{ color: "#F6F3EC" }}
                  formatter={(value) => [`Rs. ${value.toLocaleString("en-IN")}`, "Earnings"]}
                />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={ACCENT.amber}
                  strokeWidth={3}
                  dot={{ fill: ACCENT.amber, r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Bookings */}
          <div className="rounded-xl p-6 bg-white" style={{ border: "1px solid #E7E2D4" }}>
            <h2 className="font-display text-xl font-semibold mb-5">
              Recent bookings
            </h2>

            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.name}
                  className="pb-4"
                  style={{ borderBottom: "1px solid #EFEBDF" }}
                >
                  <div className="flex justify-between gap-3">
                    <div className="flex gap-3">
                      <div
                        className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold font-display shrink-0"
                        style={{ background: avatarColor(booking.name) }}
                      >
                        {initials(booking.name)}
                      </div>
                      <div>
                        <h3 className="font-semibold text-sm">{booking.name}</h3>
                        <p className="text-xs" style={{ color: "#8A8A78" }}>
                          {booking.service}
                        </p>
                      </div>
                    </div>

                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold h-fit shrink-0"
                      style={{ color: STATUS_STYLE[booking.status].color }}
                    >
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: STATUS_STYLE[booking.status].color }}
                      />
                      {booking.status}
                    </span>
                  </div>

                  <div className="flex justify-between mt-3 pl-[52px]">
                    <span className="text-sm font-medium">{booking.amount}</span>
                    <button
                      className="text-sm font-semibold hover:underline"
                      style={{ color: "#20261F" }}
                    >
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}