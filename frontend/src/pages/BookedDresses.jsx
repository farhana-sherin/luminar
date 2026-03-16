import React, { useEffect, useState } from "react";
import { CalendarClock, X } from "lucide-react";
import { getBookedDresses, getBookingDetail } from "../api/booking.api";

export default function BookedDresses() {
  const [data, setData] = useState({
    results: [],
    current_page: 1,
    total_pages: 1,
    count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");

  const fetchPage = async (page = 1) => {
    try {
      setLoading(true);
      const res = await getBookedDresses(page);
      setData({
        results: res.results || [],
        current_page: Number(res.current_page) || 1,
        total_pages: Number(res.total_pages) || 1,
        count: res.count || 0,
      });
      setError("");
    } catch (e) {
      setError("Unable to load booked dresses. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPage(1);
  }, []);

  const handlePageChange = (nextPage) => {
    if (nextPage < 1 || nextPage > data.total_pages) return;
    fetchPage(nextPage);
  };

  const openDetail = async (bookingId) => {
    setSelectedId(bookingId);
    setSelectedDetail(null);
    setDetailError("");
    try {
      setDetailLoading(true);
      const detail = await getBookingDetail(bookingId);
      setSelectedDetail(detail);
    } catch {
      setDetailError("Unable to load booking details.");
    } finally {
      setDetailLoading(false);
    }
  };

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
        {/* Header */}
        <section className="bg-white border border-slate-100 rounded-4xl shadow-sm p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <p className="text-[10px] uppercase tracking-[0.35em] font-bold text-slate-400 mb-3">
                Rentals
              </p>
              <h1 className="text-3xl md:text-4xl font-serif text-slate-900 tracking-tight">
                Booked <span className="italic text-pink-400 font-normal">Dresses</span>
              </h1>
              <p className="mt-3 text-sm text-slate-500 max-w-sm">
                View all active bookings. Open an order to confirm whether the dress has been returned.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 w-full lg:w-auto">
              <div className="bg-pink-50 border border-pink-100 rounded-2xl px-5 py-4 text-center">
                <p className="text-[10px] uppercase tracking-widest font-bold text-pink-400">
                  Active Bookings
                </p>
                <p className="text-2xl font-serif text-pink-600 mt-1">
                  {data.count}
                </p>
              </div>
              <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 flex items-center justify-center gap-2 text-xs text-slate-500">
                <CalendarClock size={18} className="text-pink-400" />
                <span>Only dresses not yet returned are listed here.</span>
              </div>
            </div>
          </div>
        </section>

        {/* Table of booked dresses */}
        <section className="bg-white rounded-4xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-6 md:p-8 border-b border-slate-100">
            {error && (
              <div className="mb-4 p-4 rounded-2xl bg-rose-50 border border-rose-100 text-sm font-semibold text-rose-600">
                {error}
              </div>
            )}
            <p className="text-xs text-slate-500">
              Showing page {data.current_page} of {data.total_pages}.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-pink-50">
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b">
                    Booking
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b">
                    Booked Date
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b">
                    Dress
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b">
                    Customer
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b">
                    Rental Period
                  </th>
                  <th className="py-4 px-6 text-[10px] font-bold text-slate-400 uppercase border-b">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center text-sm text-slate-400"
                    >
                      Loading booked dresses...
                    </td>
                  </tr>
                ) : data.results.length === 0 ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="py-8 text-center text-sm text-slate-400"
                    >
                      No active bookings found.
                    </td>
                  </tr>
                ) : (
                  data.results.map((booking) => (
                    <tr
                      key={booking.id}
                      className="hover:bg-pink-50/60 transition cursor-pointer"
                      onClick={() => openDetail(booking.id)}
                    >
                      <td className="py-5 px-6 font-mono text-xs text-slate-600">
                        BK-{String(booking.id).padStart(4, "0")}
                      </td>

                      <td className="py-5 px-6 text-sm text-slate-600">
                        {formatBookedDate(booking.created_at)}
                      </td>
                  
                      <td className="py-5 px-6">
                        <p className="font-semibold text-slate-900">
                          {booking.dress_name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {booking.dress_code} • {booking.category}
                        </p>
                      </td>
                  
                      <td className="py-5 px-6">
                        <p className="text-sm text-slate-800">
                          {booking.customer_name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {booking.mobile_number}
                        </p>
                      </td>
                  
                      <td className="py-5 px-6 text-sm">
                        {booking.start_date} → {booking.end_date}
                        <p className="text-[11px] text-slate-400 mt-1">
                          {booking.total_days} days
                        </p>
                      </td>
                  
                      <td className="py-5 px-6 font-bold">
                        ₹{Number(booking.total_amount).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {data.total_pages > 1 && (
            <div className="flex items-center justify-between px-6 py-4 border-t border-slate-100 text-xs text-slate-500">
              <button
                onClick={() => handlePageChange(data.current_page - 1)}
                disabled={data.current_page <= 1}
                className="px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <span>
                Page {data.current_page} of {data.total_pages}
              </span>
              <button
                onClick={() => handlePageChange(data.current_page + 1)}
                disabled={data.current_page >= data.total_pages}
                className="px-3 py-1.5 rounded-full border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
          )}
        </section>
      </div>

      {/* Detail modal */}
      {selectedId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full mx-4 p-6 relative">
            <button
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              onClick={() => {
                setSelectedId(null);
                setSelectedDetail(null);
                setDetailError("");
              }}
            >
              <X size={18} />
            </button>

            {detailLoading ? (
              <p className="py-10 text-center text-sm text-slate-400">
                Loading booking details...
              </p>
            ) : detailError ? (
              <p className="py-10 text-center text-sm text-rose-500">
                {detailError}
              </p>
            ) : !selectedDetail ? (
              <p className="py-10 text-center text-sm text-slate-400">
                No details available.
              </p>
            ) : (
              <div className="space-y-4">
                <div className="flex gap-4">
                  {selectedDetail.dress?.image && (
                    <div className="w-24 h-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={selectedDetail.dress.image}
                        alt={selectedDetail.dress.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400 font-semibold">
                      Booking Summary
                    </p>
                    <h2 className="mt-1 text-xl font-semibold text-slate-900">
                      #{selectedDetail.id} • {selectedDetail.dress?.name}
                    </h2>
                    {selectedDetail.dress && (
                      <p className="mt-1 text-xs text-slate-500">
                        Code: <span className="font-mono">{selectedDetail.dress.code}</span> •{" "}
                        {selectedDetail.dress.category}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Customer
                    </p>
                    <p className="font-medium text-slate-900">
                      {selectedDetail.customer_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {selectedDetail.mobile_number}
                    </p>
                    <p className="text-xs text-slate-500">
                      {selectedDetail.place}
                    </p>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-3">
                      Created At
                    </p>
                    <p className="text-xs text-slate-500">
                      {formatBookedDate(selectedDetail.created_at)}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Rental Period
                    </p>
                    <p className="font-medium text-slate-900">
                      {selectedDetail.start_date} → {selectedDetail.end_date}
                    </p>
                    <p className="text-xs text-slate-500">
                      {selectedDetail.total_days} days
                    </p>
                    {selectedDetail.dress && (
                      <>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400 mt-3">
                          Dress Color
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-600">
                          <span
                            className="inline-block h-3 w-3 rounded-full border border-slate-300"
                            style={{ backgroundColor: selectedDetail.dress.color }}
                          />
                          <span>{selectedDetail.dress.color}</span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-slate-100 pt-4 mt-2">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-slate-400">
                      Total Amount
                    </p>
                    <p className="text-lg font-semibold text-slate-900">
                      ₹{Number(selectedDetail.total_amount).toLocaleString()}
                    </p>
                  </div>
                  <p className="text-xs font-medium text-slate-500">
                    Open this order from notifications or order history to confirm return status.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

