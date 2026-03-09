import React from "react";

const dressDesigns = [
  {
    id: 1,
    name: "Bridal Party Dress",
    sizes: "S, M, L",
    pricePerDay: 1500,
    image:
      "https://i.pinimg.com/736x/15/2f/63/152f634b001f07bbd20a2b9d3d06cf1e.jpg",
    isBooked: true
  },
  {
    id: 2,
    name: "Rose Sequin Gown",
    sizes: "M, L, XL",
    pricePerDay: 1800,
    image:
      "https://i.pinimg.com/736x/2e/ea/3f/2eea3fbec4d64bd52782460217f1504c.jpg",
    isBooked: false
  },
  {
    id: 3,
    name: "Classic Red Lehenga",
    sizes: "S, M, L",
    pricePerDay: 2200,
    image:
      "https://i.pinimg.com/736x/fc/d8/16/fcd816a8196f2c5efed09eb6a8575baa.jpg",
    isBooked: true
  },
  {
    id: 4,
    name: "Pearl White Bridal Set",
    sizes: "M, L",
    pricePerDay: 2500,
    image:
      "https://i.pinimg.com/736x/6b/1e/e8/6b1ee8472d3cb5a6413c60074298ec95.jpg",
    isBooked: false
  }
];

export default function Card() {
  return (
    <section className="space-y-5 pb-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Inventory
          </p>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Product Designs
          </h2>
        </div>
        <button
          type="button"
          className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
        >
          View all
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {dressDesigns.map((dress) => (
          <article
            key={dress.id}
            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            <div className="relative aspect-[4/4] overflow-hidden bg-slate-100">
              <img
                src={dress.image}
                alt={dress.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold text-white">
                Rent
              </span>
              <span
                className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                  dress.isBooked
                    ? "bg-red-500 text-white"
                    : "bg-emerald-500 text-white"
                }`}
              >
                {dress.isBooked ? "Booked" : "Available"}
              </span>

              {dress.isBooked && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/35">
                  <p className="text-sm font-semibold text-white">Not Available</p>
                </div>
              )}
            </div>

            <div className="space-y-3 p-4">
              <h3 className="text-sm font-semibold text-slate-800">{dress.name}</h3>
              <p className="text-xs text-slate-500">Sizes: {dress.sizes}</p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Rs. {dress.pricePerDay}
                  </p>
                  <p className="text-xs text-slate-400">per day</p>
                </div>
                <button
                  type="button"
                  disabled={dress.isBooked}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                    dress.isBooked
                      ? "cursor-not-allowed bg-slate-200 text-slate-500"
                      : "bg-slate-900 text-white transition hover:bg-slate-800"
                  }`}
                >
                  {dress.isBooked ? "Booked" : "Rent"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
