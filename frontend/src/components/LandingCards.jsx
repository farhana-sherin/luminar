import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import dressesApiCall from "../api/dresses.api";

export default function LandingCards() {
  const navigate = useNavigate();
  const [dresses, setDresses] = useState([]);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    <section className="py-10 bg-[#Fdfbfb] px-4 md:px-12 font-sans">
      <div className="max-w-[1600px] mx-auto">

        {/* Small Side Headers */}
        <div className="flex justify-between items-center mb-8 px-4">
          <h3 className="text-2xl font-serif text-slate-900 tracking-tight">
            Trending Now
          </h3>
          <h3 className="text-2xl font-serif text-slate-900 tracking-tight">
            New Arrivals
          </h3>
        </div>

        {/* Modern Premium Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {dresses
            .filter((dress) => selectedCategory === "All" || dress.category_name === selectedCategory)
            .slice(0, 4)
            .map((dress) => (
              <div
                key={dress.id}
                className="group flex flex-col bg-white/60 backdrop-blur-xl rounded-[2rem] p-3 shadow-[0_12px_30px_-12px_rgba(0,0,0,0.08)] hover:shadow-[0_30px_60px_-12px_rgba(0,0,0,0.15)] border border-white/80 transition-all duration-500 hover:-translate-y-2 cursor-pointer"
                onClick={() => navigate(`/dress/${dress.id}`)}
              >

                {/* Image */}
                <div className="relative aspect-[4/5] rounded-[1.7rem] overflow-hidden bg-slate-50 mb-4">
                  <img
                    src={`http://127.0.0.1:8000${dress.image}`}
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

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            to="/collections"
            className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-7 py-3 text-xs font-bold uppercase tracking-[0.25em] text-white shadow-md hover:bg-slate-800 transition"
          >
            View All
          </Link>
        </div>

      </div>
    </section>
  );
}