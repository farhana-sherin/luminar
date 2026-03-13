import React, { useEffect, useState } from "react";
import { ShoppingBag, ClipboardList, CheckCircle, AlertTriangle, Clock as ClockIcon, ArrowRight } from "lucide-react";
import { getRecentOrders, getOrdersSummary } from "../api/orders.api";
import { getReturnReminders } from "../api/booking.api";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [returnReminders, setReturnReminders] = useState([]);
  const [loadingReminders, setLoadingReminders] = useState(true);
  const [summary, setSummary] = useState({
    totalBookings: 0,
    activeOrders: 0,
    completedOrders: 0,
  });
  const [loadingSummary, setLoadingSummary] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [summaryData, recent, reminders] = await Promise.all([
          getOrdersSummary(),
          getRecentOrders(5),
          getReturnReminders(1),
        ]);
        setSummary(summaryData);
        setRecentOrders(recent || []);
        setReturnReminders(reminders.results || []);
      } catch (err) {
        console.error("Dashboard error:", err);
        setRecentOrders([]);
        setReturnReminders([]);
      } finally {
        setLoadingOrders(false);
        setLoadingSummary(false);
        setLoadingReminders(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8 bg-[#f8fafc] min-h-screen">

      {/* Header */}
      <div className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-8 mb-8">
        <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-slate-400 mb-3">
          Overview
        </p>
        <h1 className="text-4xl font-serif text-slate-900">
          Store <span className="italic text-pink-400">Dashboard</span>
        </h1>
        <p className="text-sm text-slate-500 mt-3">
          Monitor your orders, bookings and business activity.
        </p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Total Bookings</p>
            <h2 className="text-3xl font-serif text-pink-500 mt-2">{loadingSummary ? "--" : summary.totalBookings}</h2>
          </div>
          <div className="bg-pink-100 p-4 rounded-xl"><ShoppingBag className="text-pink-500" size={22} /></div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Active Orders</p>
            <h2 className="text-3xl font-serif text-pink-400 mt-2">{loadingSummary ? "--" : summary.activeOrders}</h2>
          </div>
          <div className="bg-pink-50 p-4 rounded-xl"><ClipboardList className="text-pink-400" size={22} /></div>
        </div>

        <div className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm flex items-center justify-between hover:shadow-md transition">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400 font-bold">Completed / Returned</p>
            <h2 className="text-3xl font-serif text-pink-300 mt-2">{loadingSummary ? "--" : summary.completedOrders}</h2>
          </div>
          <div className="bg-pink-50 p-4 rounded-xl"><CheckCircle className="text-pink-300" size={22} /></div>
        </div>
      </div>

      {/* Return Reminders Section */}
      {!loadingReminders && returnReminders.length > 0 && (
        <section id="return-reminders" className="mb-8 bg-rose-50 border border-rose-100 rounded-[2rem] p-8">
          <div className="flex items-center gap-3 mb-6">
            <AlertTriangle className="text-rose-500" size={20} />
            <h2 className="text-lg font-bold text-rose-900 uppercase tracking-wider">Return Reminders</h2>
            <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full ml-auto">
              {returnReminders.length} Action Required
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {returnReminders.map((reminder) => (
              <div key={reminder.id} className="bg-white/80 backdrop-blur-sm border border-rose-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition group overflow-hidden relative">
                <div className="absolute right-0 top-0 bottom-0 w-1 bg-rose-500 opacity-20 group-hover:opacity-100 transition-opacity"></div>
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{reminder.dress_name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{reminder.dress_code}</p>
                  </div>
                  <ClockIcon size={14} className="text-rose-400" />
                </div>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="font-semibold">{reminder.customer_name}</span>
                  </div>
                  <p className="text-[10px] text-rose-600 font-bold uppercase tracking-wide">
                    Return Period: {reminder.end_date}
                  </p>
                </div>
                <Link
                  to={`/dashboard/order/${reminder.id}`}
                  className="flex items-center justify-center gap-2 w-full py-2 rounded-xl bg-rose-600 text-white text-[10px] font-bold uppercase tracking-widest hover:bg-rose-700 transition shadow-lg shadow-rose-200"
                >
                  View Details
                  <ArrowRight size={12} />
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Recent Orders */}
      <div className="bg-white rounded-[2rem] shadow-sm border border-slate-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-900">Recent Orders</h2>
          <Link to="/dashboard/orders" className="text-xs font-bold text-pink-500 hover:text-pink-600 tracking-wider uppercase">View All</Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs uppercase text-slate-400 border-b tracking-widest">
                <th className="py-4 text-left">Order</th>
                <th className="text-left">Dress</th>
                <th className="text-left">Customer</th>
                <th className="text-left">Total</th>
                <th className="text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {loadingOrders ? (
                <tr><td colSpan={5} className="py-10 text-center text-slate-400 text-sm">Loading recent orders...</td></tr>
              ) : recentOrders.length === 0 ? (
                <tr><td colSpan={5} className="py-10 text-center text-slate-400 text-sm">No recent orders found.</td></tr>
              ) : (
                recentOrders.map((order) => {
                  const statusColors = {
                    Confirmed: "bg-emerald-50 text-emerald-600 border border-emerald-100",
                    Cancelled: "bg-rose-50 text-rose-500 border border-rose-100",
                    Returned: "bg-slate-50 text-slate-500 border border-slate-100",
                  };

                  return (
                    <tr key={order.id} className="border-b last:border-none hover:bg-pink-50 transition">
                      <td className="py-4 font-semibold text-slate-700">ORD-{String(order.id).padStart(4, "0")}</td>
                      <td>
                        <p className="text-sm font-semibold text-slate-800">{order.dress_name}</p>
                        <p className="text-xs text-slate-500">{order.dress_code} • {order.category}</p>
                      </td>
                      <td>
                        <p className="text-sm text-slate-700">{order.customer_name}</p>
                        <p className="text-xs text-slate-500">{order.mobile_number}</p>
                      </td>
                      <td className="font-semibold text-slate-800">₹{order.total_amount?.toLocaleString()}</td>
                      <td>
                        <span className={`px-3 py-1 text-[10px] rounded-full font-bold uppercase tracking-wider ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
