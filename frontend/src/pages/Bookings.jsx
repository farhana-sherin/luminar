import React from "react";

const mockBookings = [
  { id: "BK-9401", customer: "Aisha", status: "Completed", amount: "Rs. 2,200" },
  { id: "BK-9402", customer: "Nora", status: "Active", amount: "Rs. 3,100" },
  { id: "BK-9403", customer: "Farah", status: "Completed", amount: "Rs. 2,800" },
];

export const Bookings = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/65 bg-white/75 p-5 shadow-xl backdrop-blur-xl sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Dashboard
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Bookings</h1>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">All bookings</h2>
        <div className="mt-4 space-y-3">
          {mockBookings.map((booking) => (
            <div
              key={booking.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
            >
              <div>
                <p className="text-sm font-semibold text-slate-800">{booking.id}</p>
                <p className="text-xs text-slate-500">{booking.customer}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-slate-800">{booking.amount}</p>
                <p className="text-xs text-slate-500">{booking.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

