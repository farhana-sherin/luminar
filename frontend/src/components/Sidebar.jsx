import React from "react";
import { LayoutDashboard, Shirt, CalendarCheck2 } from "lucide-react";
import { NavLink } from "react-router-dom";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-semibold transition ${
    isActive
      ? "bg-pink-100 text-pink-700"
      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
  }`;

export const Sidebar = () => {
  return (
    <aside className="sticky top-6 rounded-3xl border border-slate-200 bg-white p-4 shadow-lg">
      <p className="px-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Navigation
      </p>

      <nav className="mt-3 space-y-1">
        <NavLink to="/dashboard" end className={linkClass}>
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/dashboard/dresses" className={linkClass}>
          <Shirt size={18} />
          <span>Dresses</span>
        </NavLink>

        <NavLink to="/dashboard/bookings" className={linkClass}>
          <CalendarCheck2 size={18} />
          <span>Bookings</span>
        </NavLink>
      </nav>
    </aside>
  );
};