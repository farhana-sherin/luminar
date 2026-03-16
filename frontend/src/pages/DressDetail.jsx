import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, useWatch } from "react-hook-form";

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

  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm();

  const startDateValue = useWatch({ control, name: "start_date" });

  const minEndDate = startDateValue
    ? new Date(new Date(startDateValue).getTime() + 86400000)
        .toISOString()
        .split("T")[0]
    : today;

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

      toast.success("Dress booking confirmed");

      setSuccessMessage(
        res?.message || "Booking successful. Redirecting to orders..."
      );
      setError("");
      reset();

      setTimeout(() => {
        navigate("/dashboard/orders");
      }, 2000);
    } catch (err) {
      const serverError =
        err?.response?.data?.error ||
        err?.response?.data?.message ||
        err?.response?.data?.non_field_errors?.[0] ||
        err?.response?.data?.end_date?.[0] ||
        "Booking failed. Please check your details and try again.";

      setError(serverError);
      toast.error(serverError);
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
        <p className="text-sm text-slate-600">
          {error || "Dress not found"}
        </p>
        <button
          onClick={() => navigate(-1)}
          className="mt-3 text-sm text-blue-600"
        >
          Go Back
        </button>
      </div>
    );
  }

 return (
  <div className="min-h-screen bg-[#fafafa]">
    <div className="max-w-6xl mx-auto px-6 py-14">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-sm text-slate-500 hover:text-slate-900 mb-10"
      >
        ← Back
      </button>

      <div className="grid md:grid-cols-2 gap-8">

       {/* Dress Details Card */}
<div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8 flex flex-col justify-between">

  {/* Header */}
  <div className="flex justify-between items-start mb-6">

    <div>
      <h2 className="text-3xl font-serif text-slate-900 mb-2">
        {dress.name}
      </h2>

      <p className="text-sm text-slate-400">
        Product Code: {dress.code}
      </p>
    </div>

    {/* Animated Image */}
    <div className="relative group">

      <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-rose-200 to-pink-200 blur-lg opacity-40 group-hover:opacity-70 transition"></div>

      <img
        src={dress.image}
        alt={dress.name}
        className="relative w-20 h-20 object-cover rounded-xl shadow-md border border-white transform transition duration-500 group-hover:scale-110"
      />

    </div>

  </div>

  {/* Details */}
  <div className="space-y-4 text-sm">

    <div className="flex justify-between border-b pb-3">
      <span className="text-slate-500">Category</span>
      <span className="font-medium text-slate-800">
        {dress.category_name}
      </span>
    </div>

    <div className="flex justify-between border-b pb-3">
      <span className="text-slate-500">Color</span>
      <span className="font-medium text-slate-800">
        {dress.color}
      </span>
    </div>

    <div className="flex justify-between border-b pb-3">
      <span className="text-slate-500">Availability</span>
      <span className="font-medium text-emerald-600">
        Available
      </span>
    </div>

  </div>

  {/* Price */}
  <div className="mt-8 border-t pt-6 flex justify-between items-center">

    <p className="text-sm text-slate-500">
      Rental Price
    </p>

    <p className="text-3xl font-bold text-slate-900">
      ₹ {dress.price}
    </p>

  </div>

</div>

        {/* Booking Form */}
        <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-8">

          <h3 className="text-lg font-semibold mb-6">
            Book this dress
          </h3>

          {error && (
            <p className="text-sm text-red-500 mb-4">{error}</p>
          )}

          {successMessage && (
            <p className="text-sm text-green-600 mb-4">
              {successMessage}
            </p>
          )}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-4"
          >

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Customer Name
              </label>

              <input
                {...register("customer_name", { required: "Required" })}
                className="w-full border rounded-md px-3 py-2"
              />

              {errors.customer_name && (
                <p className="text-red-500 text-xs">
                  {errors.customer_name.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Mobile Number
              </label>

              <input
                {...register("mobile_number", { required: "Required" })}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-600 mb-1">
                Place
              </label>

              <input
                {...register("place", { required: "Required" })}
                className="w-full border rounded-md px-3 py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">

              <div>
                <label className="block text-sm text-slate-600 mb-1">
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
                <label className="block text-sm text-slate-600 mb-1">
                  End Date
                </label>

                <input
                  type="date"
                  min={minEndDate}
                  {...register("end_date", { required: true })}
                  className="border rounded-md px-2 py-2 w-full"
                />
              </div>

            </div>

            <button
              disabled={isSubmitting}
              className="w-full bg-slate-900 text-white py-3 rounded-md hover:bg-black transition"
            >
              {isSubmitting ? "Booking..." : "Confirm Booking"}
            </button>

          </form>
        </div>

      </div>
    </div>
  </div>
);
}