import React from "react";
import { ShoppingBag, ClipboardList, CheckCircle } from "lucide-react";

export default function Dashboard() {
  const recentOrders = [
    { id: "#1021", customer: "Rahul", item: "Pizza", total: "₹450", status: "Completed" },
    { id: "#1022", customer: "Anjali", item: "Burger", total: "₹250", status: "Pending" },
    { id: "#1023", customer: "Aman", item: "Pasta", total: "₹350", status: "Completed" },
    { id: "#1024", customer: "Priya", item: "Fried Rice", total: "₹300", status: "Preparing" },
    { id: "#1025", customer: "Vikram", item: "Sandwich", total: "₹200", status: "Completed" },
  ];

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
        <div className="bg-gradient-to-r from-pink-100 to-pink-50 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Total Orders</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">120</p>
          </div>
          <div className="bg-pink-200 p-3 rounded-xl">
            <ShoppingBag className="text-pink-600" size={22} />
          </div>
        </div>

        {/* Total Bookings */}
        <div className="bg-gradient-to-r from-purple-100 to-purple-50 p-6 rounded-2xl shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm text-gray-500">Total Bookings</h2>
            <p className="text-3xl font-bold mt-2 text-gray-800">85</p>
          </div>
          <div className="bg-purple-200 p-3 rounded-xl">
            <ClipboardList className="text-purple-600" size={22} />
          </div>
        </div>

        {/* Completed Orders */}
        <div className="bg-gradient-to-r from-green-100 to-green-50 p-6 rounded-2xl shadow-sm flex items-center justify-between">
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
              <th>Customer</th>
              <th>Item</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr
                key={order.id}
                className="border-b last:border-none hover:bg-gray-50 transition"
              >
                <td className="py-4 font-medium text-gray-700">{order.id}</td>
                <td>{order.customer}</td>
                <td>{order.item}</td>
                <td className="font-medium">{order.total}</td>

                <td>
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-medium
                      ${
                        order.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-blue-100 text-blue-600"
                      }`}
                  >
                    {order.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

      </div>
    </div>
  );
}