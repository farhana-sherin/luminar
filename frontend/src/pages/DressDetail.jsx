import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

import { getDressDetail } from "../api/dresses.api";
import { createBooking } from "../api/booking.api";
import toast from "react-hot-toast";

export default function DressDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [dress, setDress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    const fetchDress = async () => {
      try {
        const detail = await getDressDetail(id);
        setDress(detail);
      } catch (err) {
        setError("Unable to load dress.");
      } finally {
        setLoading(false);
      }
    };

    fetchDress();
  }, [id]);

  const onSubmit = async (data) => {
    try {
      const payload = {
        dress_id: dress.id,
        ...data,
      };

      const res = await createBooking(payload);

      toast.success("Dress booking confirm")

      setSuccessMessage(res?.message || "Booking successful");
      setError("");
      reset();
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Booking failed. Please check details."
      );

      toast.error("Booking failed")
    }
  };

  if (loading) {
    return (
      <div className="h-[60vh] flex items-center justify-center">
        <div className="h-8 w-8 animate-spin border-2 border-slate-300 border-t-slate-700 rounded-full" />
      </div>
    );
  }

  if (!dress) {
    return (
      <div className="p-6 text-center">
        <p className="text-sm text-slate-600">{error || "Dress not found"}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 text-sm text-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-xs text-slate-500 hover:text-slate-800"
      >
        ← Back
      </button>

      <div className="grid gap-6 md:grid-cols-2">

        {/* Dress Info */}
        <div className="border rounded-xl p-3 bg-white shadow-sm">

          <div className="h-72 overflow-hidden rounded-lg bg-slate-100">
            <img
              src={`http://127.0.0.1:8000${dress.image}`}
              alt={dress.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-3 space-y-1">
            <h2 className="text-lg font-semibold">{dress.name}</h2>

            <div className="flex gap-2 text-xs">
              <span className="bg-slate-100 px-2 py-0.5 rounded">
                {dress.category_name}
              </span>

              <span className="bg-slate-100 px-2 py-0.5 rounded">
                {dress.color}
              </span>
            </div>

            <p className="text-sm font-semibold text-slate-800">
              ₹ {dress.price}
            </p>

            <p className="text-xs text-slate-500">
              Code: {dress.code}
            </p>
          </div>
        </div>

        {/* Booking Form */}
        <div className="border rounded-xl p-4 bg-white shadow-sm">

          <h3 className="text-sm font-semibold mb-3">
            Book this dress
          </h3>

          {error && (
            <p className="text-xs text-red-500 mb-2">{error}</p>
          )}

          {successMessage && (
            <p className="text-xs text-green-600 mb-2">{successMessage}</p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-3 text-xs"
          >

            {/* Customer Name */}
            <div>
              <label className="block mb-1 text-slate-600">
                Customer Name
              </label>

              <input
                {...register("customer_name", { required: "Required" })}
                className="w-full border rounded-md px-3 py-2"
              />

              {errors.customer_name && (
                <p className="text-red-500 text-[10px]">
                  {errors.customer_name.message}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div>
              <label className="block mb-1 text-slate-600">
                Mobile Number
              </label>

              <input
                {...register("mobile_number", { required: "Required" })}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Place */}
            <div>
              <label className="block mb-1 text-slate-600">
                Place
              </label>

              <input
                {...register("place", { required: "Required" })}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-2">

              <div>
                <label className="block mb-1 text-slate-600">
                  Start Date
                </label>

                <input
                  type="date"
                  min={today}
                  {...register("start_date", { required: true })}
                  className="border rounded-md px-2 py-2 w-full"
                />
              </div>

              <div>
                <label className="block mb-1 text-slate-600">
                  End Date
                </label>

                <input
                  type="date"
                  min={today}
                  {...register("end_date", { required: true })}
                  className="border rounded-md px-2 py-2 w-full"
                />
              </div>

            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 disabled:opacity-50"
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}