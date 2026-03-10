import React, { useEffect, useState } from "react";
import { getOrders } from "../api/orders.api";

export default function Orders() {
  const [ordersData, setOrdersData] = useState({
    results: [],
    current_page: 1,
    total_pages: 1,
    count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    } catch (err) {
      setError("Unable to load orders. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(1);
  }, []);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > ordersData.total_pages) return;
    fetchOrders(nextPage);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-3xl border border-white/65 bg-white/80 p-5 shadow-xl backdrop-blur-xl sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Dashboard
        </p>
        <div className="mt-2 flex flex-wrap items-end justify-between gap-3">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Orders
            </h1>
            <p className="mt-1 text-sm text-slate-600">
              Live view of all dress bookings.
            </p>
          </div>
          <div className="flex flex-col items-end text-xs text-slate-500">
            <span>Total orders</span>
            <span className="text-lg font-semibold text-slate-900">
              {ordersData.count}
            </span>
          </div>
        </div>
      </section>

      {/* Orders table */}
      <section className="rounded-3xl border border-slate-200/80 bg-white/95 p-4 shadow-lg sm:p-6">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-lg font-semibold text-slate-900">
            All orders
          </h2>
          <p className="text-xs text-slate-500">
            Page {ordersData.current_page} of {ordersData.total_pages}
          </p>
        </div>

        {error && (
          <div className="mb-4 rounded-2xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs text-rose-700">
            {error}
          </div>
        )}

        <div className="overflow-x-auto rounded-2xl border border-slate-100">
          <table className="min-w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-50/80 text-slate-500">
              <tr>
                <th className="px-4 py-3 font-semibold">Order ID</th>
                <th className="px-4 py-3 font-semibold">Dress</th>
                <th className="px-4 py-3 font-semibold">Customer</th>
                <th className="px-4 py-3 font-semibold">Dates</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-xs text-slate-500"
                  >
                    Loading orders...
                  </td>
                </tr>
              ) : ordersData.results.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-xs text-slate-500"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                ordersData.results.map((order) => {
                  const statusLabel = order.returned ? "Returned" : "Active";
                  const statusClasses = order.returned
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-100"
                    : "bg-sky-50 text-sky-700 border border-sky-100";

                  return (
                    <tr
                      key={order.id}
                      className="border-t border-slate-100 hover:bg-slate-50/70"
                    >
                      <td className="px-4 py-3 text-xs font-medium text-slate-800">
                        #{order.id}
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <p className="text-xs font-semibold text-slate-800">
                            {order.dress_name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {order.dress_code} • {order.category}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-0.5">
                          <p className="text-xs font-medium text-slate-800">
                            {order.customer_name}
                          </p>
                          <p className="text-[11px] text-slate-500">
                            {order.mobile_number}
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600">
                        <div className="space-y-0.5">
                          <p>
                            {order.start_date} → {order.end_date}
                          </p>
                          <p className="text-[11px] text-slate-400">
                            {order.total_days} days
                          </p>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-slate-900">
                        ₹ {order.total_amount}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium ${statusClasses}`}
                        >
                          {statusLabel}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {ordersData.total_pages > 1 && (
          <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
            <button
              type="button"
              onClick={() => handlePageChange(ordersData.current_page - 1)}
              disabled={ordersData.current_page <= 1}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Previous
            </button>
            <span>
              Showing page {ordersData.current_page} of{" "}
              {ordersData.total_pages}
            </span>
            <button
              type="button"
              onClick={() => handlePageChange(ordersData.current_page + 1)}
              disabled={ordersData.current_page >= ordersData.total_pages}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 font-medium text-slate-700 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Next
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

