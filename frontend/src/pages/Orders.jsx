
import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orders.api";
import { cancelBooking } from "../api/booking.api";
import { Eye, X, CheckCircle, XCircle, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export default function Orders() {
  const [ordersData, setOrdersData] = useState({
    results: [],
    current_page: 1,
    total_pages: 1,
    count: 0,
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const navigate = useNavigate();

  const fetchOrders = async (page = 1) => {
    try {
      setLoading(true);
      const data = await getOrders(page);

      setOrdersData({
        results: data.results || [],
        current_page: Number(data.current_page) || 1,
        total_pages: Number(data.total_pages) || 1,
        count: data.count || 0,
      });

      setError("");
    } catch {
      setError("Unable to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const handleCancelOrder = async (id) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await cancelBooking(id);
      toast.success("Booking cancelled successfully");
      fetchOrders(ordersData.current_page);
    } catch {
      toast.error("Failed to cancel booking");
    }
  };

  const activeCount = ordersData.results.filter((o) => o.status === "Confirmed").length;
  const returnedCount = ordersData.results.filter((o) => o.status === "Returned").length;

  const filteredResults = ordersData.results.filter((order) => {
    const q = query.trim().toLowerCase();

    const matchesQuery =
      !q ||
      String(order.id).toLowerCase().includes(q) ||
      `ord-${String(order.id).padStart(4, "0")}`.includes(q) ||
      String(order.dress_name || "").toLowerCase().includes(q) ||
      String(order.dress_code || "").toLowerCase().includes(q) ||
      String(order.category || "").toLowerCase().includes(q) ||
      String(order.customer_name || "").toLowerCase().includes(q) ||
      String(order.mobile_number || "").toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && order.status === "Confirmed") ||
      (statusFilter === "returned" && order.status === "Returned");

    return matchesQuery && matchesStatus;
  });

  const formatBookedDate = (value) => {
    if (!value) return "-";
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return String(value);
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] p-6 lg:p-8 font-sans">
      <div className="max-w-[1600px] mx-auto space-y-8">

        <section className="bg-white border border-slate-100 rounded-[2rem] shadow-sm p-8">

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-slate-400 mb-3">
                Overview
              </p>

              <h1 className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tight">
                Order <span className="italic text-pink-400 font-normal">History</span>
              </h1>

              <p className="mt-3 text-sm text-slate-500 max-w-sm">
                Monitor and manage customer bookings, active rentals, and returns.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-4 w-full lg:w-auto">

              <div className="bg-pink-50 border border-pink-100 rounded-2xl px-6 py-4 text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-pink-400">
                  Total
                </p>
                <p className="text-2xl font-serif text-pink-600 mt-1">
                  {ordersData.count}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 text-center shadow-sm">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  Active
                </p>
                <p className="text-2xl font-serif text-pink-500 mt-1">
                  {activeCount}
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl px-6 py-4 text-center shadow-sm">
                <p className="text-[10px] uppercase tracking-widest font-bold text-slate-400">
                  Returned
                </p>
                <p className="text-2xl font-serif text-pink-300 mt-1">
                  {returnedCount}
                </p>
              </div>

            </div>

          </div>

        </section>

        <section className="bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">

          <div className="p-6 md:p-8 border-b border-slate-100">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">

              <div className="flex gap-1 p-1 bg-pink-50 rounded-2xl border border-pink-100">

                <button
                  onClick={() => setStatusFilter("all")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    statusFilter === "all"
                      ? "bg-white text-pink-500 shadow-sm"
                      : "text-slate-500 hover:bg-pink-100"
                  }`}
                >
                  All
                </button>

                <button
                  onClick={() => setStatusFilter("active")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    statusFilter === "active"
                      ? "bg-pink-100 text-pink-600 border border-pink-200"
                      : "text-slate-500 hover:bg-pink-100"
                  }`}
                >
                  Active
                </button>

                <button
                  onClick={() => setStatusFilter("returned")}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider ${
                    statusFilter === "returned"
                      ? "bg-pink-50 text-pink-500 border border-pink-200"
                      : "text-slate-500 hover:bg-pink-100"
                  }`}
                >
                  Returned
                </button>

              </div>

              <div className="relative w-full md:w-80 group">
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search ID, customer, dress..."
                  className="w-full pl-12 pr-4 py-3.5 bg-pink-50 border border-pink-100 rounded-2xl text-sm outline-none focus:ring-4 focus:ring-pink-100"
                />
              </div>

            </div>

            {error && (
              <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-sm font-semibold text-rose-600">
                {error}
              </div>
            )}

          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left table-auto">

              <thead>
                <tr className="bg-pink-50">
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b whitespace-nowrap">Order Ref</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b whitespace-nowrap">Booked Date</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b min-w-[200px]">Dress Details</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b whitespace-nowrap">Customer</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b whitespace-nowrap">Rental Period</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b whitespace-nowrap">Total</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b text-center whitespace-nowrap">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b text-center whitespace-nowrap">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">

                {filteredResults.map((order) => (
                  <tr key={order.id} className="hover:bg-pink-50 transition">

                    <td className="py-5 px-6 font-mono text-xs text-slate-600 whitespace-nowrap">
                      ORD-{String(order.id).padStart(4, "0")}
                    </td>

                    <td className="py-5 px-6 text-sm text-slate-600 whitespace-nowrap">
                      {formatBookedDate(order.created_at)}
                    </td>

                    <td className="py-5 px-6 max-w-[220px]">
                      <p className="font-semibold text-slate-900 truncate">
                        {order.dress_name}
                      </p>
                      <span className="text-xs text-slate-400">
                        {order.dress_code}
                      </span>
                    </td>

                    <td className="py-5 px-6 whitespace-nowrap">
                      {order.customer_name}
                    </td>

                    <td className="py-5 px-6 text-sm whitespace-nowrap">
                      {order.start_date} → {order.end_date}
                    </td>

                    <td className="py-5 px-6 font-bold whitespace-nowrap">
                      ₹{order.total_amount.toLocaleString()}
                    </td>

                    <td className="py-5 px-6 text-center">
                      <span className="flex items-center justify-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase border w-max mx-auto bg-slate-50 text-slate-500 border-slate-100">
                        {order.status === "Returned" && <CheckCircle size={12} />}
                        {order.status === "Cancelled" && <XCircle size={12} />}
                        {order.status === "Confirmed" && <Clock size={12} />}
                        {order.status}
                      </span>
                    </td>

                    <td className="py-5 px-6">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => navigate(`/dashboard/order/${order.id}`)}
                          className="p-2 rounded-lg hover:bg-pink-100 text-slate-400 hover:text-pink-500 transition-colors"
                        >
                          <Eye size={16} />
                        </button>

                        {order.status === "Confirmed" && (
                          <button
                            onClick={() => handleCancelOrder(order.id)}
                            className="p-2 rounded-lg hover:bg-rose-100 text-slate-400 hover:text-rose-500 transition-colors"
                          >
                            <X size={16} />
                          </button>
                        )}
                      </div>
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>
          </div>

        </section>

      </div>
    </div>
  );
}
