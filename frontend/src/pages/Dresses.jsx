import React from "react";

export const Dresses = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-white/65 bg-white/75 p-5 shadow-xl backdrop-blur-xl sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Dashboard
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-900 sm:text-3xl">Dresses</h1>
        <p className="mt-1 text-sm text-slate-600">Add / manage dresses.</p>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white/90 p-5 shadow-lg sm:p-6">
        <h2 className="text-lg font-bold text-slate-900">Dress details</h2>
        <form className="mt-5 grid gap-4 sm:grid-cols-2" onSubmit={(e) => e.preventDefault()}>
          <label className="block space-y-1">
            <span className="text-sm font-semibold text-slate-700">Dress name</span>
            <input
              type="text"
              placeholder="Velvet Lehenga"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-pink-200 transition focus:ring-2"
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sm font-semibold text-slate-700">Category</span>
            <input
              type="text"
              placeholder="Wedding"
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-pink-200 transition focus:ring-2"
            />
          </label>

          <label className="block space-y-1 sm:col-span-2">
            <span className="text-sm font-semibold text-slate-700">Address</span>
            <input
              type="text"
              placeholder="Enter address"
              required
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-none ring-pink-200 transition focus:ring-2"
            />
          </label>

          <div className="sm:col-span-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

