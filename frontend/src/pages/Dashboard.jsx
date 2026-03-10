import React, { useEffect, useState } from "react";
import { ShoppingBag, ClipboardList, CheckCircle } from "lucide-react";
import { getRecentOrders } from "../api/orders.api";

export default function Dashboard() {
  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    const fetchRecent = async () => {
      try {
        const data = await getRecentOrders(5);
        setRecentOrders(data || []);
      } catch {
        setRecentOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };

    fetchRecent();
  }, []);

  return (
    <div className="p-8 bg-slate-50 min-h-screen">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          Overview of your store performance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-3 gap-6 mb-10">

        {/* Total Orders */}
        <div className="bg-linear-to-r from-pink-100 to-pink-50 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Total Orders</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">120</p>
          </div>
          <div className="bg-pink-200 p-3 rounded-xl">
            <ShoppingBag className="text-pink-600" size={22} />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-linear-to-r from-purple-100 to-purple-50 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Total Bookings</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">85</p>
          </div>
          <div className="bg-purple-200 p-3 rounded-xl">
            <ClipboardList className="text-purple-600" size={22} />
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-linear-to-r from-green-100 to-green-50 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Completed Orders</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">60</p>
          </div>
          <div className="bg-green-200 p-3 rounded-xl">
            <CheckCircle className="text-green-600" size={22} />
          </div>
        </div>

      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm p-6">

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-slate-800">
            Recent Orders
          </h2>
        </div>

        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="text-gray-500 border-b text-sm">
              <th className="py-3">Order ID</th>
              <th>Dress</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {loadingOrders ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-xs text-gray-500"
                >
                  Loading recent orders...
                </td>
              </tr>
            ) : recentOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-4 text-center text-xs text-gray-500"
                >
                  No recent orders found.
                </td>
              </tr>
            ) : (
              recentOrders.map((order) => {
                const statusLabel = order.returned ? "Returned" : "Active";
                const statusClass = order.returned
                  ? "bg-green-100 text-green-600"
                  : "bg-blue-100 text-blue-600";

                return (
                  <tr
                    key={order.id}
                    className="border-b last:border-none hover:bg-gray-50 transition"
                  >
                    <td className="py-4 font-medium text-gray-700">
                      #{order.id}
                    </td>
                    <td>
                      <div className="space-y-0.5">
                        <p className="text-sm font-semibold text-slate-800">
                          {order.dress_name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {order.dress_code} • {order.category}
                        </p>
                      </div>
                    </td>
                    <td>
                      <div className="space-y-0.5">
                        <p>{order.customer_name}</p>
                        <p className="text-xs text-slate-500">
                          {order.mobile_number}
                        </p>
                      </div>
                    </td>
                    <td className="font-medium">₹ {order.total_amount}</td>
                    <td>
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${statusClass}`}
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
    </div>
  );
}