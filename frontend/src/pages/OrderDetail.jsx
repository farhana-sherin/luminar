import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getBookingDetail, cancelBooking, updateBooking, markBookingReturned } from "../api/booking.api";
import {
    ArrowLeft, Calendar, User, MapPin, Phone, CreditCard,
    Tag, CheckCircle, XCircle, Clock, Edit2, Save, X
} from "lucide-react";
import toast from "react-hot-toast";

export default function OrderDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [returning, setReturning] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});

    const fetchOrderDetail = async () => {
        try {
            setLoading(true);
            setLoadError("");
            const data = await getBookingDetail(id);
            setOrder(data);
            setEditedData(data);
        } catch (error) {
            setOrder(null);
            setLoadError(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to load order details"
            );
            toast.error("Failed to load order details");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrderDetail();
    }, [id]);

    const handleCancelOrder = async () => {
        if (!window.confirm("Are you sure you want to cancel this booking?")) return;
        try {
            await cancelBooking(id);
            toast.success("Booking cancelled successfully");
            fetchOrderDetail();
        } catch (error) {
            toast.error("Failed to cancel booking");
        }
    };

    const handleUpdateOrder = async () => {
        try {
            await updateBooking(id, {
                customer_name: editedData.customer_name,
                mobile_number: editedData.mobile_number,
                place: editedData.place,
                start_date: editedData.start_date,
                end_date: editedData.end_date,
            });
            toast.success("Order updated successfully");
            setIsEditing(false);
            fetchOrderDetail();
        } catch (error) {
            toast.error("Failed to update order");
        }
    };

    const handleMarkReturned = async () => {
        if (!window.confirm("Confirm that this dress has been returned?")) return;
        try {
            setReturning(true);
            await markBookingReturned(id);
            toast.success("Booking marked as returned");
            fetchOrderDetail();
        } catch (error) {
            toast.error(
                error?.response?.data?.error ||
                error?.response?.data?.message ||
                "Failed to mark booking as returned"
            );
        } finally {
            setReturning(false);
        }
    };

    const statusStyles = {
        Confirmed: "bg-emerald-50 text-emerald-600 border-emerald-100",
        Cancelled: "bg-rose-50 text-rose-600 border-rose-100",
        Returned: "bg-slate-50 text-slate-600 border-slate-100",
    };

    const statusIcons = {
        Confirmed: <Clock className="w-4 h-4" />,
        Cancelled: <XCircle className="w-4 h-4" />,
        Returned: <CheckCircle className="w-4 h-4" />,
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#f8fafc]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
            </div>
        );
    }

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] space-y-4">
                <p className="text-slate-700 font-medium">
                    {loadError || "Order not found"}
                </p>
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-pink-500 hover:underline">
                    <ArrowLeft size={16} /> Go Back
                </button>
            </div>
        );
    }

    const isCancelled = order.status === "Cancelled";

    return (
        <div className="min-h-screen bg-[#f8fafc] p-4 lg:p-8 font-sans">
            <div className="max-w-4xl mx-auto space-y-6">

                {/* Back button */}
                <button
                    onClick={() => navigate(-1)}
                    className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    <span className="text-sm font-medium">Back to Orders</span>
                </button>

                {/* Header card */}
                <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">

                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase border ${statusStyles[order.status]}`}>
                                    {statusIcons[order.status]}
                                    {order.status}
                                </span>
                                <span className="text-slate-300 text-sm">|</span>
                                <span className="text-xs font-mono text-slate-400">
                                    ORD-{String(order.id).padStart(4, "0")}
                                </span>
                            </div>
                            <h1 className="text-3xl font-serif text-slate-900">Order Details</h1>
                            <p className="text-sm text-slate-500 mt-1">
                                Booked on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {order.status === "Confirmed" && (
                                <button
                                    onClick={handleMarkReturned}
                                    disabled={returning}
                                    className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                                >
                                    {returning ? "Updating..." : "Mark Returned"}
                                </button>
                            )}

                            {/* Cancel button — only for Confirmed orders */}
                            {order.status === "Confirmed" && (
                                <button
                                    onClick={handleCancelOrder}
                                    className="px-6 py-2.5 rounded-xl border border-rose-100 text-rose-600 text-xs font-bold uppercase tracking-wider hover:bg-rose-50 transition-colors"
                                >
                                    Cancel Booking
                                </button>
                            )}

                            {/* Edit button — hidden when order is Cancelled */}
                            {!isCancelled && (
                                isEditing ? (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleUpdateOrder}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold uppercase tracking-wider hover:bg-emerald-700 transition-colors"
                                        >
                                            <Save size={14} />
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setIsEditing(false)}
                                            className="flex items-center gap-2 px-6 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold uppercase tracking-wider hover:bg-slate-50 transition-colors"
                                        >
                                            <X size={14} />
                                            Cancel
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-slate-800 transition-colors shadow-lg shadow-slate-200"
                                    >
                                        <Edit2 size={14} />
                                        Edit Order
                                    </button>
                                )
                            )}

                            {/* Cancelled badge notice */}
                            {isCancelled && (
                                <span className="px-4 py-2 rounded-xl bg-rose-50 text-rose-500 text-xs font-bold border border-rose-100">
                                    This booking is cancelled and cannot be edited.
                                </span>
                            )}
                        </div>

                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left — Customer & Dates */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Customer Info */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-5 border-b border-slate-50">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <User size={18} className="text-pink-500" />
                                    Customer Information
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Full Name</label>
                                        {isEditing ? (
                                            <input
                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                value={editedData.customer_name || ""}
                                                onChange={(e) => setEditedData({ ...editedData, customer_name: e.target.value })}
                                            />
                                        ) : (
                                            <p className="text-sm font-medium text-slate-800">{order.customer_name}</p>
                                        )}
                                    </div>
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Mobile Number</label>
                                        {isEditing ? (
                                            <input
                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                value={editedData.mobile_number || ""}
                                                onChange={(e) => setEditedData({ ...editedData, mobile_number: e.target.value })}
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-slate-800">
                                                <Phone size={14} className="text-slate-400" />
                                                {order.mobile_number}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Place / City</label>
                                        {isEditing ? (
                                            <input
                                                className="w-full border rounded-lg px-3 py-2 text-sm"
                                                value={editedData.place || ""}
                                                onChange={(e) => setEditedData({ ...editedData, place: e.target.value })}
                                            />
                                        ) : (
                                            <div className="flex items-center gap-2 text-sm text-slate-800">
                                                <MapPin size={14} className="text-slate-400" />
                                                {order.place}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Rental Period */}
                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                            <div className="px-8 py-5 border-b border-slate-50">
                                <h3 className="font-semibold text-slate-900 flex items-center gap-2">
                                    <Calendar size={18} className="text-pink-500" />
                                    Rental Period
                                </h3>
                            </div>
                            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8 relative">
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">Start Date</label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            className="w-full border rounded-lg px-3 py-2 text-sm"
                                            value={editedData.start_date || ""}
                                            onChange={(e) => setEditedData({ ...editedData, start_date: e.target.value })}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium text-slate-800">{order.start_date}</p>
                                    )}
                                </div>
                                <div>
                                    <label className="text-[10px] uppercase tracking-widest text-slate-400 font-bold block mb-1">End Date</label>
                                    {isEditing ? (
                                        <input
                                            type="date"
                                            className="w-full border rounded-lg px-3 py-2 text-sm"
                                            value={editedData.end_date || ""}
                                            onChange={(e) => setEditedData({ ...editedData, end_date: e.target.value })}
                                        />
                                    ) : (
                                        <p className="text-sm font-medium text-slate-800">{order.end_date}</p>
                                    )}
                                </div>
                                {/* <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block">
                                    <div className="bg-pink-50 text-pink-500 px-4 py-1 rounded-full text-[10px] font-bold border border-pink-100 shadow-sm">
                                        {order.total_days} Days
                                    </div>
                                </div> */}
                            </div>
                        </div>

                    </div>

                    {/* Right — Dress & Payment */}
                    <div className="space-y-6">

                        <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm p-6">
                            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-slate-50">
                                <img
                                    src={`http://127.0.0.1:8000${order.dress?.image}`}
                                    alt={order.dress?.name}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-3 left-3 px-2.5 py-1 bg-white/90 backdrop-blur rounded-lg text-[10px] font-bold uppercase tracking-widest text-slate-800 shadow-sm">
                                    {order.dress?.category}
                                </div>
                            </div>
                            <div className="space-y-1">
                                <h4 className="font-semibold text-slate-900">{order.dress?.name}</h4>
                                <p className="text-xs text-slate-400 flex items-center gap-1.5">
                                    <Tag size={12} />
                                    {order.dress?.code}
                                </p>
                            </div>
                        </div>

                        

                    </div>

                </div>
            </div>
        </div>
    );
}
