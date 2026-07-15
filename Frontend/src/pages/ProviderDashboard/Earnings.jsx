import { Wallet, TrendingUp, Clock3 } from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import StatCard from "./StatCard";

const earningsData = [
  { month: "Jan", amount: 12000 },
  { month: "Feb", amount: 18000 },
  { month: "Mar", amount: 25000 },
  { month: "Apr", amount: 32000 },
  { month: "May", amount: 45000 },
  { month: "Jun", amount: 52000 },
];

const payments = [
  { customer: "Ram Sharma", service: "Plumbing", amount: 2500, date: "July 10, 2026" },
  { customer: "Sita Karki", service: "Electrician", amount: 3200, date: "July 8, 2026" },
  { customer: "Hari KC", service: "AC Repair", amount: 4000, date: "July 5, 2026" },
];

const AVATAR_PALETTE = ["#3B6E8F", "#3E7C59", "#E8A33D", "#B24C3C", "#6B5B95"];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function avatarColor(name) {
  const sum = name.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  return AVATAR_PALETTE[sum % AVATAR_PALETTE.length];
}

export default function Earnings() {
  return (
    <div className="p-6 md:p-10 font-body" style={{ color: "#20261F" }}>
      <div className="mb-8">
        <span className="text-xs uppercase tracking-widest" style={{ color: "#8A8A78" }}>
          Money
        </span>
        <h1 className="font-display text-3xl font-semibold mt-1">Earnings</h1>
        <p className="mt-1" style={{ color: "#6B6B63" }}>
          Track what's coming in and what's still owed.
        </p>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <StatCard
          title="Total earnings"
          value="Rs. 2,45,000"
          subtitle="All time"
          icon={Wallet}
          accent="#3E7C59"
        />
        <StatCard
          title="This month"
          value="Rs. 45,000"
          subtitle="12 jobs completed"
          icon={TrendingUp}
          accent="#3B6E8F"
        />
        <StatCard
          title="Pending payments"
          value="Rs. 8,500"
          subtitle="2 invoices open"
          icon={Clock3}
          accent="#E8A33D"
        />
      </div>

      {/* Chart */}
      <div className="rounded-xl bg-white p-6 mb-6" style={{ border: "1px solid #E7E2D4" }}>
        <h2 className="font-display text-xl font-semibold mb-6">Monthly earnings</h2>

        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={earningsData}>
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
                dataKey="amount"
                stroke="#3E7C59"
                strokeWidth={3}
                dot={{ fill: "#3E7C59", r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Payments */}
      <div className="rounded-xl bg-white p-6" style={{ border: "1px solid #E7E2D4" }}>
        <h2 className="font-display text-xl font-semibold mb-5">Recent payments</h2>

        <div className="divide-y" style={{ borderColor: "#EFEBDF" }}>
          {payments.map((p) => (
            <div key={p.customer} className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-semibold font-display shrink-0"
                  style={{ background: avatarColor(p.customer) }}
                >
                  {initials(p.customer)}
                </div>
                <div>
                  <p className="font-medium text-sm">{p.customer}</p>
                  <p className="text-xs" style={{ color: "#8A8A78" }}>
                    {p.service}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-sm" style={{ color: "#3E7C59" }}>
                  Rs. {p.amount.toLocaleString("en-IN")}
                </p>
                <p className="text-xs" style={{ color: "#8A8A78" }}>
                  {p.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}