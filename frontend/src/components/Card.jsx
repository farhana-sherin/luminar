import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dressesApiCall from "../api/dresses.api";

export default function Card({ externalCategory, showFilters = true }) {
  const navigate = useNavigate();
  const [dresses, setDresses] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (externalCategory) {
      setSelectedCategory(externalCategory);
    }
  }, [externalCategory]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await dressesApiCall();
        setDresses(response);

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
    <section className={`${showFilters ? "min-h-screen pt-24" : "py-10"} bg-[#Fdfbfb] px-4 md:px-12 font-sans`}>
      <div className="max-w-[1600px] mx-auto">

        {showFilters && (
          /* Editorial Header */
          <div className="flex flex-col items-center text-center mb-20 relative">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-rose-50 to-pink-50 rounded-full blur-[100px] -z-10 opacity-70"></div>

            <span className="text-pink-500 font-semibold uppercase text-[10px] tracking-[0.5em] mb-4">
              Curated Selection
            </span>
            <h2 className="text-5xl md:text-7xl font-serif text-slate-900 tracking-tight leading-[1.1] max-w-3xl">
              Experience <span className="italic font-light text-slate-500">Pure</span> Luxury
            </h2>
            <p className="mt-6 text-slate-500 max-w-lg mx-auto text-sm md:text-base leading-relaxed">
              Discover high-fashion pieces for your most momentous occasions. Premium quality, curated for elegance.
            </p>

            {/* Refined Navigation Filters */}
            <div className="flex flex-wrap justify-center gap-3 mt-12 bg-white/40 backdrop-blur-md p-2 rounded-full border border-white/60 shadow-sm">
              <button
                onClick={() => setSelectedCategory("All")}
                className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === "All"
                  ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white/80"
                  }`}
              >
                Show All
              </button>
              {category.map((cat, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-8 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xl shadow-slate-200"
                    : "text-slate-500 hover:text-slate-900 hover:bg-white/80"
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

      

        {/* Modern Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {dresses
            .filter((dress) => selectedCategory === "All" || dress.category_name === selectedCategory)
            .map((dress) => (
              <div
                key={dress.id}
                className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-[2rem] p-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] border border-white/80 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(`/dress/${dress.id}`)}
              >

                {/* Image */}
                <div className="relative aspect-[4/5] rounded-[1.7rem] overflow-hidden bg-slate-50 mb-4">
                  <img
                    src={dress.image}
                    alt={dress.name}
                    className="w-full h-full object-cover transition-transform duration-[1.6s] ease-[0.16,1,0.3,1] group-hover:scale-110"
                  />

                  {/* Availability */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] font-bold uppercase tracking-[0.25em] text-emerald-600 shadow-sm flex items-center gap-2 border border-white/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      Available
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="px-2 flex flex-col flex-1">

                  <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-pink-500 mb-1">
                    {dress.category_name}
                  </p>

                  <h3 className="font-serif text-[22px] text-slate-900 leading-tight mb-2 group-hover:text-pink-600 transition-colors truncate">
                    {dress.name}
                  </h3>

                  <span className="text-[10px] text-slate-400 italic mb-4">
                    #{dress.code || "N/A"}
                  </span>

                  {/* Bottom Section */}
                  <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">

                    <span className="text-xl font-black text-slate-900 tracking-tight">
                      ₹{dress.price.toLocaleString()}
                    </span>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/dress/${dress.id}`);
                      }}
                      className="bg-slate-900 hover:bg-black text-white px-4 py-2.5 rounded-xl text-[9px] font-bold uppercase tracking-[0.15em] shadow-lg transition-all duration-300 hover:scale-[1.05] active:scale-95 whitespace-nowrap"
                    >
                      Rent Now
                    </button>

                  </div>

                </div>
              </div>
            ))}
        </div>

      </div>
    </section>
  );
}