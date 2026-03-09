import React from "react";
import {
  CalendarCheck2,
  CheckCircle2,
  ReceiptText,
  Shirt,
} from "lucide-react";

const mockDashboardStats = {
  totalDresses: 128,
  totalBookings: 86,
  completedBookings: 64,
};

const summaryCards = [
  {
    key: "totalDresses",
    title: "Dresses Added",
    value: mockDashboardStats.totalDresses,
    icon: Shirt,
    accent: "from-amber-100 to-orange-200",
  },
  {
    key: "totalBookings",
    title: "Total Bookings",
    value: mockDashboardStats.totalBookings,
    icon: CalendarCheck2,
    accent: "from-rose-100 to-pink-200",
  },
  {
    key: "completedBookings",
    title: "Completed",
    value: mockDashboardStats.completedBookings,
    icon: CheckCircle2,
    accent: "from-emerald-100 to-teal-200",
  },
];

const mockRecentBookings = [
  { id: "BK-9401", customer: "Aisha", status: "Completed", amount: "Rs. 2,200" },
  { id: "BK-9402", customer: "Nora", status: "Active", amount: "Rs. 3,100" },
  { id: "BK-9403", customer: "Farah", status: "Completed", amount: "Rs. 2,800" },
];

export const Dashboard = () => {
  const completionRate = Math.round(
    (mockDashboardStats.completedBookings /
      mockDashboardStats.totalBookings) *
      100
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <section className="rounded-3xl border border-white/65 bg-white/75 p-5 shadow-xl backdrop-blur-xl sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Admin Panel
        </p>

        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">
          Dashboard
        </h1>
      </section>

      {/* Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {summaryCards.map((card) => {
          const Icon = card.icon;

          return (
            <article
              key={card.key}
              className={`rounded-3xl border border-white/70 bg-gradient-to-br ${card.accent} p-5 shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    {card.title}
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {card.value}
                  </p>
                </div>

                <span className="rounded-xl bg-white/70 p-2.5 shadow">
                  <Icon size={18} />
                </span>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Section */}
      <div className="grid gap-5 xl:grid-cols-[1.25fr,1fr]">

        {/* Recent bookings */}
        <article className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">
              Recent Bookings
            </h3>

            <ReceiptText size={18} className="text-slate-500" />
          </div>

          <div className="mt-4 space-y-3">
            {mockRecentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex items-center justify-between rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {booking.id}
                  </p>

                  <p className="text-xs text-slate-500">
                    {booking.customer}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-slate-800">
                    {booking.amount}
                  </p>

                  <p className="text-xs text-slate-500">
                    {booking.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </article>

        {/* Progress */}
        <article className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg">
          <h3 className="text-lg font-bold text-slate-900">
            Completion
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Completed bookings against total bookings.
          </p>

          <div className="mt-6">
            <div className="h-3 rounded-full bg-slate-100">
              <div
                className="h-3 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                style={{ width: `${completionRate}%` }}
              />
            </div>

            <p className="mt-3 text-sm font-semibold text-slate-700">
              {completionRate}% completed
            </p>
          </div>
        </article>

      </div>
    </div>
  );
};