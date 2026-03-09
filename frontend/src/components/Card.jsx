import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dressesApiCall from "../api/dresses.api";

export default function Card() {
  const navigate = useNavigate();
  const [dresses, setDresses] = useState([]);
  const [category, setCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dressesApiCall();
        setDresses(response);

        // unique categories
        const uniqueCategories = [
          ...new Set(response.map((item) => item.category_name)),
        ];

        setCategory(uniqueCategories);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="space-y-5 pb-3">
      <div className="flex items-end justify-between gap-3 flex-wrap">
        
        {/* Left Title */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Inventory
          </p>
          <h2 className="text-xl font-bold text-slate-900 sm:text-2xl">
            Product Designs
          </h2>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 flex-wrap">

          {/* Category Buttons */}
          {category.map((cat, index) => (
            <button
              key={index}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 hover:bg-red-300"
            >
              {cat}
            </button>
          ))}

          {/* View All Button */}
          <button className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:border-slate-400 hover:bg-red-300">
            View all
          </button>

        </div>
      </div>

      {/* Dresses Grid */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
        {dresses.map((dress) => (
          <article
            key={dress.id}
            onClick={() => navigate(`/dress/${dress.id}`)}
            className="group cursor-pointer overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:-translate-y-0.5 hover:shadow-lg transition"
          >
            {/* Image */}
            <div className="relative aspect-3/3 overflow-hidden bg-slate-100">
              <img
                src={`http://127.0.0.1:8000${dress.image}`}
                alt={dress.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />

              <span className="absolute left-3 top-3 rounded-full bg-black px-2.5 py-1 text-[11px] font-semibold text-white">
                Rent
              </span>
            </div>

            {/* Content */}
            <div className="space-y-3 p-4">
              <h3 className="text-sm font-semibold text-slate-800">
                {dress.name}
              </h3>

              <p className="text-xs text-slate-500">
                Category: {dress.category_name}
              </p>

              <p className="text-xs text-slate-500">
                Color: {dress.color}
              </p>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Rs. {dress.price}
                  </p>
                  <p className="text-xs text-slate-400">
                    Code: {dress.code}
                  </p>
                </div>

                <button
                  type="button"
                  className="rounded-md bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/dress/${dress.id}`);
                  }}
                >
                  Rent
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}